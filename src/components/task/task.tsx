import { ChevronRight } from 'lucide-react';
import React from 'react';
import style from './style.module.scss';
import taskList from '../../store/task-list';

interface Props {
  id: string;
  children?: string;
}

export const Task: React.FC<Props> = ({ children, id }) => {
  return (
    <button
      onClick={() => {
        taskList.setShowDescription(id);
      }}
      className={`font-medium text-lg flex flex-row gap-2 justify-between items-center w-full hover:bg-slate-200 rounded-md p-2 cursor-pointer ease-out duration-75 ${style.container}`}
    >
      <div className='flex flex-row gap-2 items-center w-full'>
        <ChevronRight size={18} />
        {children}
      </div>
    </button>
  );
};
