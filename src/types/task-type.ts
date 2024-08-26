export type TaskType = {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
  subTasks: TaskType[];
};
