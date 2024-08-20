import { observer } from 'mobx-react-lite';
import './App.css';
import {
  AddTaskModal,
  Task,
  TaskInfo,
  TasksList,
  ThemeSwithcerButton,
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
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = getSelectedItem();

  return (
    <div className='font-rubik p-8 bg-white dark:bg-slate-950 h-screen flex flex-col gap-4 justify-start'>
      <ThemeSwithcerButton />
      <div className='flex flex-row rounded-md drop-shadow-md h-full'>
        <div className='flex flex-col items-center w-full flex-1 rounded-s-md bg-slate-100 h-full p-4 overflow-scroll'>
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
            onClick={() => setIsOpen(true)}
          >
            <Plus size={20} />
            Добавить задачу
          </button>
        </div>
        {selectedItem && <TaskInfo task={selectedItem} />}
      </div>
      <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div id='modal'></div>
    </div>
  );
});

export default App;
