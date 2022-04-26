pragma solidity ^0.4.24;
     
contract DepositYourEth {
    
    address public landlord;
    address[] public DepositsMade;
    mapping(address => bool) public depositors;
    
    constructor() public {
        landlord = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == landlord);
        _;
    }

    function depositEth(address tenant, uint PropertyNumber) public payable {
        require(PropertyNumber >= 0);
        depositors[tenant] = true;
        landlord.transfer(msg.value);
        depositors[msg.sender] = true;
        DepositsMade.push(tenant);
    }

    function Withdraw(address tenant) public payable restricted{
        require(depositors[tenant]);
        tenant.transfer(msg.value);
    }
    
    function getDepositors() public view returns (address[]){
        return DepositsMade;
    }

}