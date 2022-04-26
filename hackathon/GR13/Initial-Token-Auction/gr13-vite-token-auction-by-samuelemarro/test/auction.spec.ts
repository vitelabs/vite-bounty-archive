// NOTE: Queries are authomatically retried and don't fail (while calls do), so some query tests have been written as call tests.

import { describe } from "mocha";
import chai from "chai";
const vite = require('@vite/vuilder');
import chaiAsPromised from "chai-as-promised";
import config from "./vite.config.json";
const { accountBlock : {createAccountBlock, ReceiveAccountBlockTask} } = require("@vite/vitejs");

chai.use(chaiAsPromised);
const expect = chai.expect;

let provider: any;
let deployer: any;
let alice: any;
let bob: any;
let charlie: any;
let contract: any;
let mnemonicCounter = 1;

const viteId = 'tti_5649544520544f4b454e6e40';
const viteFullId = '000000000000000000000000000000000000000000005649544520544f4b454e';

const toFull = (id : string) => {
    const replacedId = id.replace('tti_', '00000000000000000000000000000000000000000000');
    return replacedId.substring(0, replacedId.length - 4);
}

let testTokenId : any;
const testFullId = () => toFull(testTokenId);

const checkEvents = (result : any, correct : Array<Object>) => {
    expect(result).to.be.an('array').with.length(correct.length);
    for (let i = 0; i < correct.length; i++) {
        expect(result[i].returnValues).to.be.deep.equal(correct[i]);
    }
}


async function receiveIssuedTokens() {
    const blockTask = new ReceiveAccountBlockTask({
        address: deployer.address,
        privateKey: deployer.privateKey,
        provider
    });
    let resolveFunction : any;
    const promiseFunction = (resolve : any) => {
        resolveFunction = resolve;
    };
    blockTask.onSuccess((data : any) => {
        resolveFunction(data);
    });

    blockTask.start();
    return new Promise(promiseFunction);
}

describe('test TokenAuction', function () {
    before(async function() {
        provider = vite.localProvider();
        deployer = vite.newAccount(config.networks.local.mnemonic, 0);

        const block = createAccountBlock("issueToken", {
            address: deployer.address,
            tokenName: "Test Token",
            isReIssuable: true,
            maxSupply: 100000000,
            totalSupply: 100000000,
            isOwnerBurnOnly: false,
            decimals: 2,
            tokenSymbol: "TEST",
            provider,
            privateKey: deployer.privateKey
          })
        
        block.setProvider(provider);
        block.setPrivateKey(deployer.privateKey);
        await block.autoSend();

        await deployer.receiveAll();
        await receiveIssuedTokens();

        //console.log(tokenResult);
        const tokenInfoList = (
            await provider.request("contract_getTokenInfoList", 0, 1000)
          ).tokenInfoList;
        testTokenId = tokenInfoList.find(
            (e : any) =>
              e.tokenId !== viteFullId && e.owner === deployer.address
        ).tokenId;
        //testTokenId = tokenInfo.tokenId;
    })
    beforeEach(async function () {
        // init users
        alice = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
        bob = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
        charlie = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
        await deployer.sendToken(alice.address, '0');
        await alice.receiveAll();
        await deployer.sendToken(bob.address, '0');
        await bob.receiveAll();
        await deployer.sendToken(charlie.address, '0');
        await charlie.receiveAll();

        // compile
        const compiledContracts = await vite.compile('TokenAuction.solpp',);
        expect(compiledContracts).to.have.property('TokenAuction');
        contract = compiledContracts.TokenAuction;
        // deploy
        contract.setDeployer(deployer).setProvider(provider);
        await contract.deploy({params: [], responseLatency: 1});
        expect(contract.address).to.be.a('string');
    });
    describe('createAuction', function () {
        it('creates a new auction', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);
            expect(await contract.query('auctionTokenId', [0])).to.be.deep.equal([testTokenId]);
            expect(await contract.query('auctionEndTimestamp', [0])).to.be.deep.equal(['222222']);
            expect(await contract.query('auctionAmount', [0])).to.be.deep.equal(['55']);
            expect(await contract.query('auctionMinPrice', [0])).to.be.deep.equal(['2']);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                } // Auction created
            ]);
        });
    });

    describe('bid', function () {
        it('bids on an auction', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');

            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            expect(await contract.query('auctionAmount', [0])).to.be.deep.equal(['55']);
            expect(await contract.query('auctionEndTimestamp', [0])).to.be.deep.equal(['222222']);

            expect(await contract.query('auctionTokenId', [0])).to.be.deep.equal([testTokenId]);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['12']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['5']]);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                } // Bob bids
            ]);
        });

        it('increases the amount of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            // 2 more tokens at a price of 5 Vite/token = 10 Vite
            await contract.call('bid', [0, 14, 5], {caller: bob, amount: '10'});

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['14', '5']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['14']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['5']]);

            // 70 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('70');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 70 = 999930
            expect(await bob.balance(viteId)).to.be.deep.equal('999930');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '14', amount: '14',
                    '3': '5', price: '5'
                } // Bob bids again
            ]);
        });

        it('decreases the amount of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            // 3 less tokens at a price of 5 Vite/token = 15 Vite
            await contract.call('bid', [0, 9, 5], {caller: bob});

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['9', '5']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['9']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['5']]);

            await bob.receiveAll();

            // 45 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('45');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 45 = 999955
            expect(await bob.balance(viteId)).to.be.deep.equal('999955');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '9', amount: '9',
                    '3': '5', price: '5'
                } // Bob bids again
            ]);
        });

        it('increases the price of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            // 12 * 11 - 12 * 5 = 72
            await contract.call('bid', [0, 12, 11], {caller: bob, amount: '72'});

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '11']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['12']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['11']]);

            // 132 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('132');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 132 = 999868
            expect(await bob.balance(viteId)).to.be.deep.equal('999868');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '11', price: '11'
                } // Bob bids again
            ]);
        });

        it('decreases the price of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            await contract.call('bid', [0, 12, 3], {caller: bob});
            await bob.receiveAll();

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '3']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['12']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['3']]);

            // 36 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('36');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 36 = 999964
            expect(await bob.balance(viteId)).to.be.deep.equal('999964');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '3', price: '3'
                } // Bob bids again
            ]);
        });

        it('increases both the amount and price of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            // 14 * 11 - 12 * 5 = 94
            await contract.call('bid', [0, 14, 11], {caller: bob, amount: '94'});

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['14', '11']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['14']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['11']]);

            // 154 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('154');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 154 = 999846
            expect(await bob.balance(viteId)).to.be.deep.equal('999846');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '14', amount: '14',
                    '3': '11', price: '11'
                } // Bob bids again
            ]);
        });

        it('decreases both the amount and price of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            await contract.call('bid', [0, 9, 3], {caller: bob});
            await bob.receiveAll();

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['9', '3']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['9']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['3']]);

            // 27 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('27');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 27 = 999973
            expect(await bob.balance(viteId)).to.be.deep.equal('999973');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '9', amount: '9',
                    '3': '3', price: '3'
                } // Bob bids again
            ]);
        });

        it('bids exactly the same', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            await contract.call('bid', [0, 12, 5], {caller: bob});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['1']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[bob.address]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([['12']]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([['5']]);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                } // Bob bids again
            ]);
        });

        it('fails to bid lower than the minimum price', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            expect(
                contract.call('bid', [0, 12, 1], {caller: bob, amount: '60'})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to underpay a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            expect(
                contract.call('bid', [0, 12, 5], {caller: bob, amount: '59'})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('cancelBid', function() {
        it('cancels a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            await contract.call('cancelBid', [0], {caller: bob});
            await bob.receiveAll();

            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['0']);

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);
            expect(await contract.query('auctionBidders', [0])).to.be.deep.equal([[]]);
            expect(await contract.query('auctionAmounts', [0])).to.be.deep.equal([[]]);
            expect(await contract.query('auctionPrices', [0])).to.be.deep.equal([[]]);

            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // Original amount
            expect(await bob.balance(viteId)).to.be.deep.equal('1000000');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address
                } // Bob cancels bid
            ]);
        });
    })

    describe('collect', function() {
        it('collects the result of a bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);

            // 60 from Bob
            expect(await contract.balance(viteId)).to.be.deep.equal('60');
            // 55 from Alice
            expect(await contract.balance(testTokenId)).to.be.deep.equal('55');
            // 1000000 - 55 = 999945
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // 1000000 - 60 = 999940
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '0']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Received 12 from auction
            expect(await bob.balance(testTokenId)).to.be.deep.equal('12');
            // VITE balance didn't change
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['60', '43']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // Received 33 test-tokens as refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999988');
            // Received 60 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('60');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5',
                    '4': '0', refund: '0'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '60', payment: '60',
                    '3': '43', tokenRefund: '43'
                } // Alice collects bid results
            ]);
        });

        it('collects the result of a bid when a partial higher bid was placed', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});
            await contract.call('bid', [0, 24, 10], {caller: charlie, amount: '240'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidExists', [0, charlie.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);
            expect(await contract.query('bidInfo', [0, charlie.address], {caller: alice})).to.be.deep.equal(['24', '10']);

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '0']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Received 12 from auction
            expect(await bob.balance(testTokenId)).to.be.deep.equal('12');
            // VITE balance didn't change (1000000 - 60 = 999940)
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            expect(await contract.query('simulateCollect', [0, charlie.address], {caller: alice})).to.be.deep.equal(['24', '0']);
            await contract.call('collect', [0], {caller: charlie});
            await charlie.receiveAll();

            // Received 24 from auction
            expect(await charlie.balance(testTokenId)).to.be.deep.equal('24');
            // VITE balance didn't change (1000000 - 240 = 999760)
            expect(await charlie.balance(viteId)).to.be.deep.equal('999760');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['300', '19']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // Received 55 - (24 + 12) = 19 test-tokens as refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999964');
            // Received 12 * 5 + 24 * 10 = 300 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('300');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '24', amount: '24',
                    '3': '10', price: '10'
                }, // Charlie bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5',
                    '4': '0', refund: '0'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '24', amount: '24',
                    '3': '10', price: '10',
                    '4': '0', refund: '0'
                }, // Charlie collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '300', payment: '300',
                    '3': '19', tokenRefund: '19'
                } // Alice collects bid results
            ]);
        });

        it('collects the result of a winner\'s bid when a total lower bid was placed', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});
            // Charlie bids lower
            await contract.call('bid', [0, 55, 2], {caller: charlie, amount: '110'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidExists', [0, charlie.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);
            expect(await contract.query('bidInfo', [0, charlie.address], {caller: alice})).to.be.deep.equal(['55', '2']);

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '0']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Received 12 from auction
            expect(await bob.balance(testTokenId)).to.be.deep.equal('12');
            // VITE balance didn't change (1000000 - 60 = 999940)
            expect(await bob.balance(viteId)).to.be.deep.equal('999940');

            expect(await contract.query('simulateCollect', [0, charlie.address], {caller: alice})).to.be.deep.equal(['43', '24']);
            await contract.call('collect', [0], {caller: charlie});
            await charlie.receiveAll();

            // Received 43 from auction
            expect(await charlie.balance(testTokenId)).to.be.deep.equal('43');
            // Received 12 * 2 = 24 as refund
            expect(await charlie.balance(viteId)).to.be.deep.equal('999914');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['146', '0']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // Received no refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // Received 12 * 5 + 43 * 2 = 146 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('146');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '55', amount: '55',
                    '3': '2', price: '2'
                }, // Charlie bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5',
                    '4': '0', refund: '0'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '43', amount: '43',
                    '3': '2', price: '2',
                    '4': '24', refund: '24'
                }, // Charlie collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '146', payment: '146',
                    '3': '0', tokenRefund: '0'
                } // Alice collects bid results
            ]);
        });

        it('collects the refund after being outbid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});
            // Charlie bids higher
            await contract.call('bid', [0, 55, 10], {caller: charlie, amount: '550'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidExists', [0, charlie.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);
            expect(await contract.query('bidInfo', [0, charlie.address], {caller: alice})).to.be.deep.equal(['55', '10']);

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['0', '60']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Didn't receive any test tokens
            expect(await bob.balance(testTokenId)).to.be.deep.equal('0');
            // Received 12 * 5 = 60 as refund
            expect(await bob.balance(viteId)).to.be.deep.equal('1000000');

            expect(await contract.query('simulateCollect', [0, charlie.address], {caller: alice})).to.be.deep.equal(['55', '0']);
            await contract.call('collect', [0], {caller: charlie});
            await charlie.receiveAll();

            // Received 55 from auction
            expect(await charlie.balance(testTokenId)).to.be.deep.equal('55');
            // VITE balance didn't change (1000000 - 550 = 999450)
            expect(await charlie.balance(viteId)).to.be.deep.equal('999450');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['550', '0']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // Received no refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // Received 0 * 5 + 55 * 10 = 550 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('550');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '55', amount: '55',
                    '3': '10', price: '10'
                }, // Charlie bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '0', amount: '0',
                    '3': '5', price: '5',
                    '4': '60', refund: '60'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '55', amount: '55',
                    '3': '10', price: '10',
                    '4': '0', refund: '0'
                }, // Charlie collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '550', payment: '550',
                    '3': '0', tokenRefund: '0'
                } // Alice collects bid results
            ]);
        });

        it('collects the partial result of a winner\'s bid', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});
            // Charlie bids higher, but only for 52 out of 55
            await contract.call('bid', [0, 52, 10], {caller: charlie, amount: '520'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidExists', [0, charlie.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '5']);
            expect(await contract.query('bidInfo', [0, charlie.address], {caller: alice})).to.be.deep.equal(['52', '10']);

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['3', '45']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Received 3 from auction
            expect(await bob.balance(testTokenId)).to.be.deep.equal('3');
            // Received 9 * 5 = 45 as refund
            // Bob now has 1000000 - 5 * 3 = 999985
            expect(await bob.balance(viteId)).to.be.deep.equal('999985');

            expect(await contract.query('simulateCollect', [0, charlie.address], {caller: alice})).to.be.deep.equal(['52', '0']);
            await contract.call('collect', [0], {caller: charlie});
            await charlie.receiveAll();

            // Received 52 from auction
            expect(await charlie.balance(testTokenId)).to.be.deep.equal('52');
            // VITE balance didn't change (1000000 - 520)
            expect(await charlie.balance(viteId)).to.be.deep.equal('999480');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['535', '0']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // Received no refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // Received 3 * 5 + 52 * 10 = 535 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('535');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '12', amount: '12',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '52', amount: '52',
                    '3': '10', price: '10'
                }, // Charlie bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '3', amount: '3',
                    '3': '5', price: '5',
                    '4': '45', refund: '45'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '52', amount: '52',
                    '3': '10', price: '10',
                    '4': '0', refund: '0'
                }, // Charlie collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '535', payment: '535',
                    '3': '0', tokenRefund: '0'
                } // Alice collects bid results
            ]);
        });

        it('bids exactly the same price', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 55, 5], {caller: bob, amount: '275'});
            await contract.call('bid', [0, 55, 5], {caller: charlie, amount: '275'});

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidExists', [0, charlie.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['55', '5']);
            expect(await contract.query('bidInfo', [0, charlie.address], {caller: alice})).to.be.deep.equal(['55', '5']);

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['55', '0']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Received 55 from auction
            expect(await bob.balance(testTokenId)).to.be.deep.equal('55');
            // VITE balance didn't change (1000000 - 275 = 999725)
            expect(await bob.balance(viteId)).to.be.deep.equal('999725');

            expect(await contract.query('simulateCollect', [0, charlie.address], {caller: alice})).to.be.deep.equal(['0', '275']);
            await contract.call('collect', [0], {caller: charlie});
            await charlie.receiveAll();

            // Received 0 from auction
            expect(await charlie.balance(testTokenId)).to.be.deep.equal('0');
            // Full refund
            expect(await charlie.balance(viteId)).to.be.deep.equal('1000000');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['275', '0']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // No refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // Received 275 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('275');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '55', amount: '55',
                    '3': '5', price: '5'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '55', amount: '55',
                    '3': '5', price: '5'
                }, // Charlie bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '55', amount: '55',
                    '3': '5', price: '5',
                    '4': '0', refund: '0'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '0', amount: '0',
                    '3': '5', price: '5',
                    '4': '275', refund: '275'
                }, // Charlie collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '275', payment: '275',
                    '3': '0', tokenRefund: '0'
                } // Alice collects bid results
            ]);
        });

        it('re-bids exactly the same price', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 55, 10], {caller: bob, amount: '550'});
            await contract.call('bid', [0, 55, 5], {caller: charlie, amount: '275'});
            await contract.call('bid', [0, 55, 5], {caller: bob});
            await bob.receiveAll();

            expect(await contract.query('bidExists', [0, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('bidExists', [0, bob.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidExists', [0, charlie.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('bidInfo', [0, bob.address], {caller: alice})).to.be.deep.equal(['55', '5']);
            expect(await contract.query('bidInfo', [0, charlie.address], {caller: alice})).to.be.deep.equal(['55', '5']);

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            // Since Bob re-bid later, he lost its priority

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['0', '275']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            // Received 0 from auction
            expect(await bob.balance(testTokenId)).to.be.deep.equal('0');
            // Full refund
            expect(await bob.balance(viteId)).to.be.deep.equal('1000000');

            expect(await contract.query('simulateCollect', [0, charlie.address], {caller: alice})).to.be.deep.equal(['55', '0']);
            await contract.call('collect', [0], {caller: charlie});
            await charlie.receiveAll();

            // Received 55 from auction
            expect(await charlie.balance(testTokenId)).to.be.deep.equal('55');
            // VITE balance didn't change (1000000 - 275 = 999725)
            expect(await charlie.balance(viteId)).to.be.deep.equal('999725');

            expect(await contract.query('simulateCollectSeller', [0], {caller: alice})).to.be.deep.equal(['275', '0']);
            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            // No refund
            expect(await alice.balance(testTokenId)).to.be.deep.equal('999945');
            // Received 275 VITE as payment
            expect(await alice.balance(viteId)).to.be.deep.equal('275');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': '0', auctionId: '0',
                    '1': testFullId(), tokenId: testFullId(),
                    '2': alice.address, seller: alice.address,
                    '3': '55', amount: '55',
                    '4': '222222', endTimestamp: '222222',
                    '5': '2', minPrice: '2'
                }, // Auction created
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '55', amount: '55',
                    '3': '10', price: '10'
                }, // Bob bids
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '55', amount: '55',
                    '3': '5', price: '5'
                }, // Charlie bids
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '55', amount: '55',
                    '3': '5', price: '5'
                }, // Bob bids again
                {
                    '0': '0', auctionId: '0',
                    '1': bob.address, bidder: bob.address,
                    '2': '0', amount: '0',
                    '3': '5', price: '5',
                    '4': '275', refund: '275'
                }, // Bob collects
                {
                    '0': '0', auctionId: '0',
                    '1': charlie.address, bidder: charlie.address,
                    '2': '55', amount: '55',
                    '3': '5', price: '5',
                    '4': '0', refund: '0'
                }, // Charlie collects
                {
                    '0': '0', auctionId: '0',
                    '1': alice.address, seller: alice.address,
                    '2': '275', payment: '275',
                    '3': '0', tokenRefund: '0'
                } // Alice collects bid results
            ]);
        });

        it('fails to collect before the expiration', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            // Before the expiration
            await contract.call('setTime', [11111], {caller: alice});

            expect(
                contract.call('collect', [0], {caller: bob})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to collect twice', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(await contract.query('simulateCollect', [0, bob.address], {caller: alice})).to.be.deep.equal(['12', '0']);
            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            expect(
                contract.call('collect', [0], {caller: bob})
            ).to.eventually.be.rejectedWith('revert');
        });
    })

    describe('collectSeller', function() {
        // Note: most collectSeller tests are integrated with the collect tests
        it('fails to collect (as a seller) without being the seller', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            expect(
                contract.call('collectSeller', [0], {caller: bob})
            ).to.be.rejectedWith('revert');
        });

        it('fails to collect (as a seller) before the expiration timestamp', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            await contract.call('setTime', [222221], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['0']);

            expect(
                contract.call('collectSeller', [0], {caller: alice})
            ).to.be.rejectedWith('revert');
        });

        it('fails to collect (as a seller) twice', async function() {
            await deployer.sendToken(alice.address, '1000000', testTokenId);
            await alice.receiveAll();

            await contract.call('createAuction', [testTokenId, 55, 222222, 2], {caller: alice, amount: '55', tokenId: testTokenId});

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('auctionNumBids', [0])).to.be.deep.equal(['0']);

            await contract.call('bid', [0, 12, 5], {caller: bob, amount: '60'});

            await contract.call('setTime', [222223], {caller: alice});

            expect(await contract.query('auctionExpired', [0], {caller: alice})).to.be.deep.equal(['1']);

            await contract.call('collect', [0], {caller: bob});
            await bob.receiveAll();

            await contract.call('collectSeller', [0], {caller: alice});
            await alice.receiveAll();

            expect(
                contract.call('collectSeller', [0], {caller: alice})
            ).to.be.rejectedWith('revert');
        });
    });
});