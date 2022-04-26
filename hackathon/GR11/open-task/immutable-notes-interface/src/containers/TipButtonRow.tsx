import { connect } from '../utils/wep-state';
import { useMemo, useState } from 'react';
import { tipTokenIds, tokensMap } from '../utils/constants';
import { amountToStringInt, stringIntToAmount } from '../utils/misc';
import { Note, State } from '../utils/types';
import { callContract } from '../utils/vitescripts';
import Modal from '../components/Modal';
import NumericalInput from '../components/NumericalInput';

const TipButton = ({
  tokenId,
  count,
  onClick,
}: {
  tokenId: string;
  count: number;
  onClick: (tokenId: string) => void;
}) => {
  const { ticker } = tokensMap.get(tokenId) || {};
  return (
    <button onClick={() => onClick(tokenId)} className="note-card-button whitespace-nowrap">
      ${ticker} {stringIntToAmount(count, 0, 5)}
    </button>
  );
};

type Props = State & {
  author: string;
  hash?: string;
  children?: React.ReactNode;
};

const TipButtonRow = ({ notes, timelines, setState, author, hash, vbInstance, children }: Props) => {
  const [tipTokenId, tipTokenIdSet] = useState('');
  const [tipAmount, tipAmountSet] = useState('');
  const tips = useMemo(() => {
    if (hash) {
      return notes![hash].tips;
    }
    return timelines![author].tips;
  }, [timelines, notes, author, hash]);

  const token = useMemo(() => tokensMap.get(tipTokenId)!, [tipTokenId]);

  return (
    <div className="flex space-x-2 md:space-x-4">
      <div className="flex flex-1 relative">
        <div className="flex flex-1 flex-nowrap space-x-2 md:space-x-4 overflow-scroll w-0">
          {tipTokenIds.map((tokenId) => (
            <TipButton
              key={tokenId}
              tokenId={tokenId}
              count={tips[tokenId]}
              onClick={() =>
                vbInstance
                  ? author === vbInstance.accounts[0]
                    ? window.alert('You cannot tip yourself')
                    : tipTokenIdSet(tokenId)
                  : window.alert('Connect wallet to tip')
              }
            />
          ))}
          {/* <button onClick={() => {}} className="note-card-button">
          Other
        </button> */}
        </div>
        <div className="w-4 h-full absolute right-0 bg-gradient-to-l from-white" />
      </div>
      {children}
      {tipTokenId && vbInstance && (
        <Modal onClose={() => tipTokenIdSet('')}>
          <p className="text-3xl">Tip ${token.ticker}</p>
          <p className="text-gray-500 text-lg mb-4">{tipTokenId}</p>
          <div className="flex items-center">
            <NumericalInput
              maxDecimals={token.decimals}
              value={tipAmount}
              onUserInput={(v) => tipAmountSet(v)}
              placeholder="Amount"
              className="text-2xl flex-1 mr-3"
            />
            <button
              className="rect text-white bg-blue-500"
              onClick={() => {
                if (token) {
                  callContract(
                    vbInstance,
                    hash ? 'tipNote' : 'tipTimeline',
                    [hash || author],
                    amountToStringInt(tipAmount, token.decimals),
                    tipTokenId
                  ).then((res) => {
                    tipTokenIdSet('');
                    const newNotes: { [hash: string]: Partial<Note> } = {};
                    if (hash) {
                      const totalNoteTipAmount = notes![hash].tips[tipTokenId] + +tipAmount;
                      newNotes[hash] = { tips: { [tipTokenId]: totalNoteTipAmount } };
                    }
                    const totalTimelineTipAmount = timelines![author].tips[tipTokenId] + +tipAmount;
                    setState!(
                      { notes: newNotes, timelines: { [author]: { tips: { [tipTokenId]: totalTimelineTipAmount } } } },
                      { deepMerge: true }
                    );
                  });
                }
              }}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default connect('notes, timelines, vbInstance')(TipButtonRow);
