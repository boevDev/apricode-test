import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import {
  recursionFilter,
  recursionCompleteToggler,
  subTaskAdding,
  recursionReplace,
} from '../utils/utils';
import { TaskType } from '../types/task-type';

class TaskList {
  taskArray: TaskType[] = localStorage.tasks
    ? JSON.parse(localStorage.tasks)
    : [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask = (task: { title: string; text: string }) => {
    this.taskArray.push({
      id: uuidv4(),
      title: task.title,
      text: task.text,
      isCompleted: false,
      subTasks: [],
    });
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  };

  addSubtask = (id: string, taskData: { title: string; text: string }) => {
    const task = {
      id: uuidv4(),
      title: taskData.title,
      text: taskData.text,
      isCompleted: false,
      subTasks: [],
    };

    this.taskArray = subTaskAdding(id, this.taskArray, task);
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  };

  removeTask = (id: string) => {
    this.taskArray = recursionFilter(id, this.taskArray);
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));

    if (!this.taskArray.length) {
      localStorage.removeItem('tasks');
    }
  };

  removeAllTasks = () => {
    this.taskArray = [];
    localStorage.removeItem('tasks');
  };

  completeToggler = (id: string) => {
    this.taskArray = recursionCompleteToggler(id, this.taskArray);
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  };

  editTask(
    id: string,
    taskData: { title: string; text: string; subTasks: TaskType[] }
  ) {
    const task = {
      id: id,
      title: taskData.title,
      text: taskData.text,
      isCompleted: false,
      subTasks: taskData.subTasks,
    };
    this.taskArray = recursionReplace(id, this.taskArray, task);
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  }
}

const taskList = new TaskList();

export default taskList;
