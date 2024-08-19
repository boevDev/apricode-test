import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const TaskList: React.FC<Props> = ({ children }) => {
  return <ul className='flex flex-col gap-2'>{children}</ul>;
};
