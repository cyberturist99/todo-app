import React, { useState, useEffect, useCallback } from 'react';

import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import Footer from './Footer';
import TimerContext from './TimerContext';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [filter, setFilter] = useState('all');

  const deleteAllCompletedTasks = useCallback(() => {
    setTasks(tasks.filter((task) => !task.completed));
  }, [tasks]);

  const handleFilterChange = useCallback((filter) => {
    setFilter(filter);
  }, []);

  const handleTaskToggle = useCallback(
    (taskId) => {
      stopTaskTimer(taskId);
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: !task.completed, timer: { ...task.timer, totalSeconds: 0, elapsedSeconds: 0 } }
            : task
        )
      );
    },
    [tasks]
  );

  const handleTaskDelete = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));

      const task = tasks.find((task) => task.id === taskId);

      if (task) {
        clearInterval(task.timerInterval);
      }
    },
    [tasks]
  );

  const handleTaskEdit = useCallback(
    (editedTask) => {
      setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
    },
    [tasks]
  );

  const AddItem = useCallback(
    (taskDescription, minutes, seconds) => {
      if (!minutes && !seconds) {
        alert('Пожалуйста введите время');
        return;
      }
      const newTask = {
        id: nextId,
        description: taskDescription,
        completed: false,
        created: new Date(),
        selected: '',
        timer: {
          isRunning: false,
          totalSeconds: minutes * 60 + seconds,
          elapsedSeconds: 0,
        },
        timerInterval: null,
      };

      setTasks([...tasks, newTask]);
      setNextId(nextId + 1);
    },
    [tasks, nextId]
  );

  const startTaskTimer = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);

    if (task) {
      // убеждаемся, что задача существует
      const { elapsedSeconds } = task.timer;

      let currentElapsedSeconds = elapsedSeconds;
      task.timerInterval = setInterval(() => {
        currentElapsedSeconds += 1;
        updateTaskTimer(taskId, currentElapsedSeconds);
      }, 1000);

      setTasks((prevState) =>
        prevState.map((task) =>
          task.id === taskId ? { ...task, timer: { ...task.timer, elapsedSeconds, isRunning: true } } : task
        )
      );
    }
  };

  const updateTaskTimer = (taskId, elapsedSeconds) => {
    const task = tasks.find((task) => task.id === taskId);
    const { totalSeconds } = task.timer;

    if (elapsedSeconds > totalSeconds) {
      return;
    }

    setTasks((prevState) =>
      prevState.map((task) => (task.id === taskId ? { ...task, timer: { ...task.timer, elapsedSeconds } } : task))
    );
  };

  const stopTaskTimer = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);

    if (task) {
      // убеждаемся, что задача существует
      clearInterval(task.timerInterval); // удаляем интервал таймера из свойства

      setTasks((prevState) =>
        prevState.map((task) => (task.id === taskId ? { ...task, timer: { ...task.timer, isRunning: false } } : task))
      );
    }
  };

  useEffect(() => {
    const timers = tasks.filter((task) => task.timer.isRunning).map((task) => task.timerInterval);

    return () => {
      timers.forEach(clearInterval);
    };
  }, []);

  return (
    <section className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm AddItem={AddItem} />
      </header>
      <section className="main">
        <TimerContext.Provider value={{ startTaskTimer, stopTaskTimer, updateTaskTimer }}>
          <TaskList
            tasks={tasks}
            onTaskToggle={handleTaskToggle}
            onTaskDelete={handleTaskDelete}
            onTaskEdit={handleTaskEdit}
            filter={filter}
            nextId={nextId}
            onStartTaskTimer={startTaskTimer}
            onStopTaskTimer={stopTaskTimer}
          />
          <Footer tasks={tasks} onFilterChange={handleFilterChange} onDeleteCompletedTasks={deleteAllCompletedTasks} />
        </TimerContext.Provider>
      </section>
    </section>
  );
};

export default App;
