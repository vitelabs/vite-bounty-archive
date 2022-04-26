import chai, { expect } from "chai";
import config from "./vite.config.json";
import * as vite from "@vite/vuilder/lib/vite";
import cap from "chai-as-promised";
import { Contract } from "@vite/vuilder/lib/contract";
import { UserAccount } from "@vite/vuilder/lib/user";
chai.use(cap);
const should = chai.should();

const VITE = "tti_5649544520544f4b454e6e40";
type ContractMap = {
  [key: string]: Contract;
};

describe("SunkCost", () => {
  let provider;
  let deployer: UserAccount;

  let compiledContracts: ContractMap;
  let sunk: Contract;
  let alice: UserAccount,
    bob: UserAccount,
    carol: UserAccount,
    dave: UserAccount,
    ella: UserAccount;

  before(async () => {
    provider = vite.newProvider(config.networks.local.http);
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);
    alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    carol = vite.newAccount(config.networks.local.mnemonic, 3, provider);
    // dave = vite.newAccount(config.networks.local.mnemonic, 4, provider);
    // ella = vite.newAccount(config.networks.local.mnemonic, 5, provider);

    await deployer.sendToken(alice.address, "1000000000000000000000");
    await deployer.sendToken(bob.address, "200000");
    await deployer.sendToken(carol.address, "200000");
    // await deployer.sendToken(dave.address, "1");
    // await deployer.sendToken(ella.address, "1");

    await alice.receiveAll();
    await bob.receiveAll();
    await carol.receiveAll();
    // await dave.receiveAll();
    // await ella.receiveAll();
  });

  async function compileContracts(...sources: string[]): Promise<ContractMap> {
    let all: ContractMap = {};

    for (let source of sources) {
      all = Object.assign(all, await vite.compile(source));
    }

    return all;
  }

  beforeEach(async () => {
    compiledContracts = await compileContracts("SunkCost.solpp");

    // should exist
    compiledContracts.should.have.property("SunkCostGame");

    sunk = compiledContracts.SunkCostGame;
    sunk.setDeployer(deployer).setProvider(provider);
    await sunk.deploy({
      responseLatency: 1,
      params: ["2000"],
    });
    should.exist(sunk.address);
    sunk.address!.should.be.a("string");
  });

  type PotCreateParams = {
    maxTimer: number;
    increment: number;
    burn: number;
    extension: number;
    initialTimer: number;
  };

  async function createPot({
    burn,
    extension,
    increment,
    initialTimer,
    maxTimer,
  }: PotCreateParams): Promise<{}> {
    await sunk.call(
      "createPot",
      [initialTimer, maxTimer, increment, extension, burn].map((e) =>
        typeof e === "number" ? e.toFixed(0) : e
      ),
      { caller: alice, amount: "2000" }
    );

    return {};
  }

  it("should create a pot", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });
    expect(await sunk.query("potsCount", [])).to.deep.equal(["1"]);
  });

  it("should return correct next price and pot owner", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    expect(await sunk.query("getPotOwner", ["0"])).to.deep.equal([
      alice.address,
    ]);
    expect(await sunk.query("nextPrice", ["0"])).to.deep.equal(["2002"]);
  });

  it("should buy-in to pot", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    await sunk.call("buyIn", ["0"], {
      caller: bob,
      amount: "2002",
    });

    expect(await sunk.query("getPotOwner", ["0"])).to.deep.equal([bob.address]);
    expect(await sunk.query("getPotPrice", ["0"])).to.deep.equal(["2002"]);
    expect(await sunk.query("nextPrice", ["0"])).to.deep.equal(["2004"]);
  });

  it("should buy-in to pot and reject expired buy-ins", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    await sunk.call("buyIn", ["0"], {
      caller: bob,
      amount: "2002",
    });
    // pot expiry should be in 38 seconds

    await sunk.call("advanceTime", ["38"], {
      caller: bob,
    });

    await sunk
      .call("buyIn", ["0"], { caller: bob, amount: "2002" })
      .should.be.rejectedWith("revert");
  });

  it("should support buy-in wars", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    await sunk.call("buyIn", ["0"], {
      caller: bob,
      amount: "2002",
    });

    await sunk.call("buyIn", ["0"], {
      caller: alice,
      amount: "2004",
    });

    await sunk.call("buyIn", ["0"], {
      caller: bob,
      amount: "2006",
    });

    await sunk.call("buyIn", ["0"], {
      caller: alice,
      amount: "2008",
    });

    // let's expire the pot
    await sunk.call("advanceTime", ["36"], {
      caller: alice,
    });
    // too bad bob
    await sunk
      .call("buyIn", ["0"], { caller: bob, amount: "2010" })
      .should.be.rejectedWith("revert");

    expect(await sunk.query("getPotOwner", ["0"])).to.deep.equal([
      alice.address,
    ]);
    expect(await sunk.query("getPotPrice", ["0"])).to.deep.equal(["2008"]);
    expect(await sunk.query("nextPrice", ["0"])).to.deep.equal(["2010"]);
  });

  it("should reject inadequate buy-ins", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    await sunk
      .call("buyIn", ["0"], {
        caller: bob,
        amount: "2000",
      })
      .should.be.rejectedWith("revert");
  });

  it("should reject claim before expiry", async () => {
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    await sunk.call("buyIn", ["0"], {
      caller: bob,
      amount: "2002",
    });

    await sunk
      .call("claim", ["0"], { caller: bob })
      .should.be.rejectedWith("revert");
  });

  it("should reject claim from non-winner and accept from winner", async () => {
    await bob.receiveAll();
    const bobInitialBalance = BigInt(await bob.balance());
    
    await createPot({
      burn: 0,
      extension: 3,
      increment: 2,
      initialTimer: 30,
      maxTimer: 35,
    });

    await sunk.call("buyIn", ["0"], {
      caller: bob,
      amount: "2002",
    });

    // let's expire the pot
    await sunk.call("advanceTime", ["36"], {
      caller: alice,
    });

    await sunk
      .call("claim", ["0"], { caller: carol })
      .should.be.rejectedWith("revert");

    await sunk.call("claim", ["0"], { caller: bob });

    await bob.receiveAll();
    // bob's getting all his money back (200000) plus extra 2000 from initial buy-in
    expect(BigInt(await bob.balance())).to.equal(bobInitialBalance + 2000n);
  });
});
