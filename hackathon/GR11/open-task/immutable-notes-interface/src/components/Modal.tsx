import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useKeyPress } from '../utils/hooks';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ onClose = () => {}, children, className }: Props) => {
  const mouseDraggingModal = useRef(false);
  const [mounted, mountedSet] = useState(false);
  useEffect(() => {
    mountedSet(true);
  }, []);
  useKeyPress('Escape', onClose);

  return mounted
    ? ReactDOM.createPortal(
        <div
          className="z-10 fixed inset-0 bg-tinted overflow-scroll flex flex-col"
          onClick={() => {
            !mouseDraggingModal.current && onClose();
            mouseDraggingModal.current = false;
          }}
        >
          <div className="flex-1 min-h-[5rem]" />
          <div className="px-4 flex justify-center">
            <div
              className={`bg-white rounded-lg p-6 ${className}`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={() => (mouseDraggingModal.current = true)}
              onMouseUp={() => (mouseDraggingModal.current = false)}
            >
              {children}
            </div>
          </div>
          <div className="flex-1 min-h-[5rem]"></div>
        </div>,
        // @ts-ignore
        document.getElementById('modal')
      )
    : null;
};

export default Modal;
