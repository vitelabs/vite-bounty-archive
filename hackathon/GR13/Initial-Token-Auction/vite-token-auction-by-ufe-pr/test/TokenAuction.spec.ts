import chai, { expect } from "chai";
import config from "./vite.config.json";
const vite = require("@vite/vuilder");
const { accountBlock, utils } = require("@vite/vitejs");

const { createAccountBlock, ReceiveAccountBlockTask } = accountBlock;
const should = chai.should();

const VITE = "tti_5649544520544f4b454e6e40";

describe("TokenAuction", () => {
  let provider;
  let deployer;
  let compiledContracts;
  let auction;
  let alice, bob, carol, dave;

  async function issueTokens(
    account,
    amount,
    decimals = 10
  ): Promise<{ tokenId: string }> {
    var api = provider;

    const { privateKey, address } = account;

    // Workaround to wait for block to get published
    // before fetching list of tokens again
    async function waitForTransaction() {
      const ReceiveTask = new ReceiveAccountBlockTask({
        address: address,
        privateKey: privateKey,
        provider,
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
      });

      ReceiveTask.start({
        checkTime: 5000,
        transctionNumber: 10,
      });
      return new Promise(f);
    }

    async function displayBalanceInfo(address_?) {
      const effectiveAddress = address_ || address;
      await api
        .getBalanceInfo(effectiveAddress)
        .then((e) =>
          console.log(
            "Balance info for " + effectiveAddress + " :\n",
            e.balance.balanceInfoMap
          )
        );
    }

    async function findOwnerToken() {
      const tokenInfoList = (
        await api.request("contract_getTokenInfoList", 0, 1000)
      ).tokenInfoList;
      return tokenInfoList.find(
        (e) =>
          e.tokenId !== "tti_5649544520544f4b454e6e40" && e.owner === address
      );
    }

    async function issueToken(amount, decimals) {
      const accBlk = createAccountBlock("issueToken", {
        address,
        tokenName: "Test Token",
        isReIssuable: true,
        maxSupply: amount,
        totalSupply: amount,
        isOwnerBurnOnly: false,
        decimals: decimals,
        tokenSymbol: "TEST",
      })
        .setProvider(api)
        .setPrivateKey(privateKey);
      const result = await accBlk.autoSend();

      console.log(amount, "tokens created:", result);
      console.log("Waiting for confirmation...");
      await waitForTransaction();
    }

    await displayBalanceInfo();

    let token = await findOwnerToken();
    if (!token) {
      await issueToken(amount, decimals);
      token = await findOwnerToken();
    }

    console.log("Token:", token);
    return token;
  }

  before(async () => {
    provider = vite.newProvider(config.networks.local.http);
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);
    alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    // carol = vite.newAccount(config.networks.local.mnemonic, 3, provider);
    // dave = vite.newAccount(config.networks.local.mnemonic, 4, provider);

    await deployer.sendToken(alice.address, "100000000000000000000000");
    await deployer.sendToken(bob.address, "100000000000000000000000");
    // await deployer.sendToken(carol.address, "10000000000000000000000");
    // await deployer.sendToken(dave.address, "10000000000000000000000");

    await alice.receiveAll();
    await bob.receiveAll();
    // await carol.receiveAll();
    // await dave.receiveAll();
  });

  async function createAuction({
    endTime = Date.now() + 60 * 60 * 24 * 1,
    numTokens = 2000000000,
    reserveUnitPrice = 2000000,
    auctionName = "test_auction",
    creator = alice,
    tokenDecimals = 10,
  }) {
    const token = await issueTokens(alice, numTokens, tokenDecimals);
    console.log("Creating auction:", auctionName);
    await auction.call(
      "createAuction",
      [
        reserveUnitPrice.toFixed(0),
        endTime,
        auctionName,
        tokenDecimals.toFixed(0),
      ],
      {
        caller: creator,
        amount: numTokens.toFixed(0),
        tokenId: token?.tokenId,
      }
    );
    console.log("Auction created");
    return { reserveUnitPrice, endTime, numTokens, token, auctionName };
  }

  beforeEach(async () => {
    compiledContracts = await vite.compile("TokenAuction.solpp");

    // should exist
    compiledContracts.should.have.property("TokenAuction");

    // should deploy
    auction = compiledContracts.TokenAuction;
    console.log("Auction:", auction);
    auction.setDeployer(deployer).setProvider(provider);
    await auction.deploy({ responseLatency: 1 });
    should.exist(auction.address);
    auction.address.should.be.a("string");
  });

  xit("should create auction", async () => {
    let endTime = Date.now() + 60 * 60 * 24 * 1;
    const token = await issueTokens(alice, "10000000000000000");
    await auction.call("createAuction", ["2000000", endTime, "test_auction"], {
      caller: alice,
      amount: "2000000000",
      tokenId: token.tokenId,
    });
    let events;

    // check Received event
    events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });
    should.exist(events);
    events.should.be.an("array");
    events.should.have.length.greaterThan(0);
    events[0].should.have.property("returnValues");
    events[0].returnValues.should.have.property("_id");
    events[0].returnValues._id.should.be.a("string");
    events[0].returnValues.should.have.property("_tti");
    events[0].returnValues._tti.should.be.a("string");
    should.equal(
      parseInt(events[0].returnValues._tti, 16),
      parseInt(utils.getOriginalTokenIdFromTokenId(token.tokenId), 16)
    );
    should.equal(events[0].returnValues._seller, alice.address);
    should.equal(events[0].returnValues._name, "test_auction");
    should.equal(events[0].returnValues._reservePrice, "2000000");
    should.equal(events[0].returnValues._endTime, endTime.toFixed(0));
    should.equal(events[0].returnValues._numTokens, "2000000000");
  });

  xit("should get single auction", async () => {
    const { reserveUnitPrice, endTime, numTokens, token, auctionName } =
      await createAuction({});

    // check Received event
    const events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });

    const auctionId = events[0].returnValues._id;
    const result = await auction.query("getAuction", [auctionId], {
      caller: alice,
    });
    result.should.be.an("array");
    result.should.deep.equal([
      auctionName,
      alice.address,
      reserveUnitPrice,
      endTime.toFixed(0),
      numTokens,
      token.tokenId,
      "0",
    ]);
  });

  xit("should place bid", async () => {
    await createAuction({});
    console.log("Well here we are");

    let events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });

    console.log("Got events");

    const auctionId = events[0].returnValues._id;
    console.log(auctionId);
    const unitPrice = 2000000;

    await auction.call("placeBid", [auctionId, unitPrice.toFixed(0)], {
      caller: alice,
      amount: (unitPrice * 7).toFixed(0),
      tokenId: VITE,
    });

    events = await auction.getPastEvents("BidPlaced", {
      fromHeight: 0,
      toHeight: 0,
    });
    should.exist(events);
    events.should.be.an("array");
    events.should.have.length.greaterThan(0);
    events[0].should.have.property("returnValues");
    events[0].returnValues.should.have.property("_id");
    events[0].returnValues._id.should.be.a("string");
    events[0].returnValues.should.have.property("_auctionId");
    events[0].returnValues._auctionId.should.be.a("string");
    events[0].returnValues.should.have.property("_bidder");
    events[0].returnValues._bidder.should.be.a("string");
    events[0].returnValues.should.have.property("_unitPrice");
    events[0].returnValues._unitPrice.should.equal(unitPrice.toFixed(0));
    events[0].returnValues.should.have.property("_viteAmount");
    events[0].returnValues._viteAmount.should.equal((unitPrice * 7).toFixed(0));
    events[0].returnValues.should.have.property("_timestamp");

    const bids = await auction.query("getBids", [auctionId]);
    console.log(bids);
    bids.should.be.an("array");
    bids.should.have.length(1);
    bids[0].should.have.length(1);
  });

  xit("should withdraw bids", async () => {
    await createAuction({});

    let events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });

    const auctionId = events[0].returnValues._id;
    const unitPrice = 2000000;
    await auction.call("placeBid", [auctionId, unitPrice.toFixed(0)], {
      caller: bob,
      amount: (unitPrice * 7).toFixed(0),
      tokenId: VITE,
    });

    let bids = await auction.query("getBids", [auctionId]);
    const bidId = bids[0][0];

    await auction.call("withdrawBid", [auctionId, bidId], {
      caller: bob,
    });

    events = await auction.getPastEvents("BidWithdrawn", {
      fromHeight: 0,
      toHeight: 0,
    });

    should.exist(events);
    events.should.be.an("array");
    events.should.have.length.greaterThan(0);
    events[0].should.have.property("returnValues");
    events[0].returnValues.should.have.property("_id");
    events[0].returnValues._id.should.be.a("string");
    events[0].returnValues.should.have.property("_auctionId");
    events[0].returnValues._auctionId.should.be.a("string");
    events[0].returnValues.should.have.property("_timestamp");

    bids = await auction.query("getBids", [auctionId]);
    bids.should.be.an("array");
    bids[0].should.have.length(0);
  });

  xit("should sort bids by unit price", async () => {
    await createAuction({});

    let events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });

    const auctionId = events[0].returnValues._id;

    const prices = [
      2 * Math.pow(10, 6),
      4 * Math.pow(10, 6),
      3 * Math.pow(10, 6),
    ];
    const bidIds = <any>[];
    for (let unitPrice of prices) {
      await auction.call("placeBid", [auctionId, unitPrice.toFixed(0)], {
        caller: bob,
        amount: (unitPrice * 7).toFixed(0),
        tokenId: VITE,
      });
    }
    events = await auction.getPastEvents("BidPlaced", {
      fromHeight: 0,
      toHeight: 0,
    });

    events.forEach(({ returnValues: { _id } }) => {
      bidIds.push(_id);
    });

    let bids = (await auction.query("getBids", [auctionId]))[0];
    bids.should.be.an("array");
    bids.should.have.length(3);
    const [id1, id2, id3] = bidIds;
    bids.should.deep.equal([id2, id3, id1]);
  });

  xit("should prevent interaction on and after end date", async () => {
    await createAuction({
      endTime: Number.parseInt((Date.now() / 1000 + 15).toFixed(0)),
    });

    await vite.utils.sleep(15 * 1000);

    let events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });

    const auctionId = events[0].returnValues._id;
    const unitPrice = 2000000;

    await auction
      .call("placeBid", [auctionId, unitPrice.toFixed(0)], {
        caller: bob,
        amount: (unitPrice * 7).toFixed(0),
        tokenId: VITE,
      })
      .should.be.rejectedWith(/revert/);
  });

  it("should complete auction", async () => {
    const { token } = await createAuction({
      endTime: Number.parseInt((Date.now() / 1000 + 40).toFixed(0)),
      numTokens: 13000,
      tokenDecimals: 3,
      reserveUnitPrice: 2000000,
    });

    let events = await auction.getPastEvents("AuctionCreated", {
      fromHeight: 0,
      toHeight: 0,
    });

    const auctionId = events[0].returnValues._id;

    const prices = [2, 4, 3];

    for (let unitPrice of prices) {
      await auction.call("placeBid", [auctionId, unitPrice.toFixed(0)], {
        caller: bob,
        amount: (unitPrice * 7 * Math.pow(10, 18)).toFixed(0),
        tokenId: VITE,
      });
    }
    const bobBalance = Number.parseInt(await bob.balance());
    await vite.utils.sleep(30 * 1000);

    await auction.call("completeAuction", [auctionId], {
      caller: alice,
    });

    await bob.receiveAll();

    console.log(await bob.balance());
    console.log(await bob.balance(token.tokenId));

    const newViteBalance = await bob.balance();
    Number.parseInt(newViteBalance).should.equal(
      2 * Math.pow(10, 18) * 7 + 3 * Math.pow(10, 18) + bobBalance
    );
    await bob.balance(token.tokenId).should.eventually.equal("13000");

    events = await auction.getPastEvents("AuctionCompleted", {
      fromHeight: 0,
      toHeight: 0,
    });

    should.exist(events);
    events.should.be.an("array");
    events.should.have.length.greaterThan(0);
    events[0].should.have.property("returnValues");
    events[0].returnValues.should.have.property("_auctionId");
    events[0].returnValues._auctionId.should.be.a("string");
    events[0].returnValues.should.have.property("_totalTokenAmount");
    events[0].returnValues._totalTokenAmount.should.be.equal("13000");
    events[0].returnValues.should.have.property("_totalViteAmount");
    events[0].returnValues._totalViteAmount.should.be.equal(
      "46000000000000000000"
    );
    events[0].returnValues.should.have.property("_timestamp");
  });
});
