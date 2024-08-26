import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import taskList from '../../store/task-list';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Color } from '../button/button';
import { TaskType } from '../../types/task-type';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .required('Пожалуйста, заполните название задачи!')
    .min(3, 'Минимум 3 символа'),
  text: yup
    .string()
    .required('Пожалуйста, заполните описание задачи!')
    .min(12, 'Минимум 12 символов'),
});

type Mode = 'add' | 'edit' | 'addSub';

interface Props {
  onClose: () => void;
  mode: Mode;
  task?: TaskType;
}

interface MyForm {
  title: string;
  text: string;
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
          text: data.text,
        }),
      textInButton: 'Добавить задачу',
      colorButton: 'emerald',
    },
    edit: {
      action: (data) => {
        if (task) {
          taskList.editTask(task.id, {
            id: task.id,
            title: data.title,
            text: data.text,
            isCompleted: false,
            subTasks: [],
          });
          taskList.chooseTask(task.id);
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
          taskList.addSubtask(task.id, { title: data.title, text: data.text });
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

  const { register, handleSubmit, formState } = useForm<MyForm>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

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
            className={`block rounded p-2 border-2
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none focus:border-slate-400
                dark:bg-slate-600 dark:focus:border-slate-400
                ${
                  errors.title
                    ? 'border-red-500 dark:border-red-500 focus:border-red-500/70 dark:focus:border-red-500/70'
                    : 'border-slate-300 dark:border-slate-500 focus:border-slate-400 dark:focus:border-slate-400'
                }`}
            autoFocus
            type='text'
            {...register('title')}
          />
          <p className='mt-1 text-red-500'>{errors.title?.message}</p>
        </div>

        <div className='w-full flex flex-col p-2 rounded-b-md'>
          <label className='mb-1'>
            {mode === 'addSub' ? 'Описание подзадачи' : 'Описание задачи'}
          </label>
          <TextareaAutosize
            defaultValue={mode === 'edit' ? task?.text : ''}
            minRows={4}
            placeholder={
              mode === 'addSub'
                ? 'Введите описание подзадачи'
                : 'Введите описание задачи'
            }
            className={`block rounded p-2 border-2 overflow-visible
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none
                dark:bg-slate-600
                ${
                  errors.text
                    ? 'border-red-500 dark:border-red-500 focus:border-red-500/70 dark:focus:border-red-500/70'
                    : 'border-slate-300 dark:border-slate-500 focus:border-slate-400 dark:focus:border-slate-400'
                }`}
            {...register('text')}
          />
          <p className='mt-1 text-red-500'>{errors.text?.message}</p>
        </div>
      </div>

      <Button color={getVariant?.colorButton}>
        {getVariant?.textInButton}
      </Button>
    </form>
  );
};
