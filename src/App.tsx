import './App.css';
import { Task } from './components';
import { TaskList } from './components/task-list/task-list';

function App() {
  return (
    <div className='font-rubik p-8 bg-white h-screen'>
      <div className='flex flex-row rounded-md drop-shadow-md h-full'>
        <div className='flex-1 rounded-s-md bg-slate-100 h-full p-4'>
          <TaskList>
            <Task>Задача 1</Task>
            <Task>Задача 2</Task>
            <Task>Задача 3</Task>
            <Task>Задача 4</Task>
            <Task>Задача 5</Task>
          </TaskList>
        </div>
        <div className='flex flex-1 flex-col bg-slate-400 rounded-e-md h-full p-4'>
          правая часть
        </div>
      </div>
    </div>
  );
}

export default App;
