import { useState, useCallback, useMemo } from 'react';
import { connect } from '../utils/wep-state';
import TextInput from '../components/TextInput';
import { State } from '../utils/types';
import { callContract } from '../utils/vitescripts';
import { RouteComponentProps, withRouter } from 'react-router';
import { isValidHash } from '../utils/misc';
import { zeroHash } from '../utils/constants';

type Props = State &
  RouteComponentProps & {
    hashToRelate?: string;
    relatedNoteText?: string;
  };

const NoteRecorder = ({ history, setState, vbInstance, hashToRelate = '', relatedNoteText }: Props) => {
  const [note, noteSet] = useState('');
  const [relatedNoteHash, relatedNoteHashSet] = useState(hashToRelate);
  const record = useCallback(() => {
    if (vbInstance) {
      if (relatedNoteHash && !isValidHash(relatedNoteHash)) {
        return window.alert('Invalid related note hash');
      }
      callContract(vbInstance, 'recordNote', [note, relatedNoteHash || zeroHash]).then(
        (block) => {
          setState!({
            notes: {
              [block.hash]: {
                hash: block.hash,
                timestamp: Date.now(),
                text: note,
                author: vbInstance.accounts[0],
                tips: {},
                relatedNoteHash,
              },
            },
          });
          return history.push(`/hash/${block.hash}`);
        },
        (e) => window.alert('recordNote error: ' + JSON.stringify(e))
      );
    }
  }, [relatedNoteHash, history, vbInstance, note, setState]);

  const submitDisabled = useMemo(() => !vbInstance || !note.length, [vbInstance, note]);

  return (
    <form
      action="#" // https://stackoverflow.com/a/45705325/13442719
      onSubmit={(e) => {
        e.preventDefault();
        record();
      }}
    >
      <TextInput
        textarea
        value={note}
        onUserInput={(v) => noteSet(v)}
        placeholder="What would you like to record? Forever. Be careful. And have fun!"
        className="resize-none text-3xl md:text-4xl h-60 md:h-72 w-full"
        onMetaEnter={record}
      />
      <div className="mt-2 flex justify-end space-x-4">
        {hashToRelate ? (
          <div className="flex-1 w-0 flex items-end">
            <p className="minor text-xl truncate">Related to "{relatedNoteText}"</p>
          </div>
        ) : (
          <TextInput
            disabled={!!hashToRelate}
            value={relatedNoteHash}
            onUserInput={(v) => relatedNoteHashSet(v)}
            placeholder="Related note hash"
            className="flex-1 w-0 flex text-xl"
            onMetaEnter={record}
          />
        )}
        <button
          disabled={submitDisabled}
          className={`float-right rect text-white ${submitDisabled ? 'bg-gray-400' : 'bg-blue-500'}`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default connect('vbInstance')(withRouter(NoteRecorder));
