import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface TaskType {
  id: string;
  title: string;
  description: string;
  subTaskIDs?: string[];
}

class TaskList {
  list: TaskType[] = [];
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

  // editTask(id?: number) {
  //   return this.list.
  // }

  setShowDescription(id: string) {
    this.showDescription = id;
  }
}

export default new TaskList();
