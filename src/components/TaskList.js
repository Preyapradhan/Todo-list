import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ refreshKey }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, [refreshKey]);  // Use refreshKey to refetch tasks when updated

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));  // Update task list without reloading
  };

  const handleToggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(task => task._id === id ? { ...task, completed: !completed } : task));
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
          <button onClick={() => handleToggleComplete(task._id, task.completed)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
