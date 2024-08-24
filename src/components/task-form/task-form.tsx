import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import taskList, { TaskType } from '../../store/task-list';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Color } from '../button/button';

type Mode = 'add' | 'edit' | 'addSub';

interface Props {
  onClose: () => void;
  mode: Mode;
  task?: TaskType;
}

interface MyForm {
  title: string;
  description: string;
}

interface VariantsType {
  action: (data: MyForm) => void;
  textInButton: string;
  colorButton?: Color;
}

export const TaskForm: React.FC<Props> = ({ onClose, mode, task }) => {
  const variantsList: { [key in Mode]: VariantsType } = {
    add: {
      action: (data) =>
        taskList.addTask({
          title: data.title,
          description: data.description,
          subTasks: [],
        }),
      textInButton: 'Добавить задачу',
      colorButton: 'emerald',
    },
    edit: {
      action: (data) => {
        if (task) {
          taskList.editTask({
            id: task.id,
            title: data.title,
            description: data.description,
            subTasks: [],
          });
        } else {
          console.error(
            "Не удалось редактировать задачу: аргумент 'task' не передан."
          );
        }
      },
      textInButton: 'Изменить задачу',
      colorButton: 'yellow',
    },
    addSub: {
      action: (data) => {
        if (task) {
          taskList.addSubTask(
            {
              title: data.title,
              description: data.description,
              subTasks: [],
            },
            task.id
          );
        } else {
          console.error(
            "Не удалось редактировать задачу: аргумент 'task' не передан."
          );
        }
      },
      textInButton: 'Добавить подзадачу',
      colorButton: 'emerald',
    },
  };

  const getVariant = variantsList[mode];

  const { register, handleSubmit } = useForm<MyForm>();

  const submit: SubmitHandler<MyForm> = (data) => {
    getVariant?.action(data);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='flex flex-col justify-between h-full gap-4'
    >
      <div className='bg-slate-200 dark:bg-slate-700 rounded-md'>
        <div className='w-full flex flex-col p-2 rounded-t-md border-b border-slate-300 dark:border-slate-600'>
          <label className='mb-1'>
            {mode === 'addSub' ? 'Название подзадачи' : 'Название задачи'}
          </label>
          <input
            defaultValue={mode === 'edit' ? task?.title : ''}
            maxLength={64}
            placeholder={
              mode === 'addSub'
                ? 'Введите название подзадачи'
                : 'Введите название задачи'
            }
            className='block rounded p-2 border-2 border-slate-300
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none focus:border-slate-400
                dark:bg-slate-600 dark:border-slate-500 dark:focus:border-slate-400'
            autoFocus
            type='text'
            {...register('title')}
          />
        </div>

        <div className='w-full flex flex-col p-2 rounded-b-md'>
          <label className='mb-1'>
            {mode === 'addSub' ? 'Описание подзадачи' : 'Описание задачи'}
          </label>
          <TextareaAutosize
            defaultValue={mode === 'edit' ? task?.description : ''}
            minRows={4}
            placeholder={
              mode === 'addSub'
                ? 'Введите описание подзадачи'
                : 'Введите описание задачи'
            }
            className='block rounded p-2 border-2 border-slate-300
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none focus:border-slate-400
                dark:bg-slate-600 dark:border-slate-500 dark:focus:border-slate-400'
            {...register('description')}
          />
        </div>
      </div>

      <Button color={getVariant?.colorButton}>
        {getVariant?.textInButton}
      </Button>
    </form>
  );
};
