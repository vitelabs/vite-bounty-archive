import React, { useEffect, useCallback, useMemo } from 'react';
import PageContainer from '../components/PageContainer';
import { State, Note, Timeline } from '../utils/types';
import { tipTokenIds } from '../utils/constants';
import { callContract, callOffChain } from '../utils/vitescripts';
import { connect } from '../utils/wep-state';
import { RouteComponentProps } from 'react-router';
import NoteCard from '../containers/NoteCard';
import TipButtonRow from '../containers/TipButtonRow';
import { tipsCountToObject } from '../utils/misc';
import { useTitle } from '../utils/hooks';

const Divider = () => <div className="h-0.5 w-full bg-gradient-to-r from-white via-gray-200 to-white" />;

type Props = State & RouteComponentProps<{ author: string }>;

const Address = ({
  vbInstance,
  setState,
  timelines,
  match: {
    params: { author },
  },
}: Props) => {
  useTitle(author);
  const timeline = useMemo<Timeline>(() => timelines![author], [timelines, author]);
  const getMoreNotes = useCallback(
    async (startingIndex: number) => {
      const newNoteHashHistory: string[] = [...(timeline?.noteHashHistory || [])];
      const newNotes: { [hash: string]: Note } = {};
      for (let i = startingIndex; i >= startingIndex - 9; i--) {
        if (i < 0) {
          break;
        }
        const arr = await callOffChain('getNoteByTimeline', [author, tipTokenIds, i]);
        if (arr) {
          newNoteHashHistory.push(arr[0]);
          newNotes[arr[0]] = {
            author,
            hash: arr[0],
            timestamp: +arr[1] * 1000,
            text: arr[2],
            tips: tipsCountToObject(arr[3]),
            relatedNoteHash: +arr[4] === 0 ? null : arr[4],
          };
        }
      }
      setState!(
        {
          timelines: { [author]: { noteHashHistory: newNoteHashHistory } },
          notes: newNotes,
        },
        { deepMerge: true }
      );
    },
    [author, timeline?.noteHashHistory, setState]
  );

  useEffect(() => {
    if (!timelines![author]) {
      callOffChain('getTimelineStats', [author, tipTokenIds]).then(
        (arr) => {
          if (arr) {
            setState!(
              { timelines: { [author]: { bio: arr[0], totalNotes: +arr[1], tips: tipsCountToObject(arr[2]) } } },
              { deepMerge: true }
            );
            getMoreNotes(+arr[1] - 1);
          }
        },
        (e) => window.alert('getTimelineStats error: ' + JSON.stringify(e))
      );
    }
  }, [author, timelines, getMoreNotes, setState]);

  return (
    <PageContainer>
      <h1 className="text-3xl break-all">{author}</h1>
      {timeline && (
        <>
          <p>
            {timeline.bio}{' '}
            {vbInstance?.accounts[0] === author && (
              <button
                className="text-blue-500"
                onClick={() => {
                  const bio = window.prompt('New bio:');
                  if (vbInstance && bio !== null) {
                    callContract(vbInstance, 'updateBio', [bio]).then(
                      () => {
                        setState!({ timelines: { [author]: { bio } } }, { deepMerge: true });
                      },
                      (e) => window.alert('updateBio error: ' + JSON.stringify(e))
                    );
                  }
                }}
              >
                {timeline.bio ? 'Edit' : 'Add bio'}
              </button>
            )}
          </p>
          <p>
            {timeline.totalNotes} note{timeline.totalNotes === 1 ? '' : 's'}
          </p>
          <TipButtonRow author={author} />
          <Divider />
          {timeline.noteHashHistory ? (
            timeline.noteHashHistory.length ? (
              <>
                {timeline.noteHashHistory.map((hash, i) => (
                  <React.Fragment key={i}>
                    {!!i && <Divider />}
                    <div className="text-lg">
                      <NoteCard hash={hash} />
                    </div>
                  </React.Fragment>
                ))}
                {timeline.noteHashHistory.length < timeline.totalNotes && (
                  <div className="xy">
                    <button
                      className="rect bg-blue-100 text-blue-500"
                      onClick={() => getMoreNotes(timeline.totalNotes - timeline.noteHashHistory.length - 1)}
                    >
                      Show more
                    </button>
                  </div>
                )}
              </>
            ) : (
              <h1 className="text-center text-2xl">Nothing here</h1>
            )
          ) : null}
        </>
      )}
    </PageContainer>
  );
};

export default connect('vbInstance, timelines')(Address);
