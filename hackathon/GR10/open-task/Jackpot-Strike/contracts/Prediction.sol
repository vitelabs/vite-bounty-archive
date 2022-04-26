// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC20.sol";
import "./_utils/SafeMath.sol";
import "./PredictionCore.sol";
import "./interfaces/AggregatorV2V3Interface.sol";
import "./Ownable.sol";

contract Prediction is Ownable,PredictionCore{
    using SafeMath for uint;
    using SafeMath80 for uint80;
    IERC20 private Token = IERC20(0xa0228a6c2e57A3FcAAE1d12F33bF478E42ef9A49);
    event _bid(
        bool indexed bidType,
        address indexed bidder,
        uint amount
        );
    function addToken(
        address token,
        uint80 _startingRound)
        public onlyOwner
        {
        markets[marketCount].feed = AggregatorV2V3Interface(token);
        markets[marketCount].startingRound = _startingRound;
        marketCount++;
    }
    function addArrayToken(
        address[] calldata token,
        uint80[] calldata _startingRound)
        public onlyOwner
        {
        require(token.length != 0, "array is empty");
        require(_startingRound.length != 0, "array is empty");
        require(token.length == _startingRound.length, "unequal array size");
        for(uint i = 0; i<token.length;i++ ) addToken(token[i],_startingRound[i]);
    }
    constructor(){
        addToken(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e,36893488147419103300);//Eth
        addToken(0xECe365B379E1dD183B20fc5f022230C044d51404,36893488147419103300);//Btc
        addToken(0xcf0f51ca2cDAecb464eeE4227f5295F2384F84ED,36893488147419103300);//Bnb
        addToken(0xd8bD0a1cB028a31AA859A21A3758685a95dE4623,36893488147419103300);//Link
        addToken(0x031dB56e01f82f20803059331DC6bEe9b17F7fC9,36893488147419103300);//Bat
        addToken(0xb29f616a0d54FF292e997922fFf46012a63E2FAe,36893488147419103300);//TRX
        addToken(0xF7Bbe4D7d13d600127B6Aa132f1dCea301e9c8Fc,36893488147419103300);//ZRX
        addToken(0xf57FCa8B932c43dFe560d3274262b2597BCD2e5A,36893488147419103300);//XTZ
        addToken(0xc3E76f41CAbA4aB38F00c7255d4df663DA02A024,36893488147419103300);//XRP
    }
    function _deposit(uint amount) internal{
        //convert to 18 decimals format
        require(Token.balanceOf(_msgSender())>=amount,"insufficient balance");
        require(Token.allowance(_msgSender(),address(this)) >= amount,"unapproved transaction");
        Token.transferFrom(_msgSender(),address(this),amount);
    }
    function _withdraw(
        uint _i,
        uint80 _cycle,
        uint amount) internal
        {
        markets[_i].pools[_cycle].isWithdrawn[msg.sender] = true;
        Token.transfer(msg.sender,amount);
    }
    // we used 10**18 as a % to retrieve an accurate participant portion from total position
    // when returned the value need to be divided by 10**18
    function _reward(
        uint _i,
        uint80 _cycle,
        bool _type)
        internal view returns(uint reward)
        {
        uint totalStake;
        uint totalOpStake;
        uint ratio;
        uint stake;
        if(_type){
            totalStake = getTotalLongs(_i,_cycle);
            stake = getLong(_i,_cycle);
            ratio = (stake.mul(10**18)).div(totalStake);
            totalOpStake = getTotalShorts(_i,_cycle);
            reward = (totalOpStake.mul(ratio)).div(10**18);
        }else{
            totalStake = getTotalShorts(_i,_cycle);
            stake = getShort(_i,_cycle);
            ratio = (stake.mul(10**18)).div(totalStake);
            totalOpStake = getTotalLongs(_i,_cycle);
            reward = (totalOpStake.mul(ratio)).div(10**18);
        }
    }
    // bid - true: Long, false: short
    function bid(
        uint _i,
        uint amount,
        bool position)
        public validFeed(_i)
        {
        uint80 cycle = getLatestCycle(_i);
        uint[] memory activeCycles = markets[_i].activeCycle[msg.sender];
        require(amount >= MINIMUM_BID, "JACKPOT STRIKE: Bidding Amount Must Be >= 10$");
        require(getPriceStatus(_i,cycle) == Status.PENDING,"JACKPOT STRIKE: Cycle Has Been Determined!");
        require(isPriceLocked(_i),"JACKPOT STRIKE: Price Locked Rrange!");
        if(position){
            require(getShort(_i,cycle) == 0, "JACKPOT STRIKE: Short Position Is In Place!");
            _deposit(amount);
            markets[_i].pools[cycle].Longs[msg.sender] += amount;
            markets[_i].pools[cycle].totalLongs += amount;
            if(activeCycles.length != 0){
            if(activeCycles[activeCycles.length-1] != cycle) markets[_i].activeCycle[msg.sender].push(cycle);
            }else{
            markets[_i].activeCycle[msg.sender].push(cycle);
            }
            emit _bid(position, msg.sender, amount);
        }else{
            require(getLong(_i,cycle) == 0, "JACKPOT STRIKE: Long Position Is In Place!");
            _deposit(amount);
            markets[_i].pools[cycle].Shorts[msg.sender] += amount;
            markets[_i].pools[cycle].totalShorts += amount;
            if(activeCycles.length != 0){
            if(activeCycles[activeCycles.length-1] != cycle) markets[_i].activeCycle[msg.sender].push(cycle);
            }else{
            markets[_i].activeCycle[msg.sender].push(cycle);
            }
            emit _bid(position, msg.sender, amount);
        }
    }
    function withdraw(uint _i, uint80 _cycle) public validFeed(_i) validCycle(_i,_cycle) {
        uint long = getLong(_i,_cycle);
        uint short = getShort(_i,_cycle);
        Status status = getPriceStatus(_i,_cycle);
        require(status != Status.PENDING, "JACKPOT STRIKE: Cycle Is In Progress!");
        require(long != 0 || short != 0, "JACKPOT STRIKE: Invalid participant!");
        require(_cycle < getLatestCycle(_i),"JACKPOT STRIKE: Withdraw Is Active After Cycle Is Over!"); // might be deleted
        require(markets[_i].pools[_cycle].isWithdrawn[msg.sender] == false, "JACKPOT STRIKE: Funds Have Been Withdrawn!");
        uint position;
        uint finalReward;
        Status state;
        if(long>0){position = long;}
        else if(short>0){position = short;}
        if(status != Status.TIE){
            if(long>0){state = Status.LONG;}
            else if(short>0){state = Status.SHORT;}
            require(status == state,"JACKPOT STRIKE: You Have Been Liquidated!");
        }
        if(status == Status.TIE){
            _withdraw(_i,_cycle,position);
        }else if(status == Status.LONG){
            finalReward = position.add(_reward(_i,_cycle,true));
            _withdraw(_i,_cycle,finalReward);
        }else if(status == Status.SHORT){
            finalReward = position.add(_reward(_i,_cycle,false));
            _withdraw(_i,_cycle,finalReward);
        }
    }
}



