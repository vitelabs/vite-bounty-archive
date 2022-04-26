import { describe } from "mocha";
import { expect } from "chai";
const vite = require('@vite/vuilder');
import config from "./vite.config.json";

describe("AuctionCreator",  function () {
	let crea;
	let tk;
	let auctioner;
	let bidder;
	let assetAddress = "tti_251a3e67a41b5ea2373936c8"
	const VITE = 'tti_5649544520544f4b454e6e40';

	beforeEach("deploy contract", async () => {
		let provider = vite.localProvider();
	    let deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);
		compiledContracts = await vite.compile('AuctionCreator.solpp');
	    expect(compiledContracts).to.have.property('AuctionCreator');
		crea = compiledContracts.AuctionCreator;
		crea.setDeployer(deployer).setProvider(provider);
		await crea.deploy({});

		auctioner = vite.newAccount(config.networks.local.mnemonic, 1, provider);
		bidder = vite.newAccount(config.networks.local.mnemonic, 2, provider);
		await deployer.sendToken(auctioner.address, '10000000');
	    await deployer.sendToken(bidder.address, '10000000');
	    await auctioner.receiveAll();
	    await bidder.receiveAll();

	});

	it("It should start auction", async function () {
		await crea.connect(auctioner).startAuction (assetAddress, 259200, 100 )
		let gh = (await crea.connect(auctioner).auctions(0));
		await expect (gh[3]).to.equal(auctioner.address);
		await expect (gh[4]).to.equal(assetAddress);
		//const setGreetingTx = await berry.setGreeting("Hola, mundo!");

		// wait until the transaction is mined
		//await setGreetingTx.wait();

		//expect(await berry.greet()).to.equal("Hola, mundo!");
	});
	it("should place bid", async function() {
		await crea.connect(auctioner).startAuction (assetAddress, 259200, 100 )
		await crea.connect(bidder).placeBid(0,20,2);
		let arr = await crea.connect(auctioner).bidsPerAuction(0,0);
		expect (arr[1].toNumber()).to.equal(20)
	})
	it ("should resolve auction", async function () {
		await crea.connect(auctioner).ResolveAuction(0);
		let gh = (await crea.connect(auctioner).auctions(0))
		expect(gh [5]).to.equal(2);
		expect(gh[1]).to.equal(190);
	})
});
