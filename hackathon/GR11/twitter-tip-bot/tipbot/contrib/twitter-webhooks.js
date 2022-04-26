#!/usr/bin/env node

require('dotenv').config();
const { Command } = require('commander');
const jsonFormat = require("json-format")
const { TwitterApi } = require('twitter-api-v2');

const WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV
// OAuth 1.0a user context client
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})
// OAuth 2 application only client
const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const program = new Command();

program
  .version('0.0.1')
  .description('Managing Twitter webhooks');

program
  .command('auth')
  .description('verify credentials')
  .action(async() => {
    try {
      const currentUser = await client.v1.verifyCredentials();
      console.log(currentUser);
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  })

program
  .command('user <name>')
  .description('retrieve a single user with a username, default current user')
  .action(async(name) => {
    try {
      const user = await appOnlyClient.v2.userByUsername(name);
      console.log(user)
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  })

program
  .command('list')
  .alias('ls')
  .description('returns the given environment webhook URLs and status')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .option('-a, --all', 'returns all webhook URLs and their status')
  .action(async(opt) => {
    let webhookURL
    if(opt.all) {
      webhookURL = 'https://api.twitter.com/1.1/account_activity/all/webhooks.json'
    } else {
      const env_name = opt.env || WEBHOOK_ENV
      webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/webhooks.json`
    }
    try {
      const resp = await appOnlyClient.send({
        method: 'GET',
        url: webhookURL,
      })
      if (opt.all) {
        console.log(jsonFormat(resp.data, {
            type: 'space',
            size: 2
        }))
      } else {
        console.log(resp.data)
      }
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program
  .command('add <url>')
  .description('registers a webhook URL to the given environment')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(url, opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/webhooks.json`
    try {
      const resp = await client.send({
        method: 'POST',
        url: webhookURL,
        query: {
          url,
        }
      })
      console.log(resp.data)
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program
  .command('delete <webhook_id>')
  .alias('del')
  .description('removes a webhook from the given environment')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(webhook_id, opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/webhooks/${webhook_id}.json`
    try {
      const resp = await client.send({
        method: 'DELETE',
        url: webhookURL,
      })
      console.log(resp.code);
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program
  .command('trigger <webhook_id>')
  .description('triggers the challenge response check (CRC) for the given enviroments webhook for all activites.')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(webhook_id, opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/webhooks/${webhook_id}.json`
    try {
      const resp = await client.send({
        method: 'PUT',
        url: webhookURL,
      })
      console.log(resp.code);
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program.parse(process.argv);
