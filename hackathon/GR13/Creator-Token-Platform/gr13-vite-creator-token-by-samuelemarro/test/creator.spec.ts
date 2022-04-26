// NOTE: Queries are authomatically retried and don't fail (while calls do), so some query tests have been written as call tests.

import { describe } from "mocha";
import chai from "chai";
const vite = require('@vite/vuilder');
import chaiAsPromised from "chai-as-promised";
import config from "./vite.config.json";

chai.use(chaiAsPromised);
const expect = chai.expect;

let provider: any;
let deployer: any;
let alice: any;
let bob: any;
let contract: any;
let mnemonicCounter = 1;

const checkEvents = (result : any, correct : Array<Object>) => {
    expect(result).to.be.an('array').with.length(correct.length);
    for (let i = 0; i < correct.length; i++) {
        expect(result[i].returnValues).to.be.deep.equal(correct[i]);
    }
}

describe('test CreatorToken', function () {
    beforeEach(async function () {
        provider = vite.localProvider();
        deployer = vite.newAccount(config.networks.local.mnemonic, 0);
        // init users
        alice = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
        bob = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
        await deployer.sendToken(alice.address, '0');
        await alice.receiveAll();
        await deployer.sendToken(bob.address, '0');
        await bob.receiveAll();
        // compile
        const compiledContracts = await vite.compile('CreatorToken.solpp',);
        expect(compiledContracts).to.have.property('CreatorToken');
        contract = compiledContracts.CreatorToken;
        // deploy
        contract.setDeployer(deployer).setProvider(provider);
        await contract.deploy({params: ['10000', '154']/*, responseLatency: 1*/});
        expect(contract.address).to.be.a('string');
        expect(await contract.query('coefficient')).to.be.deep.equal(['154']);
    });


    describe('transfer', function() {
        it('transfers a token', async function () {
            // Initially Alice has 10k Alice-tokens
            expect(await contract.query('balanceOf', [alice.address, alice.address])).to.be.deep.equal(['10000']);

            await contract.call('transfer', [alice.address, bob.address, '1'], {caller: alice});

            // Alice now has 9999 Alice-tokens and Bob has 1 Alice-token
            expect(await contract.query('balanceOf', [alice.address, alice.address])).to.be.deep.equal(['9999']);
            expect(await contract.query('balanceOf', [alice.address, bob.address])).to.be.deep.equal(['1']);

            // Tradable and total supplies don't change
            expect(await contract.query('tradableSupply', [alice.address])).to.be.deep.equal(['0']);
            expect(await contract.query('totalSupply', [alice.address])).to.be.deep.equal(['10000']);

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, from: alice.address,
                    '2': bob.address, to: bob.address,
                    '3': '1', amount: '1'
                } // Token transferred
            ]);
        });

        it('fails to transfer a token without enough balance', async function () {
            await expect(
                contract.call('transfer', [alice.address, bob.address, 10001], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('mint', function() {
        it('mints a token', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();
            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['27']);
            // 154 * 27 = 4158
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['4158']);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '27', amount: '27'
                } // Token minted
            ]);
        });

        it('mints a token of someone else', async function() {
            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10000']);

            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: bob, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await bob.balance()).to.be.deep.equal('943867');

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['0']);

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10000']);
            expect(await contract.query('balanceOf', [alice.address, bob.address], {caller: alice})).to.be.deep.equal(['27']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            //expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['27']);
            // 154 * 27 = 4158
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['4158']);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': bob.address, owner: bob.address,
                    '2': '27', amount: '27'
                } // Token minted
            ]);
        });

        it('mints a token twice', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();
            expect(await alice.balance()).to.be.deep.equal('1000000')
            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['27']);
            // 154 * 27 = 4158
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['4158']);

            // Mint 10 tokens
            // \int_27^37 154x dx = 49280
            await contract.call('mint', [alice.address, 10], {caller: alice, amount: '49280'});
            // 56133 + 49280 = 105413
            expect(await contract.balance()).to.be.deep.equal('105413');
            // 1000000 - 105413 = 894587
            expect(await alice.balance()).to.be.deep.equal('894587');

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10037']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10037']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['37']);
            // 154 * 37 = 5698
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['5698']);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '27', amount: '27'
                }, // Token minted
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '10', amount: '10'
                }, // Token minted
            ]);
        });

        it('fails to mint 0 tokens', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();
            await expect(
                contract.call('mint', [alice.address, 0], {caller: alice, amount: '56133'})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('overpays a mint call', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();
            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            // We're gonna pay 56135
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56135'});
            await alice.receiveAll();
            
            // Overpaying should not change anything

            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['27']);
            // 154 * 27 = 4158
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['4158']);
        })

        it('fails to underpay a mint call', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();
            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            // We're gonna pay 56132

            await expect(
                contract.call('mint', [alice.address, 0], {caller: alice, amount: '56132'})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('burn', function() {
        it('burns a token', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');
            
            await contract.call('burn', [alice.address, '2'], {caller: alice});
            await alice.receiveAll();

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            // \int_27^25 154x dx = -8008
            // 56133 - 8008 = 48125
            expect(await contract.balance()).to.be.deep.equal('48125');
        
            // 943867 + 8008 = 951875
            expect(await alice.balance()).to.be.deep.equal('951875');

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10025']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10025']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['25']);

            // 25 * 154 = 3850
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['3850']);

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '27', amount: '27'
                }, // Token minted
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '2', amount: '2'
                }, // Token burned
            ]);
        });

        it('burns a token twice', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');
            
            await contract.call('burn', [alice.address, '2'], {caller: alice});
            await alice.receiveAll();

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            // \int_27^25 154x dx = -8008
            // 56133 - 8008 = 48125
            expect(await contract.balance()).to.be.deep.equal('48125');
        
            // 943867 + 8008 = 951875
            expect(await alice.balance()).to.be.deep.equal('951875');

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10025']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10025']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['25']);

            // 25 * 154 = 3850
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['3850']);

            // Burn all the remaining tradable tokens
            await contract.call('burn', [alice.address, '25'], {caller: alice});
            await alice.receiveAll();

            // \int_25^0 154x dx = -48125
            // 48125 - 48125 = 0
            expect(await contract.balance()).to.be.deep.equal('0');

            // 951875 + 48125 = 1000000
            expect(await alice.balance()).to.be.deep.equal('1000000');
        });

        it('fails to burn a token with 0 amount', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            await expect(
                contract.call('burn', [alice.address, '0'], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to burn a token with an amount greater than the tradable supply', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            await expect(
                contract.call('burn', [alice.address, '28'], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('swap', function() {
        it('swaps two tokens', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // Alice's balance is now 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            // Mint 89 Bob-tokens
            // \int_0^89 154x dx = 609917
            await contract.call('mint', [bob.address, 89], {caller: bob, amount: '609917'});
            // Contract's balance is now 56133 + 609917 = 666050
            expect(await contract.balance()).to.be.deep.equal('666050');
            // Bob's balance is now 1000000 - 609917 = 390083
            expect(await bob.balance()).to.be.deep.equal('390083');

            // Swap 15 Alice-tokens for the equivalent amount of Bob-tokens
            // \int_27^12 154x dx = -45045
            // \int_89^t 154x dx = 45045 has solution t = 92.228
            // Since the contract rounds down, the actual value is 92
            // In other words, the contract will swap 15 Alice-tokens for (92 - 89 = 3) Bob-tokens
            await contract.call('swap', [alice.address, bob.address, '15'], {caller: alice});
            await alice.receiveAll();

            // 27 Alice-tokens - 15 = 12
            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10012']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10012']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['12']);

            // Alice now has 3 Bob-tokens
            expect(await contract.query('balanceOf', [bob.address, alice.address], {caller: alice})).to.be.deep.equal(['3']);
            // Bob's balance didn't change
            expect(await contract.query('balanceOf', [bob.address, bob.address], {caller: bob})).to.be.deep.equal(['10089']);

            // 89 Bob-tokens + 3 = 92
            expect(await contract.query('totalSupply', [bob.address], {caller: bob})).to.be.deep.equal(['10092']);
            expect(await contract.query('tradableSupply', [bob.address], {caller: bob})).to.be.deep.equal(['92']);

            // The new Bob-tokens are worth \int_89^92 154x dx = 41811
            // In other words, Alice didn't receive enough Bob-tokens to cover the full swap amount
            // The difference (45045 - 41811 = 3234) is refunded to Alice
            // Contract's balance is now 666050 - 3234 = 662816
            expect(await contract.balance()).to.be.deep.equal('662816');
            // Alice's balance is now 943867 + 3234 = 947101
            expect(await alice.balance()).to.be.deep.equal('947101');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '27', amount: '27'
                }, // Alice-token minted by Alice
                {
                    '0': bob.address, tokenId: bob.address,
                    '1': bob.address, owner: bob.address,
                    '2': '89', amount: '89'
                }, // Bob-token minted by Bob
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '15', amount: '15'
                }, // Alice-token burned by Alice
                {
                    '0': bob.address, tokenId: bob.address,
                    '1': alice.address, owner: alice.address,
                    '2': '3', amount: '3'
                } // Bob-token minted by Alice
            ]);
        });

        it('fails to swap 0 tokens', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // Mint 89 Bob-tokens
            // \int_0^89 154x dx = 609917
            await contract.call('mint', [bob.address, 89], {caller: bob, amount: '609917'});

            await expect(
                contract.call('swap', [alice.address, bob.address, '0'], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to swap more tokens than the tradable amount', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // Mint 89 Bob-tokens
            // \int_0^89 154x dx = 609917
            await contract.call('mint', [bob.address, 89], {caller: bob, amount: '609917'});

            // Only 27 Alice-tokens are tradable
            await expect(
                contract.call('swap', [alice.address, bob.address, '28'], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to swap more tokens than the balance', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Transfer 10000 Alice-tokens to Bob
            await contract.call('transfer', [alice.address, bob.address, '10000'], {caller: alice});

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // Mint 89 Bob-tokens
            // \int_0^89 154x dx = 609917
            await contract.call('mint', [bob.address, 89], {caller: bob, amount: '609917'});

            // Alice only has 27 Alice-tokens
            await expect(
                contract.call('swap', [alice.address, bob.address, '28'], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('swaps a token for a never-minted token', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // Alice's balance is now 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');

            // Alice is now initialized
            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['1']);

            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['27']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10027']);

            // Swap 15 Alice-tokens for the equivalent amount of Bob-tokens
            // \int_27^12 154x dx = -45045
            // \int_0^t 154x dx = 45045 has solution t = 24.187
            // Since the contract rounds down, the actual value is 24
            // In other words, the contract will swap 15 Alice-tokens for 24 Bob-tokens
            await contract.call('swap', [alice.address, bob.address, '15'], {caller: alice});
            await alice.receiveAll();

            // 27 Alice-tokens - 15 = 12
            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10012']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10012']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['12']);

            // Alice now has 24 Bob-tokens
            expect(await contract.query('balanceOf', [bob.address, alice.address], {caller: alice})).to.be.deep.equal(['24']);
            // Bob's balance didn't change
            expect(await contract.query('balanceOf', [bob.address, bob.address], {caller: bob})).to.be.deep.equal(['10000']);

            expect(await contract.query('totalSupply', [bob.address], {caller: bob})).to.be.deep.equal(['10024']);
            expect(await contract.query('tradableSupply', [bob.address], {caller: bob})).to.be.deep.equal(['24']);

            // The new Bob-tokens are worth \int_0^24 154x dx = 44352
            // In other words, Alice didn't receive enough Bob-tokens to cover the full swap amount
            // The difference (45045 - 44352 = 693) is refunded to Alice
            // Contract's balance is now 56133 - 693 = 55440
            expect(await contract.balance()).to.be.deep.equal('55440');
            // Alice's balance is now 943867 + 693 = 944560
            expect(await alice.balance()).to.be.deep.equal('944560');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '27', amount: '27'
                }, // Alice-token minted by Alice
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '15', amount: '15'
                }, // Alice-token burned by Alice
                {
                    '0': bob.address, tokenId: bob.address,
                    '1': alice.address, owner: alice.address,
                    '2': '24', amount: '24'
                } // Bob-token minted by Alice
            ]);
        });

        it('swaps a token after someone else mints', async function() {
            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10000']);

            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: bob, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // 1000000 - 56133 = 943867
            expect(await bob.balance()).to.be.deep.equal('943867');

            expect(await contract.query('ownerHasCollectedSupply', [alice.address])).to.be.deep.equal(['0']);

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10000']);
            expect(await contract.query('balanceOf', [alice.address, bob.address], {caller: alice})).to.be.deep.equal(['27']);
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['27']);
            // 154 * 27 = 4158
            expect(await contract.query('currentPrice', [alice.address], {caller: alice})).to.be.deep.equal(['4158']);

            // \int_27^12 154x dx = -45045
            // \int_0^t 154x dx = 45045 has solution t = 24.187
            // Since the contract rounds down, the actual value is 24
            // In other words, the contract will swap 15 Alice-tokens for 24 Bob-tokens
            await contract.call('swap', [alice.address, bob.address, '15'], {caller: alice});
            await alice.receiveAll();

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['9985']);
            // 27 Alice-tokens - 15 = 12
            expect(await contract.query('totalSupply', [alice.address], {caller: alice})).to.be.deep.equal(['10012']);
            expect(await contract.query('tradableSupply', [alice.address], {caller: alice})).to.be.deep.equal(['12']);

            // Alice now has 24 Bob-tokens
            expect(await contract.query('balanceOf', [bob.address, alice.address], {caller: alice})).to.be.deep.equal(['24']);

            // Bob's balances didn't change
            expect(await contract.query('balanceOf', [alice.address, bob.address], {caller: bob})).to.be.deep.equal(['27']);
            expect(await contract.query('balanceOf', [bob.address, bob.address], {caller: bob})).to.be.deep.equal(['10000']);

            expect(await contract.query('totalSupply', [bob.address], {caller: bob})).to.be.deep.equal(['10024']);
            expect(await contract.query('tradableSupply', [bob.address], {caller: bob})).to.be.deep.equal(['24']);

            // The new Bob-tokens are worth \int_0^24 154x dx = 44352
            // In other words, Alice didn't receive enough Bob-tokens to cover the full swap amount
            // The difference (45045 - 44352 = 693) is refunded to Alice
            // Contract's balance is now 56133 - 693 = 55440
            expect(await contract.balance()).to.be.deep.equal('55440');
            // Alice's balance is now 0 + 693 = 693
            expect(await alice.balance()).to.be.deep.equal('693');

            const events = await contract.getPastEvents('allEvents', {fromHeight: 0, toHeight: 100});
            checkEvents(events, [
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': bob.address, owner: bob.address,
                    '2': '27', amount: '27'
                }, // Token minted by Bob
                {
                    '0': alice.address, tokenId: alice.address,
                    '1': alice.address, owner: alice.address,
                    '2': '15', amount: '15'
                }, // Alice-token burned by Alice
                {
                    '0': bob.address, tokenId: bob.address,
                    '1': alice.address, owner: alice.address,
                    '2': '24', amount: '24'
                } // Bob-token minted by Alice
            ]);
        });
    });

    describe('simulateSwap', function() {
        it('simulates a swap of two tokens', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            expect(await contract.balance()).to.be.deep.equal('56133');
            // Alice's balance is now 1000000 - 56133 = 943867
            expect(await alice.balance()).to.be.deep.equal('943867');

            // Mint 89 Bob-tokens
            // \int_0^89 154x dx = 609917
            await contract.call('mint', [bob.address, 89], {caller: bob, amount: '609917'});
            // Contract's balance is now 56133 + 609917 = 666050
            expect(await contract.balance()).to.be.deep.equal('666050');
            // Bob's balance is now 1000000 - 609917 = 390083
            expect(await bob.balance()).to.be.deep.equal('390083');

            // Swap 15 Alice-tokens for the equivalent amount of Bob-tokens
            // The new Bob-tokens are worth \int_89^92 154x dx = 41811
            // In other words, Alice didn't receive enough Bob-tokens to cover the full swap amount
            // The difference (45045 - 41811 = 3234) is refunded to Alice
            expect(await contract.query('simulateSwap', [alice.address, bob.address, '15'], {caller: alice})).to.be.deep.equal(['3', '3234']);
        });

        it('fails to simulate a swap of more tokens than the tradable amount', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            // Mint 27 Alice-tokens
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // Mint 89 Bob-tokens
            // \int_0^89 154x dx = 609917
            await contract.call('mint', [bob.address, 89], {caller: bob, amount: '609917'});

            // Only 27 Alice-tokens are tradable
            await expect(
                contract.call('simulateSwap', [alice.address, bob.address, '28'], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('mintCost', function() {
        it('computes the cost of a mint', async function () {
            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            expect(await contract.query('mintCost', [alice.address, 27], {caller: alice})).to.be.deep.equal(['56133']);
        });
    });

    describe('mintAmount', function() {
        it('computes the mint amount', async function () {
            // Mint 27 tokens
            // \int_0^27 154x dx = 56133
            expect(await contract.query('mintAmount', [alice.address, 56133], {caller: alice})).to.be.deep.equal(['27']);
        });
    });

    describe('burnRevenue', function() {
        it('computes the burn revenue', async function () {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // \int_27^25 154x dx = -8008
            expect(await contract.query('burnRevenue', [alice.address, 2], {caller: alice})).to.be.deep.equal(['8008']);
        });

        it('fails to compute the burn revenue of a non-existent token', async function () {
            await expect(
                contract.call('burnRevenue', [alice.address, 2], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to compute the burn revenue that would cause the supply to go below the minimum', async function () {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // \int_27^0 154x dx = -56133
            // We will use 28
            await expect(
                contract.call('burnRevenue', [alice.address, 28], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('burnAmount', function() {
        it('computes the burn amount', async function () {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            await alice.receiveAll();

            // \int_27^25 154x dx = -8008
            expect(await contract.query('burnAmount', [alice.address, '8008'], {caller: alice})).to.be.deep.equal(['2']);
        });

        it('fails to compute the burn amount of a non-existent token', async function () {
            await expect(
                contract.call('burnAmount', [alice.address, 8008], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });

        it('fails to compute the burn amount that would cause the supply to go below the minimum', async function () {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            // \int_27^0 154x dx = -56133
            // \int_28^0 154x = -60368
            // We will use 60368
            await expect(
                contract.call('burnAmount', [alice.address, 60368], {caller: alice})
            ).to.eventually.be.rejectedWith('revert');
        });
    });

    describe('topHolders', function() {
        it('computes top holders', async function () {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            const charlie = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            const dave = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
            await deployer.sendToken(dave.address, '1000000');
            await dave.receiveAll();
            
            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            // \int_27^39 154x dx = 60984
            await contract.call('mint', [alice.address, 12], {caller: bob, amount: '60984'});
            // \int_39^41 154x dx = 12320
            await contract.call('mint', [alice.address, 2], {caller: charlie, amount: '12320'});
            // \int_41^44 154x dx = 19635
            await contract.call('mint', [alice.address, 3], {caller: dave, amount: '19635'});

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['10027']);
            expect(await contract.query('balanceOf', [alice.address, bob.address], {caller: bob})).to.be.deep.equal(['12']);
            expect(await contract.query('balanceOf', [alice.address, charlie.address], {caller: charlie})).to.be.deep.equal(['2']);
            expect(await contract.query('balanceOf', [alice.address, dave.address], {caller: dave})).to.be.deep.equal(['3']);

            expect(await contract.query('numHolders', [alice.address])).to.be.deep.equal(['4']);

            expect(await contract.query('topHolders', [alice.address, 4], {caller: alice})).to.be.deep.equal([[
                alice.address,
                bob.address,
                dave.address,
                charlie.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 2], {caller: alice})).to.be.deep.equal([[
                alice.address,
                bob.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 5], {caller: alice})).to.be.deep.equal([[
                alice.address,
                bob.address,
                dave.address,
                charlie.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 0], {caller: alice})).to.be.deep.equal([[]]);
        });
        it('computes top holders for a token where some holders have transferred their assets', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            const charlie = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            const dave = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
            await deployer.sendToken(dave.address, '1000000');
            await dave.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});
            // \int_27^39 154x dx = 60984
            await contract.call('mint', [alice.address, 12], {caller: bob, amount: '60984'});
            // \int_39^41 154x dx = 12320
            await contract.call('mint', [alice.address, 2], {caller: charlie, amount: '12320'});

            await contract.call('transfer', [alice.address, charlie.address, 10026], {caller: alice});
            await contract.call('transfer', [alice.address, dave.address, 12], {caller: bob});

            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['1']);
            expect(await contract.query('balanceOf', [alice.address, bob.address], {caller: bob})).to.be.deep.equal(['0']);
            expect(await contract.query('balanceOf', [alice.address, charlie.address], {caller: charlie})).to.be.deep.equal(['10028']);
            expect(await contract.query('balanceOf', [alice.address, dave.address], {caller: dave})).to.be.deep.equal(['12']);

            expect(await contract.query('numHolders', [alice.address])).to.be.deep.equal(['3']);

            expect(await contract.query('topHolders', [alice.address, 4], {caller: alice})).to.be.deep.equal([[
                charlie.address,
                dave.address,
                alice.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 2], {caller: alice})).to.be.deep.equal([[
                charlie.address,
                dave.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 5], {caller: alice})).to.be.deep.equal([[
                charlie.address,
                dave.address,
                alice.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 0], {caller: alice})).to.be.deep.equal([[]]);
        });

        it('computes top holders for a token without holders', async function() {
            expect(await contract.query('numHolders', [alice.address])).to.be.deep.equal(['0']);
            expect(await contract.query('topHolders', [alice.address, 2], {caller: alice})).to.be.deep.equal([[
            ]]);
        });

        it('computes top holders for a token with a single holder', async function() {
            await deployer.sendToken(alice.address, '1000000');
            await alice.receiveAll();

            await deployer.sendToken(bob.address, '1000000');
            await bob.receiveAll();

            const charlie = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);

            await deployer.sendToken(charlie.address, '1000000');
            await charlie.receiveAll();

            const dave = vite.newAccount(config.networks.local.mnemonic, mnemonicCounter++);
            await deployer.sendToken(dave.address, '1000000');
            await dave.receiveAll();

            // \int_0^27 154x dx = 56133
            await contract.call('mint', [alice.address, 27], {caller: alice, amount: '56133'});

            await contract.call('transfer', [alice.address, bob.address, 10027], {caller: alice});
            
            expect(await contract.query('balanceOf', [alice.address, alice.address], {caller: alice})).to.be.deep.equal(['0']);
            expect(await contract.query('balanceOf', [alice.address, bob.address], {caller: bob})).to.be.deep.equal(['10027']);

            expect(await contract.query('numHolders', [alice.address])).to.be.deep.equal(['1']);

            expect(await contract.query('topHolders', [alice.address, 4], {caller: alice})).to.be.deep.equal([[
                bob.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 2], {caller: alice})).to.be.deep.equal([[
                bob.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 5], {caller: alice})).to.be.deep.equal([[
                bob.address
            ]]);

            expect(await contract.query('topHolders', [alice.address, 0], {caller: alice})).to.be.deep.equal([[]]);
        });
    });
});