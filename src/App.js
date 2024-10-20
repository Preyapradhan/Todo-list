import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
