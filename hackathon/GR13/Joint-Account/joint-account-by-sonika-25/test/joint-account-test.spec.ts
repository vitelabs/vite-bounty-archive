import { describe } from "mocha";
import { expect } from "chai";
const vite = require('@vite/vuilder');
import config from "./vite.config.json";

let provider: any;
let deployer: any;
let manager: any;
let compiledContracts: any;

const VITE = 'tti_5649544520544f4b454e6e40';
const NULL_ADDRESS = 'vite_0000000000000000000000000000000000000000a4f3a0cb58';

describe('test Contract JointAccount', () => {
  before(async function() {
    provider = vite.localProvider();
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);

    // compile
    compiledContracts = await vite.compile('JointAccount.solpp');
    expect(compiledContracts).to.have.property('AccountManager');
    expect(compiledContracts).to.have.property('JointAccount');

    // deploy manager only
    manager = compiledContracts.AccountManager;
    manager.setDeployer(deployer).setProvider(provider);
    await manager.deploy({});
    expect(manager.address).to.be.a('string');
  });

  it('creates a joint account', async () => {
    // create user accounts
    let alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    let bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    let lion = vite.newAccount(config.networks.local.mnemonic, 3, provider);
    let wool = vite.newAccount(config.networks.local.mnemonic, 4, provider);

    await deployer.sendToken(alice.address, '10000000');
    await deployer.sendToken(bob.address, '10000000');
    await deployer.sendToken(lion.address, '10000000');
    await alice.receiveAll();
    await bob.receiveAll();
    await lion.receiveAll();

    // create a joint account
    const members = [alice.address, bob.address, lion.address];
    let account = compiledContracts.JointAccount;

    account.setDeployer(deployer).setProvider(provider);
    await account.deploy({
      tokenId: VITE,
      amount: '1000',
      params: [members, manager.address, '2']
    });
    expect(account.address).to.be.a('string');
    expect(await manager.query('accounts', ['0'])).to.be.deep.equal([account.address]);

    let sentAmount = '234';
    await deployer.sendToken(account.address, sentAmount);

    let expectedBalance = '1234';
    expect(await account.balance()).to.be.equal(expectedBalance);

    // approver can submit proposal
    let destination = wool.address;
    let proposalAmount = '321';
    let proposalId = '1';
    await account.call('createTransfer', [proposalAmount, destination, VITE], {caller: alice});
    expect(await account.query('transfers', [proposalId])).to.be.deep.equal([
      proposalId,
      proposalAmount,
      alice.address,
      destination,
      VITE,
      '0',
      false
    ]);

    // non-approver cannot submit proposal
    await account.call('createTransfer', [proposalAmount, deployer.address, VITE], {caller: deployer});
    expect(await account.query('transfers', [proposalId+1].amount)).to.be.equal('0');

    // approver can vote
    await account.call('approveTransfer', [proposalId], {caller: alice});
    expect(await account.query('transfers', [proposalId])).to.be.deep.equal([
      proposalId,
      proposalAmount,
      alice.address,
      destination,
      VITE,
      '1',
      false
    ]);

    // ...but only once
    await account.call('approveTransfer', [proposalId], {caller: alice});
    expect(await account.query('transfers', [proposalId])).to.be.deep.equal([
      proposalId,
      proposalAmount,
      alice.address,
      destination,
      VITE,
      '1',
      false
    ]);

    // non-approver cannot vote
    await account.call('approveTransfer', [proposalId], {caller: deployer});
    expect(await account.query('transfers', [proposalId])).to.be.deep.equal([
      proposalId,
      proposalAmount,
      alice.address,
      destination,
      VITE,
      '1',
      false
    ]);

    // Final approval vote send transfer and then resets it
    await account.call('approveTransfer', [proposalId], {caller: bob});
    expect(await account.query('transfers', [proposalId])).to.be.deep.equal([
      proposalId,
      '0'
      NULL_ADDRESS,
      NULL_ADDRESS,
      VITE,
      '0',
      false
    ]);

    // Now Wool has his money
    await wool.receiveAll();
    expect(await wool.balance()).to.be.equal(proposalAmount);
    expect(await account.balance()).to.be.equal('0');

    // Try a new proposal, but there are no funds, so it should revert
    await expect (account.call('createTransfer', ["5678", destination, VITE], {caller: alice})).to.be.reverted;

    let events;

    // check Deposited event
    events = await account.getPastEvents('Deposited', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('from');
    expect(events[0].returnValues).has.property('token');
    expect(events[0].returnValues).has.property('amount');
    expect(events[0].returnValues.from).to.be.equals(deployer.address);
    expect(events[0].returnValues.token).to.be.equals(VITE);
    expect(events[0].returnValues.amount).to.be.equals(sentAmount);

    // check ProposalCreated event
    events = await account.getPastEvents('ProposalCreated', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[1]).has.property('returnValues');
    expect(events[1].returnValues).has.property('id');
    expect(events[1].returnValues).has.property('from');
    expect(events[1].returnValues).has.property('to');
    expect(events[1].returnValues).has.property('tokenAddress');
    expect(events[1].returnValues).has.property('amount');
    expect(events[1].returnValues).has.property('aprovals');
    expect(events[1].returnValues.id).to.be.equals(proposalId);
    expect(events[1].returnValues.from).to.be.equals(alice.address);
    expect(events[1].returnValues.to).to.be.equals(wool.address);
    expect(events[1].returnValues.token).to.be.equals(VITE);
    expect(events[1].returnValues.amount).to.be.equals(proposalAmount);
    expect(events[1].returnValues.approvals).to.be.equals('0');

    // check VoteReceived event
    events = await account.getPastEvents('VoteReceived', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('member');
    expect(events[0].returnValues).has.property('proposalId');
    expect(events[0].returnValues.member).to.be.equals(alice.address);
    expect(events[0].returnValues.proposalId).to.be.equals(proposalId);

    // check TransferApproved event
    events = await account.getPastEvents('TransferApproved', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('id');
    expect(events[0].returnValues.id).to.be.equals(proposalId);

    // check ProposalRemoved event
    events = await account.getPastEvents('ProposalRemoved', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('id');
    expect(events[0].returnValues.id).to.be.equals(proposalId);
  });
});
