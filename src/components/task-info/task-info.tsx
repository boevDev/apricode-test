import React, { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import taskList, { TaskType } from '../../store/task-list';
import { Modal } from '../modal/modal';
import { WarningQuestion } from '../warning-question/warning-question';
import { TaskForm } from '../task-form/task-form';
import { Button } from '../button/button';

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
          <Button
            className='rounded-e-none'
            color='yellow'
            onClick={() => setIsOpenEditTask(true)}
          >
            <Pencil size={16} />
            Редактировать
          </Button>
          <Button
            className='rounded-s-none'
            color='red'
            onClick={() => setIsOpenWarnDeleteTask(true)}
          >
            <X size={20} />
            Удалить
          </Button>
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
        <TaskForm
          mode='edit'
          task={task}
          onClose={() => setIsOpenEditTask(false)}
        />
      </Modal>
    </>
  );
};
