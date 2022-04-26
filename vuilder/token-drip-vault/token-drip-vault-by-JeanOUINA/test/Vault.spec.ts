import { describe, before, it } from "mocha";
import { expect } from "chai";
import * as vuilder from "@vite/vuilder";
import * as vite from "@vite/vitejs";
import config from "./vite.config.json";

let provider: any;
let deployer: any;

describe("Vault tests", () => {
    before(async function() {
        provider = vuilder.newProvider(config.networks.local.http);
        deployer = vuilder.newAccount(config.networks.local.mnemonic, 0, provider);
        console.log("deployer", deployer.address);
    });

    describe("Vault.solpp", () => {
        let vaultContract: any
        let vaultId: string
        
        it("Should deploy Vault.solpp", async () => {
            // compile
            const compiledContracts = await vuilder.compile("Vault.solpp");
            expect(compiledContracts).to.have.property("TokenVault");
    
            // deploy
            vaultContract = compiledContracts.TokenVault;
            vaultContract.setDeployer(deployer).setProvider(provider);
            await vaultContract.deploy({
                responseLatency: 1
            });
            expect(vaultContract.address).to.be.a("string");
        })

        describe("Token Vault", () => {
            it("Should create a vault", async () => {
                const block = await vaultContract.call(
                    "createVault",
                    [
                        // frequency: every block
                        1,
                        // amountPerCycle: 0.1 vite
                        2,
                        // ownerCanWithdrawAllFunds: Yes
                        true,
                        // settingsLocked: No
                        false,
                        // withdrawableAmountStacks: Yes
                        true,
                        // acceptsAdditionalFunds: Yes,
                        true,
                        // beneficiaries
                        [deployer.address]
                    ],
                    {
                        amount: (100n*10n**18n).toString()
                    }
                );

                const events = await vaultContract.getPastEvents("NewVault", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(block.sendBlockHash);
                expect(events[0]?.returnValues?.owner).to.be.equal(deployer.address);

                const events2 = await vaultContract.getPastEvents("NewBeneficiary", {fromHeight: block.height, toHeight: block.height});
                expect(events2)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events2[0]?.returnValues?.id).to.be.equal(block.sendBlockHash);
                expect(events2[0]?.returnValues?.beneficiary).to.be.equal(deployer.address);

                vaultId = block.sendBlockHash
            })

            it("Should withdraw rewards", async () => {
                const block = await vaultContract.call(
                    "withdraw",
                    [
                        // id: vaultId
                        vaultId
                    ],
                    {}
                );

                const events = await vaultContract.getPastEvents("VaultWithdrawal", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.beneficiary).to.be.equal(deployer.address);
                expect(parseInt(events[0]?.returnValues?.amount)).to.be.greaterThan(0);
                expect(parseInt(events[0]?.returnValues?.cycles)).to.be.greaterThanOrEqual(1);
            })

            it("Should deposit new funds", async () => {
                const amount = (10n*10n**18n).toString()
                const block = await vaultContract.call(
                    "deposit",
                    [
                        // id: vaultId
                        vaultId
                    ],
                    {
                        amount: amount
                    }
                );

                const events = await vaultContract.getPastEvents("VaultDeposit", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.from).to.be.equal(deployer.address);
                expect(events[0]?.returnValues?.amount).to.be.equal(amount);
            })

            it("Should update settings", async () => {
                const block = await vaultContract.call(
                    "updateSettings",
                    [
                        // id: vaultId
                        vaultId,
                        // withdrawableAmountStacks: No
                        false,
                        // acceptsAdditionalFunds: No
                        false
                    ],
                    {}
                );

                const events = await vaultContract.getPastEvents("VaultSettingsUpdate", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.withdrawableAmountStacks).to.be.equal("0");
                expect(events[0]?.returnValues?.acceptsAdditionalFunds).to.be.equal("0");
                expect(events[0]?.returnValues?.oldWithdrawableAmountStacks).to.be.equal("1");
                expect(events[0]?.returnValues?.oldAcceptsAdditionalFunds).to.be.equal("1");
            })

            const newBeneficiary = "vite_00000000000000000000000000000000000000005b0c5f34a7"
            it("Should add a beneficiary", async () => {
                const block = await vaultContract.call(
                    "addBeneficiary",
                    [
                        // id: vaultId
                        vaultId,
                        // beneficiary: vite_00000000000000000000000000000000000000005b0c5f34a7
                        newBeneficiary
                    ],
                    {}
                );

                const events = await vaultContract.getPastEvents("NewBeneficiary", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.beneficiary).to.be.equal(newBeneficiary);
            })

            it("Should remove a beneficiary", async () => {
                const block = await vaultContract.call(
                    "removeBeneficiary",
                    [
                        // id: vaultId
                        vaultId,
                        // beneficiary: vite_00000000000000000000000000000000000000005b0c5f34a7
                        newBeneficiary
                    ],
                    {}
                );

                const events = await vaultContract.getPastEvents("RemoveBeneficiary", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.beneficiary).to.be.equal(newBeneficiary);
            })
            
            it("Should withdraw everything", async () => {
                const block = await vaultContract.call(
                    "withdrawEverything",
                    [
                        // id: vaultId
                        vaultId
                    ],
                    {}
                );

                const events = await vaultContract.getPastEvents("VaultWithdrawal", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.beneficiary).to.be.equal(deployer.address);
                expect(parseInt(events[0]?.returnValues?.amount)).to.be.greaterThan(0);
                expect(parseInt(events[0]?.returnValues?.cycles)).to.be.equal(0);

                const events1 = await vaultContract.getPastEvents("VaultEnd", {fromHeight: block.height, toHeight: block.height});
                expect(events1)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events1[0]?.returnValues?.id).to.be.equal(vaultId);
            })
            
            it("Should lock settings", async () => {
                const block = await vaultContract.call(
                    "lockSettings",
                    [
                        // id: vaultId
                        vaultId
                    ],
                    {}
                );

                const events = await vaultContract.getPastEvents("VaultSettingsLock", {fromHeight: block.height, toHeight: block.height});
                expect(events)
                    .to.be.an("array")
                    .with.lengthOf(1);
                expect(events[0]?.returnValues?.id).to.be.equal(vaultId);
                expect(events[0]?.returnValues?.owner).to.be.equal(deployer.address);
            })
            
            it("Should get the correct data", async () => {
                const vault = await vaultContract.query(
                    "vaults",
                    [
                        // id: vaultId
                        vaultId
                    ]
                );
                
                // owner
                expect(vault[0]).to.be.equal(deployer.address)
                // balance
                expect(vault[1]).to.be.equal("0") // we withdrew everything
                // frequency
                expect(vault[2]).to.be.equal("1")
                // amountPerCycle
                expect(vault[3]).to.be.equal("2")
                // token
                expect(vault[4]).to.be.equal(vite.constant.Vite_TokenId)
                // ownerCanWithdrawAllFunds
                expect(vault[5]).to.be.equal("1")
                // settingsLocked
                expect(vault[6]).to.be.equal("1") // we locked the settings just before
                // withdrawableAmountStacks
                expect(vault[7]).to.be.equal("0")
                // acceptsAdditionalFunds
                expect(vault[8]).to.be.equal("0")
                // beneficiaryCount
                expect(vault[9]).to.be.equal("1")
            })
            it("Should detect owner is a beneficiary", async () => {
                const isOwnerBeneficiary = await vaultContract.query(
                    "isBeneficiary",
                    [
                        // id: vaultId
                        vaultId,
                        // addr: deployer
                        deployer.address
                    ]
                );
                
                expect(isOwnerBeneficiary[0]).to.be.equal("1")
            })
            it("Should detect a random address is not a beneficiary", async () => {
                const isRandomBeneficiary = await vaultContract.query(
                    "isBeneficiary",
                    [
                        // id: vaultId
                        vaultId,
                        // addr: deployer
                        newBeneficiary
                    ]
                );
                
                expect(isRandomBeneficiary[0]).to.be.equal("0")
            })
        })
    })
});