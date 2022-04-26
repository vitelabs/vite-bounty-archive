const { wallet } = require('@vite/vitejs');
const QRcode = require('qrcode');

async function dmHandler(ctx, event) {
  if (!event.type == 'message_create') {
    return;
  }
  try {
    const eventStr = await ctx.redisClient.GET(event.id);
    ctx.logger.debug(`get event[${event.id}] from redis is ${eventStr}`);
    if (eventStr != null) {
      return;
    } else {
      await ctx.redisClient.SET(event.id, JSON.stringify(event), {
        EX: 300,
      });
    }
  } catch (err) {
    ctx.logger.error(err);
  }
  const msg = event.message_create.message_data.text.trim();
  const parsedMsg = msg.split(' ');
  const command = parsedMsg.find((x) => x.startsWith('!'));
  const senderId = event.message_create.sender_id;
  if (senderId == ctx.twitterOwner.id_str) {
    return;
  }
  const dm = {
    recipient_id: senderId ,
  };
  try {
    let address = await ctx.tipbotClient.getUserAddress(senderId, 'twitter');
    if (address == null) {
      // create one
      address = await ctx.tipbotClient.deriveAddress(senderId, 'twitter');
      await ctx.tipbotClient.addUser(senderId, 'twitter', address);
    } else {
      // workaround: sometimes can't receive createUnreceivedBlockSubscriptionByAddress event;
      await depositHandler(ctx, address);
    }
    let balance;

    switch (command) {
      case '!register':
      case '!deposit':
      case '!account':
        dm.text = `Your account address is:\n${address}`;
        const buffer = await new Promise((resolve, reject) => {
          QRcode.toBuffer(address, (error, buf) => {
            if(error) return reject(error)
            resolve(buf)
          })
        })
        const mediaId = await ctx.twitterClient.v1.uploadMedia(buffer, {
          type: 'png',
          target: 'dm',
        });
        dm.attachment = {
          type: "media",
          media: {
            id: mediaId
          }
        }
        break;

      case '!balance':
        ctx.logger.debug('!balance', address);
        balance = await ctx.tipbotClient.getUserBalanceByAddress(address);
        ctx.logger.debug('!balance', balance);
        dm.text = `${readableAmount(balance)} VITE`;
        break;

      case '!withdraw':
        const idx = parsedMsg.findIndex(x => x == '!withdraw');
        let [amountStr, withdrawAddress] = parsedMsg.slice(idx+1, idx+3);
        if (amountStr === undefined && withdrawAddress === undefined) {
          dm.text = 'Incorrect command. Format:\n!withdraw <amount> <address>';
        } else {
          let amount;
          if (Number.isNaN(Number(amountStr))) {
            withdrawAddress = amountStr;
            amount = null;
          } else {
            amount = realAmount(amountStr);
          }
          ctx.logger.debug('!withdraw', amount, withdrawAddress);
          const addrType = wallet.isValidAddress(withdrawAddress);
          if (addrType != 1 || withdrawAddress == address) {
            dm.text = 'Please provide a valid address';
          } else {
            balance = await ctx.tipbotClient.getUserBalanceByAddress(address);
            ctx.logger.debug('balance', balance);
            if (amount == null) {
              amount = balance;
            }
            if (balance >= amount && amount > '0') {
              const ret = await ctx.tipbotClient.withdrawByAddress(address, withdrawAddress, amount);
              if (ret) {
                dm.text = `Withdraw successful. Hash:\n${ret.hash}`;
              }
            } else {
              dm.text = 'Your account address have not enough balance';
            }
          }
        }
        break;

      case '!help':
        dm.text = [
          '!help: display help for command',
          '!register: register an account address',
          '!account: return the account address',
          '!balance: return the balance of your account address',
          '!withdraw: send the balance of your account to the provided address. Format: !withdraw <amount> <address>',
          '!tip: tips are sent through public tweets. Example: @star_vite !tip 5 @vitelabs',
        ].join('\n\n');
        break;

      default:
        dm.text = 'The command you sent is not recognized. Please send !help for a list of commands and what they do.'
    }
  } catch (e) {
    ctx.logger.error(e)
    // TODO
    dm.text = 'Something wrong, please contract us'
  }

  try {
    ctx.logger.info('sendDm %j', dm)
    await ctx.twitterClient.v1.sendDm(dm);
  } catch (e) {
    ctx.logger.error(e);
  }
}

async function tweetHandler(ctx, event) {
  const senderId = event.user.id_str;
  if (senderId == ctx.twitterOwner.id_str) {
    return;
  }
  try {
    const eventStr = await ctx.redisClient.GET(event.id_str);
    ctx.logger.debug(`get event[${event.id_str}] from redis is ${eventStr}`);
    if (eventStr != null) {
      return;
    } else {
      await ctx.redisClient.SET(event.id_str, JSON.stringify(event), {
        EX: 300,
      });
    }
  } catch (err) {
    ctx.logger.error(err);
  }
  const tweet = event.text.trim().replace(/\t|\n/g, ' ');
  const parsedMsg = tweet.split(' ');
  const idx = parsedMsg.findIndex((x) => x.startsWith('!tip'));
  if (idx  ==  -1) {
    return;
  }
  const amountStr = parsedMsg.find((x, i) => (i > idx && !Number.isNaN(Number(x))));
  // TODO should remove all punctuation in the toUserName except underscore? maybe based on usage feedback.
  const toUserName = parsedMsg.find((x, i) => (i > idx && x.startsWith('@')));
  if (!amountStr || !toUserName) {
    return;
  }
  ctx.logger.info(`!tip ${amountStr} @${toUserName}`);
  const amount = realAmount(amountStr);
  const toUser = event.entities.user_mentions.find((x) => ( toUserName === `@${x.screen_name}`));
  ctx.logger.info(`!tip ${amount} %j`, toUser);

  try {
    let text;
    let balance;
    let fromAddress = await ctx.tipbotClient.getUserAddress(senderId, 'twitter');
    let toAddress = await ctx.tipbotClient.getUserAddress(toUser.id_str, 'twitter');
    if (fromAddress == null) {
      // create one
      fromAddress = await ctx.tipbotClient.deriveAddress(senderId, 'twitter');
      await ctx.tipbotClient.addUser(senderId, 'twitter', fromAddress);
      balance = '0';
    } else {
      // workaround: sometimes can't receive createUnreceivedBlockSubscriptionByAddress event;
      await depositHandler(ctx, fromAddress);
      balance = await ctx.tipbotClient.getUserBalanceByAddress(fromAddress);
    }
    if (toAddress == null) {
      // create one
      toAddress = await ctx.tipbotClient.deriveAddress(toUser.id_str, 'twitter');
      await ctx.tipbotClient.addUser(toUser.id_str, 'twitter', toAddress);
    }
    if (balance >= amount && amount > '0') {
      const ret = await ctx.tipbotClient.tip(fromAddress, toAddress, amount);
      text = `You have successfully sent your ${amountStr} $VITE tip. Hash:\n${ret.hash}`
    } else {
      text = `You do not have enough VITE to cover this ${amountStr} VITE tip.  Please check your balance by sending a DM to me with !balance and retry.`
    }
    ctx.logger.info(`reply to the tweet(${event.id_str}): ${text}`);
    await ctx.twitterClient.v1.reply(text, event.id_str);
  } catch (e) {
    ctx.logger.error(e);
  }
}

async function depositHandler(ctx, address) {
  const unreceivedBlocks = await ctx.tipbotClient.getUnreceivedBlocks(address);
  ctx.logger.debug(`get unreceived blocks by address ${address} %j`,unreceivedBlocks)
  if (unreceivedBlocks.length > 0) {
    const account = await ctx.tipbotClient.getAccount(address);
    if (!account) {
      return;
    }
    for ( const block of unreceivedBlocks ) {
      await ctx.tipbotClient.receiveTransaction(account, block.hash);
    }
    // FIXME unreceivedEvent first
    setTimeout(async () => {
      const balance = await ctx.tipbotClient.getAddressBalance(address);
      ctx.logger.debug('get address balance', address, balance);
      if (balance > '0') {
        const ret = await ctx.tipbotClient.deposit(account, balance);
        this.logger.debug('deposit successful %j', ret);
      }
    }, 10000);
  } else {
    const balance = await ctx.tipbotClient.getAddressBalance(address);
    ctx.logger.debug('get address balance', address, balance);
    if (balance > '0') {
      const account = await ctx.tipbotClient.getAccount(address);
      if (!account) {
        return;
      }
      const ret = await ctx.tipbotClient.deposit(account, balance);
      this.logger.debug('deposit successful %j', ret);
    }
  }
}

function readableAmount(amount, convert = 18) {
  const arr = amount.toString().split('');
  arr.reverse();
  const intArr = arr.slice(convert);
  let decimalArr = [];
  // append 0 after decimal point
  for (let i = 0; i < convert; i++) {
    if (arr[i] === undefined) {
      decimalArr.push('0');
    } else {
      decimalArr.push(arr[i]);
    }
  }
  // cut suffix 0
  const idx = decimalArr.findIndex(x => Number(x) > 0);
  if (idx > -1) {
    decimalArr = decimalArr.slice(idx);
  } else {
    decimalArr = [];
  }
  decimalArr.reverse();
  intArr.reverse();
  if (intArr.length == 0) {
    intArr.push('0');
  }
  if (decimalArr.length > 0) {
    intArr.push('.');
  }
  return `${intArr.join('')}${decimalArr.join('')}`
}

function realAmount(str, convert = 18) {
  let strArr = str.split('');
  if (strArr[0] == '+') {
    strArr.shift();
  } else if(strArr[0] == '-') {
    // FIXME negative number?
    strArr = ['0'];
  } else if (strArr[0] == '.') {
    strArr.unshift('0');
  }
  str = strArr.join('');
  const [int, decimal] = str.toString().split('.');
  let decimalArr = [];
  if (decimal !== undefined) {
    decimalArr = decimal.split('');
  }
  for (let i = 0; i < convert; i++) {
    if (decimalArr[i] === undefined) {
      decimalArr.push('0');
    }
  }
  let intArr = int.split('');
  for(let x of intArr) {
    if (Number.isNaN(Number(x))) {
      intArr = ['0'];
      break;
    }
  }
  for(let x of decimalArr) {
    if (Number.isNaN(Number(x))) {
      decimalArr = ['0'];
      break;
    }
  }
  let arr = intArr.concat(decimalArr);
  // cut prefix 0
  const idx = arr.findIndex(x => Number(x) > 0)
  if (idx > -1) {
    arr = arr.slice(idx);
  } else {
    arr = ['0'];
  }
  return arr.join('');
}

module.exports = {
  dmHandler,
  tweetHandler,
  readableAmount,
  realAmount,
}
