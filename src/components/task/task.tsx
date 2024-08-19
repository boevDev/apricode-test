import { ChevronRight, X } from 'lucide-react';
import React from 'react';
import style from './style.module.scss';

interface Props {
  children?: string;
}

export const Task: React.FC<Props> = ({ children }) => {
  return (
    <li
      className={`font-medium text-lg flex flex-row gap-2 justify-between items-center w-full hover:bg-slate-200 rounded-md p-2 cursor-pointer ease-out duration-75 ${style.container}`}
    >
      <div className='flex flex-row gap-2 items-center'>
        <ChevronRight size={18} />
        {children}
      </div>
      <button
        className={`bg-red-300 hover:bg-red-400 active:bg-red-500 p-1 rounded-md ease-out duration-75 ${style.close}`}
      >
        <X size={18} />
      </button>
    </li>
  );
};
