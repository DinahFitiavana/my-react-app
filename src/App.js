import React, { useState } from 'react';
import './App.css';

function App() {
  //state
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  //comportement
  const onChange = (e) => setTaskText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== '') {
      if (selectedTaskId !== null) {
        updateTask(selectedTaskId, taskText);
        setSelectedTaskId(null);
      } else {
        addTask(taskText);
      }
      setTaskText('');
    }
  };

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId, taskText) => {
    setSelectedTaskId(taskId);
    setTaskText(taskText);
  };

  //affichage
  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={onChange}
          placeholder="Ajouter une tâche"
        />
        <button type="submit">
          {selectedTaskId !== null ? 'Update' : 'Ajouter +'}
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => editTask(task.id, task.text)}>Modifier</button>
            <button onClick={() => deleteTask(task.id)}> X </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
