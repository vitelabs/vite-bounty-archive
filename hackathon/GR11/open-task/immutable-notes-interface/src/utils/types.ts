import Connector from '@vite/connector';
import { setState } from './wep-state';

export type State = {
  vbInstance?: typeof Connector;
  timelines?: {
    [address: string]: Timeline;
  };
  notes?: {
    [hash: string]: Note;
  };
  setState?: setState;
};

export type Timeline = {
  bio: string;
  totalNotes: number;
  tips: { [tokenId: string]: number };
  noteHashHistory: string[];
};

export type Note = {
  hash: string;
  timestamp: number;
  text: string;
  author: string;
  tips: { [tokenId: string]: number };
  relatedNoteHash: string;
};
