import React, { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import taskList, { TaskType } from '../../store/task-list';
import { Modal } from '../modal/modal';
import { WarningQuestion } from '../warning-question/warning-question';
import { EditTaskForm } from '../edit-task-form/edit-task-form';

interface Props {
  task: TaskType;
}

export const TaskInfo: React.FC<Props> = ({ task }) => {
  const [isOpenWarnDeleteTask, setIsOpenWarnDeleteTask] = useState(false);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);

  return (
    <>
      <div className='flex flex-1 flex-col justify-between bg-slate-200 rounded-e-md p-4 relative dark:bg-slate-700'>
        <div className='overflow-y-auto'>
          <h2 className='text-center text-lg font-bold'>{task.title}</h2>
          <div className='whitespace-pre-line mt-4 pr-4'>
            {task.description}
          </div>
        </div>

        <div className='flex flex-row justify-center mt-4 rounded shadow'>
          <button
            onClick={() => setIsOpenEditTask(true)}
            className='flex flex-row flex-nowrap 
            gap-2 items-center justify-center
          bg-yellow-500 hover:bg-yellow-600
            rounded-l text-white
            w-full p-2'
          >
            <Pencil size={16} />
            Редактировать задачу
          </button>
          <button
            onClick={() => setIsOpenWarnDeleteTask(true)}
            className='flex flex-row flex-nowrap 
            gap-2 items-center justify-center
          bg-red-500 hover:bg-red-600
            rounded-r text-white
            w-full p-2'
          >
            <X size={20} />
            Удалить задачу
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpenWarnDeleteTask}
        onClose={() => setIsOpenWarnDeleteTask(false)}
      >
        <WarningQuestion
          onConfirm={() => taskList.deleteTask(task.id)}
          onClose={() => setIsOpenWarnDeleteTask(false)}
        >
          Вы действительно хотите удалить задачу{' '}
          <strong className='bg-red-500/50'>{task.title}</strong>? Восстановить
          её будет уже невозможно!
        </WarningQuestion>
      </Modal>

      <Modal isOpen={isOpenEditTask} onClose={() => setIsOpenEditTask(false)}>
        <EditTaskForm task={task} onClose={() => setIsOpenEditTask(false)} />
      </Modal>
    </>
  );
};
