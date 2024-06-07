'use client'
import Image from 'next/image';
import TaskItem from './components/TaskItem';
import React, { useState } from 'react';


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState('all'); 

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleAddTask = () => {
    if (taskText === ''){
      alert("Task cannot be empty");
    }else{
      const newTask = { id: Date.now(), text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>

      <div className="bg-gray-800 rounded p-4">

        <ul>

          {tasks.map((item, index) => (
            <TaskItem 
              key={item.id}
              task={item} 
              onToggle={handleToggleTask} 
              onDelete={handleDeleteTask}/>
          ))}
            
        </ul>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.filter(task => !task.completed).length} items left</span>
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={handleClearCompleted}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
