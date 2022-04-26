import React, {
  ReactNode,
  FC,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  DataLog,
  useViteProvider,
  useViteWallet,
  useCreateAccountBlock,
  useQueryContractState,
  useVmLogs,
} from '@react-vite';
import { Link } from 'react-router-dom';

import { useConfig } from '@contexts/config';
import useIPFS, { getIPFSKeyUrl } from '@hooks/useIPFS';
import BAYC_ABI from '@data/bayc-abi.json';
import MARKETPLACE_ABI from '@data/marketplace-abi.json';
import { formatUnits, toBigNumber } from '@utils/big-number';
import Address from '@components/shared/Address';
import { OfferUpdatedEvent, BidUpdatedEvent, TradedEvent } from '@types';
import { ZERO_ADDRESS, VITE_TOKEN_ID } from '@config';

const TABS = ['Details', 'Bids', 'History'];

const useStyles = makeStyles((theme) => {
  return {
    container: {},
    pane: {
      height: 290,
      overflowY: 'auto',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bolder',
    },
    tabs: {
      borderBottom: '1px solid #eee',
      display: 'flex',
      '& > div': {
        padding: '0.5rem 1rem',
        borderBottom: '2px solid transparent',
        cursor: 'pointer',
        marginBottom: '-0.125rem',
      },
    },
    activeTab: {
      borderBottomColor: 'black !important',
    },
  };
});

type GetNftMetadata = {
  image: string;
  attributes: { trait_type: string; value: string }[];
};

type Log = { id: string; height: string; description: ReactNode };

const Page: FC<{ match: { params: { tokenId: string } } }> = ({
  match: {
    params: { tokenId },
  },
}) => {
  const classes = useStyles();
  const { baycContractAddress, marketplaceContractAddress } = useConfig();
  const { provider } = useViteProvider();
  const { walletAddress, connect, createAccountBlock } = useViteWallet();
  const [price, setPrice] = useState('0');
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showTxModal, setShowTxModal] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const offerUpdatedEventsFilter = useCallback(
    (log: DataLog<OfferUpdatedEvent>) =>
      log.data.tokenId === tokenId && log.data.offeror !== ZERO_ADDRESS,
    [tokenId]
  );

  const bidUpdatedEventsFilter = useCallback(
    (log: DataLog<BidUpdatedEvent>) =>
      log.data.tokenId === tokenId && log.data.bidder !== ZERO_ADDRESS,
    [tokenId]
  );

  const tradedEventsFilter = useCallback(
    (log: DataLog<TradedEvent>) => log.data.tokenId === tokenId,
    [tokenId]
  );

  const offerUpdatedEvents: DataLog<OfferUpdatedEvent>[] = useVmLogs<OfferUpdatedEvent>(
    provider,
    marketplaceContractAddress,
    MARKETPLACE_ABI,
    'OfferUpdated',
    offerUpdatedEventsFilter
  );

  const bidUpdatedEvents: DataLog<BidUpdatedEvent>[] = useVmLogs<BidUpdatedEvent>(
    provider,
    marketplaceContractAddress,
    MARKETPLACE_ABI,
    'BidUpdated',
    bidUpdatedEventsFilter
  );

  const tradedEvents: DataLog<TradedEvent>[] = useVmLogs<TradedEvent>(
    provider,
    marketplaceContractAddress,
    MARKETPLACE_ABI,
    'Traded',
    tradedEventsFilter
  );

  useEffect(() => {
    const load = async () => {
      const ret: Log[] = [];
      for (const log of offerUpdatedEvents) {
        ret.push({
          id: `offer-${log.log.accountBlockHash}`,
          height: log.log.accountBlockHeight,
          description: (
            <div className='flex items-center'>
              Offer{' '}
              <div className={'mx-1 font-bold'}>
                {formatUnits(log.data.minimumOffer, 18, 2)} VITE
              </div>{' '}
              from{' '}
              <div className='flex items-center ml-1'>
                <Address address={log.data.offeror} />
              </div>
            </div>
          ),
        });
      }
      for (const log of bidUpdatedEvents) {
        ret.push({
          id: `bid-${log.log.accountBlockHash}`,
          height: log.log.accountBlockHeight,
          description: (
            <div className='flex items-center'>
              Bid{' '}
              <div className={'mx-1 font-bold'}>
                {formatUnits(log.data.lockedBid, 18, 2)} VITE
              </div>{' '}
              by{' '}
              <div className='flex items-center ml-1'>
                <Address address={log.data.bidder} />
              </div>
            </div>
          ),
        });
      }
      for (const log of tradedEvents) {
        ret.push({
          id: `trade-${log.log.accountBlockHash}`,
          height: log.log.accountBlockHeight,
          description: (
            <div className='flex items-center'>
              Traded{' '}
              <div className='flex items-center ml-1'>
                <Address address={log.data.offeror} copy={false} />
              </div>{' '}
              {'→'}{' '}
              <div className='flex items-center ml-1'>
                <Address address={log.data.bidder} copy={false} />
              </div>
            </div>
          ),
        });
      }
      ret.sort((a, b) => {
        const aa = toBigNumber(a.height);
        const bb = toBigNumber(b.height);
        if (aa.gt(bb)) return -1;
        if (bb.gt(aa)) return 1;
        return 0;
      });
      setLogs(ret);
    };

    load();
  }, [offerUpdatedEvents, bidUpdatedEvents, tradedEvents]);

  const bids = useMemo(() => {
    const map = bidUpdatedEvents
      .slice()
      .reverse()
      .reduce((r: Record<string, number>, log) => {
        r[log.data.bidder] = log.data.lockedBid;
        return r;
      }, {} as Record<string, number>);
    const list = Object.entries(map).map(([bidder, lockedBid]) => ({
      bidder,
      lockedBid: toBigNumber(lockedBid),
    }));
    list.sort((a, b) => {
      if (a.lockedBid.gt(b.lockedBid)) return -1;
      if (b.lockedBid.gt(a.lockedBid)) return 1;
      return 0;
    });
    return list;
  }, [bidUpdatedEvents]);

  const baseUrlQueryParams = useMemo(() => [], []);
  const baseUrlQueryResult = useQueryContractState<string[]>(
    provider,
    baycContractAddress,
    BAYC_ABI,
    'BASE_URL',
    baseUrlQueryParams
  );
  const getNftMetadata = useMemo(
    () => (!baseUrlQueryResult ? null : `${baseUrlQueryResult[0]}${tokenId}`),
    [baseUrlQueryResult, tokenId]
  );
  const nftMetadata = useIPFS<GetNftMetadata>(getNftMetadata);
  const imgUrl = useMemo(() => getIPFSKeyUrl(nftMetadata?.image ?? null), [
    nftMetadata,
  ]);

  const ownerOfQueryParams = useMemo(() => [tokenId], [tokenId]);
  const ownerOfQueryEvents = useMemo(() => ['Transfer'], []);
  const ownerOfQueryResult = useQueryContractState<string[]>(
    provider,
    baycContractAddress,
    BAYC_ABI,
    'ownerOf',
    ownerOfQueryParams,
    ownerOfQueryEvents
  );
  const owner = useMemo(() => ownerOfQueryResult?.[0] ?? null, [
    ownerOfQueryResult,
  ]);
  const ownerIsSelf = useMemo(() => owner === walletAddress, [
    owner,
    walletAddress,
  ]);

  const tokenMarketsQueryParams = useMemo(() => [tokenId], [tokenId]);
  const tokenMarketsQueryEvents = useMemo(
    () => ['OfferUpdatedEvent', 'BidUpdatedEvent', 'TradedEvent'],
    []
  );
  const tokenMarketsQueryResult = useQueryContractState<string[]>(
    provider,
    marketplaceContractAddress,
    MARKETPLACE_ABI,
    'tokenMarkets',
    tokenMarketsQueryParams,
    tokenMarketsQueryEvents
  );
  const tokenMarkets = useMemo(
    () =>
      !tokenMarketsQueryResult
        ? null
        : {
            offeror: tokenMarketsQueryResult[0],
            minimumOffer: tokenMarketsQueryResult[1],
            bidder: tokenMarketsQueryResult[2],
            lockedBid: tokenMarketsQueryResult[3],
          },
    [tokenMarketsQueryResult]
  );

  const hasOffer = useMemo(() => tokenMarkets?.offeror !== ZERO_ADDRESS, [
    tokenMarkets,
  ]);
  const hasBid = useMemo(() => tokenMarkets?.bidder !== ZERO_ADDRESS, [
    tokenMarkets,
  ]);
  const lastSelfBid = useMemo(
    () =>
      hasBid &&
      walletAddress &&
      bids.find((b) => b.bidder.toLowerCase() === walletAddress.toLowerCase()),
    [bids, walletAddress, hasBid]
  );

  const isApprovedForAllQueryParams = useMemo(
    () => (!walletAddress ? null : [walletAddress, marketplaceContractAddress]),
    [walletAddress, marketplaceContractAddress]
  );
  const isApprovedForAllQueryEvents = useMemo(() => ['ApprovalForAll'], []);
  const isApprovedForAllQueryResult = useQueryContractState<string[]>(
    provider,
    baycContractAddress,
    BAYC_ABI,
    'isApprovedForAll',
    isApprovedForAllQueryParams,
    isApprovedForAllQueryEvents
  );
  const isApprovedForAll = useMemo(
    () => isApprovedForAllQueryResult?.[0] === '1',
    [isApprovedForAllQueryResult]
  );

  const setApprovalForAllParams = useMemo(
    () => ({
      address: walletAddress,
      abi: BAYC_ABI,
      toAddress: baycContractAddress,
      params: [marketplaceContractAddress, true],
      methodName: 'setApprovalForAll',
    }),
    [walletAddress, baycContractAddress, marketplaceContractAddress]
  );
  const setApprovalForAllTx = useCreateAccountBlock(
    'callContract',
    setApprovalForAllParams,
    createAccountBlock
  );

  const listParams = useMemo(
    () => ({
      address: walletAddress,
      abi: MARKETPLACE_ABI,
      toAddress: marketplaceContractAddress,
      params: [tokenId, toBigNumber(price).times(1e18).toString()],
      methodName: 'offer',
    }),
    [walletAddress, marketplaceContractAddress, tokenId, price]
  );
  const listTx = useCreateAccountBlock(
    'callContract',
    listParams,
    createAccountBlock
  );

  const delistParams = useMemo(
    () => ({
      address: walletAddress,
      abi: MARKETPLACE_ABI,
      toAddress: marketplaceContractAddress,
      params: [tokenId],
      methodName: 'revokeOffer',
    }),
    [walletAddress, marketplaceContractAddress, tokenId]
  );
  const delistTx = useCreateAccountBlock(
    'callContract',
    delistParams,
    createAccountBlock
  );

  const bidParams = useMemo(
    () => ({
      address: walletAddress,
      abi: MARKETPLACE_ABI,
      toAddress: marketplaceContractAddress,
      params: [tokenId],
      methodName: lastSelfBid ? 'bidIncrease' : 'bid',
      tokenId: VITE_TOKEN_ID,
      amount: toBigNumber(price).times(1e18).toString(),
    }),
    [walletAddress, marketplaceContractAddress, tokenId, price, lastSelfBid]
  );
  const bidTx = useCreateAccountBlock(
    'callContract',
    bidParams,
    createAccountBlock
  );

  const removeBidParams = useMemo(
    () => ({
      address: walletAddress,
      abi: MARKETPLACE_ABI,
      toAddress: marketplaceContractAddress,
      params: [tokenId],
      methodName: 'revokeBid',
    }),
    [walletAddress, marketplaceContractAddress, tokenId]
  );
  const removeBidTx = useCreateAccountBlock(
    'callContract',
    removeBidParams,
    createAccountBlock
  );

  const buyParams = useMemo(
    () =>
      !hasOffer
        ? null
        : {
            address: walletAddress,
            abi: MARKETPLACE_ABI,
            toAddress: marketplaceContractAddress,
            params: [tokenId],
            methodName: 'bid',
            tokenId: VITE_TOKEN_ID,
            amount: tokenMarkets?.minimumOffer,
          },
    [walletAddress, marketplaceContractAddress, tokenId, hasOffer, tokenMarkets]
  );
  const buyTx = useCreateAccountBlock(
    'callContract',
    buyParams,
    createAccountBlock
  );

  const acceptBidParams = useMemo(
    () =>
      !hasBid
        ? null
        : {
            address: walletAddress,
            abi: MARKETPLACE_ABI,
            toAddress: marketplaceContractAddress,
            params: [tokenId, tokenMarkets?.lockedBid],
            methodName: 'offer',
          },
    [walletAddress, marketplaceContractAddress, tokenId, hasBid, tokenMarkets]
  );
  const acceptBidTx = useCreateAccountBlock(
    'callContract',
    acceptBidParams,
    createAccountBlock
  );

  useEffect(() => {
    if (tokenMarkets) {
      const price =
        (ownerIsSelf ? tokenMarkets.minimumOffer : tokenMarkets.lockedBid) ??
        '0';
      setPrice(toBigNumber(price).div(1e18).toString());
    }
  }, [tokenMarkets, ownerIsSelf]);

  useEffect(() => {
    if (bidTx.status === 'sent' || listTx.status === 'sent') {
      setShowTxModal(false);
    }
  }, [bidTx, listTx]);

  const onList = () => {
    isApprovedForAll ? listTx.send() : setApprovalForAllTx.send();
  };

  const onDelist = () => {
    delistTx.send();
  };

  const onBid = () => {
    if (!walletAddress) return connect();
    bidTx.send();
  };

  const onRemoveBid = () => {
    removeBidTx.send();
  };

  const onBuy = () => {
    if (!walletAddress) return connect();
    buyTx.send();
  };

  const onAcceptBid = () => {
    acceptBidTx.send();
  };

  return !imgUrl ? null : (
    <>
      <div className={clsx(classes.container, 'grid grid-cols-2')}>
        <div>
          <img src={imgUrl} alt={`${tokenId} nft`} />
        </div>
        <div className='ml-10'>
          <div>
            <Link className={clsx(classes.heading, 'hover:underline')} to='/'>
              BoredApeYachtClub
            </Link>
            <div className={classes.heading}>#{tokenId}</div>
            {!owner ? null : (
              <div className='flex'>
                Owned by{' '}
                <div className='ml-1'>
                  <Address address={owner} />
                </div>
              </div>
            )}

            <div className='mt-4'>
              {!tokenMarkets ? null : (
                <div className='flex items-center'>
                  <div className='mr-1'>On sale for</div>
                  <div className={'font-bold'}>
                    {formatUnits(tokenMarkets.minimumOffer, 18, 2)} VITE
                  </div>
                  {!tokenMarkets.lockedBid ? null : (
                    <div className='flex items-center'>
                      <div className='mx-2'>·</div>
                      Highest bid
                      <div className={'ml-1 font-bold'}>
                        {formatUnits(tokenMarkets.lockedBid, 18, 2)} VITE
                      </div>
                      {!(ownerIsSelf && hasBid) ? null : (
                        <div
                          className='underline text-primary ml-3 font-bold cursor-pointer'
                          onClick={onAcceptBid}
                        >
                          {acceptBidTx.working || <>ACCEPT</>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={clsx('mt-4', classes.tabs)}>
              {TABS.map((t) => (
                <div
                  key={t}
                  className={clsx({
                    [classes.activeTab]: t === activeTab,
                  })}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </div>
              ))}
            </div>

            <div className={clsx('mt-4', classes.pane)}>
              {TABS[0] !== activeTab ? null : (
                <div className='grid grid-cols-4 gap-2'>
                  {!nftMetadata
                    ? null
                    : nftMetadata.attributes.map((attr) => (
                        <div
                          key={attr.trait_type}
                          className='flex flex-col items-center justify-center py-2 border rounded-lg'
                        >
                          <div className={'text-primary font-bold'}>
                            {attr.trait_type}
                          </div>
                          <div className='text-gray-500 text-xs'>
                            {attr.value}
                          </div>
                        </div>
                      ))}
                </div>
              )}

              {TABS[1] !== activeTab ? null : (
                <div className='leading-8'>
                  {bids.map((log) => (
                    <div
                      key={log.bidder}
                      className='flex justify-between items-center'
                    >
                      <div>
                        <Address address={log.bidder} />
                      </div>
                      <div className={'mx-1 font-bold'}>
                        {formatUnits(log.lockedBid, 18, 2)} VITE
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {TABS[2] !== activeTab ? null : (
                <div className='leading-8'>
                  {logs.map((log) => (
                    <div key={log.id}>{log.description}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='mt-4 pt-4 flex gap-2 border-t'>
            {ownerIsSelf ? (
              <>
                <Button
                  variant='contained'
                  color='primary'
                  disableElevation
                  onClick={() => setShowTxModal(true)}
                >
                  {!isApprovedForAll
                    ? 'Start listing'
                    : hasOffer
                    ? 'Update listing price'
                    : 'List item'}
                </Button>
                {!(isApprovedForAll && hasOffer) ? null : (
                  <Button variant='outlined' color='default' onClick={onDelist}>
                    {delistTx.working || <>Delist</>}
                  </Button>
                )}
              </>
            ) : (
              <>
                {!(hasOffer && tokenMarkets) ? null : (
                  <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={onBuy}
                  >
                    {buyTx.working || (
                      <>
                        Buy for {formatUnits(tokenMarkets.minimumOffer, 18, 2)}{' '}
                        VITE
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant='outlined'
                  color='default'
                  onClick={() => setShowTxModal(true)}
                >
                  {lastSelfBid
                    ? `Update bid (${formatUnits(
                        lastSelfBid.lockedBid,
                        18,
                        2
                      )} VITE)`
                    : 'Place a bid'}
                </Button>
                {!lastSelfBid ? null : (
                  <Button
                    variant='outlined'
                    color='default'
                    onClick={onRemoveBid}
                  >
                    {removeBidTx.working || (
                      <>
                        {' '}
                        Remove bid ({formatUnits(
                          lastSelfBid.lockedBid,
                          18,
                          2
                        )}{' '}
                        VITE)
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!showTxModal} onClose={() => setShowTxModal(false)}>
        <div className={'w-96 p-4'}>
          <div className='flex flex-grow justify-space items-center my-2'>
            <div className='flex text-xl mr-1'>
              {ownerIsSelf ? 'Offer' : 'Bid'}
            </div>
            <CloseIcon
              className='cursor-pointer'
              onClick={() => setShowTxModal(false)}
            />
          </div>

          <div>
            <TextField
              fullWidth
              disabled={!walletAddress || (ownerIsSelf && !isApprovedForAll)}
              label={'Price'}
              placeholder={
                ownerIsSelf ? 'Enter offer price...' : 'Enter bid price...'
              }
              InputLabelProps={{
                shrink: true,
              }}
              value={price}
              onChange={(e) => setPrice((e.target.value as string).trim())}
            />
          </div>

          <div className='mt-4'>
            {!walletAddress ? (
              <Button variant='outlined' onClick={connect}>
                Connect
              </Button>
            ) : (
              <>
                {ownerIsSelf ? (
                  <Button variant='outlined' onClick={onList}>
                    {setApprovalForAllTx.working ||
                      listTx.working ||
                      (isApprovedForAll ? 'List' : 'Approve')}
                  </Button>
                ) : (
                  <Button variant='outlined' onClick={onBid}>
                    {bidTx.working || 'Bid'}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Page;
