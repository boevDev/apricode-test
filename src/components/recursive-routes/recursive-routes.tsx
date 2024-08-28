import React from 'react';
import { Route, Routes } from 'react-router-dom';
import taskList from '../../store/task-list';
import { TaskType } from '../../types/task-type';
import { TaskInfo } from '../task-info/task-info';

export const RecursiveRoutes: React.FC = () => {
  const recursiveRoutes = (arr: TaskType[]) => {
    return arr.map((task) => (
      <Route
        key={task.id}
        path={task.id}
        element={<TaskInfo taskItem={task} />}
      >
        {task.subTasks && recursiveRoutes(task.subTasks)}
      </Route>
    ));
  };

  return (
    <Routes>
      <Route path='task/*'>{recursiveRoutes(taskList.taskArray)}</Route>
    </Routes>
  );
};
