import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import taskList from '../../store/task-list';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  onClose: () => void;
}

interface MyForm {
  title: string;
  description: string;
}

export const AddTaskForm: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<MyForm>();

  const submit: SubmitHandler<MyForm> = (data) => {
    taskList.addTask({ title: data.title, description: data.description });
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
        className='text-white w-full font-bold text-lg bg-emerald-500 hover:bg-emerald-600 transition-colors mt-4 p-4 rounded-md'
        type='submit'
      >
        Добавить задачу
      </button>
    </form>
  );
};
