import React, { useState } from 'react';
import { Pencil, Plus, X } from 'lucide-react';
import taskList from '../../store/task-list';
import { Modal } from '../modal/modal';
import { WarningQuestion } from '../warning-question/warning-question';
import { TaskForm } from '../task-form/task-form';
import { Button } from '../button/button';
import { observer } from 'mobx-react-lite';
import { TaskType } from '../../types/task-type';

interface Props {
  taskItem: TaskType;
}

export const TaskInfo: React.FC<Props> = observer(({ taskItem }) => {
  const [isShownAddModal, setIsShownAddModal] = useState(false);
  const [isShownEditModal, setIsShownEditModal] = useState(false);
  const [isShownRemoveModal, setIsShownRemoveModal] = useState(false);

  const addModalToggler = () => {
    setIsShownAddModal((prevState) => !prevState);
  };

  const editModalToggler = () => {
    setIsShownEditModal((prevState) => !prevState);
  };

  const removeModalToggler = () => {
    setIsShownRemoveModal((prevState) => !prevState);
  };

  return (
    taskList.activeTask && (
      <>
        <div className='flex flex-1 flex-col justify-between bg-slate-200 rounded-e-md p-4 relative dark:bg-slate-700'>
          <div className='overflow-y-auto'>
            <div className='flex flex-row w-full'>
              <h2 className='text-center text-lg font-bold w-full'>
                {taskItem.title}
              </h2>
              <Button
                className='max-w-9 max-h-9 p-0'
                color='red'
                variant='outlined'
                onClick={taskList.closeTask}
              >
                <X />
              </Button>
            </div>

            <p className='whitespace-pre-line mt-4 pr-4'>{taskItem.text}</p>
          </div>

          <div className='flex flex-row justify-center mt-4 rounded shadow'>
            <Button
              className='rounded-e-none'
              color='emerald'
              onClick={addModalToggler}
            >
              <Plus size={20} />
              <span className='hidden lg:inline'>Подзадача</span>
            </Button>
            <Button
              className='rounded-none'
              color='yellow'
              onClick={editModalToggler}
            >
              <Pencil size={16} />
              <span className='hidden lg:inline'>Редактировать</span>
            </Button>
            <Button
              className='rounded-s-none'
              color='red'
              onClick={removeModalToggler}
            >
              <X size={20} />
              <span className='hidden lg:inline'>Удалить</span>
            </Button>
          </div>
        </div>

        <Modal isOpen={isShownAddModal} onClose={addModalToggler}>
          <TaskForm
            mode='addSub'
            onClose={addModalToggler}
            task={taskList.activeTask}
          ></TaskForm>
        </Modal>

        <Modal isOpen={isShownEditModal} onClose={editModalToggler}>
          <TaskForm
            mode='edit'
            task={taskList.activeTask}
            onClose={editModalToggler}
          />
        </Modal>

        <Modal isOpen={isShownRemoveModal} onClose={removeModalToggler}>
          <WarningQuestion
            onConfirm={() =>
              taskList.activeTask && taskList.removeTask(taskList.activeTask.id)
            }
            onClose={removeModalToggler}
          >
            Вы действительно хотите удалить задачу{' '}
            <strong className='bg-red-500/50'>
              {taskList.activeTask.title}
            </strong>
            ? Восстановить её будет уже невозможно!
          </WarningQuestion>
        </Modal>
      </>
    )
  );
});
