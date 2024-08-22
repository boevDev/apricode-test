import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({
  isOpen = false,
  onClose,
  children,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const inModal = (e.target as HTMLElement).closest('[data-id=modal]');
    if (inModal) return;
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const modal = (
    <div
      onClick={handleClick}
      className='fixed inset-0 backdrop-blur py-10 bg-slate-950/60 overflow-y-auto flex'
    >
      <div
        data-id='modal'
        className='flex flex-col justify-between bg-white dark:bg-slate-800 rounded-md m-auto min-h-[320px] h-auto w-full max-w-[640px] relative p-6'
      >
        {children}
        <button
          onClick={onClose}
          className='w-8 h-8 rounded-md flex justify-center items-center
         bg-white/10 hover:bg-white/40 transition-colors
         absolute top-0 left-[calc(100%+12px)]'
        >
          <X size={20} color='white' />
        </button>
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.getElementById('modal') as HTMLDivElement
  );
};
