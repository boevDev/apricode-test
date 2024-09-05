export type TaskType = {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
  isShownSubTasks: boolean;
  subTasks: TaskType[];
};
