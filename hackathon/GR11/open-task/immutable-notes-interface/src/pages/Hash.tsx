import { useEffect, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { State } from '../utils/types';
import { callOffChain } from '../utils/vitescripts';
import NoteCard from '../containers/NoteCard';
import { tipTokenIds } from '../utils/constants';
import { connect } from '../utils/wep-state';
import { tipsCountToObject } from '../utils/misc';
import { useTitle } from '../utils/hooks';

type Props = State & RouteComponentProps<{ hash: string }>;

const Hash = ({
  setState,
  notes,
  match: {
    params: { hash },
  },
}: Props) => {
  useTitle(hash);
  const note = useMemo(() => notes![hash], [notes, hash]);
  useEffect(() => {
    if (!note) {
      callOffChain('getNoteByHash', [hash, tipTokenIds]).then(
        (arr) => {
          if (arr) {
            const [author, timestamp, text, tipsCount, relatedNoteHash] = arr;
            setState!(
              {
                notes: {
                  [hash]:
                    +timestamp === 0
                      ? null
                      : {
                          hash,
                          author,
                          timestamp: +timestamp * 1000,
                          text,
                          tips: tipsCountToObject(tipsCount),
                          relatedNoteHash: +relatedNoteHash === 0 ? null : relatedNoteHash,
                        },
                },
              },
              { deepMerge: true }
            );
          }
        },
        (e) => window.alert('getNoteByHash error: ' + JSON.stringify(e))
      );
    }
  }, [hash, note, setState]);

  return (
    <PageContainer>
      {note ? (
        <NoteCard hash={hash} />
      ) : (
        note === null && (
          <div className="xy h-full">
            <h1 className="text-2xl">Note does not exist</h1>
          </div>
        )
      )}
    </PageContainer>
  );
};

export default connect('notes')(withRouter(Hash));
