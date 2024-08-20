import { observer } from 'mobx-react-lite';
import './App.css';
import {
  AddTaskModal,
  Task,
  TasksList,
  ThemeSwithcerButton,
} from './components';
import taskList, { TaskType } from './store/task-list';
import { useState } from 'react';
import { Pencil, Plus, X } from 'lucide-react';

const showDescription = (): TaskType | undefined => {
  return taskList.list.find(
    (item: TaskType) => item.id === taskList.showDescription
  );
};

const App = observer(() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='font-rubik p-8 bg-white h-screen'>
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
        <div className='flex flex-1 flex-col justify-between bg-slate-400 rounded-e-md h-full p-4 relative'>
          {showDescription()?.description}
          {!showDescription() ? null : (
            <div className='flex flex-row justify-center'>
              <button
                className='flex flex-row flex-nowrap 
              gap-2 items-center justify-center
            bg-blue-500 hover:bg-blue-600
              rounded-l text-white
              w-full max-w-64 p-2
              border-r-2 border-r-white'
              >
                <Pencil size={16} />
                Редактировать задачу
              </button>
              <button
                onClick={() => taskList.deleteTask(showDescription()?.id)}
                className='flex flex-row flex-nowrap 
              gap-2 items-center justify-center
            bg-red-500 hover:bg-red-600
              rounded-r text-white
              w-full max-w-64 p-2'
              >
                <X size={20} />
                Удалить задачу
              </button>
            </div>
          )}
        </div>
      </div>
      <ThemeSwithcerButton />
      <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div id='modal'></div>
    </div>
  );
});

export default App;
