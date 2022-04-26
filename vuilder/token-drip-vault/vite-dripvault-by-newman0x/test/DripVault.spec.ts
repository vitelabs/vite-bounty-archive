import { describe } from "mocha";
import { expect } from "chai";
const vite = require('@vite/vuilder');
import config from "./vite.config.json";

let provider: any;
let deployer: any;
let beneficiaryA: any;
let beneficiaryB: any;
let contract: any;

// - deploy params - 

// tokenID for the vault (VITE)
 const tokenID = 'tti_5649544520544f4b454e6e40';
// amount deployed to vault
const amountLoaded = '500000000000000000000';
// tokens allowed to withdraw per cycle 
const tokensPerCycle = '20000000000000000000';
// cycle frequency for vault (in seconds)
const withdrawFrequency = '18';
// owner can drain funds from contract (false)
const drainFundsCondition = '0';
// conditions cannot be changed after deployment (false)
const lockSettingsCondition = '0';

describe('[Deploy Vault]', () => {
  before(async function() {
    provider = vite.localProvider();
    deployer = vite.newAccount(config.networks.local.mnemonic, 0);
    beneficiaryA = vite.newAccount(config.networks.local.mnemonic, 1);
    beneficiaryB = vite.newAccount(config.networks.local.mnemonic, 2);
    await deployer.sendToken(beneficiaryA.address, '100000000000000000000');
    await beneficiaryA.receiveAll();
    await deployer.sendToken(beneficiaryB.address, '0');
    await beneficiaryB.receiveAll();
  });

  it('Vault Deployed', async () => {
    // compile
    const compiledContracts = await vite.compile('DripVault.solpp');
    expect(compiledContracts).to.have.property('DripVault');
    // deploy
    contract = compiledContracts.DripVault;
    contract.setDeployer(deployer).setProvider(provider);
    await contract.deploy({params: [tokenID, tokensPerCycle, withdrawFrequency, drainFundsCondition,lockSettingsCondition], responseLatency: 1, amount: amountLoaded});
    expect(contract.address).to.be.a('string');
    console.log(contract.address);
    // check vault specs
    let vaultID = await contract.query('vaultID', []);
    console.log('Vault ID: ', vaultID);
    let vaultToken = await contract.query('vaultToken', []);
    console.log('Vault Token: ', vaultToken);
    expect(vaultToken).to.be.deep.equal([tokenID])
    let tokensLocked = await contract.query('vaultTokenBalance', []);
    console.log('Vault Balance: ', tokensLocked);
    expect(tokensLocked).to.be.deep.equal([amountLoaded]);
    let amountPerCycle = await contract.query('tokensPerCycle', []);
    console.log('Tokens Allowed per Cycle: ', amountPerCycle);
    expect(amountPerCycle).to.be.deep.equal([tokensPerCycle]);
    let cycleFrequency = await contract.query('withdrawFrequency', []);
    console.log('Vault Cycle Frequency: ', cycleFrequency, 'seconds');
    expect(cycleFrequency).to.be.deep.equal([withdrawFrequency]);
    // check conditions
    let condition1 = await contract.query('ownerCanRemoveFunds', []);
    expect(condition1).to.be.deep.equal(['0']);
    let condition2 = await contract.query('settingsLocked', []);
    expect(condition2).to.be.deep.equal(['0']);
  });
});

describe('[Test Vault]', () => {

  it('Add Beneficiaries', async() => {
    console.log('adding beneficiaries . . .')
   // add beneficiaries as vault owner
   await contract.call('addBeneficiary', [beneficiaryA.address], {caller: deployer});
   await contract.call('addBeneficiary', [beneficiaryB.address], {caller: deployer});
   // check beneficiary id numbers
   let firstID = await contract.query('Beneficiary', [beneficiaryA.address]);
   expect(firstID[0]).to.be.equal('1');
   console.log('BeneficiaryA ID: ', firstID[0]);
   let secondID = await contract.query('Beneficiary', [beneficiaryB.address]);
   expect(secondID[0]).to.be.equal('2');
   console.log('BeneficiaryB ID: ', secondID[0]);
  });

  it('Perform Withdraws', async() => {
    // enable token stack setting for this test (uncollected tokens can later be received) - used to test with beneficiary B
    await contract.call('enableTokenStacking', ['1'], {caller: deployer});
    let isStackEnabled = await contract.query('withdrawAmountStacks', []);
    expect(isStackEnabled).to.be.deep.equal(['1']);
    
    console.log('withdraw from three cycles as beneficiary A . . .');

    await contract.call('loadCurrentCycle', [], {caller: beneficiaryA});
    let cycleNumber = await contract.query('viewCurrentCycle', []);
    expect(cycleNumber).to.be.deep.equal(['0']);
    console.log('Current Cycle: ', cycleNumber);
    await contract.call('withdrawFromCycle', [tokensPerCycle], {caller: beneficiaryA});
    console.log('~ successful withdraw from vault ~');
    let totalWithdrawn = await contract.query('getTotalWithdrawn', [beneficiaryA.address]);
    console.log('[Beneficiary A] Total Withdrawn:', totalWithdrawn,'\n');
    expect(totalWithdrawn).to.be.deep.equal(['20000000000000000000']);

    console.log('waiting for next cycle . . .');
    await vite.utils.sleep(12000);

    await contract.call('loadCurrentCycle', [], {caller: beneficiaryA});
    cycleNumber = await contract.query('viewCurrentCycle', []);
    expect(cycleNumber).to.be.deep.equal(['1']);
    console.log('Current Cycle: ', cycleNumber);
    await contract.call('withdrawFromCycle', [tokensPerCycle], {caller: beneficiaryA});
    console.log('~ successful withdraw from vault ~');
    totalWithdrawn = await contract.query('getTotalWithdrawn', [beneficiaryA.address]);
    console.log('[Beneficiary A] Total Withdrawn:', totalWithdrawn, '\n');
    expect(totalWithdrawn).to.be.deep.equal(['40000000000000000000']);

     // try another withdraw to test exceeding limit 
    console.log('attempting to withdraw more tokens from current cycle . . .')
    await contract.call('withdrawFromCycle', [tokensPerCycle], {caller: beneficiaryA});
    totalWithdrawn = await contract.query('getTotalWithdrawn', [beneficiaryA.address]);
    // balance must have remained the same
    console.log('** Withdraw Amount Exceeded ! **')
    console.log('[Beneficiary A] Total Withdrawn (Unchanged):', totalWithdrawn, '\n');
    expect(totalWithdrawn).to.be.deep.equal(['40000000000000000000']);

    console.log('waiting for next cycle . . .');
    await vite.utils.sleep(12000);

    await contract.call('loadCurrentCycle', [], {caller: beneficiaryA});
    cycleNumber = await contract.query('viewCurrentCycle', []);
    expect(cycleNumber).to.be.deep.equal(['2']);
    console.log('Current Cycle: ', cycleNumber);
    await contract.call('withdrawFromCycle', ['20000000000000000000'], {caller: beneficiaryA});
    console.log('~ successful withdraw from vault ~');
    totalWithdrawn = await contract.query('getTotalWithdrawn', [beneficiaryA.address]);
    console.log('[Beneficiary A] Total Withdrawn:', totalWithdrawn, '\n');
    expect(totalWithdrawn).to.be.deep.equal(['60000000000000000000']);
    console.log('first withdraw from cycle 4 as beneficiary B . . .')
    console.log('** auto-included uncollected tokens from previous cycles **')

    await contract.call('withdrawFromCycle', ['20000000000000000000'], {caller: beneficiaryB});
    console.log('~ successful withdraw from vault ~');
    totalWithdrawn = await contract.query('getTotalWithdrawn', [beneficiaryB.address]);
    console.log('[Beneficiary B] Total Withdrawn:', totalWithdrawn)
    expect(totalWithdrawn).to.be.deep.equal(['60000000000000000000']);
  });
  
  it('Enable External Deposits',async() =>{
    // enable flag as vault owner
    console.log('enabling external deposits to increase vault balance . . .');
    await contract.call('enableAdditionalDeposits', ['1'], {caller: deployer});
    let balance = await contract.query('getDepositBalance', [beneficiaryA.address]);
    console.log('Beneficiary A balance before deposit: ', balance);
    expect(balance).to.be.deep.equal(['0']);
    console.log('depositing tokens . . .');
    await contract.call('deposit', [], {caller: beneficiaryA, amount: "100000000000000000000"});
    balance = await contract.query('getDepositBalance', [beneficiaryA.address]);
    console.log('Beneficiary A balance after deposit: ', balance);
    expect(balance).to.be.deep.equal(['100000000000000000000']);
  });

  it('Perform Internal Allocation ', async() =>{
    let balance1 = await contract.query('getDepositBalance', [beneficiaryA.address]);
    console.log('Beneficiary A balance:', balance1);
    expect(balance1).to.be.deep.equal(['100000000000000000000']);
    let balance2 = await contract.query('getDepositBalance', [beneficiaryB.address]);
    console.log('Beneficiary B balance:', balance2);
    expect(balance2).to.be.deep.equal(['0']);

    await contract.call('allocate', [beneficiaryB.address, "100000000000000000000"], {caller: beneficiaryA});
    console.log('~ successful allocation from beneficiaryA to beneficiaryB ~');

    balance1 = await contract.query('getDepositBalance', [beneficiaryA.address]);
    console.log('Beneficiary A balance:', balance1);
    expect(balance1).to.be.deep.equal(['0']);

    balance2 = await contract.query('getDepositBalance', [beneficiaryB.address]);
    console.log('Beneficiary B balance:', balance2);
    expect(balance2).to.be.deep.equal(['100000000000000000000']);

    await contract.call('withdrawFromBalance', ['100000000000000000000'], {caller: beneficiaryB});
    console.log('~ successfull withdraw of allocated funds by Beneficiary B ~');
  });
});

  