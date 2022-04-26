// SPDX-License-Identifier: MIT
pragma soliditypp ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GOD is ERC20Votes{
    uint256 public maxSupply = 100000000e8;

    constructor() ERC20("GOD","GOD") ERC20Permit("GOD") {
        _mint(msg.sender, maxSupply);
    }

    function _afterTokenTransfer(
        address from, 
        address to,
        uint256 amount
    ) internal override(ERC20Votes){
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes){
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20Votes)
    {
        super._burn(account, amount);
    }
}