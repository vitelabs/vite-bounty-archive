//pragma solidity >=0.8.0 <0.9.0;
////SPDX-License-Identifier: MIT
//
//import "hardhat/console.sol";
//// import "@openzeppelin/contracts/access/Ownable.sol"; //TODO: investigate
//// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
//import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//
//// rename to PropertyNFT
//contract YourContract is ERC1155 {
//
//    // contract's "state variables" which are stored on chain
//    mapping(uint256 => mapping(address => uint256)) public propertyShares;
//    mapping(uint256 => address[]) public propertyOwners;
//    //string[] public ipfsData;
//    uint256 public currentPropertyID = 0;
//    uint256 public defaultSupply = 52;
//
//    // property struct
//    struct Property {
//        address creator;
//        uint256 id;
//        bytes ipfsData;
//        uint256 price;
//        uint256 availableShares;
//    }
//
//    Property[] public properties;
//
//    // Events
//    event PropertyCreated(address indexed owner, uint256 indexed propertyID, uint256 shares, uint256 price, bytes ipfsData);
//
//    // this is what scaffold ETH uses to deploy the contract and make requests
//    address public msgSender;
//
//    // constructor for out PropertyNFT contract
//    constructor() public ERC1155(""){
//        msgSender = msg.sender; // this probably not necessary w/o scaffold.eth
//    }
//
//    // allows the user to create a Property and gives them all shares of the Property
//    function createProperty(bytes memory ipfsData, uint256 price) public {
//        // give the person who create the property all of the tokens for this property
//        _mint(msg.sender, currentPropertyID, defaultSupply, ipfsData);
//        // create the property
//        Property memory property = Property(msg.sender, currentPropertyID, ipfsData, price, defaultSupply);
//        // add the property to the list of properties
//        properties[currentPropertyID] = property;
//        currentPropertyID += 1;
//        emit PropertyCreated(msg.sender, currentPropertyID-1, defaultSupply, price, ipfsData);
//    }
//
//    //function buyProperty(unit256 propertyID, unit256 numberOfShares) public {
//
//    //}
//
//    // check if an account has any ownership in a property
//    // permissions: anyone can check who owns a property.
//    function balanceOf(address accountToCheck, uint256 propertyId) public view override returns (uint256){
//        return propertyShares[propertyId][accountToCheck];
//    }
//
//}
