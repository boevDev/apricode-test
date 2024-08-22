import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface TaskType {
  id: string;
  title: string;
  description: string;
  subTaskIDs?: string[];
}

class TaskList {
  list: TaskType[] = [
    {
      id: '32fsdfsdfsdfsd',
      title: 'Задача 1',
      description: 'Описание 1',
    },
    {
      id: '32fsdfsdfsdfsde42312',
      title: 'Задача 2',
      description: 'Описание 2',
    },
    {
      id: '32fsdfsdfsdfsd111111',
      title: 'Задача 3',
      description: 'Описание 3',
    },
    {
      id: '32fsdfsdfsdfsd222222',
      title: 'Задача 4',
      description: 'Описание 4',
    },
  ];
  showDescription?: string;

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: Omit<TaskType, 'id'>) {
    this.list.push({
      id: uuidv4(),
      title: task.title,
      description: task.description,
    });
  }

  deleteTask(id: string) {
    this.list = this.list.filter((item) => item.id !== id);
  }

  clearTaskList() {
    this.list = [];
  }

  editTask(task: TaskType) {
    this.list = this.list.map((item) => (item.id === task.id ? task : item));
    console.log(this.list);
  }

  setShowDescription(id: string) {
    this.showDescription = id;
  }
}

export default new TaskList();
