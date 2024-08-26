import React, { useState } from 'react';
import { Pencil, Plus, X } from 'lucide-react';
import taskList from '../../store/task-list';
import { Modal } from '../modal/modal';
import { WarningQuestion } from '../warning-question/warning-question';
import { TaskForm } from '../task-form/task-form';
import { Button } from '../button/button';
import { observer } from 'mobx-react-lite';

export const TaskInfo: React.FC = observer(() => {
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
            <h2 className='text-center text-lg font-bold'>
              {taskList.activeTask.title}
            </h2>
            <p className='whitespace-pre-line mt-4 pr-4'>
              {taskList.activeTask.text}
            </p>
          </div>

          <div className='flex flex-row justify-center mt-4 rounded shadow'>
            <Button
              className='rounded-e-none'
              color='emerald'
              onClick={addModalToggler}
            >
              <Plus size={20} />
              Подзадача
            </Button>
            <Button
              className='rounded-none'
              color='yellow'
              onClick={editModalToggler}
            >
              <Pencil size={16} />
              Редактировать
            </Button>
            <Button
              className='rounded-s-none'
              color='red'
              onClick={removeModalToggler}
            >
              <X size={20} />
              Удалить
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
