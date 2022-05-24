const { default: WS_RPC } = require("@vite/vitejs-ws");
const { ViteAPI, accountBlock, wallet } = require('@vite/vitejs');

const { createAccountBlock, ReceiveAccountBlockTask } = accountBlock;

async function main() {

    var wsService = new WS_RPC("ws://localhost:23457");
    var api = new ViteAPI(wsService, function () {
        console.log("Vite API connected");
    });

    var inputAddr = process.argv[2];
    if (!inputAddr) {
        console.error("Please input an address");
        return;
    }

    const { privateKey, address } = wallet.deriveAddress({
        mnemonics: 'elegant craft giggle blur machine hold sword zero awake ocean twin beach skull struggle echo shock diagram blind snap estate code museum best exhaust',
        index: 0
    });

    // Workaround to wait for block to get published
    // before fetching list of tokens again
    async function waitForTransaction() {
        const ReceiveTask = new ReceiveAccountBlockTask({
            address: address,
            privateKey: privateKey,
            provider: api,
        });
        let resolve_, reject_;
        const f = (resolve, reject) => {
            resolve_ = resolve;
            reject_ = reject;
        };
        ReceiveTask.onSuccess((data) => {
            resolve_(data);
        });
        ReceiveTask.onError((err) => {
            reject_(err);
        })

        ReceiveTask.start({
            checkTime: 5000,
            transctionNumber: 10,
        });
        return new Promise(f)
    }

    async function displayBalanceInfo(address_) {
        const effectiveAddress = address_ || address;
        await api
            .getBalanceInfo(effectiveAddress)
            .then((e) => console.log("Balance info for " + effectiveAddress + " :\n", e.balance.balanceInfoMap));
    }

    async function findOwnerToken() {
        const tokenInfoList = (await api.request('contract_getTokenInfoList', 0, 1000)).tokenInfoList;
        return tokenInfoList.find(e => e.tokenId !== 'tti_5649544520544f4b454e6e40' && e.owner === address);
    }

    async function issueToken(amount, decimals) {
        const accBlk = createAccountBlock('issueToken', {
            address,
            tokenName: "Test Token",
            isReIssuable: true,
            maxSupply: amount,
            totalSupply: amount,
            isOwnerBurnOnly: false,
            decimals: decimals,
            tokenSymbol: 'TEST',
        }).setProvider(api).setPrivateKey(privateKey);
        const result = await accBlk.autoSend();

        console.log(amount, "tokens created:", result);
        console.log('Waiting for confirmation...');
        await waitForTransaction();
    }

    await displayBalanceInfo();


    let token = await findOwnerToken();
    if (!token) {
        await issueToken('29000000000000000000', 10);
        token = await findOwnerToken();
    }

    console.log('Token:', token);

    const transferBlock = createAccountBlock('send', {
        address,
        toAddress: inputAddr,
        tokenId: token.tokenId,
        amount: '100000000000000000'
    }).setProvider(api).setPrivateKey(privateKey);

    await transferBlock.autoSend();
    console.log('Tokens awarded');
    console.log('Waiting for confirmation...');
    await waitForTransaction();
    await displayBalanceInfo(inputAddr);
}

main().catch((e) => console.log(e)).finally(process.exit);
