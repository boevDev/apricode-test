import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import taskList, { TaskType } from '../../store/task-list';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  onClose: () => void;
  mode: 'add' | 'edit';
  task?: TaskType;
}

interface MyForm {
  title: string;
  description: string;
}

interface VariantsType {
  mode: string;
  action: (data: MyForm) => void;
  textInButton: string;
  colorButton?: string;
}

export const TaskForm: React.FC<Props> = ({ onClose, mode, task }) => {
  const variantsList: VariantsType[] = [
    {
      mode: 'add',
      action: (data) =>
        taskList.addTask({
          title: data.title,
          description: data.description,
        }),
      textInButton: 'Добавить задачу',
      colorButton: 'bg-emerald-500 hover:bg-emerald-600',
    },
    {
      mode: 'edit',
      action: (data) => {
        if (task) {
          taskList.editTask({
            id: task.id,
            title: data.title,
            description: data.description,
          });
        } else {
          console.error(
            "Не удалось редактировать задачу: аргумент 'task' не передан."
          );
        }
      },
      textInButton: 'Изменить задачу',
      colorButton: 'bg-yellow-500 hover:bg-yellow-600',
    },
  ];

  const getVariant = variantsList.find((item) => item.mode === mode);

  const { register, handleSubmit } = useForm<MyForm>();

  const submit: SubmitHandler<MyForm> = (data) => {
    getVariant?.action(data);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='flex flex-col justify-between h-full'
    >
      <div className='bg-slate-200 dark:bg-slate-700 rounded-md'>
        <div className='w-full flex flex-col p-2 rounded-t-md border-b border-slate-300 dark:border-slate-600'>
          <label className='mb-1'>Название задачи</label>
          <input
            defaultValue={mode === 'edit' ? task?.title : ''}
            maxLength={64}
            placeholder='Введите название задачи'
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
          <label className='mb-1'>Описание задачи</label>
          <TextareaAutosize
            defaultValue={mode === 'edit' ? task?.description : ''}
            minRows={4}
            placeholder='Введите описание задачи'
            className='block rounded p-2 border-2 border-slate-300
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none focus:border-slate-400
                dark:bg-slate-600 dark:border-slate-500 dark:focus:border-slate-400'
            {...register('description')}
          />
        </div>
      </div>

      <button
        className={`text-white w-full font-bold text-lg transition-colors mt-4 p-4 rounded-md ${
          getVariant?.colorButton
            ? getVariant?.colorButton
            : 'bg-gray-500 hover:bg-gray-600'
        }`}
        type='submit'
      >
        {getVariant?.textInButton}
      </button>
    </form>
  );
};
