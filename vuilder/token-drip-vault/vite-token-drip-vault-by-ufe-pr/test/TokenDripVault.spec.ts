import chai, { expect } from "chai";
import cap from "chai-as-promised";
import bnChai from "chai-bn";
import config from "./vite.config.json";
import * as vite from "@vite/vuilder/lib/vite";
import BN from "bn.js";
import { Contract } from "@vite/vuilder/lib/contract";
import { UserAccount } from "@vite/vuilder/lib/user";

chai.use(bnChai(BN));
chai.use(cap);

const { utils } = require("@vite/vitejs");

const should = chai.should();

type ContractMap = {
  [key: string]: Contract;
};

const VITE = "tti_5649544520544f4b454e6e40";

describe("TokenDripVault", () => {
  let provider: any;
  let deployer: UserAccount;
  let compiledContracts: ContractMap;
  let vault: Contract;
  let alice: UserAccount, bob: UserAccount, carol: UserAccount, dave: any;

  async function issueTokens(
    account: UserAccount,
    amount: string,
    decimals = 10
  ): Promise<{ tokenId: string }> {
    var api = provider;

    const { address } = account;

    async function displayBalanceInfo(address_?: undefined) {
      const effectiveAddress = address_ || address;
      await api
        .getBalanceInfo(effectiveAddress)
        .then((e: { balance: { balanceInfoMap: any } }) =>
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
        (e: { tokenId: string; owner: any }) =>
          e.tokenId !== "tti_5649544520544f4b454e6e40" && e.owner === address
      );
    }

    async function issueToken(amount: any, decimals: number) {
      account.setProvider(provider);
      const result = await account
        .issueToken({
          tokenName: "Test Token",
          isReIssuable: true,
          maxSupply: amount,
          totalSupply: amount,
          isOwnerBurnOnly: false,
          decimals: decimals.toString(),
          tokenSymbol: "TEST",
        })
        .autoSend();

      console.log("Waiting for confirmation...");
      await vite.utils.waitFor(() => vite.isReceived(provider, result.hash));
      await account.receiveAll();
    }

    // await displayBalanceInfo();

    let token = await findOwnerToken();
    if (!token) {
      await issueToken(amount, decimals);
      token = await findOwnerToken();
    }

    // console.log("Token:", token);
    return token;
  }

  before(async () => {
    provider = vite.newProvider(config.networks.local.http);
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);
    alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    carol = vite.newAccount(config.networks.local.mnemonic, 3, provider);
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

  async function createVault({
    frequency,
    tokenAmountPerCycle,
    ownerCanWithdrawAllFunds = true,
    settingsLocked = false,
    withdrawableAmountStacks = false,
    acceptsAdditionalFunds = true,
    initialBalance = "0",
    owner = alice,
  }) {
    const token = await issueTokens(owner, "100000000");

    await vault.call(
      "createVault",
      [
        frequency,
        tokenAmountPerCycle,
        ownerCanWithdrawAllFunds,
        settingsLocked,
        withdrawableAmountStacks,
        acceptsAdditionalFunds,
      ],
      {
        caller: alice,
        amount: initialBalance,
        tokenId: token.tokenId,
      }
    );

    console.log("Vault created");

    const events = await vault.getPastEvents("CreateVault", {
      fromHeight: 0,
      toHeight: 0,
    });
    should.exist(events);
    const vaultId = events[events.length - 1].returnValues._id;
    console.log("Vault id:", vaultId);
    return {
      frequency,
      tokenAmountPerCycle,
      ownerCanWithdrawAllFunds,
      settingsLocked,
      withdrawableAmountStacks,
      acceptsAdditionalFunds,
      token,
      initialBalance,
      vaultId,
      owner: alice.address,
    };
  }

  beforeEach(async () => {
    compiledContracts = await vite.compile("TokenDripVault.solpp");

    // should exist
    compiledContracts.should.have.property("TokenDripVault");

    // should deploy
    vault = compiledContracts.TokenDripVault;
    // console.log("TokenDripVault:", vault);
    vault.setDeployer(deployer).setProvider(provider);
    await vault.deploy({ responseLatency: 1 });
    should.exist(vault.address);
    vault.address!.should.be.a("string");
  });

  it("should create vault", async () => {
    const token = await issueTokens(alice, "10000000000000000");
    const [frequency, amntPerCycle, ownerWithdrawAll, settingLocked, was, aaf] =
      ["3600", "100", true, true, true, true];

    await vault.call(
      "createVault",
      [frequency, amntPerCycle, ownerWithdrawAll, settingLocked, was, aaf],
      {
        caller: alice,
        amount: "0",
        tokenId: token.tokenId,
      }
    );

    let events: { [key: string]: any }[];

    // check Received event
    events = await vault.getPastEvents("CreateVault", {
      fromHeight: 0,
      toHeight: 0,
    });
    should.exist(events);
    (events.should as unknown as Chai.Assertion).be.an("array");
    events[0].should.have.property("returnValues");
    events[0].returnValues.should.have.property("_id");
    events[0].returnValues._id.should.be.a("string");
    events[0].returnValues.should.have.property("_token");
    events[0].returnValues._token.should.be.a("string");
    should.equal(
      parseInt(events[0].returnValues._token, 16),
      parseInt(utils.getOriginalTokenIdFromTokenId(token.tokenId), 16)
    );
    should.equal(events[0].returnValues._owner, alice.address);
    should.equal(events[0].returnValues._frequency, frequency.toString());

    const vaultId = events[events.length - 1].returnValues._id;

    await  vault.query("totalBeneficiaries", [vaultId]).should.eventually.deep.equal(["1"]);
    await  vault.query("beneficiary", [vaultId, 0]).should.eventually.deep.equal([alice.address]);
    await  vault.query("vaultBalance", [vaultId]).should.eventually.deep.equal(["0"]);
    await  vault.query("getVaultOwner", [vaultId]).should.eventually.deep.equal([alice.address]);
    await  vault.query("getVaultFrequency", [vaultId]).should.eventually.deep.equal(["3600"]);
    await  vault.query("getVaultToken", [vaultId]).should.eventually.deep.equal([token.tokenId]);
    await  vault.query("getVaultTokenAmountPerCycle", [vaultId]).should.eventually.deep.equal(["100"]);
    await  vault.query("getVaultOwnerCanWithdrawAllFunds", [vaultId]).should.eventually.deep.equal(["1"]);
    await  vault.query("getVaultSettingsLocked", [vaultId]).should.eventually.deep.equal(["1"]);
    await  vault.query("getVaultWithdrawableAmountStacks", [vaultId]).should.eventually.deep.equal(["1"]);
    await  vault.query("getVaultAcceptsAdditionalFunds", [vaultId]).should.eventually.deep.equal(["1"]);
  });

  it("should prevent setting `withdrawableAmountStacks` and `acceptsAdditionalFunds` when settings are locked", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: true,
    });

    await vault
      .call("setWithdrawAmountStacks", [vaultId, true], {
        caller: alice,
      })
      .should.eventually.be.rejectedWith(/revert/);
    await vault
      .query("getVaultWithdrawableAmountStacks", [vaultId])
      .should.eventually.deep.equal(["0"]);

    await vault
      .call("setAcceptsAdditionalFunds", [vaultId, false], {
        caller: alice,
      })
      .should.eventually.be.rejectedWith(/revert/);
    await vault
      .query("getVaultAcceptsAdditionalFunds", [vaultId])
      .should.eventually.deep.equal(["1"]);
  });

  it("should allow setting `withdrawableAmountStacks` and `acceptsAdditionalFunds` when settings are unlocked", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault.call("setWithdrawAmountStacks", [vaultId, true], {
      caller: alice,
    });
    await vault
      .query("getVaultWithdrawableAmountStacks", [vaultId])
      .should.eventually.deep.equal(["1"]);

    await vault.call("setAcceptsAdditionalFunds", [vaultId, false], {
      caller: alice,
    });
    await vault
      .query("getVaultAcceptsAdditionalFunds", [vaultId])
      .should.eventually.deep.equal(["0"]);
  });

  it("should only allow a vault member to modify settings", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault.call("setWithdrawAmountStacks", [vaultId, true], {
      caller: alice,
    });
    await vault
      .query("getVaultWithdrawableAmountStacks", [vaultId])
      .should.eventually.deep.equal(["1"]);

    await vault.call("setAcceptsAdditionalFunds", [vaultId, false], {
      caller: alice,
    });
    await vault
      .query("getVaultAcceptsAdditionalFunds", [vaultId])
      .should.eventually.deep.equal(["0"]);
  });

  it("should allow owner to add beneficiaries", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["1"]);
    await vault.call("addBeneficiary", [vaultId, bob.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["2"]);

    await vault
      .query("beneficiary", [vaultId, 1])
      .should.eventually.deep.equal([bob.address]);
    await vault.call("addBeneficiary", [vaultId, carol.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["3"]);

    await vault
      .query("beneficiary", [vaultId, 2])
      .should.eventually.deep.equal([carol.address]);
  });

  it("should prevent non-owner from adding beneficiaries", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["1"]);
    await vault
      .call("addBeneficiary", [vaultId, carol.address], {
        caller: bob,
      })
      .should.eventually.be.rejectedWith(/revert/);
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["1"]);
  });

  it("should allow owner to remove beneficiaries", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["1"]);
    await vault.call("addBeneficiary", [vaultId, bob.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["2"]);

    await vault
      .query("beneficiary", [vaultId, 1])
      .should.eventually.deep.equal([bob.address]);
    await vault.call("addBeneficiary", [vaultId, carol.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["3"]);

    await vault
      .query("beneficiary", [vaultId, 2])
      .should.eventually.deep.equal([carol.address]);

    await vault.call("removeBeneficiary", [vaultId, bob.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["2"]);
    await vault
      .query("beneficiary", [vaultId, 1])
      .should.eventually.deep.equal([carol.address]);
  });

  it("should allow beneficiaries to remove themselves", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["1"]);
    await vault.call("addBeneficiary", [vaultId, bob.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["2"]);

    await vault
      .query("beneficiary", [vaultId, 1])
      .should.eventually.deep.equal([bob.address]);
    await vault.call("addBeneficiary", [vaultId, carol.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["3"]);

    await vault
      .query("beneficiary", [vaultId, 2])
      .should.eventually.deep.equal([carol.address]);

    await vault.call("removeBeneficiary", [vaultId, bob.address], {
      caller: bob,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["2"]);
    await vault
      .query("beneficiary", [vaultId, 1])
      .should.eventually.deep.equal([carol.address]);
  });

  it("should not allow non-admin or the beneficiary theirself to remove a beneficiary", async () => {
    const { vaultId } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
    });

    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["1"]);
    await vault.call("addBeneficiary", [vaultId, bob.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["2"]);

    await vault
      .query("beneficiary", [vaultId, 1])
      .should.eventually.deep.equal([bob.address]);
    await vault.call("addBeneficiary", [vaultId, carol.address], {
      caller: alice,
    });
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["3"]);

    await vault
      .query("beneficiary", [vaultId, 2])
      .should.eventually.deep.equal([carol.address]);

    await vault
      .call("removeBeneficiary", [vaultId, carol.address], {
        caller: bob,
      })
      .should.eventually.be.rejectedWith(/revert/);
    await vault
      .query("totalBeneficiaries", [vaultId])
      .should.eventually.deep.equal(["3"]);
    await vault
      .query("beneficiary", [vaultId, 2])
      .should.eventually.deep.equal([carol.address]);
  });

  it("should only allow funding if `acceptsAdditionalFunds` is true", async () => {
    let { vaultId, token } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
      acceptsAdditionalFunds: false,
      initialBalance: "100",
    });

    await vault
      .call("fund", [vaultId], {
        amount: "100",
        caller: alice,
        tokenId: token.tokenId,
      })
      .should.eventually.be.rejectedWith(/revert/);
    await vault
      .query("vaultBalance", [vaultId])
      .should.eventually.deep.equal(["100"]);
    console.log("VaultID 1:", vaultId);

    ({ vaultId, token } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
      acceptsAdditionalFunds: true,
    }));
    console.log("VaultID 2:", vaultId);
    await vault.call("fund", [vaultId], {
      amount: "100",
      caller: alice,
      tokenId: token.tokenId,
    }).should.eventually.be.fulfilled;
    await vault
      .query("vaultBalance", [vaultId])
      .should.eventually.deep.equal(["100"]);
  });

  it("should only allow funding if the token sent is the vault's token", async () => {
    let { vaultId, token } = await createVault({
      frequency: "3600",
      tokenAmountPerCycle: "100",
      settingsLocked: false,
      acceptsAdditionalFunds: true,
      initialBalance: "100",
    });

    await vault
      .call("fund", [vaultId], {
        amount: "100",
        caller: alice,
        tokenId: VITE,
      })
      .should.eventually.be.rejectedWith(/revert/);
    await vault
      .query("vaultBalance", [vaultId])
      .should.eventually.deep.equal(["100"]);

    await vault.call("fund", [vaultId], {
      amount: "100",
      caller: alice,
      tokenId: token.tokenId,
    }).should.eventually.be.fulfilled;
    await vault
      .query("vaultBalance", [vaultId])
      .should.eventually.deep.equal(["200"]);
  });

  async function balanceBN(
    account: UserAccount,
    tokenID?: string
  ): Promise<BN> {
    return new BN(await account.balance(tokenID));
  }

  context("when withdrawable amount stacks", () => {
    it("should allow withdraw if the amount is less than an amount that's the accumulation of un-withdrawn funds from previous and current cycle", async () => {
      const { vaultId, token } = await createVault({
        frequency: "30",
        tokenAmountPerCycle: "100",
        settingsLocked: false,
        acceptsAdditionalFunds: true,
        initialBalance: "100",
        withdrawableAmountStacks: true,
      });
      async function getBalance() {
        await alice.receiveAll();
        return await balanceBN(alice, token.tokenId);
      }
      const initialBalance = await getBalance();

      await vault.call("fund", [vaultId], {
        amount: "100",
        caller: alice,
        tokenId: token.tokenId,
      }).should.eventually.be.fulfilled;

      await vault
        .query("vaultBalance", [vaultId])
        .should.eventually.deep.equal(["200"]);

      await vault.call("withdraw", [vaultId, 50], {
        caller: alice,
      }).should.eventually.be.fulfilled;

      await getBalance().then((bal) =>
        bal.should.be.a.bignumber.that.equals(initialBalance.subn(50))
      );

      await vault
        .call("withdraw", [vaultId, 150], {
          caller: alice,
        })
        .should.eventually.be.rejectedWith(/revert/);

      // await vite.utils.sleep(25000);
      await vault.call("setTime", [31], { caller: alice });
      await vault.call("withdraw", [vaultId, 150], {
        caller: alice,
      }).should.eventually.be.fulfilled;

      await getBalance().then((bal) =>
        bal.should.be.a.bignumber.that.equals(initialBalance.addn(100))
      );

      // There should be nothing left to withdraw now
      await vault
        .call("withdraw", [vaultId, 50], {
          caller: alice,
        })
        .should.eventually.be.rejectedWith(/revert/);
    });
  });

  context("when withdrawable amount doesn't stack", () => {
    it("should allow withdraw if the amount is less than the withdrawable amount", async () => {
      const { vaultId, token } = await createVault({
        frequency: "30",
        tokenAmountPerCycle: "100",
        settingsLocked: false,
        acceptsAdditionalFunds: true,
        initialBalance: "100",
        withdrawableAmountStacks: false,
      });
      async function getBalance() {
        await alice.receiveAll();
        return await balanceBN(alice, token.tokenId);
      }
      const initialBalance = await getBalance();

      await vault.call("fund", [vaultId], {
        amount: "100",
        caller: alice,
        tokenId: token.tokenId,
      }).should.eventually.be.fulfilled;

      await vault
        .query("vaultBalance", [vaultId])
        .should.eventually.deep.equal(["200"]);

      await vault.call("withdraw", [vaultId, 50], {
        caller: alice,
      }).should.eventually.be.fulfilled;

      await getBalance().then((bal) =>
        bal.should.be.a.bignumber.that.equals(initialBalance.subn(50))
      );

      await vault
        .call("withdraw", [vaultId, 100], {
          caller: alice,
        })
        .should.eventually.be.rejectedWith(/revert/);

        // await vite.utils.sleep(25000);
        await vault.call("setTime", [31], { caller: alice });
      await vault.call("withdraw", [vaultId, 100], {
        caller: alice,
      }).should.eventually.be.fulfilled;

      await getBalance().then((bal) =>
        bal.should.be.a.bignumber.that.equals(initialBalance.addn(50))
      );

      // The previously un-withdrawn 50 attov should not be available for withdraw in this case
      await vault
        .call("withdraw", [vaultId, 50], {
          caller: alice,
        })
        .should.eventually.be.rejectedWith(/revert/);
    });
  });
});
