export type TransferEvent = {
  from: string;
  to: string;
  tokenId: string;
};

export type OfferUpdatedEvent = {
  tokenId: string;
  offeror: string;
  minimumOffer: number;
};

export type BidUpdatedEvent = {
  tokenId: string;
  bidder: string;
  lockedBid: number;
};

export type TradedEvent = {
  tokenId: string;
  value: number;
  offeror: string;
  bidder: string;
};
