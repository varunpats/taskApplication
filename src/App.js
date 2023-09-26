import React, { useEffect, useState, useCallback } from 'react';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformData = useCallback((data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, [])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp({ url: 'https://tasks-db-e8e39-default-rtdb.firebaseio.com//tasks.json' }, transformData)

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
