import chai from "chai";
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

describe("JointAccount", () => {
  let provider;
  let deployer: UserAccount;

  let compiledContracts: ContractMap;
  let account: Contract, manager: Contract;
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
    dave = vite.newAccount(config.networks.local.mnemonic, 4, provider);
    ella = vite.newAccount(config.networks.local.mnemonic, 5, provider);

    await deployer.sendToken(alice.address, "1000000000000000000000");
    await deployer.sendToken(bob.address, "1");
    await deployer.sendToken(carol.address, "1");
    await deployer.sendToken(dave.address, "1");
    await deployer.sendToken(ella.address, "1");

    await alice.receiveAll();
    await bob.receiveAll();
    await carol.receiveAll();
    await dave.receiveAll();
    await ella.receiveAll();
  });

  async function compileContracts(...sources: string[]): Promise<ContractMap> {
    let all: ContractMap = {};

    for (let source of sources) {
      all = Object.assign(all, await vite.compile(source));
    }

    return all;
  }

  beforeEach(async () => {
    compiledContracts = await compileContracts(
      "JointAccount.solpp",
      "JointAccountManager.solpp"
    );

    // should exist
    compiledContracts.should.have.property("JointAccount");
    compiledContracts.should.have.property("JointAccountManager");

    // should deploy
    manager = compiledContracts.JointAccountManager;
    manager.setDeployer(deployer).setProvider(provider);
    await manager.deploy({ responseLatency: 1 });
    should.exist(manager.address);
    manager.address!.should.be.a("string");

    account = compiledContracts.JointAccount;
    account.setDeployer(alice).setProvider(provider);
    await account.deploy({
      responseLatency: 1,
      params: [
        manager.address!,
        "2",
        // @ts-ignore
        [bob.address, carol.address, dave.address],
      ],
    });
    should.exist(account.address);
    account.address!.should.be.a("string");
    await manager.waitForHeight(2);
  });

  it("should have a joint account registered", async () => {
    const result: string[][] | null = await manager.query("getAccounts", []);
    if (result === null) throw new Error("No result");

    should.exist(result);
    result[0].should.contain(account.address);
  });

  it("should reject proposal to spend more than balance", async () => {
    await account
      .call("createProposal", ["20000", dave.address, VITE], { caller: alice })
      .should.be.rejectedWith("revert");
  });

  async function createProposal(
    amount: number,
    destination: string,
    tokenType?: string,
    maker?: UserAccount
  ): Promise<{ amount: number; destination: string; tokenType?: string }> {
    await deployer.sendToken(account.address!, amount.toFixed(0));
    await account.waitForHeight(2);
    await account.call(
      "createProposal",
      [amount.toFixed(), destination, tokenType ?? VITE],
      { caller: maker ?? alice }
    );

    return { amount, destination, tokenType };
  }

  it("should create proposal when there's enough balance", async () => {
    await createProposal(20000, dave.address);

    const proposal = await account.query("getProposal", []);
    if (proposal === null) throw new Error("No result");

    should.equal(proposal[0], "20000");
    should.equal(proposal[1], dave.address);
    should.equal(proposal[2], VITE);
  });

  it("should increment votes on member approve", async () => {
    await createProposal(20000, dave.address);
    await account.call("approve", [], { caller: bob });

    const voteCount = await account.query("positiveVoteCount", []);
    if (voteCount == null) throw new Error("No result");

    should.equal(voteCount[0], "1");
  });

  it("should not allow non-member to vote", async () => {
    await createProposal(20000, dave.address);
    await account
      .call("approve", [], { caller: ella })
      .should.be.rejectedWith("revert");
  });

  it("should not allow double votes", async () => {
    await createProposal(20000, dave.address);
    await account.call("approve", [], { caller: bob });
    await account
      .call("approve", [], { caller: bob })
      .should.be.rejectedWith("revert");
  });

  it("should allow any member replace proposal", async () => {
    await createProposal(20000, dave.address);

    let proposal = await account.query("getProposal", []);
    if (proposal === null) throw new Error("No result");

    should.equal(proposal[0], "20000");
    should.equal(proposal[1], dave.address);
    should.equal(proposal[2], VITE);

    await createProposal(10000, ella.address);

    proposal = await account.query("getProposal", []);
    if (proposal === null) throw new Error("No result");

    should.equal(proposal[0], "10000");
    should.equal(proposal[1], ella.address);
    should.equal(proposal[2], VITE);
  });

  it("should reset votes on replace proposal", async () => {
    await createProposal(20000, dave.address);

    await account.call("approve", [], { caller: bob });

    let voteCount = await account.query("positiveVoteCount", []);
    if (voteCount == null) throw new Error("No result");

    should.equal(voteCount[0], "1");

    await createProposal(10000, ella.address);

    voteCount = await account.query("positiveVoteCount", []);
    if (voteCount == null) throw new Error("No result");

    should.equal(voteCount[0], "0");
  });

  it("should prevent executing proposal without enough votes", async () => {
    await createProposal(20000, dave.address);

    await account.call("approve", [], { caller: bob });
    await account
      .call("executeMotion", [], { caller: bob })
      .should.be.rejectedWith("revert");
  });

  it("should allow executing proposal with enough votes", async () => {
    await createProposal(20000, dave.address);

    await account.call("approve", [], { caller: bob });
    await account.call("approve", [], { caller: carol });
    await account.call("approve", [], { caller: dave });

    await account.call("executeMotion", [], { caller: bob });
    await dave.receiveAll();
    should.equal(await dave.balance(), "20001");
  });
});
