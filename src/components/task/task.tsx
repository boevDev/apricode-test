import { ChevronRight } from 'lucide-react';
import React from 'react';
import taskList from '../../store/task-list';

interface Props {
  id: string;
  children: string;
}

export const Task: React.FC<Props> = ({ children, id }) => {
  return (
    <button
      onClick={() => {
        taskList.setShowDescription(id);
      }}
      className='font-medium text-lg flex flex-row gap-2 justify-between items-center w-full hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-2 cursor-pointer transition-colors'
    >
      <div className='flex flex-row gap-2 items-center w-full truncate'>
        <ChevronRight size={18} />
        {children}
      </div>
    </button>
  );
};
