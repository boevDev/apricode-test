import React from 'react';
import { Button } from '../button/button';

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

      <div className='flex flex-row justify-between text-lg w-full'>
        <Button
          className='rounded-e-none'
          color='red'
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Да
        </Button>
        <Button
          className='rounded-s-none'
          color='emerald'
          onClick={() => onClose()}
        >
          Нет
        </Button>
      </div>
    </>
  );
};
