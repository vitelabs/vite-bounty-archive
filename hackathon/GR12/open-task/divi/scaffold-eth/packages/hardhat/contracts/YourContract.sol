pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; //TODO: investigate
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// rename to PropertyNFT
contract YourContract is ERC1155 {

    // contract's "state variables" which are stored on chain
    mapping(uint256 => mapping(address => uint256)) public propertyShares;
    mapping(uint256 => address[]) public propertyOwners;
    //string[] public ipfsData;
    uint256 public currentPropertyID = 0;
    uint256 public currentOrderID = 0;
    uint256 public defaultSupply = 52;

    // property struct
    struct Property {
        address creator;
        uint256 id;
        uint256 pricePerShare;
        uint256 availableShares;
        bool isForSale;
    }
    Property[] public properties;

    enum Status {
            Pending,
            Accepted,
            Rejected
        }

    // property order request struct
    struct PropertyOrderRequest {
        uint256 orderID;
        address payable requester;
        uint256 propertyID;
        uint256 requestedShares;
        Status status;
    }
    PropertyOrderRequest[] public propertyOrderRequests;

    // Events
    event PropertyCreated(address indexed owner, uint256 indexed propertyID, uint256 shares, uint256 pricePerShare);
    event PropertyTransferred(address indexed from, address indexed to, uint256 indexed propertyID, uint256 shares);
    event PropertyOrderRequested(uint256 indexed orderID, address indexed requester, uint256 propertyID, uint256 requestedShares);

    // this is what scaffold ETH uses to deploy the contract and make requests
    address public msgSender;

    // constructor for out PropertyNFT contract
    constructor() public ERC1155(""){
        msgSender = msg.sender; // this probably not necessary w/o scaffold.eth
    }

    // allows the user to create a Property and gives them all shares of the Property
    function createProperty(uint256 price) public {
        uint256 pricePerShare = price/defaultSupply;
        // give the person who create the property all of the tokens for this property
        _mint(msg.sender, currentPropertyID, defaultSupply, "");
        // create the property
        Property memory property = Property(msg.sender, currentPropertyID, pricePerShare, defaultSupply, true);
        // add the property to the list of properties
        properties.push(property);
        propertyShares[currentPropertyID][msg.sender] = defaultSupply;
        currentPropertyID += 1;
        emit PropertyCreated(msg.sender, currentPropertyID-1, defaultSupply, pricePerShare);
    }

    // request to buy shares of a property
    // msg.sender is the person who is asking to buy shares
    function requestPropertyShares(uint256 propertyID, uint256 shares) payable public {
        uint256 totalCost = shares * properties[propertyID].pricePerShare;

        // check if the property exists
        require(propertyID < currentPropertyID, "Property does not exist");
        require(msg.value >= totalCost, "Must sent more ETH"); // TODO: return difference to sender if more than enough
        require(msg.sender != properties[propertyID].creator, "Cannot buy your own property");
        require(shares <= properties[propertyID].availableShares, "Not enough shares of the property available");
        require(shares > 0, "Must request more than 0 shares");

        PropertyOrderRequest memory propertyOrderRequest = PropertyOrderRequest(currentOrderID, payable(msg.sender), propertyID, shares, Status.Pending);
        propertyOrderRequests.push(propertyOrderRequest);
        currentOrderID += 1;



        emit PropertyOrderRequested(currentOrderID-1, msg.sender, propertyID, shares);
    }

    // allows the user to sell shares of a Property to another address
    function approveOrderSale(uint256 orderID) public {

        // check if the order exists
        require(orderID < currentOrderID, "Order does not exist");
        // check that the order is pending
        require(propertyOrderRequests[orderID].status == Status.Pending, "Order is not pending");
        // check if the user has enough money to pay the seller
        // require(msg.sender.balance >= totalCost, "Not enough ETH to pay seller"); // TODO: ensure front end checks this

        PropertyOrderRequest memory propertyOrderRequest = propertyOrderRequests[orderID];
        address payable buyer = propertyOrderRequest.requester;
        Property memory property = properties[propertyOrderRequest.propertyID];
        uint256 totalCost = property.pricePerShare * propertyOrderRequest.requestedShares;

        // check if the user has enough shares to sell
        require(propertyShares[property.id][msg.sender] >= propertyOrderRequest.requestedShares, "You don't have enough shares to sell");
        // check if the user is going to pay enough tokens to make the sale
        //require(msg.value >= totalCost, "Not enough funds to purchase this many shares"); // TODO: ensure how we are checking which token the user is paying with. (propbably in msg.)

        // check if contract wallet has enough funds
        require(address(this).balance >= totalCost, "Not enough ETH to pay seller"); // TODO: ensure front end checks this

        // transfer the tokens (ETH) for payment to the seller
        payable(msg.sender).transfer(totalCost);
        //approve ss the transfer
        _setApprovalForAll(msg.sender, address(this), true);
        // transfer the tokens (property NFT) for ownership to the buyer
        safeTransferFrom(msg.sender, buyer, property.id, propertyOrderRequest.requestedShares, "");

        propertyShares[property.id][msg.sender] -= propertyOrderRequest.requestedShares;
        propertyShares[property.id][buyer] += propertyOrderRequest.requestedShares;

        // update the status of the order
        propertyOrderRequests[orderID].status = Status.Accepted; // TODO: make a function for canceling order

        emit PropertyTransferred(msg.sender, buyer, property.id, propertyOrderRequest.requestedShares);
    }

    //function sellProperty(address owner, unit256 propertyID, unit256 numberOfShares) public {

    //}

    // check if an account has any ownership in a property
    // permissions: anyone can check who owns a property.
    function balanceOf(address accountToCheck, uint256 propertyId) public view override returns (uint256){
        return propertyShares[propertyId][accountToCheck];
    }

}
