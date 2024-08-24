import { observer } from 'mobx-react-lite';
import {
  Button,
  Header,
  Modal,
  Task,
  TaskForm,
  TaskInfo,
  TasksList,
} from './components';
import taskList, { TaskType } from './store/task-list';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const getSelectedItem = () => {
  return taskList.list.find(
    (item: TaskType) => item.id === taskList.selectedTaskID
  );
};

const App = observer(() => {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  const selectedTask = getSelectedItem();

  console.log(selectedTask);

  return (
    <div className='font-rubik h-screen p-8 bg-white dark:bg-slate-900 dark:text-white w-full max-w-screen-xl m-auto'>
      <Header />
      <div className='flex flex-row rounded-md shadow-md h-[calc(100%-86px)]'>
        <div
          className={`flex flex-col gap-1 items-center w-full flex-1 rounded-s-md ${
            !selectedTask && 'rounded-e-md'
          } bg-slate-100 p-4 overflow-auto dark:bg-slate-800`}
        >
          {taskList.list.length <= 0 ? null : (
            <TasksList>
              {taskList.list.map((item: TaskType) => (
                <Task id={item.id} key={item.id}>
                  {item.title}
                </Task>
              ))}
            </TasksList>
          )}
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
        {selectedTask && (
          <>
            <TaskInfo task={selectedTask} />
            <Modal
              isOpen={isOpenAddTask}
              onClose={() => setIsOpenAddTask(false)}
            >
              <TaskForm
                onClose={() => setIsOpenAddTask(false)}
                mode='add'
                task={selectedTask}
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
