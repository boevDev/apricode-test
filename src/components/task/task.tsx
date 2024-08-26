import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { TaskType } from '../../types/task-type';
import { observer } from 'mobx-react-lite';
import taskList from '../../store/task-list';
import { SwitchCheckbox } from '../switch-checkbox/switch-checkbox';
import styles from './style.module.scss';

type Props = {
  taskItem: TaskType;
};

export const Task: React.FC<Props> = observer(({ taskItem }) => {
  const { id, title, isCompleted, subTasks } = taskItem;

  const [isSubTasksShown, setIsSubTasksShown] = useState(false);

  function subTasksToggler() {
    setIsSubTasksShown((prevSubTasks) => !prevSubTasks);
  }

  return (
    <>
      <button
        onClick={() => {
          subTasksToggler();
          taskList.chooseTask(id);
        }}
        className={`flex flex-row gap-2 justify-between items-center w-full font-medium text-lg border-2 border-transparent
           hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-2 cursor-pointer transition-colors
           ${
             taskList.activeTask?.id === id &&
             `border-slate-600 dark:border-slate-400 bg-slate-200 dark:bg-slate-700`
           }
            ${styles.container}`}
      >
        <div className='flex flex-row flex-nowrap justify-start gap-2 items-center w-full'>
          <div>
            {subTasks.length > 0 && isSubTasksShown ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </div>

          <h2 className='truncate'>{title}</h2>
        </div>
        <div
          className={`${
            !isCompleted && styles.checkbox
          } transition-all ease-in-out`}
        >
          <SwitchCheckbox
            checked={isCompleted}
            id={id}
            onChange={() => taskList.completeToggler(id)}
          />
        </div>
      </button>

      {subTasks.length > 0 && isSubTasksShown && (
        <div className='pl-5'>
          <div className='pl-1 flex flex-col gap-1 border-s-2 border-slate-300 dark:border-slate-600'>
            {subTasks.map((subTask) => (
              <Task key={subTask.id} taskItem={subTask} />
            ))}
          </div>
        </div>
      )}
    </>
  );
});
