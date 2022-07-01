// import { expect } from "chai";
import * as vuilder from "@vite/vuilder";
import config from "./vite.config.json";
import { constant, abi } from "@vite/vitejs";

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

let provider: any;
let deployer: any;

interface DeployOpt {
  responseLatency?: number,
  votingPeriod?: number
  noAutoJoin?: boolean
}


async function deploySpace(opt: DeployOpt = {}) {
  const compiledContracts = await vuilder.compile("Space.solpp");

  const space = compiledContracts.Space;
  space.setDeployer(deployer).setProvider(provider);
  await space.deploy({ responseLatency: opt.responseLatency ?? 1, params: ["Space 1", constant.Vite_TokenId, 200, opt.votingPeriod ?? 1] })
  console.log(`deployed space ${space.address}`)
  if (!opt.noAutoJoin) {
    await space.call("join", [], {})
  }

  return space

}

describe("test Space", () => {
  before(async () => {
    provider = vuilder.newProvider(config.networks.local.http);
    deployer = vuilder.newAccount(config.networks.local.mnemonic, 0, provider);
    console.log('deployer', deployer.address);
  })


  it("test proposal", async () => {
    const space = await deploySpace()

    await space.call("propose", [[], [], [], "hello title", "hello desc"], {})

    const [spaceName] = await space.query("name", [])
    expect(spaceName).to.be.equal("Space 1")

    const [id, title, description, proposer, _voteStart, _voteEnd, executed, canceled] = await space.query("getProposal", [1])
    expect(id).to.be.equal("1") // 
    expect(title).to.be.equal("hello title")
    expect(proposer).to.be.equal(deployer.address)
    expect(executed).to.be.equal("0")
    expect(canceled).to.be.equal("0")
  })

  // TODO: view methods not set block.timestamp correctly, did not find a time travel method for test
  describe("state", () => {

    it("success", async () => {
      const space = await deploySpace({ votingPeriod: 10 })
      await space.call("propose", [[], [], [], "hello title", "hello desc"], {})
      const events = await space.getPastEvents("ProposalCreated", {})
      const { proposalId, voteStart, voteEnd } = events[0]!.returnValues!
      const id = parseInt(proposalId);


      let state = await space.query("state", [id, voteStart])
      expect(state[0]).to.be.equal("1"); // Active
      {
        let result = await space.query("isMember", [deployer.address])
        console.log("isMember", result)
      }

      await space.call("castVote", [id, 1], { amount: "200" })

      state = await space.query("state", [id, voteEnd])

      expect(state[0]).to.be.equal("4"); // Successed

      // await space.call("execute", [id], {})
      // state = await space.query("state", [id, voteEnd + 1])
      // expect(state[0]).to.be.equal("7"); // Executed
    })

    it("defeat", async () => {
      const space = await deploySpace({ votingPeriod: 10 })
      await space.call("propose", [[], [], [], "hello title", "hello desc"], {})
      const events = await space.getPastEvents("ProposalCreated", {})
      const { proposalId, voteStart, voteEnd } = events[0]!.returnValues!
      const id = parseInt(proposalId)

      await space.call("castVote", [id, 0], { amount: "200" })

      let state = await space.query("state", [id, voteEnd])
      expect(state[0]).to.be.equal("3"); // Defeated

      // await space.call("cancel", [id], {})
      // state = await space.query("state", [id, voteEnd + 1])
      // expect(state[0]).to.be.equal("2"); // Canceled
    })
  })


  describe("votes", () => {
    let space: any;
    before(async () => {
      space = await deploySpace({ votingPeriod: 50 })
      await space.call("propose", [[], [], [], "hello title", "hello desc"], {})
    })

    it("all is zero before vote", async () => {
      const [againstVotes, forVotes] = await space.query("votes", [1]);
      expect(againstVotes).to.be.equal("0")
      expect(forVotes).to.be.equal("0")
    })

    it("vote against", async () => {
      await space.call("castVote", [1, 0], { amount: "10" })
      const [againstVotes, _forVotes] = await space.query("votes", [1]);
      expect(againstVotes).to.be.equal("10")
    })

    it("vote for", async () => {
      const alice: vuilder.UserAccount = vuilder.newAccount(config.networks.local.mnemonic, 1, provider);

      await deployer.sendToken(alice.address, '200');
      await alice.receiveAll();

      await space.call("join", [], { caller: alice })
      await space.call("castVote", [1, 1], { caller: alice, amount: "20" })
      const [_againstVotes, forVotes] = await space.query("votes", [1]);
      expect(forVotes).to.be.equal("20")
    })

    it("vote again will fail", async () => {
      await expect(
        space.call("castVote", [1, 2], { amount: "10" })
      ).to.eventually.be.rejectedWith("revert");
    })

    // it("vote with invalid token will fail", async () => {
    //   await expect(
    //     space.call("castVote", [1, 2], { tokenId: "tti_251a3e67a41b5ea2373936c8", amount: "1" })
    //   ).to.eventually.be.rejectedWith("revert");
    // })

    it("vote with invalid amount", async () => {
      const bob: vuilder.UserAccount = vuilder.newAccount(config.networks.local.mnemonic, 1, provider);
      await deployer.sendToken(bob.address, '100');
      await bob.receiveAll();
      let error: any
      try {
        await space.call("castVote", [1, 1], { caller: bob, amount: "200" })
      } catch (e) {
        error = e
      }
      expect(error.message).to.be.equal("revert, methodName: castVote")
    })
  })


  describe("withdraw", () => {
    let space: any;
    before(async () => {
      space = await deploySpace({ votingPeriod: 50 })
      await space.call("propose", [[], [], [], "hello title", "hello desc"], {})
    })


    it("can withdraw after cancel", async () => {
      const bob: vuilder.UserAccount = vuilder.newAccount(config.networks.local.mnemonic, 6, provider);
      await deployer.sendToken(bob.address, '100');
      await bob.receiveAll();

      await space.call("join", [], { caller: bob })
      await space.call("castVote", [1, 1], { caller: bob, amount: "50" })

      // TODO: test  state

      // can not withdraw if not vote before
      await expect(
        space.call("voteWithdraw", [1], {})
      ).to.eventually.be.rejectedWith("revert");

      let balance = await bob.balance()
      expect(balance).to.be.equal("50")

      await space.call("cancel", [1], {})

      await space.call("voteWithdraw", [1], { caller: bob })
      await bob.receiveAll();
      balance = await bob.balance()
      expect(balance).to.be.equal("100")

      // double withdraw fail
      await expect(
        space.call("voteWithdraw", [1], { caller: bob })
      ).to.eventually.be.rejectedWith("revert");
    })
  })


  describe("proposal paging", () => {
    let space: any;
    before(async () => {
      space = await deploySpace()
    })

    it("paging", async () => {
      for (let i = 0; i < 5; i++) {
        await space.call("propose", [[], [], [], "title" + i, "hello desc"], {})
      }

      const pageSize = 2

      // page 1, page size: 2
      {
        const page = 1
        const [ids] = await space.query("getProposalsPaging", [(page - 1) * pageSize, pageSize])
        expect(ids.length).to.be.equal(2)
        expect(ids[0]).to.be.equal("1")
        expect(ids[1]).to.be.equal("2")
      }

      // // page 3, page size: 2
      {
        const page = 3
        const [ids] = await space.query("getProposalsPaging", [(page - 1) * pageSize, pageSize])
        expect(ids.length).to.be.equal(1)
        expect(ids[0]).to.be.equal("5")
      }
    })
  })


  describe("member", () => {
    it("join or leave", async () => {
      let space = await deploySpace({ noAutoJoin: true })
      const bob: vuilder.UserAccount = vuilder.newAccount(config.networks.local.mnemonic, 1, provider);
      await deployer.sendToken(bob.address, '100');
      await bob.receiveAll();

      {
        let result = await space.query("isMember", [deployer.address])
        expect(result[0]).to.be.equal("0")
        result = await space.query("memberCount", [])
        expect(result[0]).to.be.equal("0")
      }

      await space.call("join", [], {})
      await space.call("join", [], { caller: bob })

      {
        let result = await space.query("isMember", [deployer.address])
        expect(result[0]).to.be.equal("1")
        result = await space.query("isMember", [bob.address])
        expect(result[0]).to.be.equal("1")
        result = await space.query("memberCount", [])
        expect(result[0]).to.be.equal("2")
      }

      await space.call("leave", [], { caller: bob })

      {
        let result = await space.query("isMember", [deployer.address])
        expect(result[0]).to.be.equal("1")
        result = await space.query("isMember", [bob.address])
        expect(result[0]).to.be.equal("0")
        result = await space.query("memberCount", [])
        expect(result[0]).to.be.equal("1")
      }



    })

  })

})