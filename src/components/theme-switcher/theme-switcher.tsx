import { ChevronDown, ChevronUp, Moon, Sun, SunMoon } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  className?: string;
}

export const ThemeSwithcer: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    const inThemeSwitcher = (e.target as HTMLElement).closest(
      '[data-id=theme-switcher]'
    );
    if (inThemeSwitcher) return;
    setIsOpen(false);
  };

  type Theme = 'light' | 'dark' | 'system';

  const selectTheme = (theme: Theme) => {
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

    setIsOpen(false);
  };

  const list = [
    {
      theme: 'light' as Theme,
      name: 'Светлая',
      icon: <Sun />,
    },
    {
      theme: 'dark' as Theme,
      name: 'Тёмная',
      icon: <Moon />,
    },
    {
      theme: 'system' as Theme,
      name: 'Системная',
      icon: <SunMoon />,
    },
  ];

  return (
    <>
      {isOpen && <div onClick={handleClick} className='fixed inset-0'></div>}
      <div
        id='theme-switcher'
        className={`relative flex flex-col items-center w-full max-w-64 rounded-md ${className}`}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className='bg-slate-200/20 shadow backdrop-blur p-4 w-full flex items-center justify-between font-bold text-base rounded-md tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white'
        >
          Сменить тему
          {!isOpen ? <ChevronDown /> : <ChevronUp />}
        </button>

        {isOpen && (
          <div className='bg-slate-200/20 shadow backdrop-blur absolute top-20 flex flex-col items-start rounded-md p-2 w-full z-50'>
            {list.map((item, i) => (
              <button
                onClick={() => selectTheme(item.theme)}
                className='flex w-full justify-between p-4 hover:bg-slate-200/50 cursor-pointer rounded-r-md border-l-transparent hover:border-l-white border-l-4'
                key={i}
              >
                <h3 className='font-bold'>{item.name}</h3>
                {item.icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
