// SPDX-License-Identifier: MIT
pragma soliditypp ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../libraries/LibDiamond.solpp";

// this is a basi basic treasury management system and can never be used in production
contract Treasury{

    function setBudget(uint256 _newBudget) external{
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        IERC20 token = IERC20(ds.governanceToken);
        require(msg.sender == ds.contractOwner);
        require(_newBudget <= token.balanceOf(address(this)));
        require(block.timestamp >= ds.period);
        ds.budget = _newBudget;
        ds.period = block.timestamp + 90 days;
    }

    function transfer(address _to, uint256 _amount) external {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        require(msg.sender == ds.contractOwner);
        require(_to != address(0));
        require(_amount <= ds.budget);
        ds.budget -= _amount;
        IERC20 token = IERC20(ds.governanceToken);
        token.transfer(_to, _amount);
    }
}