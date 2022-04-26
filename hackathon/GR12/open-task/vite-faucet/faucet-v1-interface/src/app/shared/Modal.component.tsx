import React, { useRef } from 'react';

type Props = {
  visible: boolean,
  setVisible: (e:boolean) => void;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ visible, setVisible, onClose = () => { }, children, className }: Props) => {
  // const mouseDraggingModal = useRef(false);
  
  return visible ? (<div
    className="z-10 fixed inset-0 bg-tinted overflow-scroll flex flex-col"
    onClick={() => {
      setVisible(!visible)
    }}
  >
    <div className="flex-1 min-h-[5rem]" />
    <div className="px-4 flex justify-center">
      <div
        className={`bg-white rounded-lg p-6 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
    <div className="flex-1 min-h-[5rem]"></div>
  </div>) : null
};

export default Modal;
