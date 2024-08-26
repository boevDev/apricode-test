import React from 'react';
import taskList from '../../store/task-list';
import { Task } from '../task/task';
import { observer } from 'mobx-react-lite';

interface Props {
  className?: string;
}

export const TasksList: React.FC<Props> = observer(({ className }) => {
  return (
    <ul className={`flex flex-col w-full gap-1 ${className}`}>
      {taskList.taskArray.map((item) => (
        <Task key={item.id} taskItem={item}></Task>
      ))}
    </ul>
  );
});
