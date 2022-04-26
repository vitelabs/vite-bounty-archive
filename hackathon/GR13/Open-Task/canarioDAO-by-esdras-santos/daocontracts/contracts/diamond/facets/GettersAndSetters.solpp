// SPDX-License-Identifier: MIT
pragma soliditypp ^0.8.0;

import "../libraries/LibDiamond.solpp";

contract GettersAndSetters{

    function getTokenCount() external view returns(uint256){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        return ds.tokenCount;
    }

    function setTreasuryToken(address _token) external{
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        require(msg.sender == ds.contractOwner);
        require(_token != address(0x00));
        ds.governanceToken = _token;
    }

    function getTreasuryToken() external view returns(address){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        return ds.governanceToken;
    }
}