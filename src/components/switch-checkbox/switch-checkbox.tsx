import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  id: string;
}

export const SwitchCheckbox: React.FC<Props> = ({ id, ...props }) => {
  return (
    <>
      <label
        htmlFor={`checkbox-${id}`}
        className='flex w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer border-4 border-slate-300 dark:border-slate-600'
      >
        <input
          {...props}
          type='checkbox'
          id={`checkbox-${id}`}
          className='sr-only peer'
        />
        <span className='w-6 h-6 bg-slate-400 rounded-full peer-checked:ml-6 transition-all my-auto'></span>
      </label>
    </>
  );
};
