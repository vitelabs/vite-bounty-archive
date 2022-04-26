import chai, { expect } from "chai";
import config from "./vite.config.json";
const vite = require("@vite/vuilder");

const should = chai.should();

const VITE = "tti_5649544520544f4b454e6e40";

describe("TokenAuction", () => {
  let provider;
  let deployer;
  let compiledContracts;
  let creator;
  let alice, bob; //, carol, dave;

  before(async () => {
    provider = vite.newProvider(config.networks.local.http);
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);
    alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    // carol = vite.newAccount(config.networks.local.mnemonic, 3, provider);
    // dave = vite.newAccount(config.networks.local.mnemonic, 4, provider);

    await deployer.sendToken(alice.address, "1000000000000000000");
    // await deployer.sendToken(bob.address, "100000000000000000000000");
    // await deployer.sendToken(carol.address, "10000000000000000000000");
    // await deployer.sendToken(dave.address, "10000000000000000000000");

    await alice.receiveAll();
    // await bob.receiveAll();
    // await carol.receiveAll();
    // await dave.receiveAll();
  });

  beforeEach(async () => {
    compiledContracts = await vite.compile("CreatorToken.solpp");

    // should exist
    compiledContracts.should.have.property("CreatorToken");

    // should deploy
    creator = compiledContracts.CreatorToken;
    creator.setDeployer(deployer).setProvider(provider);
    await creator.deploy({ responseLatency: 1 });
    should.exist(creator.address);
    creator.address.should.be.a("string");
  });

  it("should calculate correct mint price", async () => {
    const calcPrice = await creator.query("calculateMintPrice", [
      alice.address,
      "4",
    ]);
    const expectedPrice = "40016";
    calcPrice[0].should.be.equal(expectedPrice);
  });

  it("should mint tokens", async () => {
    const aliceInitialBalance = BigInt(await alice.balance());
    await creator.call("mint", [alice.address, "4"], {
      caller: alice,
      amount: "40016",
    });
    BigInt(await alice.balance()).should.be.equal(
      aliceInitialBalance - 40016n
    );
    const supply = await creator.query("tokenSupply", [alice.address]);
    supply[0].should.be.equal("10004");
  });

  it("should calculate correct burn price", async () => {
    await creator.call("mint", [alice.address, "5"], {
      caller: alice,
      amount: "50025",
    });
    const calcPrice = await creator.query("calculateBurnRevenue", [
      alice.address,
      "4",
    ]);
    calcPrice[0].should.be.equal("40024");
  });

  it("should burn tokens", async () => {
    const aliceInitialBalance = BigInt(await alice.balance());
    await creator.call("mint", [alice.address, "5"], {
      caller: alice,
      amount: "50025",
    });
    BigInt(await alice.balance()).should.be.equal(
      aliceInitialBalance - 50025n
    );

    await creator.call("burn", [alice.address, "4"], { caller: alice });
    await alice.receiveAll();
    BigInt(await alice.balance()).should.be.equal(
      aliceInitialBalance - 10001n
    );

    const supply = await creator.query("tokenSupply", [alice.address]);
    supply[0].should.be.equal("10001");
  });

  it("should calculate correct amount from burn revenue", async () => {
    await creator.call("mint", [alice.address, "5"], {
      caller: alice,
      amount: "50025",
    });
    const calcPrice = await creator.query("calculateAmountFromBurnRevenue", [
      alice.address,
      "40026",
    ]);
    calcPrice[0].should.be.equal("4");
    // excess
    calcPrice[1].should.be.equal("2");
  });

  it("should calculate correct amount from mint price", async () => {
    const calcPrice = await creator.query("calculateAmountFromMintPrice", [
      alice.address,
      "40020",
    ]);
    calcPrice[0].should.be.equal("4");
    // excess
    calcPrice[1].should.be.equal("4");
  });

  it("should swap tokens correctly", async () => {
    const aliceInitialBalance = BigInt(await alice.balance());
    await creator.call("mint", [alice.address, "5"], {
      caller: alice,
      amount: "50025",
    });
    await creator.call("swap", [alice.address, bob.address, "4"], {
      caller: alice,
    });
    await alice.receiveAll();

    BigInt(await alice.balance()).should.be.equal(
      aliceInitialBalance - 50025n + 8n
    );

    // confirm token supplies
    const supply1 = await creator.query("tokenSupply", [alice.address]);
    supply1[0].should.be.equal("10001");
    const supply2 = await creator.query("tokenSupply", [bob.address]);
    supply2[0].should.be.equal("10004");
  });
});
