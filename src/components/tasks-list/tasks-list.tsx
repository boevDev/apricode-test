import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const TasksList: React.FC<Props> = ({ children, className }) => {
  return <ul className={`flex flex-col w-full ${className}`}>{children}</ul>;
};
