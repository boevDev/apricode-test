import { observer } from 'mobx-react-lite';
import './App.css';
import { AddTaskModal, Task, TasksList } from './components';
import taskList, { TaskType } from './store/task-list';
import { useState } from 'react';
import { X } from 'lucide-react';

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
        <div className='flex-1 rounded-s-md bg-slate-100 h-full p-4 overflow-scroll'>
          {taskList.list.length <= 0 ? null : (
            <TasksList>
              {taskList.list.map((item: TaskType) => (
                <Task id={item.id} key={item.id}>
                  {item.title}
                </Task>
              ))}
            </TasksList>
          )}

          <button onClick={() => setIsOpen(true)}>Добавить задачу</button>
        </div>
        <div className='flex flex-1 flex-col bg-slate-400 rounded-e-md h-full p-4 relative'>
          {showDescription()?.description}
          {!showDescription() ? null : (
            <button
              onClick={() => taskList.deleteTask(showDescription()?.id)}
              className='flex flex-row flex-nowrap 
                gap-2 items-center justify-center
                absolute bottom-2 right-2
              bg-red-500 hover:bg-red-600
                rounded text-white
                w-full max-w-64 p-2'
            >
              <X size={16} />
              Удалить задачу
            </button>
          )}
        </div>
      </div>
      <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div id='modal'></div>
    </div>
  );
});

export default App;
