import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState('');

  const handleAddTask = async () => {
    if (task.trim()) {
      await axios.post('http://localhost:5000/api/tasks', { text: task, completed: false });
      setTask('');
      refreshTasks();  // Fetch tasks again after adding
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
