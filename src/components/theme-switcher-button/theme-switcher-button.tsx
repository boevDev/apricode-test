import React from 'react';

const handleClick = (theme: 'light' | 'dark' | 'system') => {
  if (theme === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const ThemeSwithcerButton: React.FC = () => {
  return (
    <div className='absolute top-2 left-2'>
      <button
        onClick={() => handleClick('light')}
        className=' bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 p-2 rounded-md'
      >
        Светлая
      </button>
      <button
        onClick={() => handleClick('dark')}
        className=' bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 p-2 rounded-md'
      >
        Тёмная
      </button>
      <button
        onClick={() => handleClick('system')}
        className=' bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 p-2 rounded-md'
      >
        Системная
      </button>
    </div>
  );
};
