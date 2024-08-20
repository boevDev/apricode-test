import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const TasksList: React.FC<Props> = ({ children }) => {
  return <ul className='flex flex-col gap-1'>{children}</ul>;
};
