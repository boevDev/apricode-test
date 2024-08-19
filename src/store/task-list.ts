import { makeAutoObservable } from 'mobx';

class TaskList {
  list = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new TaskList();
