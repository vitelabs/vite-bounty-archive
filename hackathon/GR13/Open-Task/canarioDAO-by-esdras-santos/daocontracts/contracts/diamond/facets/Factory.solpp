// SPDX-License-Identifier: MIT
pragma soliditypp ^0.8.0;

import "./Exchange.solpp";
import "../libraries/LibDiamond.solpp";

contract Factory {
    event NewExchange(address indexed token, address indexed exchange);


    function createExchange(address token) external returns(address){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        require(token != address(0x00));
        require(ds.tokenToExchange[token] == address(0x00));
        Exchange exchangeTemplate = new Exchange();
        exchangeTemplate.setup(token);
        ds.tokenToExchange[token] = address(exchangeTemplate);
        ds.exchangeToToken[address(exchangeTemplate)] = token;
        uint256 tokenId = ds.tokenCount + 1;
        ds.tokenCount = tokenId;
        ds.idToToken[tokenId] = token;
        emit NewExchange(token, address(exchangeTemplate));
        return address(exchangeTemplate);
    }

    function getExchange(address token) external view returns(address){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        return ds.tokenToExchange[token];
    }

    function getToken(address exchange) external view returns(address){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        return ds.exchangeToToken[exchange];
    }

    function getTokenWithId(uint256 tokenid) external view returns(address){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        return ds.idToToken[tokenid];
    }
}