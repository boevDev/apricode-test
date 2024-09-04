import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";
import { TaskType } from "../../types/task-type";
import { observer } from "mobx-react-lite";
import taskList from "../../store/task-list";
import { SwitchCheckbox } from "../switch-checkbox/switch-checkbox";
import styles from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  taskItem: TaskType;
};

export const Task: React.FC<Props> = observer(({ taskItem }) => {
  const { id, title, isCompleted, subTasks, isShownSubTasks } = taskItem;
  const navigate = useNavigate();

  const handleChooseTask = () => {
    navigate(`/${id}`);
  };

  const { pathname } = useLocation();

  return (
    <>
      <button
        onClick={() => {
          handleChooseTask();
        }}
        className={`flex flex-row gap-2 justify-between items-center w-full font-medium text-lg border-2 border-transparent
           hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-2 cursor-pointer transition-colors
            ${styles.container}
            ${
              pathname === `/${id}` &&
              `border-slate-600 dark:border-slate-400 bg-slate-200 dark:bg-slate-700`
            }`}
      >
        <div className="flex flex-row flex-nowrap justify-start gap-2 items-center w-full overflow-x-hidden">
          <button
            className="p-2 hover:bg-slate-300 dark:hover:bg-slate-600 rounded"
            onClick={() => taskList.isShownSubTasksToggler(id)}
          >
            {isShownSubTasks ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          <h2 className="truncate">{title}</h2>
        </div>
        <div
          className={`${
            !isCompleted && styles.checkbox
          } transition-opacity ease-in-out`}
        >
          <SwitchCheckbox
            checked={isCompleted}
            id={id}
            onChange={() => taskList.completeToggler(id)}
          />
        </div>
      </button>

      {isShownSubTasks && (
        <div className="pl-5">
          <div className="pl-1 flex flex-col gap-1 border-s-2 border-slate-300 dark:border-slate-600">
            {subTasks.map((subTask) => (
              <Task key={subTask.id} taskItem={subTask} />
            ))}
          </div>
        </div>
      )}
    </>
  );
});
