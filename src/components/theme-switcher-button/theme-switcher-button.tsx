import { ChevronDown, ChevronUp, Moon, Sun, SunMoon } from 'lucide-react';
import React, { useState } from 'react';

export const ThemeSwithcerButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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

    setIsOpen((prev) => !prev);
  };

  const list = [
    {
      theme: 'light',
      name: 'Светлая',
      icon: <Sun />,
    },
    {
      theme: 'dark',
      name: 'Тёмная',
      icon: <Moon />,
    },
    {
      theme: 'system',
      name: 'Системная',
      icon: <SunMoon />,
    },
  ];

  return (
    <div className='relative flex flex-col items-center w-[340px] h-[340px] rounded-lg'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'
      >
        Сменить тему
        {!isOpen ? <ChevronDown /> : <ChevronUp />}
      </button>

      {isOpen && (
        <div className='bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full z-50'>
          {list.map((item, i) => (
            <button
              onClick={() => handleClick(item.theme)}
              className='flex w-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4'
              key={i}
            >
              <h3 className='font-bold'>{item.name}</h3>
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
