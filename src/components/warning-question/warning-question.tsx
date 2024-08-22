import React from 'react';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export const WarningQuestion: React.FC<Props> = ({
  children,
  onClose,
  onConfirm,
}) => {
  return (
    <>
      <div className='flex flex-col gap-8'>
        <h2 className='text-center font-light text-2xl'>
          Подтвердите действие!
        </h2>
        <p className='font-medium text-lg'>{children}</p>
      </div>

      <div className='flex flex-row justify-between text-lg'>
        <button
          className='bg-emerald-500 hover:bg-emerald-600 transition-colors w-full p-4 rounded-s'
          onClick={() => onClose()}
        >
          Нет
        </button>
        <button
          className='bg-red-500 hover:bg-red-600 transition-colors w-full p-4 rounded-e'
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Да
        </button>
      </div>
    </>
  );
};
