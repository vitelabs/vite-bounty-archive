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

describe('test JointAccount', () => {
  before(async function() {
    provider = vite.localProvider();
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);

    // compile
    compiledContracts = await vite.compile('JointAccount.solpp');
    expect(compiledContracts).to.have.property('JointAccountManager');
    expect(compiledContracts).to.have.property('JointAccount');

    // deploy manager only
    manager = compiledContracts.JointAccountManager;
    manager.setDeployer(deployer).setProvider(provider);
    await manager.deploy({});
    expect(manager.address).to.be.a('string');
  });

  it('creates a joint account', async () => {
    // create user accounts
    let alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    let bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    let charlie = vite.newAccount(config.networks.local.mnemonic, 3, provider);
    let dave = vite.newAccount(config.networks.local.mnemonic, 4, provider);

    await deployer.sendToken(alice.address, '10000000');
    await deployer.sendToken(bob.address, '10000000');
    await deployer.sendToken(charlie.address, '10000000');
    await alice.receiveAll();
    await bob.receiveAll();
    await charlie.receiveAll();

    // create a joint account
    const members = [alice.address, bob.address, charlie.address];
    let account = compiledContracts.JointAccount;

    account.setDeployer(deployer).setProvider(provider);
    await account.deploy({
      tokenId: VITE,
      amount: '1000',
      params: [manager.address, members, '2']
    });
    expect(account.address).to.be.a('string');
    expect(await manager.query('accounts', ['0'])).to.be.deep.equal([account.address]);

    let sentAmount = '234';
    await deployer.sendToken(account.address, sentAmount);

    let expectedBalance = '1234';
    expect(await account.balance()).to.be.equal(expectedBalance);

    // member can submit proposal
    let destination = dave.address;
    let proposalAmount = '321';
    let proposalId = '1';
    await account.call('newProposal', [destination, VITE, proposalAmount], {caller: alice});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      alice.address,
      destination,
      VITE,
      proposalAmount,
      '0'
    ]);

    // member can reject proposal
    let rejectedProposalId = proposalId;
    destination = dave.address;
    proposalAmount = expectedBalance;
    proposalId = '2'
    await account.call('newProposal', [destination, VITE, proposalAmount], {caller: alice});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      alice.address,
      destination,
      VITE,
      proposalAmount,
      '0'
    ]);

    // non-member cannot submit proposal
    await account.call('newProposal', [deployer.address, VITE, proposalAmount], {caller: deployer});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      alice.address,
      destination,
      VITE,
      proposalAmount,
      '0'
    ]);

    // member can vote
    await account.call('approveProposal', [], {caller: alice});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      alice.address,
      destination,
      VITE,
      proposalAmount,
      '1'
    ]);

    // ...but only once
    await account.call('approveProposal', [], {caller: alice});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      alice.address,
      destination,
      VITE,
      proposalAmount,
      '1'
    ]);

    // non-member cannot vote
    await account.call('approveProposal', [], {caller: deployer});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      alice.address,
      destination,
      VITE,
      proposalAmount,
      '1'
    ]);

    // Final approval vote, and now proposal is reset
    await account.call('approveProposal', [], {caller: bob});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      NULL_ADDRESS,
      NULL_ADDRESS,
      VITE,
      '0',
      '0',
    ]);

    // Now Dave has his money
    await dave.receiveAll();
    expect(await dave.balance()).to.be.equal(proposalAmount);
    expect(await account.balance()).to.be.equal('0');

    // Try a new proposal, but there are no funds, so it should revert
    await account.call('newProposal', [destination, VITE, "5678"], {caller: alice});
    expect(await account.query('proposal', [])).to.be.deep.equal([
      proposalId,
      NULL_ADDRESS,
      NULL_ADDRESS,
      VITE,
      '0',
      '0',
    ]);

    let events;

    // check Received event
    events = await account.getPastEvents('Received', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('sender');
    expect(events[0].returnValues).has.property('token');
    expect(events[0].returnValues).has.property('amount');
    expect(events[0].returnValues.sender).to.be.equals(deployer.address);
    expect(events[0].returnValues.token).to.be.equals(VITE);
    expect(events[0].returnValues.amount).to.be.equals(sentAmount);

    // check ProposalCreated event
    events = await account.getPastEvents('ProposalCreated', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[1]).has.property('returnValues');
    expect(events[1].returnValues).has.property('id');
    expect(events[1].returnValues).has.property('from');
    expect(events[1].returnValues).has.property('to');
    expect(events[1].returnValues).has.property('token');
    expect(events[1].returnValues).has.property('amount');
    expect(events[1].returnValues.id).to.be.equals(proposalId);
    expect(events[1].returnValues.from).to.be.equals(alice.address);
    expect(events[1].returnValues.to).to.be.equals(dave.address);
    expect(events[1].returnValues.token).to.be.equals(VITE);
    expect(events[1].returnValues.amount).to.be.equals(proposalAmount);

    // check ProposalRejected event
    events = await account.getPastEvents('ProposalRejected', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('id');
    expect(events[0].returnValues.id).to.be.equals(rejectedProposalId);

    // check VoteReceived event
    events = await account.getPastEvents('VoteReceived', {fromHeight: 0, toHeight: 0});
    expect(events).to.be.an('array');
    expect(events[0]).has.property('returnValues');
    expect(events[0].returnValues).has.property('member');
    expect(events[0].returnValues).has.property('proposalId');
    expect(events[0].returnValues.member).to.be.equals(alice.address);
    expect(events[0].returnValues.proposalId).to.be.equals(proposalId);

    // check ProposalFunded event
    events = await account.getPastEvents('ProposalFunded', {fromHeight: 0, toHeight: 0});
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