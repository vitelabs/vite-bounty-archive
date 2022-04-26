// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC20.sol";
contract Vite is ERC20{
    constructor() ERC20("Vite Token","VITE"){
        _mint(msg.sender,10**9*(10 ** uint256(decimals())));
    }
}