import { useMemo, useState } from 'react';
import { formatDate, isValidHash, RelatedIcon, TwitterIcon } from '../utils/misc';
import A from '../components/A';
import { State, Note } from '../utils/types';
import { connect } from '../utils/wep-state';
import { callContract } from '../utils/vitescripts';
import TipButtonRow from './TipButtonRow';
import { zeroHash } from '../utils/constants';
import { RouteComponentProps, withRouter } from 'react-router';
import { breakURLs, linkText } from '../utils/strings';
import Modal from '../components/Modal';
import NoteRecorder from './NoteRecorder';

const TWEET_URL = 'https://twitter.com/intent/tweet?text=';

const noteTextClasses = 'text-3xl inline';

type Props = State &
  RouteComponentProps & {
    hash: string;
  };

const NoteCard = ({ match, hash, setState, vbInstance, notes }: Props) => {
  const note = useMemo<Note | undefined>(() => notes![hash || ''], [notes, hash]);
  const [hashToRelate, hashToRelateSet] = useState('');

  if (!note) {
    return null;
  }

  const { timestamp, text, author, relatedNoteHash } = note;

  return (
    <div className="space-y-4">
      {match.path === '/hash/:hash' ? (
        <h1 className={noteTextClasses}>{linkText(text)}</h1>
      ) : (
        <A to={`/hash/${hash}`}>
          <h1 className={noteTextClasses}>{breakURLs(text)}</h1>
        </A>
      )}
      <div>
        <A className="break-all" to={`/address/${author}`}>
          {author}
        </A>
        {' | '}
        <span className="minor">{formatDate(timestamp, true)}</span>
      </div>
      <div className="flex">
        {relatedNoteHash && (
          <A to={`/hash/${relatedNoteHash}`} className="minor mr-2">
            Related: {relatedNoteHash}
          </A>
        )}
        {vbInstance?.accounts[0] === author && (
          <button
            className="text-blue-500"
            onClick={() => {
              const relatedNoteHash = window.prompt('New relatedNoteHash:');
              if (relatedNoteHash && !isValidHash(relatedNoteHash)) {
                return window.alert('Invalid related note hash');
              }
              if (relatedNoteHash === hash) {
                return window.alert(`You can't relate a note to itself`);
              }
              if (vbInstance && relatedNoteHash !== null) {
                callContract(vbInstance, 'updateRelatedNoteHash', [
                  hash,
                  relatedNoteHash === '' ? zeroHash : relatedNoteHash,
                ]).then(
                  () => {
                    setState!({ notes: { [hash]: { relatedNoteHash } } }, { deepMerge: true });
                  },
                  (e) => window.alert('updateRelatedNoteHash error: ' + JSON.stringify(e))
                );
              }
            }}
          >
            {relatedNoteHash ? 'Edit' : 'Add related note hash'}
          </button>
        )}
      </div>
      <TipButtonRow author={author} hash={hash}>
        <button
          className="note-card-button"
          onClick={() => (vbInstance ? hashToRelateSet(hash) : window.alert('Connect wallet to relate note'))}
        >
          <RelatedIcon size={20} />
          <span className="ml-1 hidden md:block">Relate</span>
        </button>
        <a
          title="Twitter"
          href={`${TWEET_URL}${encodeURI(`${text}\n\napp.immutablenotes.com/hash/${hash}`)}`}
          target="_blank noreferrer noopener"
          className="note-card-button"
        >
          <TwitterIcon size={20} />
          <span className="ml-1 hidden md:block">Tweet</span>
        </a>
      </TipButtonRow>
      {hashToRelate && (
        <Modal onClose={() => hashToRelateSet('')} className="record-modal">
          <NoteRecorder hashToRelate={hashToRelate} relatedNoteText={text} />
        </Modal>
      )}
    </div>
  );
};

export default connect('vbInstance, notes')(withRouter(NoteCard));
