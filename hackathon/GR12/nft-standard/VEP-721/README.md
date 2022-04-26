# VEP-721
This standard is based on https://eips.ethereum.org/EIPS/eip-721. It is intent on providing the VEP-721 standard for Vite.

### Demo Video
https://youtu.be/UDLaocOfWwM

## Simple Summary
A standard interface for non-fungible tokens.

## Specification
Every VEP-721 compliant contract must implement the IVEP721 interfaces. The interface also has messages that the implementor needs to call after onMessage(s) are called.

```solidity
pragma soliditypp ^0.4.3;

/// @title VEP-721 Non-Fungible Token Standard
interface IVEP721 {
    /// @dev This emits when ownership of any NFT changes by any mechanism.
    ///  This event emits when NFTs are created (`from` == 0) and destroyed
    ///  (`to` == 0). Exception: during contract creation, any number of NFTs
    ///  may be created and assigned without emitting Transfer. At the time of
    ///  any transfer, the approved address for that NFT (if any) is reset to none.
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _token);

    /// @dev This emits when the approved address for an NFT is changed or
    ///  reaffirmed. The zero address indicates there is no approved address.
    ///  When a Transfer event emits, this also indicates that the approved
    ///  address for that NFT (if any) is reset to none.
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _token);

    /// @dev This emits when an operator is enabled or disabled for an owner.
    ///  The operator can manage all NFTs of the owner.
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    /// @dev sendBalanceOf(uint256 balance) is called
    ///  after requestBalanceOf was requested.
    message sendBalanceOf(uint256 balance);

    /// @dev sendOwnerOf(address owner) is called
    ///  after requestOwnerOf was requested.
    message sendOwnerOf(address owner);

    /// @dev sendGetApproved(address operator) is called
    ///  after requestGetApproved was requested.
    message sendGetApproved(address operator);

    /// @dev sendIsApprovedForAll(bool) is called
    ///  after requestIsApprovedForAll was requested.
    message sendIsApprovedForAll(bool);

    /// @dev onVEP721Received(address from, address to, uint256 token, bytes data) is called
    ///  after a token was transferred.
    message onVEP721Received(address from, address to, uint256 token, bytes data);

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, but this
    ///  function will not throw for queries about the zero address.
    ///  The caller must handle the zero address queries.
    /// @param owner An address for whom to query the balance
    /// @return The number of NFTs owned by `owner`, possibly zero
    getter balanceOf(address owner) returns (uint256 ownerBalance);

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do not throw.
    ///  The caller must handle the zero address queries.
    /// @param token The identifier for an NFT
    /// @return The address of the owner of the NFT
    getter ownerOf(uint256 token) returns (address owner);

    /// @notice Get the approved address for a single NFT
    /// @param _token The NFT to find the approved address for
    /// @return The approved address for this NFT, or the zero address if there is none
    getter getApproved(uint256 token) returns (address operator);

    /// @notice Query if an address is an authorized operator for another address
    /// @param owner The address that owns the NFTs
    /// @param operator The address that acts on behalf of the owner
    /// @return True if `operator` is an approved operator for `owner`, false otherwise
    getter isApprovedForAll(address owner, address operator) returns (bool);

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    ///  it sends sendBalanceOf(uint256 balance) with the number of NFTs in `owner`'s account.
    /// @param owner An address for whom to query the balance
    onMessage requestBalanceOf(address owner);

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw. it sends sendOwnerOf(uint256 token) with the owner of the NFT specified by `token`.
    /// @param token The identifier for an NFT
    onMessage requestOwnerOf(uint256 token);

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `from` is
    ///  not the current owner. Throws if `to` is the zero address. Throws if
    ///  `token` is not a valid NFT. When transfer is complete, this function
    ///  sends onVEP721Received(address from, address to, uint256 token, bytes data) to the `to` address.
    ///  -- THE CALLER IS RESPONSIBLE TO CONFIRM THAT `to` IS CAPABLE OF RECEIVING NFTS OR ELSE THEY MAY BE PERMANENTLY LOST --
    /// @param from The current owner of the NFT
    /// @param to The new owner
    /// @param token The NFT to transfer
    /// @param data Additional data with no specified format, sent in call to `to`
    onMessage safeTransferFrom(address from, address to, uint256 token, bytes calldata data);

    /// @notice Transfers the ownership of an NFT from one address to another address
    /// @dev This works identically to the other function with an extra data parameter,
    ///  except this function just sets data to "".
    /// @param from The current owner of the NFT
    /// @param to The new owner
    /// @param token The NFT to transfer
    onMessage safeTransferFrom(address from, address to, uint256 token);

    /// @notice Transfer ownership of an NFT -- THIS FUNCTION WILL NOT SEND 
    ///  sends onVEP721Received(address from, address to, uint256 token, bytes data) TO THE `to` ADDRESS --
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `from` is
    ///  not the current owner. Throws if `to` is the zero address. Throws if
    ///  `token` is not a valid NFT.
    /// @param from The current owner of the NFT
    /// @param to The new owner
    /// @param token The NFT to transfer
    onMessage transferFrom(address from, address to, uint256 token);

    /// @notice Change or reaffirm the approved address for an NFT
    /// @dev The zero address indicates there is no approved address.
    ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
    ///  operator of the current owner.
    /// @param approved The new approved NFT controller
    /// @param token The NFT to approve
    onMessage approve(address to, uint256 token);

    /// @notice Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @dev Emits the ApprovalForAll event. The contract MUST allow
    ///  multiple operators per owner.
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    onMessage setApprovalForAll(address operator, bool approved);

    /// @notice Get the approved address for a single NFT
    /// @dev Throws if `token` is not a valid NFT.
    ///  It sends sendGetApproved(address operator) with the operator.
    /// @param token The NFT to find the approved address for
    onMessage requestGetApproved(uint256 token);

    /// @notice Query if an address is an authorized operator for another address
    /// @param owner The address that owns the NFTs
    /// @param operator The address that acts on behalf of the owner
    /// @dev it replies sendIsApprovedForAll(bool) with value equal to true if `operator` is an approved operator for `owner`, false otherwise
    onMessage requestIsApprovedForAll(address owner, address operator);
}
```

The metadata extension is OPTIONAL for VEP-721 smart contracts. This allows your smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

```solidity
/// @title VEP-721 Non-Fungible Token Standard, optional metadata extension
interface IVEP721Metadata /* is VEP721 */ {
    /// @dev sendName(string) is called
    ///  after requestName was requested.
    message sendName(string);

    /// @dev sendSymbol(string) is called
    ///  after requestSymbol was requested.
    message sendSymbol(string);

    /// @dev sendTokenURI(string) is called
    ///  after requestTokenURI was requested.
    message sendTokenURI(string);

    /// @notice A descriptive name for a collection of NFTs in this contract
    getter name() returns (string memory);

    /// @notice An abbreviated name for NFTs in this contract
    getter symbol() returns (string memory);

    /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
    /// @dev URIs are defined in RFC
    ///  3986. The URI may point to a JSON file that conforms to the "VEP721
    ///  Metadata JSON Schema".
    getter tokenURI(uint256 token) returns (string memory);

    /// @notice A descriptive name for a collection of NFTs in this contract
    /// @dev It sends sendName(string) with the name of the token.
    onMessage requestName();

    /// @notice An abbreviated name for NFTs in this contract
    /// @dev Sends sendSymbol(string) with the symbol of the token.
    onMessage requestSymbol();

    /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
    /// @dev Throws if `tokenId` is not a valid NFT. URIs are defined in RFC
    ///  3986. The URI may point to a JSON file that conforms to the "VEP721
    ///  Metadata JSON Schema".
    /// @dev Sends sendTokenURI(string) with the token URI of the token.
    onMessage requestTokenURI(uint256 token);
}
```

This is the "VEP721 Metadata JSON Schema" referenced above.

```json
{
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}
```

The enumeration extension is OPTIONAL for VEP-721 smart contracts. This allows your contract to publish its full list of NFTs and make them discoverable.

```solidity
/// @title VEP-721 Non-Fungible Token Standard, optional enumeration extension
interface IVEP721Enumerable /* is VEP721 */ {
    /// @dev sendTotalSupply(uint256) is called
    ///  after requestTotalSupply was requested.
    message sendTotalSupply(uint256);

    /// @dev sendTokenOfOwnerByIndex(uint256 token) is called
    ///  after requestTokenOfOwnerByIndex was requested.
    message sendTokenOfOwnerByIndex(uint256 token);

    /// @dev sendTokenByIndex(uint256 token) is called
    ///  after requestTokenByIndex was requested.
    message sendTokenByIndex(uint256 token);

    /// @notice Count NFTs tracked by this contract
    /// @return A count of valid NFTs tracked by this contract, where each one of
    ///  them has an assigned and queryable owner not equal to the zero address
    getter totalSupply() returns (uint256);

    /// @notice Count NFTs tracked by this contract
    /// @dev This function raises an error if the index is out of bound.
    /// @return A count of valid NFTs tracked by this contract, where each one of
    ///  them has an assigned and queryable owner not equal to the zero address
    getter tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256 token);

    /// @notice Enumerate valid NFTs
    /// @dev This function raises an error if the index is out of bound.
    /// @param index A counter less than `totalSupply()`
    /// @return The token identifier for the `index`th NFT,
    ///  (sort order not specified)
    getter tokenByIndex(uint256 index) returns (uint256 token);

    /// @notice Count NFTs tracked by this contract
    /// @return A count of valid NFTs tracked by this contract, where each one of
    ///  them has an assigned and queryable owner not equal to the zero address
    onMessage requestTotalSupply();

    /// @notice Enumerate valid NFTs
    /// @dev Throws if `index` >= `totalSupply()`.
    /// @param _index A counter less than `totalSupply()`
    /// @return The token identifier for the `index`th NFT,
    ///  (sort order not specified)
    onMessage requestTokenByIndex(uint256 index);

    /// @notice Enumerate NFTs assigned to an owner
    /// @dev Throws if `index` >= `balanceOf(owner)` or if
    ///  `owner` is the zero address, representing invalid NFTs.
    /// @param owner An address where we are interested in NFTs owned by them
    /// @param index A counter less than `balanceOf(owner)`
    /// @return The token identifier for the `index`th NFT assigned to `owner`,
    ///   (sort order not specified)
    onMessage requestTokenOfOwnerByIndex(address owner, uint256 index);
}
```

## Implementation
The implementation codes are put inside `contracts` folder. They are based on OpenZeppelin v2.5.0 [https://github.com/OpenZeppelin/openzeppelin-contracts/tree/release-v2.5.0] to make it compatible with soliditypp 0.4.3. Please check out the demo code which uses the contracts in `Demo.solpp` file.
