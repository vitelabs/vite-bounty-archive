# nft-marketplace-contracts
 nft market place contracts, two contracts that suport english auction and dutch auction separately.

***Features***

    * Support startTime, endTime, cancelTime for the Auction
    * Support startPrice, reversePrice, minBidIncrease for English Auction
    * Support startPrice, reversePrice, priceDecreaseRate for Dutch Auction
    * Support both native vlite token and erc20 token for the Auction Payment
    * Support search Auction detail infos by the ID
    * Support Paginations to return the IDs (then can get details one by one through the id).
    * Support filter auction IDs based on the Auction Status(such as UPCOMING, ONGOING, CANCELED, FAILED, SUCCESS .etc).

***How to run***

1. clone this project

        git clone https://github.com/shepherliu/nft-marketplace-contracts.git

2. cd this project

        cd nft-marketplace-contracts

3. install dependencies

        npm install

4. run test

        npm test 
 
***English Auction*** 
 
 **location:** 
 
    contracts/englishAuction.sol
    
 **functions**
 
 1.mint as a nft to start a new auction:
 
    *function mint(uint startTime, uint endTime, uint cancelTime, uint256 startPrice, uint256 reversePrice, uint256 minBidIncrease, uint256 nftId, address nftContract, bool payForNative, address payContract, ) public returns (uint256)*
    
      uint startTime, the start time for the sell
      uint endTime, the end time for the sell
      uint cancelTime, the time that the auction can be canceled     
      uint256 startPrice, the start price for the sell
      uint256 reversePrice, the reverse price for the sell
      uint256 minBidIncrease, the min bid increase for each time for a new bid   
      uint256 nftId, the nft id to sell    
      address nftContract, the nft contract address to sell
      bool payForNative, pay for native token or pay for erc20 token
      address payContract, the token contract address choose for the payment
 
2.cancel a auction by id:

    *function cancelAuction(uint256 auctionId) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id to be canceled

3.bid a new price for the nft sell:

    *function bidForNft(uint256 auctionId, uint256 amount) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id
      uint256 amount, the price for this bid
      
4.claim the nft and the payment after the auction is success:
 
    *function claimAuction(uint256 auctionId) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id to be claimed

5.claim the nft and the payment after the auction is failed:
 
    *function claimFailedAuction(uint256 auctionId) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id to be claimed

6.get an auction base info by id:

    *getAucBaseInfoById(uint256 auctionId) public view returns(uint256 auctionId, uint256 nftId, address nftContract, address nftOwner, address payContract, address bidAddress)*
    
      uint256 auctionId, the auction id to get the auction info
      uint256 nftId, the nft id that to be selled
      address nftContract, the nft contract 
      address nftOwner, the nft owner who sell the nft
      address payContract, payment token contract, 0x0 is blockchain native token
      address bidAddress, the user address who bid the higest price to buy the nft

7.get an auction time info by id:

    *function getAucTimeInfoById(uint256 aucId) public view returns (uint startTime, uint endTime, uint cancelTime)*
    
      uint startTime, the auction start time
      uint endTime, the auction end time
      uint cancelTime, the time that the auction can be canceled

8.get an auction price info by id:

    *function getAucPriceInfoById(uint256 aucId) public view returns(uint256 startPrice, uint256 reversePrice, uint256 bidPrice, uint256 minBidIncrease, Status status)*
    
      uint256 startPrice, the auction start price
      uint256 reversePrice, the auction reverse price, auction success only when bid price >= reverse price
      uint256 bidPrice, the highest bid price who want to buy the nft
      uint256 minBidIncrease, min bid increase when each bid
      Status status, the auctuon status

9.get auctions paginations indexs by page size and page count:

    *function getAuctionPaginations(uint pageSize, uint pageCount, Status auctionType, bool owner) public view returns(uint256[] memory aucIdsList, uint256 total)*
    
     uint pageSize, page size to get auction infos
     uint pageCount, page count to get auction infos
     Status auctionType, auction type: UPCOMING, ONGOING, FINISHED(SUCCESS,CANCELED,CLAIMED,FAILED)
     bool owner, if get your own auctions or not


     uint256[] memory aucIdsList, return current page aucIDs list
     uint256 total, return total count

***Dutch Auction*** 

 **location:**
 
    contracts/dutchAuction.sol
    
 **functions**
 
 1.mint as a nft to start a new auction:
 
    *function mint(uint startTime, uint endTime, uint cancelTime, uint256 startPrice, uint256 reversePrice, uint256 priceDecreaseRate, uint256 nftId, address nftContract, bool payForNative, address payContract) public returns (uint256)*
 
      uint startTime, the start time for the sell
      uint endTime, the end time for the sell
      uint cancelTime, the time that the auction can be canceled     
      uint256 startPrice, the start price for the sell
      uint256 reversePrice, the reverse price for the sell
      uint256 priceDecreaseRate, the price decrease rate per day
      uint256 nftId, the nft id to sell    
      address nftContract, the nft contract address to sell
      bool payForNative, pay for native token or pay for erc20 token
      address payContract, the token contract address choose for the payment
 
2.cancel a auction by id:

    *function cancelAuction(uint256 auctionId) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id to be canceled

3.bid a price to buy the nft:

    *function bidForNft(uint256 auctionId, uint256 amount) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id
      uint256 amount, the price for this bid

4.claim the nft and the payment after the auction is failed:
 
    *function claimFailedAuction(uint256 auctionId) public nonReentrant payable returns(bool)*
    
      uint256 auctionId, the auction id to be claimed

      
5.get an auction base info by id:

    *getAucBaseInfoById(uint256 auctionId) public view returns(uint256 auctionId, uint256 nftId, address nftContract, address nftOwner, address payContract, address bidAddress)*
    
      uint256 auctionId, the auction id to get the auction info
      uint256 nftId, the nft id that to be selled
      address nftContract, the nft contract 
      address nftOwner, the nft owner who sell the nft
      address payContract, payment token contract, 0x0 is blockchain native token
      address bidAddress, the user address who bid the higest price to buy the nft

6.get an auction time info by id:

    *function getAucTimeInfoById(uint256 aucId) public view returns (uint startTime, uint endTime, uint cancelTime)*
    
      uint startTime, the auction start time
      uint endTime, the auction end time
      uint cancelTime, the time that the auction can be canceled

7.get an auction price info by id:

    *function getAucPriceInfoById(uint256 aucId) public view returns(uint256 startPrice, uint256 reversePrice, uint256 bidPrice, uint256 minBidIncrease, Status status)*
    
      uint256 startPrice, the auction start price
      uint256 reversePrice, the auction reverse price, auction success only when bid price >= reverse price
      uint256 bidPrice, the highest bid price who want to buy the nft
      uint256 priceDecreaseRate, price decrease rate per day
      Status status, the auctuon status

8.get auctions paginations indexs by page size and page count:

    *function getAuctionPaginations(uint pageSize, uint pageCount, Status auctionType, bool owner) public view returns(uint256[] memory aucIdsList, uint256 total)*
    
     uint pageSize, page size to get auction infos
     uint pageCount, page count to get auction infos
     Status auctionType, auction type: UPCOMING, ONGOING, FINISHED(SUCCESS,CANCELED,CLAIMED,FAILED)
     bool owner, if get your own auctions or not
     
     uint256[] memory aucIdsList, return current page aucIDs list
     uint256 total, return total count