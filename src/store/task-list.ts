import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface TaskType {
  id: string;
  title: string;
  description: string;
  subTaskIDs?: string[];
}

class TaskList {
  list: TaskType[] = localStorage.list ? JSON.parse(localStorage.list) : [];
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
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  deleteTask(id: string) {
    this.list = this.list.filter((item) => item.id !== id);
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  clearTaskList() {
    this.list = [];
    localStorage.removeItem('list');
  }

  editTask(task: TaskType) {
    this.list = this.list.map((item) => (item.id === task.id ? task : item));
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  setShowDescription(id: string) {
    this.showDescription = id;
  }
}

export default new TaskList();
