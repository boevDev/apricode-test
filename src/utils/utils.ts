import { TaskType } from '../types/task-type';

type SubTaskAddingProps = (
  id: string,
  array: TaskType[],
  task: TaskType
) => TaskType[];

type RecursionProps = (id: string, array: TaskType[]) => TaskType[];

type SearchProps = (id: string, array: TaskType[]) => TaskType | null;

type CompleteTogglerProps = (array: TaskType[], state: boolean) => TaskType[];

export const subTaskAdding: SubTaskAddingProps = (id, array, task) => {
  return array.reduce((arr: TaskType[], item) => {
    if (item.id === id) {
      item.subTasks.push(task);
      arr.push(item);
    } else {
      arr.push({ ...item, subTasks: subTaskAdding(id, item.subTasks, task) });
    }

    return arr;
  }, []);
};

export const recursionFilter: RecursionProps = (id, array) => {
  return array.reduce((arr: TaskType[], item) => {
    if (item.id !== id) {
      arr.push({ ...item, subTasks: recursionFilter(id, item.subTasks) });
    }

    return arr;
  }, []);
};

export const recursionReplace = (
  id: string,
  array: TaskType[],
  task: TaskType
) => {
  return array.reduce((arr: TaskType[], item) => {
    if (item.id === id) {
      arr.push({
        ...task,
      });
    } else {
      const newItem = { ...item };
      if (Array.isArray(item.subTasks)) {
        newItem.subTasks = recursionReplace(id, item.subTasks, task);
      }

      arr.push(newItem);
    }

    return arr;
  }, []);
};

export const recursionSearch: SearchProps = (id, array) => {
  for (const item of array) {
    if (item.id === id) {
      return item;
    }

    const subItem = recursionSearch(id, item.subTasks);

    if (subItem) {
      return subItem;
    }
  }

  return null;
};

export const recursionCompleteToggler: RecursionProps = (id, array) => {
  return array.reduce((arr: TaskType[], item) => {
    if (item.id !== id) {
      arr.push({
        ...item,
        subTasks: recursionCompleteToggler(id, item.subTasks),
      });
    } else {
      arr.push({
        ...item,
        isCompleted: !item.isCompleted,
        subTasks: subTasksCompleteToggler(item.subTasks, !item.isCompleted),
      });
    }

    return arr;
  }, []);
};

export const subTasksCompleteToggler: CompleteTogglerProps = (array, state) => {
  return array.reduce((arr: TaskType[], item) => {
    arr.push({
      ...item,
      isCompleted: state,
      subTasks: subTasksCompleteToggler(item.subTasks, state),
    });

    return arr;
  }, []);
};
