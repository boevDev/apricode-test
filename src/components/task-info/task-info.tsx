import React from 'react';
import { Pencil, X } from 'lucide-react';
import taskList, { TaskType } from '../../store/task-list';

interface Props {
  task: TaskType;
}

export const TaskInfo: React.FC<Props> = ({ task }) => {
  return (
    <div className='flex flex-1 flex-col justify-start bg-slate-200 rounded-e-md p-4 relative dark:bg-slate-700'>
      <div className='flex flex-row justify-center'>
        <button
          className='flex flex-row flex-nowrap 
              gap-2 items-center justify-center
            bg-blue-500 hover:bg-blue-600
              rounded-l text-white
              w-full max-w-64 p-2
              border-r-2 border-r-white'
        >
          <Pencil size={16} />
          Редактировать задачу
        </button>
        <button
          onClick={() => taskList.deleteTask(task.id)}
          className='flex flex-row flex-nowrap 
              gap-2 items-center justify-center
            bg-red-500 hover:bg-red-600
              rounded-r text-white
              w-full max-w-64 p-2'
        >
          <X size={20} />
          Удалить задачу
        </button>
      </div>
      <div className='overflow-y-auto mt-2 rounded-2xl'>{task.description}</div>
    </div>
  );
};
