NOTE: this was a work in progress, that can be scrapped

MVP NFT Marketplace Outline

mint, list, bid, win, transfer

Collections/Minting:
- UI for deploying a new ERC-721 contract
	- This will cost the typical 10 VITE as with all Vite contracts
	- constructor should have a parameters for:
		- collection's minting fee
		- file base URL
		- max number of NFTs that can be minted in a single transaction
- Creators can upload single images/meta.json to IPFS
	- For uploading bulk images, the UI should explain to users how to do so outside of the main UI
		- For example:
			- https://blog.etereo.io/uploading-nft-images-to-ipfs-ca01a1726932
			- https://github.com/HashLips/generative-art-opensource/issues/92#issuecomment-918601498
			- https://www.youtube.com/watch?v=OfqmR2lvU8E

NFT collection page
- Centralized database that scrapes and indexes NFT collections and NFT holders
	- Use repl.it?

List:
- Any NFT holder can put their NFT up for auction
	- seller can pick between:
		- English auction (highest bidder pays their bid)
			- https://en.wikipedia.org/wiki/English_auction
		- Dutch auctions (price descends until someone buys)
			- https://en.wikipedia.org/wiki/Dutch_auction
			- can have a min price for when the auction will be canceled
	- Based on the contracts submitted by https://github.com/Soptq/vite-nft-auction-contract
		- You will have to split up the NFTMarketplace.solpp contract into separate English and Dutc``h auction contracts
- 
  

Miscellaneous UI:
- Allows for testnet and mainnet usage
- Collections can show recent activity
  - can be filtered by mint, transfer, sale, list, offer, cancel listing, cancel offer
- 

Search:
- search for NFT contracts and user profiles by address
	- vite.js has a function to distinguish between contract/account addresses
	- invalid addresses should show an error
	- contract addresses that don't conform to the ERC-721 standard should show an error
- button for paginating NFT list in chunks of 50