- `RedBlackTree` is a self-balancing binary search tree
	- Store bids - neat!
	- maybe a bit overkill since I thought just a linked list was needed
- `IndexedTree` appears to be a tree 
	- Problematic because `mapping(address => uint256) bidPrice;` doesn't allow 1 address multiple bids
	- having`_simulateCollect` `simulateCollect`, and `collect` seems weird
- `TokenAuction`
	- `uint256 auctionId = numAuctions++;` means finished auctions will be overwritten by newly created auction. Should use `fromhash` instead for auctionId
	- `cancelBid(uint256 _auctionId)` confirms 1 account can only have 1 bid per auction.
	- `auctionBidders(uint256 _auctionId)` should have pagination
		- same with `auctionAmounts` and `auctionPrices`
	- `collect` pays back the difference if bidder partially won bid

Overall: Looks good, some parts are over-engineered, and accounts can't place multiple bids in the same auction