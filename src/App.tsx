import { observer } from 'mobx-react-lite';
import {
  Button,
  Header,
  Modal,
  TaskForm,
  TaskInfo,
  TasksList,
} from './components';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import taskList from './store/task-list';

const App = observer(() => {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  return (
    <div className='font-rubik h-screen p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 w-full max-w-screen-xl m-auto'>
      <Header />
      <div className='flex flex-row rounded-md shadow-md h-[calc(100%-86px)]'>
        <div
          className={`flex flex-col gap-1 items-center w-full flex-1 rounded-s-md ${
            !taskList.activeTask && 'rounded-e-md'
          } bg-slate-100 p-4 overflow-auto dark:bg-slate-800`}
        >
          <TasksList />
          <Button
            size='xs'
            variant='outlined'
            color='emerald'
            onClick={() => setIsOpenAddTask((prev) => !prev)}
          >
            <Plus size={20} />
            Добавить задачу
          </Button>
        </div>
        {taskList.activeTask && (
          <>
            <TaskInfo />
            <Modal
              isOpen={isOpenAddTask}
              onClose={() => setIsOpenAddTask(false)}
            >
              <TaskForm
                onClose={() => setIsOpenAddTask(false)}
                mode='add'
                task={taskList.activeTask}
              />
            </Modal>
          </>
        )}
      </div>

      <Modal isOpen={isOpenAddTask} onClose={() => setIsOpenAddTask(false)}>
        <TaskForm onClose={() => setIsOpenAddTask(false)} mode='add' />
      </Modal>

      <div id='modal'></div>
    </div>
  );
});

export default App;
