import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import taskList, { TaskType } from '../../store/task-list';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  onClose: () => void;
  task: TaskType;
}

interface MyForm {
  title: string;
  description: string;
}

export const EditTaskForm: React.FC<Props> = ({ onClose, task }) => {
  const { register, handleSubmit } = useForm<MyForm>();

  const submit: SubmitHandler<MyForm> = (data) => {
    taskList.editTask({
      id: task.id,
      title: data.title,
      description: data.description,
    });
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='flex flex-col justify-between h-full'
    >
      <div className='mb-4'>
        <span className='italic font-light'>Редактирование задачи </span>
        <strong className='bg-yellow-500/50'>{task.title}</strong>
      </div>
      <div className='bg-slate-200 dark:bg-slate-700 rounded-md'>
        <div className='w-full flex flex-col p-2 rounded-t-md border-b border-slate-300 dark:border-slate-600'>
          <label className='mb-1'>Название задачи</label>
          <input
            defaultValue={task.title}
            maxLength={50}
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
            defaultValue={task.description}
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
        className='text-white w-full font-bold text-lg bg-yellow-500 hover:bg-yellow-600 transition-colors mt-4 p-4 rounded-md'
        type='submit'
      >
        Изменить задачу
      </button>
    </form>
  );
};
