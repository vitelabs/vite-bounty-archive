// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./_utils/SafeMath.sol";
import "./interfaces/AggregatorV2V3Interface.sol";

contract PredictionCore{
    using SafeMath for uint;
    using SafeMath80 for uint80;
    enum Status{PENDING, TIE, LONG, SHORT}
    struct Market{
        uint80 startingRound;
        mapping(address => uint[]) activeCycle;
        mapping(uint => pool) pools;
        AggregatorV2V3Interface feed;
    }
    struct pool{
    uint totalLongs;
    uint totalShorts;
    mapping (address => bool) isWithdrawn;
    mapping (address => uint) Longs;
    mapping (address => uint) Shorts;
    }

    uint constant MINIMUM_BID = 10 * 10 ** 18;
    uint constant PERCENTAGE = 6;
    uint constant LOCKED_PERCENTAGE = 2;
    uint marketCount = 0;
    uint80 constant CYCLE = 50;
    mapping (uint => Market) markets;
    modifier validFeed(uint _i){
        require(marketCount > _i,"JACKPOT STRIKE: Invalid Feed ");
        _;
    }
    modifier validCycle(uint _i, uint80 cycle){
        require(getLatestCycle(_i)>=cycle,"JACKPOT STRIKE: Invalid Cycle");
        _;
    }
    function getPriceStatus(uint _i,uint80 _cycle)
        public validCycle(_i,_cycle) validFeed(_i) view returns(Status){
        require(getLatestCycle(_i)>=_cycle,"JACKPOT STRIKE: Invalid Cycle");
        uint80 _r0 = getStartingRound(_i).add(_cycle*CYCLE);
        require(getTimestamp(_i,_r0) > 0,"JACKPOT STRIKE: invalid Round");
        Status state;
        uint80 _r1 = _r0.add(CYCLE);
        (uint UPPER, uint LOWER) = getPriceBoundries(_i,_cycle);
        for(uint80 r = _r0; r<=_r1; r++ ){
            if( getRoundId(markets[_i].feed) < r) break;
            uint price = getRoundPrice(_i,r);
            if(price >= UPPER){
                state = Status.LONG;
                break;
            }else if(price <= LOWER){
                state = Status.SHORT;
                break;
            }
        }
        if(state == Status.PENDING && getLatestCycle(_i) > _cycle) state = Status.TIE;
        return state;
    }
    function getPriceBoundries(uint _i, uint80 cycle)
        public validFeed(_i) view returns(uint UPPER, uint LOWER){
        require(getLatestCycle(_i)>=cycle,"JACKPOT STRIKE: Invalid Cycle");
        uint80 start = getStartingRound(_i).add(cycle.mul(CYCLE));
        uint price = getRoundPrice(_i,start);
        uint adjustedPrice = price.mul(PERCENTAGE).div(100);
        require(price > 0,"JACKPOT STRIKE: Price Not Feeded");
        UPPER = price.add(adjustedPrice);
        LOWER = price.sub(adjustedPrice);
    }
    function isPriceLocked(uint _i)
        public view returns(bool){
        (uint H, uint L) = getPriceBoundries(_i,getLatestCycle(_i));
        uint latestPrice = getLatestPrice(_i);
        H = H.sub((H.mul(LOCKED_PERCENTAGE)).div(100));
        L = L.add((L.mul(LOCKED_PERCENTAGE)).div(100));
        return (latestPrice<=H && latestPrice>=L);
    }
    function getTimestamp(uint _i, uint80 round)
        public validFeed(_i) view returns(uint){
        uint time = markets[_i].feed.getTimestamp(round);
        require(time > 0,"JACKPOT STRIKE: Invalid Round");
        return time;
    }
    function getRoundId(AggregatorV2V3Interface feed)
        internal view returns(uint80){
        ( uint80 roundID, , , ,) = feed.latestRoundData();
        return roundID;
    }
    function getLatestPrice(uint _i)
        public view returns(uint){
        ( ,int price, , , ) = markets[_i].feed.latestRoundData();
        return (uint(price)*10**10);
    }
    function getRoundPrice(uint _i, uint80 round)
        public view validFeed(_i) returns (uint){
        (uint80 roundID, int price, , ,) = markets[_i].feed.getRoundData(round);
        require(getTimestamp(_i,roundID) > 0, "JACKPOT STRIKE: Price Not Available");
        return (uint(price * 10**10));
    }
    function getLatestCycle(uint _i)
        public validFeed(_i) view returns(uint80){
        uint80 rounds = getRoundId(markets[_i].feed).sub(getStartingRound(_i));
        uint cycles = rounds.sub(rounds.mod(CYCLE)).div(CYCLE);
        return uint80(cycles);
    }
    function getLatestRoundInCycle(uint _i)
        public validFeed(_i) view returns(uint80){
        uint80 cycle = getLatestCycle(_i);
        (uint80 roundID, , , ,) = markets[_i].feed.latestRoundData();
        require(getTimestamp(_i,roundID) > 0, "JACKPOT STRIKE: Round Not Available");
        uint80 roundsPassed = roundID.sub(getStartingRound(_i).add(cycle.mul(CYCLE))).add(1);
        return roundsPassed;
    }
    function getCyclesParticipation(uint _i) public view returns(uint[] memory){
        return markets[_i].activeCycle[msg.sender];
    }
    function getStartingRound(uint _i) internal view returns(uint80){
        return markets[_i].startingRound;
    }
    function getPair(uint _i) public view validFeed(_i) returns(string memory) {
        return markets[_i].feed.description();
    }
    function getTotalLongs(uint _i,uint80 _cycle) internal view  returns(uint){
        return markets[_i].pools[_cycle].totalLongs;
    }
    function getIsWithdrawn(uint _i,uint80 _cycle) public view  returns(bool){
        return markets[_i].pools[_cycle].isWithdrawn[msg.sender];
    }
    function getTotalShorts(uint _i,uint80 _cycle) internal view returns(uint){
        return markets[_i].pools[_cycle].totalShorts;
    }
    function getShort(uint _i,uint80 _cycle) internal view returns(uint){
        return markets[_i].pools[_cycle].Shorts[msg.sender];
    }
    function getLong(uint _i,uint80 _cycle) internal view returns(uint){
        return markets[_i].pools[_cycle].Longs[msg.sender];
    }
}