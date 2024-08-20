import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import taskList from '../../store/task-list';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface MyForm {
  title: string;
  description: string;
}

export const AddTaskModal: React.FC<Props> = ({ isOpen = false, onClose }) => {
  const { register, handleSubmit } = useForm<MyForm>();

  const submit: SubmitHandler<MyForm> = (data) => {
    taskList.addTask({ title: data.title, description: data.description });
    onClose();
  };

  const handleClick = (e: React.MouseEvent) => {
    const inModal = (e.target as HTMLElement).closest('[data-id=modal]');
    if (inModal) return;
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const modal = (
    <div
      onClick={handleClick}
      className='fixed inset-0 backdrop-blur py-10 bg-slate-900/60 overflow-y-auto flex'
    >
      <div
        data-id='modal'
        className='bg-white rounded-md m-auto min-h-[320px] h-auto w-full max-w-[640px] relative p-6'
      >
        <form
          onSubmit={handleSubmit(submit)}
          className='flex flex-col justify-between h-full'
        >
          <div>
            <div className='w-full flex flex-col bg-slate-200 p-2 rounded-t-md border-b border-slate-300'>
              <label>Название задачи</label>
              <input
                placeholder='Введите название задачи'
                className='block rounded p-2 border-2 border-slate-300
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none focus:border-slate-400'
                autoFocus
                type='text'
                {...register('title')}
              />
            </div>

            <div className='w-full flex flex-col bg-slate-200 p-2 rounded-b-md'>
              <label>Описание задачи</label>
              <textarea
                placeholder='Введите описание задачи'
                className='block rounded p-2 border-2 border-slate-300
                text-inherit bg-clip-padding
                bg-slate-50 text-base transition-all
                focus:outline-none focus:border-slate-400'
                {...register('description')}
              />
            </div>
          </div>

          <button
            className='text-white w-full font-bold text-lg bg-emerald-400 hover:bg-emerald-500 transition-colors mt-4 p-4 rounded-md'
            type='submit'
          >
            Добавить задачу
          </button>
        </form>
        <button
          onClick={onClose}
          className='w-8 h-8 rounded-md flex justify-center items-center
         bg-white/10 hover:bg-white/40 transition-colors
         absolute top-0 left-[calc(100%+12px)]'
        >
          <X size={20} color='white' />
        </button>
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.getElementById('modal') as HTMLDivElement
  );
};
