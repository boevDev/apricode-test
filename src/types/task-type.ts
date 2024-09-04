export type TaskType = {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
  isShownSubtasks: boolean;
  subTasks: TaskType[];
};
