import { makeAutoObservable } from 'mobx';

export interface TaskType {
  id?: number;
  title?: string;
  description?: string;
}

class TaskList {
  list: object[] = [];
  showDescription?: number = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: TaskType) {
    this.list.push({
      id: this.list.length + 1,
      title: task.title,
      description: task.description,
    });
  }

  setShowDescription(id?: number) {
    this.showDescription = id;
  }
}

export default new TaskList();
