import { describe } from "mocha";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;


const vite = require('@vite/vuilder');
import config from "./vite.config.json";

let provider: any;
let deployer: any;
let alice: any;
let bob: any;
let charlie: any;
let contract: any;
let erc20: any;
let erc721: any;

const firstTokenId = '1';
const secondTokenId = '2';

const zeroAddress = '0x0';

describe('test dutchAuction', function () {
  before(async function () {
    provider = vite.newProvider("http://127.0.0.1:23456");
    // init users
    deployer = vite.newAccount(config.networks.local.mnemonic, 0, provider);
    alice = vite.newAccount(config.networks.local.mnemonic, 1, provider);
    bob = vite.newAccount(config.networks.local.mnemonic, 2, provider);
    charlie = vite.newAccount(config.networks.local.mnemonic, 3, provider);
    await deployer.sendToken(alice.address, '100000');
    await alice.receiveAll();
    await deployer.sendToken(bob.address, '100000');
    await bob.receiveAll();
    await deployer.sendToken(charlie.address, '100000');
    await charlie.receiveAll();
    //compile an erc20 token
    console.log("prepare erc20 token");
    const erc20Contracts = await vite.compile('simpleErc20.solpp');
    expect(erc20Contracts).to.have.property('SimpleErc20');
    erc20 = erc20Contracts.SimpleErc20;
    erc20.setDeployer(deployer).setProvider(provider);
    await erc20.deploy({params: [], responseLatency: 1});
    expect(erc20.address).to.be.a('string');       
    //compile an erc721 token
    console.log("prepare erc721 token");
    const erc721Contracts = await vite.compile('simpleErc721.solpp');
    expect(erc721Contracts).to.have.property('SimpleErc721');
    erc721 = erc721Contracts.SimpleErc721;
    erc721.setDeployer(deployer).setProvider(provider);
    await erc721.deploy({params: [], responseLatency: 1});
    expect(erc721.address).to.be.a('string');
    await erc721.call('mint', [deployer.address, '1'], {caller:deployer});        
    await erc721.call('mint', [deployer.address, '2'], {caller:deployer});        
    await erc721.call('mint', [deployer.address, '3'], {caller:deployer});        
    await erc721.call('mint', [deployer.address, '4'], {caller:deployer});        
    await erc721.call('mint', [deployer.address, '5'], {caller:deployer});        
    // compile
    console.log("prepare dutch auction contract");
    const compiledContracts = await vite.compile('dutchAuction.solpp');
    expect(compiledContracts).to.have.property('DutchAuction');
    contract = compiledContracts.DutchAuction;
    // deploy
    contract.setDeployer(deployer).setProvider(provider);
    await contract.deploy({params: [], responseLatency: 1});
    expect(contract.address).to.be.a('string');
    //transfer erc20
    console.log('transfer erc20')
    await erc20.call('transfer', [alice.address, '1000000'], {caller:deployer});
    await erc20.call('transfer', [bob.address, '1000000'], {caller:deployer});
    await erc20.call('transfer', [charlie.address, '1000000'], {caller:deployer});
    //approve erc20
    console.log("approve erc20");
    await erc20.call('approve', [contract.address, '100000000'], {caller:alice})
    await erc20.call('approve', [contract.address, '100000000'], {caller:bob})
    await erc20.call('approve', [contract.address, '100000000'], {caller:charlie})    
    //approve erc721
    console.log("approve nft");
    await erc721.call('approve', [contract.address, '1'], {caller:deployer});
    await erc721.call('approve', [contract.address, '2'], {caller:deployer});
    await erc721.call('approve', [contract.address, '3'], {caller:deployer});
    await erc721.call('approve', [contract.address, '4'], {caller:deployer});
    await erc721.call('approve', [contract.address, '5'], {caller:deployer});
  });

  describe('mint', function (){
    it('mint a nft to start a new auction', async function(){
      console.log("mint new auction");
      await contract.call('mint', [1656410608, 1659002607, 1658138607,  1000, 2000, 100, '1', erc721.address, false, erc20.address], {caller:deployer});
      await contract.call('mint', [1656410608, 1659002607, 1658138607,  1000, 2000, 100, '2', erc721.address, false, erc20.address], {caller:deployer});
      await contract.call('mint', [1656410608, 1659002607, 1658138607,  1000, 2000, 100, '3', erc721.address, false, erc20.address], {caller:deployer});
      await contract.call('mint', [1656410608, 1659002607, 1658138607,  1000, 2000, 100, '4', erc721.address, true, deployer.address], {caller:deployer});
      await contract.call('mint', [1656410608, 1659002607, 1658138607,  1000, 2000, 100, '5', erc721.address, true, deployer.address], {caller:deployer});
      expect(await contract.query('balanceOf', [deployer.address])).to.be.deep.equal(['5']);
    });
  });

  describe('balanceOf', function () {
    context('when the given address does not own any tokens', function () {
      it('returns the amount of tokens owned by the given address', async function () {
        expect(await contract.query('balanceOf', [deployer.address])).to.be.deep.equal(['5']);
      });
    });

    context('when the given address does not own any tokens', function () {
      it('returns 0', async function () {
        expect(await contract.query('balanceOf', [alice.address])).to.be.deep.equal(['0']);
      });
    });
  });

  describe('ownerOf', function () {
    context('when the given token ID was tracked by this token', function () {
      const tokenId = firstTokenId;

      it('returns the owner of the given token ID', async function () {
        expect(await contract.query('ownerOf', [tokenId])).to.be.deep.equal([deployer.address]);
      });
    });
  });

  describe('transfers', function () {
    it('owner transfers the ownership of firstToken to the given address', async function () {
      await contract.call('transferFrom', [deployer.address, charlie.address, firstTokenId], {caller: deployer});
      expect(await contract.query('ownerOf', [firstTokenId])).to.be.deep.equal([charlie.address]);
    });

    it('adjusts owners balances', async function () {
      expect(await contract.query('balanceOf', [deployer.address])).to.be.deep.equal(['4']);
    });

    it('adjusts owners tokens by index', async function () {
      expect(await contract.query('tokenOfOwnerByIndex', [charlie.address, '0'])).to.be.deep.equal([firstTokenId]);
      expect(await contract.query('tokenOfOwnerByIndex', [deployer.address, '0'])).to.be.not.deep.equal([firstTokenId]);
    });

  });

  describe('transfers by the approved individual', function () {
    before(async function () {
      await contract.call('approve', [alice.address, secondTokenId], {caller: deployer});
    });

    it('owner transfers the ownership of firstToken to the given address', async function () {
      await contract.call('transferFrom', [deployer.address, charlie.address, secondTokenId], {caller: alice});
      expect(await contract.query('ownerOf', [secondTokenId])).to.be.deep.equal([charlie.address]);
    });

    it('adjusts owners balances', async function () {
      expect(await contract.query('balanceOf', [deployer.address])).to.be.deep.equal(['3']);
    });

    it('adjusts owners tokens by index', async function () {
      expect(await contract.query('tokenOfOwnerByIndex', [charlie.address, '1'])).to.be.deep.equal([secondTokenId]);
    });
  });

  describe('bid a price for a nft', function (){
    it('bid a price lower than start price', async function (){
      try{
        await expect(contract.call('bidForNft', ['1', '10'], {caller:alice})).to.eventually.be.rejectedWith("revert");
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['1'])).to.be.deep.equal(['1000', '0', '0', '100', '0']);
      }
    });

    it('bid a price lower than reverse price', async function (){
      try{
        await contract.call('bidForNft', ['1', '1500'], {caller:alice});
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['1'])).to.be.deep.equal(['1000', '2000', '1500', '100', '6']);
      }
    });

    it('bid a price large than reverse price', async function (){
      try{
        await expect(contract.call('bidForNft', ['1', '3000'], {caller:alice})).to.eventually.be.rejectedWith("revert");
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['1'])).to.be.deep.equal(['1000', '2000', '1500', '100', '6']);
      }      
    });

    it('bid a price large than reverse price', async function (){
      try{
        await contract.call('bidForNft', ['2', '3000'], {caller:alice});
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['2'])).to.be.deep.equal(['1000', '2000', '3000', '100', '5']);
      }      
    });    

    it('bid a price for an erc20 payment', async function (){
      try{
        await contract.call('bidForNft', ['5', '3000'], {caller:alice, amount:'3000'});
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['5'])).to.be.deep.equal(['1000', '2000', '3000', '100', '5']);
      }        
    });
  });

  describe('cancel a auction', function (){
    it('cancel auction 1', async function (){
      try{
        await expect(contract.call('cancelAuction', ['1'], {caller:deployer})).to.eventually.be.rejectedWith("revert");
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['1'])).to.be.deep.equal(['1000', '2000', '1500', '100', '6']);
      }   
    });

    it('cancel auction 3', async function (){
      try{
        await contract.call('cancelAuction', ['3'], {caller:deployer});
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['3'])).to.be.deep.equal(['1000', '2000', '0', '100', '2']);
      }         
    });

    it('cancel auction 5', async function (){
      try{
        await expect(contract.call('cancelAuction', ['5'], {caller:deployer})).to.eventually.be.rejectedWith("revert");
      }finally{
        expect(await contract.query('getAucPriceInfoById', ['5'])).to.be.deep.equal(['1000', '2000', '3000', '100', '5']);
      }         
    });        
  });

  describe('get auction base info by id', function () {
    it('get auction 1', async function () {
      expect(await contract.query('getAucBaseInfoById', ['1'])).to.be.deep.equal(['1', '1', erc721.address, deployer.address, erc20.address, alice.address]);
    });

    it('get auction 4', async function () {
      expect(await contract.query('getAucBaseInfoById', ['4'])).to.be.deep.equal(['4', '4', erc721.address, deployer.address, 'vite_0000000000000000000000000000000000000000a4f3a0cb58', 'vite_0000000000000000000000000000000000000000a4f3a0cb58']);
    });
  });    

  describe('get auction price info by id', function () {
    it('get auction 1', async function () {
      expect(await contract.query('getAucPriceInfoById', ['1'])).to.be.deep.equal(['1000', '2000', '1500', '100', '6']);
    });

    it('get auction 3', async function () {
      expect(await contract.query('getAucPriceInfoById', ['3'])).to.be.deep.equal(['1000', '2000', '0', '100', '2']);
    });
  });  

  describe('get auction time info by id', function () {
    it('get auction 1', async function () {
      expect(await contract.query('getAucTimeInfoById', ['1'])).to.be.deep.equal(['1656410608', '1659002607', '1658138607']);
    });

    it('get auction 3', async function () {
      expect(await contract.query('getAucTimeInfoById', ['3'])).to.be.deep.equal(['1656410608', '1659002607', '1658138607']);
    });
  });      

  describe('get auction paginations indexs by page size and page count', function () {
    it('get auction paginations indexs by size 10, page 0, type 0, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '0', false])).to.be.deep.equal([['4'],'1']);
    });

    it('get auction paginations indexs by size 10, page 0, type 1, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '1', false])).to.be.deep.equal([[],'0']);
    });

    it('get auction paginations indexs by size 10, page 0, type 2, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '2', false])).to.be.deep.equal([['3'],'1']);
    });

    it('get auction paginations indexs by size 10, page 0, type 3, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '3', false])).to.be.deep.equal([[],'0']);
    });

    it('get auction paginations indexs by size 10, page 0, type 4, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '4', false])).to.be.deep.equal([[],'0']);
    });

    it('get auction paginations indexs by size 10, page 0, type 5, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '5', false])).to.be.deep.equal([['2','5'],'2']);
    });    

    it('get auction paginations indexs by size 10, page 0, type 6, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '6', false])).to.be.deep.equal([['1'],'1']);
    });   

    it('get auction paginations indexs by size 10, page 0, type 7, owner false', async function () {
      expect(await contract.query('getAuctionPaginations', ['10', '0', '7', false])).to.be.deep.equal([['1','2','3','5'],'4']);
    });                            
  });  
});