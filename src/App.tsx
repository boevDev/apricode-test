import { observer } from 'mobx-react-lite';
import {
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
    (item: TaskType) => item.id === taskList.showDescription
  );
};

const App = observer(() => {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  const selectedItem = getSelectedItem();

  console.log(taskList.list);

  return (
    <div className='font-rubik h-screen p-8 bg-white dark:bg-slate-900 dark:text-white w-full max-w-screen-xl m-auto'>
      <Header />
      <div className='flex flex-row rounded-md shadow-md h-[calc(100%-86px)]'>
        <div
          className={`flex flex-col items-center w-full flex-1 rounded-s-md ${
            !selectedItem && 'rounded-e-md'
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
          <button
            className='flex flex-row flex-nowrap justify-center items-center gap-2 border-2 text-emerald-500 border-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors mt-4 w-full max-w-64 p-2 rounded-md'
            onClick={() => setIsOpenAddTask((prev) => !prev)}
          >
            <Plus size={20} />
            Добавить задачу
          </button>
        </div>
        {selectedItem && (
          <>
            <TaskInfo task={selectedItem} />
            <Modal
              isOpen={isOpenAddTask}
              onClose={() => setIsOpenAddTask(false)}
            >
              <TaskForm
                onClose={() => setIsOpenAddTask(false)}
                mode='add'
                task={selectedItem}
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
