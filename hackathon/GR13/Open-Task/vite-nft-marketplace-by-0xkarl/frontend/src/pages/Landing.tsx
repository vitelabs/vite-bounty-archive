import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  DataLog,
  useViteProvider,
  useViteWallet,
  useCreateAccountBlock,
  useVmLogs,
  useQueryContractState,
} from '@react-vite';
import uniq from 'lodash/uniq';

import { useConfig } from '@contexts/config';
import useIPFS, { getIPFSKeyUrl } from '@hooks/useIPFS';
import BAYC_ABI from '@data/bayc-abi.json';
import BAYC_TRAITS from '@data/bayc-traits.json';
import MARKETPLACE_ABI from '@data/marketplace-abi.json';
import { VITE_TOKEN_ID, ZERO_ADDRESS } from '@config';
import { formatUnits, toBigNumber } from '@utils/big-number';
import Address from '@components/shared/Address';
import {
  OfferUpdatedEvent,
  BidUpdatedEvent,
  TradedEvent,
  TransferEvent,
} from '@types';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
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

const TABS = ['Items', 'Activity'];

type Traits = Map<string, string[]>;

type Log = { id: string; height: string; description: ReactNode };

const Page: FC<{}> = () => {
  const { baycContractAddress, marketplaceContractAddress } = useConfig();
  const { provider } = useViteProvider();
  const { walletAddress, connect, createAccountBlock } = useViteWallet();

  const classes = useStyles();
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintTokenId, setMintTokenId] = useState('');
  const [traits, setTraits] = useState<Traits>(new Map());
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [logs, setLogs] = useState<Log[]>([]);

  const offerUpdatedEventsFilter = useCallback(
    (log: DataLog<OfferUpdatedEvent>) => log.data.offeror !== ZERO_ADDRESS,
    []
  );

  const bidUpdatedEventsFilter = useCallback(
    (log: DataLog<BidUpdatedEvent>) => log.data.bidder !== ZERO_ADDRESS,
    []
  );

  const tradedEventsFilter = useCallback(
    (log: DataLog<TradedEvent>) => true,
    []
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

  const mintTxParams = useMemo(
    () =>
      !(mintTokenId && walletAddress)
        ? null
        : {
            address: walletAddress,
            abi: BAYC_ABI,
            toAddress: baycContractAddress,
            params: [mintTokenId],
            methodName: 'safeMint',
            tokenId: VITE_TOKEN_ID,
            amount: (1e18).toString(),
          },
    [baycContractAddress, mintTokenId, walletAddress]
  );
  const mintTx = useCreateAccountBlock(
    'callContract',
    mintTxParams,
    createAccountBlock
  );

  const onMint = () => {
    if (!walletAddress) return connect();
    mintTx.send();
  };

  useEffect(() => {
    if (mintTx.status === 'sent') {
      setShowMintModal(false);
    }
  }, [mintTx]);

  const transferEventsFilter = useCallback(
    (log: DataLog<TransferEvent>) => true,
    []
  );
  const transferEvents: DataLog<TransferEvent>[] = useVmLogs<TransferEvent>(
    provider,
    baycContractAddress,
    BAYC_ABI,
    'Transfer',
    transferEventsFilter
  );
  const mints: string[] = useMemo(
    () => uniq(transferEvents.map((e) => e.data.tokenId)),
    [transferEvents]
  );

  const toggleTraits = (k: string, v: string[]) => {
    setTraits((traits: Traits) => {
      const t = new Map(traits);
      t.set(k, v);
      return t;
    });
  };

  return (
    <>
      <div className={classes.container}>
        <div className='flex flex-col items-center'>
          <div className='text-3xl font-bold mb-3'>BoredApeYachtClub</div>
          <Button
            variant='contained'
            color='primary'
            size='small'
            disableElevation
            onClick={() => setShowMintModal(true)}
          >
            MINT
          </Button>
        </div>

        <div className='flex flex-col mt-2'>
          <div className={clsx('mt-4 justify-center', classes.tabs)}>
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

          <div className={'mt-4'}>
            {TABS[0] !== activeTab ? null : (
              <div className={'grid grid-cols-6 gap-6'}>
                {mints.map((tokenId) => (
                  <Mint key={tokenId} {...{ tokenId }} />
                ))}
              </div>
            )}

            {TABS[1] !== activeTab ? null : (
              <div className='leading-8 ml-96'>
                {logs.map((log) => (
                  <div key={log.id}>{log.description}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Dialog open={!!showMintModal} onClose={() => setShowMintModal(false)}>
        <div className={'w-96 p-4'}>
          <div className='flex flex-grow justify-space items-center my-2'>
            <div className='flex text-xl mr-1'>Mint</div>
            <CloseIcon
              className='cursor-pointer'
              onClick={() => setShowMintModal(false)}
            />
          </div>

          <div>

      <div className='flex flex-col' mr={4}>
            <div>
              {BAYC_TRAITS.map((trait) => (
                <div key={trait.traitType} className='mb-2'>
                  <div>{trait.traitType}</div>
                  <Select
                    isMulti
                    theme={SELECT_THEME}
                    options={trait.values.map((value) => ({
                      label: value,
                      value,
                    }))}
                    onChange={(traits) => {
                      toggleTraits(
                        trait.traitType,
                        traits.map((t) => t.value)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          </div>
      </Dialog> */}

      <Dialog open={!!showMintModal} onClose={() => setShowMintModal(false)}>
        <div className={'w-96 p-4'}>
          <div className='flex flex-grow justify-space items-center my-2'>
            <div className='flex text-xl mr-1'>Mint</div>
            <CloseIcon
              className='cursor-pointer'
              onClick={() => setShowMintModal(false)}
            />
          </div>

          <div>
            <TextField
              fullWidth
              disabled={!walletAddress}
              label={'Token Id'}
              placeholder={'Enter token id...'}
              InputLabelProps={{
                shrink: true,
              }}
              value={mintTokenId}
              onChange={(e) =>
                setMintTokenId((e.target.value as string).trim())
              }
            />
          </div>

          <div className='mt-4'>
            {!walletAddress ? (
              <Button variant='outlined' onClick={connect}>
                Connect
              </Button>
            ) : (
              <>
                <Button variant='outlined' onClick={onMint}>
                  {mintTx.working || 'Mint'}
                </Button>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

type GetNftMetadata = {
  image: string;
  attributes: { trait_type: string; value: string }[];
};

const Mint: FC<{ tokenId: string }> = ({ tokenId }) => {
  const { baycContractAddress, marketplaceContractAddress } = useConfig();
  const { provider } = useViteProvider();

  // const callOffChainMethodParams = useMemo(() => [Number(tokenId)], [tokenId]);
  // const tokenUriParams = useQueryContractState<string[]>(
  //   provider,
  //   baycContractAddress,
  //   BAYC_ABI,
  //   'tokenURI',
  //   callOffChainMethodParams
  // );

  const callOffChainMethodParams = useMemo(() => [], []);
  const baseUrlParams = useQueryContractState<string[]>(
    provider,
    baycContractAddress,
    BAYC_ABI,
    'BASE_URL',
    callOffChainMethodParams
  );

  const getNftMetadata = useMemo(
    () => (!baseUrlParams ? null : `${baseUrlParams[0]}${tokenId}`),
    [baseUrlParams, tokenId]
  );
  const nftMetadata = useIPFS<GetNftMetadata>(getNftMetadata);
  const imgUrl = useMemo(() => getIPFSKeyUrl(nftMetadata?.image ?? null), [
    nftMetadata,
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

  return !imgUrl ? null : (
    <Link to={`/mint/${tokenId}`} className='flex flex-col'>
      <div>
        <img src={imgUrl} height={100} alt={`${tokenId} nft`} />
      </div>
      <div className='mt-1 flex justify-between'>
        <div className='font-bold'>#{tokenId}</div>
        {!(hasOffer && tokenMarkets) ? (
          <>UNLISTED</>
        ) : (
          <>{formatUnits(tokenMarkets?.minimumOffer, 18, 2)} VITE</>
        )}
      </div>
    </Link>
  );
};

export default Page;
