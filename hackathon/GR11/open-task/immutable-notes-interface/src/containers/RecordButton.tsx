import { useState } from 'react';
import Modal from '../components/Modal';
import { EditIcon } from '../utils/misc';
import { State } from '../utils/types';
import NoteRecorder from './NoteRecorder';

type Props = State & {
  className?: string;
  icon?: boolean;
};

const RecordButton = ({ className, icon = true }: Props) => {
  const [open, openSet] = useState(false);

  return (
    <>
      <button
        className={className}
        onClick={() => {
          openSet(true);
        }}
      >
        {icon ? <EditIcon size={30} /> : 'Record note'}
      </button>
      {open && (
        <Modal onClose={() => openSet(false)} className="record-modal">
          <NoteRecorder />
        </Modal>
      )}
    </>
  );
};

export default RecordButton;
