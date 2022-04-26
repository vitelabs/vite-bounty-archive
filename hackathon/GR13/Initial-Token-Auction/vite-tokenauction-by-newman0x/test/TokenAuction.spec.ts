import { describe } from "mocha";
import { expect } from "chai";
const vite = require('@vite/vuilder');
import config from "./vite.config.json";

let provider: any;
let deployer: any;
let bidder: any;
let bidder2: any;
let bidder3: any;
let contract: any;

// bids before auction
let initialBids: any;
// bids after auction
let sortedBids: any;
// amount before auction
let initialTeamBalance: any;
// amount after auction
let finalTeamBalance: any;

describe('[Initializing Test]', () => {
  before(async function() {
    provider = vite.localProvider();
    deployer = vite.newAccount(config.networks.local.mnemonic, 0);
    bidder = vite.newAccount(config.networks.local.mnemonic, 1);
    bidder2 = vite.newAccount(config.networks.local.mnemonic, 2);
    bidder3 = vite.newAccount(config.networks.local.mnemonic, 3);
    // load accounts
    await deployer.sendToken(bidder.address, '25000000000000000000');
    await bidder.receiveAll();
    await deployer.sendToken(bidder2.address, '25000000000000000000');
    await bidder2.receiveAll(); 
    await deployer.sendToken(bidder3.address, '25000000000000000000');
    await bidder3.receiveAll();
    
  });

  it('Deployed Contract', async () => {
    // compile
    const compiledContracts = await vite.compile('TokenAuction.solpp');
    expect(compiledContracts).to.have.property('TokenAuction');

    // deploy
    contract = compiledContracts.TokenAuction;
    contract.setDeployer(deployer).setProvider(provider);
    await contract.deploy({params: ['Team-Name'], responseLatency: 1});
    expect(contract.address).to.be.a('string');
    console.log('Successfully deployed: ', contract.address);
  });
});

describe('[Starting Auction]', () => {
  it('Auction Started', async () => {
    // for testing purposes auctioning VITE for a duration of 35 seconds
    await contract.call('startAuction', ['tti_5649544520544f4b454e6e40', '35'], {caller: deployer, amount: '500000000000000000000'});
    let instance = await contract.query('AuctionIndex', ['1']);
    console.log('Auction Index: ', instance[0]);
    expect(instance[0]).to.be.equal('1');
    console.log('Auction Token: ', instance[1]);
    expect(instance[1]).to.be.equal('tti_5649544520544f4b454e6e40');
    console.log('Tokens Locked: ', instance[2]);
    expect(instance[2]).to.be.equal('500000000000000000000');
    console.log('Start Date TS: ', instance[3]);
    console.log('End Date TS: ', instance[4]);
    // get auction state
    await contract.call('loadActiveAuctions', [], {caller: bidder});
    let auctionState = await contract.query('viewActiveAuctions', []);
    expect(auctionState).to.be.deep.equal([['1' ]]);
    console.log('STATE: Active');

  });
});

describe('[Simulating Bid Process]', () => {
  it('Bid Placed', async () => {
    console.log(' ~ Single Bid Test - Place and Cancel ~')
    console.log('placing bid . . .')
    let balance1 = await bidder.balance();
    console.log('Balance before bid:', balance1);
    expect(balance1).to.be.equal('25000000000000000000');
    await contract.call('placeBid', ['1', '2500000000000000000'], {caller: bidder, amount: '12000000000000000000'});
    console.log('Bid Successfully Placed');
    let balance2 = await bidder.balance();
    console.log('Balance after bid', balance2);
    expect(balance2).to.be.equal('13000000000000000000');
  });

  it('Bid Cancelled', async () => {
    console.log('cancelling bid. . .')
    await contract.call('cancelBid', ['1'], {caller: bidder});
    // user should get back their deposit
    await bidder.receiveAll();
    let balance3 = await bidder.balance();
    console.log('Balance after cancelling bid', balance3);
    expect(balance3).to.be.equal('25000000000000000000');
  });

  it('Bids Placed', async () => {
    console.log(' ~ Multiple Bid Test - Regular Auction ~')
    // every user has same ask rate for testing
    console.log('placing bid . . .');
    await contract.call('placeBid', ['1', '1500000000000000000'], {caller: bidder, amount: '7000000000000000000'});
    console.log('Bidder1 successfully placed bid');
   
    console.log('placing bid . . .');
    await contract.call('placeBid', ['1', '1500000000000000000'], {caller: bidder2, amount: '4000000000000000000'});
    console.log('Bidder2 successfully placed bid');
   
    console.log('placing bid . . .');
    await contract.call('placeBid', ['1', '1500000000000000000'], {caller: bidder3, amount: '12000000000000000000'});
    console.log('Bidder3 successfully placed bid');
   
    let totalBidders = await contract.query('getTotalBidders', ['1']);
    console.log('Total bidders: ', totalBidders);
    expect(totalBidders).to.be.deep.equal(['3']);
  });

  it('Auction Resolved', async () => {
    // get unsorted list before resolve
    initialBids = await contract.query('getAllBids', ['1']);
    // reset team balance before resolve to view amount raised
    let burn = vite.newAccount(config.networks.local.mnemonic, 4);
    let cleanSlate = await deployer.balance();
    await deployer.sendToken(burn.address, cleanSlate);
    await burn.receiveAll();
    initialTeamBalance = await deployer.balance();
    // ensure auction period is over
    console.log('waiting few seconds for auction to finish . . .')
    await vite.utils.sleep(25000);
    // get auction state
    await contract.call('loadUnresolvedAuctions', [], {caller: bidder});
    let auctionState = await contract.query('viewUnresolvedAuctions', []);
    expect(auctionState).to.be.deep.equal([['1' ]]);
    console.log('STATE: Resolve');

    await contract.call('resolveAuction', ['1'], {caller: deployer});
    // everyone should receive tokens for this test
    console.log('disbursing tokens . . .')
    await deployer.receiveAll();
    await bidder.receiveAll();
    await bidder2.receiveAll();
    await bidder3.receiveAll();

    let forTeam = await contract.getPastEvents('TeamReceived', {fromHeight: 0, toHeight: 0});
    console.log('[Events] Vite disbursed to team for each bid');

    // expect to receive tokens in-order high to low
    console.log('team received: ', forTeam[0].returnValues[1]);
    expect(forTeam[0].returnValues[1]).to.be.equal('12000000000000000000');
    console.log('team received: ', forTeam[1].returnValues[1]);
    expect(forTeam[1].returnValues[1]).to.be.equal('7000000000000000000');
    console.log('team received: ', forTeam[2].returnValues[1]);
    expect(forTeam[2].returnValues[1]).to.be.equal('4000000000000000000');

    let forBidders = await contract.getPastEvents('BidderReceived', {fromHeight: 0, toHeight: 0});
    console.log('[Events] Tokens disbursed to each bidder');

    // expect tokens to be disbursed in-order high to low
    console.log('Bidder1 received: ', forBidders[0].returnValues[2]);
    expect(forBidders[0].returnValues[2]).to.be.equal('8000000000000000000');
    console.log('Bidder2 received: ', forBidders[1].returnValues[2]);
    expect(forBidders[1].returnValues[2]).to.be.equal('4000000000000000000');
    console.log('Bidder3 received: ', forBidders[2].returnValues[2]);
    expect(forBidders[2].returnValues[2]).to.be.equal('2000000000000000000');

    console.log('Auction resolved');

    // get auction state
    await contract.call('loadEndedAuctions', [], {caller: bidder});
    auctionState = await contract.query('viewEndedAuctions', []);
    expect(auctionState).to.be.deep.equal([['1' ]]);
    console.log('State: End');
  });

  it('Bids Sorted', async () => {
    sortedBids = await contract.query('getAllBids', ['1']);
    console.log('List of bids prior to resolve', initialBids);
    expect(initialBids).to.be.deep.equal([['7000000000000000000', '4000000000000000000', '12000000000000000000']]);
    console.log('List of bids after resolve', sortedBids);
    expect(sortedBids).to.be.deep.equal([['12000000000000000000', '7000000000000000000','4000000000000000000' ]]);
  });

  it('Funds Raised', async() => {
    finalTeamBalance = await deployer.balance();
    console.log('Team balance prior to resolve', initialTeamBalance);
    expect(initialTeamBalance).to.be.equal('0');
    let tvl = await contract.query('getTotalVolume', [1]);
    // tvl should equal sum of all deposits
    expect(tvl).to.be.deep.equal(['23000000000000000000']);
    console.log('Total volume raised by auction', tvl);
    console.log('Team balance after resolve', finalTeamBalance);
    // tvl should go to team wallet
    expect([finalTeamBalance]).to.be.deep.equal(tvl);
  })
    
});