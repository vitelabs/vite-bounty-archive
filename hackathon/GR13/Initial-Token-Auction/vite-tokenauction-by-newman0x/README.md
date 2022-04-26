# Token Auction 🔥

This contract allows for a team to raise liquidity by auctioning their token in exchange for VITE.

# Starting an Auction

Every contract is managed by a team administrator who is in charge of starting, resolving, or canceling an auction. To start an auction they must specify three parameters:

    + token ID   
    + amount of tokens to lock
    + duration of auction in unix-ts
        ~ e.g.) 3600 (1H), 86400 (1D), 259200 (3D)

An auction will always be in one of three states: 

    - active state  -> users are able to place and cancel bids
    - resolve state -> end date reached and bidding is stopped 
    - end state     -> finalized auction, no further interaction

To view a list of auctions in any state, simply use the load/view methods provided: 

       e.g.)  first loadActiveAuctions() -> then viewActiveAuctions()

 If a team wishes to cancel an auction it must be during an active or resolve state. Once cancelled all deposits will be returned to bidders and the team will receive the tokens they used to start the auction.

# Placing a Bid

Once an auction is started, a user can place a bid by specifying three parameters:

    + auction ID 
    + VITE deposit amount 
    + ask rate - VITE paid per token

Any consecutive bid placed is added to the total bid amount for the user. If they wish to reduce their bid it must be cancelled entirely, which will return their funds, and a new bid can be placed. Bids can be placed or cancelled as many times as long as the auction is active. 

The administrator can define a 'teamRate' within the contract, which is the minimum rate of tokens that can be given per VITE token deposited. This prevents bidders from setting the lowest ask rate possible to try and get an unfair amount of tokens. By default the team rate is set to 0, but it can be changed at any time.

# Resolving an Auction

When the current timestamp exceeds the end date for an auction, all bidding is stopped and it enters a resolve state. The the administrator must then call 'resolveAuction' to confirm and finalize the result of the auction. When the method is called the following will happen: 

    - bids are sorted from highest to lowest based on deposit amount
       ~ the more a user deposits the higher priority they have to receive tokens 
    - for every bid:
       + vite deposit is sent to team 
       + user gets tokens based on deposit/askRate
       ~ if no more tokens are available to pay remaining bidders then their deposit is returned 


# To Perform Contract Tests
```
npm install
npm test
```

# Disclaimer

This contract is a prototype version designed for the GR13 Hackathon. It is not intended to be used in a production environment yet. 
