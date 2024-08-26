import React, { useState } from 'react';
import { ThemeSwithcer } from '../theme-switcher/theme-switcher';
import { X } from 'lucide-react';
import { Modal } from '../modal/modal';
import { WarningQuestion } from '../warning-question/warning-question';
import taskList from '../../store/task-list';
import { Button } from '../button/button';

export const Header: React.FC = () => {
  const [isOpenWarnCleanList, setIsOpenWarnCleanList] = useState(false);

  return (
    <header className='flex flex-row justify-between mb-4 items-center'>
      <ThemeSwithcer />
      {taskList.taskArray.length <= 0 ? null : (
        <Button
          size='xs'
          color='red'
          variant='outlined'
          onClick={() => setIsOpenWarnCleanList(true)}
        >
          <X size={20} />
          Очистить список задач
        </Button>
      )}

      <Modal
        isOpen={isOpenWarnCleanList}
        onClose={() => setIsOpenWarnCleanList(false)}
      >
        <WarningQuestion
          onConfirm={() => taskList.removeAllTasks()}
          onClose={() => setIsOpenWarnCleanList(false)}
        >
          Вы действительно хотите очистить список задач? Восстановить их будет
          уже невозможно!
        </WarningQuestion>
      </Modal>
    </header>
  );
};
