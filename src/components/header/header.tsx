import React, { useState } from 'react';
import { ThemeSwithcer } from '../theme-switcher/theme-switcher';
import { X } from 'lucide-react';
import { Modal } from '../modal/modal';
import { WarningQuestion } from '../warning-question/warning-question';
import taskList from '../../store/task-list';

export const Header: React.FC = () => {
  const [isOpenWarnCleanList, setIsOpenWarnCleanList] = useState(false);

  return (
    <header className='flex flex-row justify-between mb-4 items-center'>
      <ThemeSwithcer />
      {taskList.list.length <= 0 ? null : (
        <button
          className='flex flex-row flex-nowrap justify-center items-center gap-2 border-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors w-full max-w-64 p-2 rounded-md'
          onClick={() => setIsOpenWarnCleanList(true)}
        >
          <X size={20} />
          Очистить список задач
        </button>
      )}

      <Modal
        isOpen={isOpenWarnCleanList}
        onClose={() => setIsOpenWarnCleanList(false)}
      >
        <WarningQuestion
          onConfirm={() => taskList.clearTaskList()}
          onClose={() => setIsOpenWarnCleanList(false)}
        >
          Вы действительно хотите очистить список задач? Восстановить их будет
          уже невозможно!
        </WarningQuestion>
      </Modal>
    </header>
  );
};
