import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react';
import taskList from '../../store/task-list';
import { Button } from '../button/button';
import { Modal } from '../modal/modal';
import { TasksList } from '../tasks-list/tasks-list';
import { TaskForm } from '../task-form/task-form';

interface Props {
  id: string;
  children: string;
}

export const Task: React.FC<Props> = ({ children, id }) => {
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [isOpenAddSubTask, setIsOpenAddSubTask] = useState(false);

  const selectedTask = taskList.list.find((task) => task.id === id);

  return (
    <>
      <button
        onClick={() => {
          setIsOpenTask((prev) => !prev);
          taskList.setSelectedTaskID(id);
        }}
        className='font-medium text-lg flex flex-row gap-2 justify-between items-center w-full hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-2 cursor-pointer transition-colors'
      >
        <div className='flex flex-row gap-2 items-center w-full truncate'>
          {isOpenTask ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          {children}
        </div>

        <Modal
          isOpen={isOpenAddSubTask}
          onClose={() => setIsOpenAddSubTask(false)}
        >
          <TaskForm
            onClose={() => setIsOpenAddSubTask(false)}
            mode='addSub'
            task={selectedTask}
          />
        </Modal>
      </button>
      {isOpenTask && (
        <div className='pl-6'>
          <TasksList>
            {selectedTask?.subTasks.map((subTask) => (
              <Task id={subTask.id} key={subTask.id}>
                {subTask.title}
              </Task>
            ))}
          </TasksList>
          <button
            className='text-lg flex flex-row gap-2 justify-start items-center w-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-2 cursor-pointer transition-colors'
            onClick={() => setIsOpenAddSubTask((prev) => !prev)}
          >
            <Plus size={20} />
            Добавить подзадачу
          </button>
        </div>
      )}
    </>
  );
};
