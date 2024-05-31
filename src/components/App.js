import { Component } from 'react';

import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import Footer from './Footer';
import TimerContext from './TimerContext';

export default class App extends Component {
  state = {
    tasks: [],
    nextId: 0,
    filter: 'all',
  };

  deleteAllCompletedTasks = () => {
    const remainingTasks = this.state.tasks.filter((task) => !task.completed);
    this.setState({ tasks: remainingTasks });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleTaskToggle = (taskId) => {
    this.stopTaskTimer(taskId);
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    }));
  };

  handleTaskDelete = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));

    const task = this.state.tasks.find((task) => task.id === taskId);

    if (task) {
      // убеждаемся, что задача существует
      clearInterval(task.timerInterval); // удаляем интервал таймера из свойства
    }
  };

  handleTaskEdit = (editedTask) => {
    this.setState({
      tasks: this.state.tasks.map((task) => (task.id === editedTask.id ? editedTask : task)),
    });
  };

  AddItem = (taskDescription, minutes, seconds) => {
    const newTask = {
      id: this.state.nextId,
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

    this.setState((prevState) => ({
      tasks: [...this.state.tasks, newTask],
      nextId: prevState.nextId + 1,
    }));
  };

  startTaskTimer = (taskId) => {
    const task = this.state.tasks.find((task) => task.id === taskId);

    if (task) {
      // убеждаемся, что задача существует
      const { elapsedSeconds } = task.timer;

      task.timerInterval = setInterval(() => {
        this.updateTaskTimer(taskId);
      }, 1000);

      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task.id === taskId ? { ...task, timer: { ...task.timer, elapsedSeconds, isRunning: true } } : task
        ),
      }));
    }
  };

  updateTaskTimer = (taskId) => {
    const task = this.state.tasks.find((task) => task.id === taskId);
    const { totalSeconds, elapsedSeconds } = task.timer;

    if (elapsedSeconds >= totalSeconds) {
      return;
    }

    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, timer: { ...task.timer, elapsedSeconds: elapsedSeconds + 1 } } : task
      ),
    }));
  };

  stopTaskTimer = (taskId) => {
    const task = this.state.tasks.find((task) => task.id === taskId);

    if (task) {
      // убеждаемся, что задача существует
      clearInterval(task.timerInterval); // удаляем интервал таймера из свойства

      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task.id === taskId ? { ...task, timer: { ...task.timer, isRunning: false } } : task
        ),
      }));
    }
  };

  render() {
    const { tasks, filter, nextId } = this.state;

    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm AddItem={this.AddItem} />
        </header>
        <section className="main">
          <TimerContext.Provider
            value={{
              startTaskTimer: this.startTaskTimer,
              stopTaskTimer: this.stopTaskTimer,
              updateTaskTimer: this.updateTaskTimer,
            }}
          >
            <TaskList
              tasks={tasks}
              onTaskToggle={this.handleTaskToggle}
              onTaskDelete={this.handleTaskDelete}
              onTaskEdit={this.handleTaskEdit}
              filter={filter}
              nextId={nextId}
              onStartTaskTimer={this.startTaskTimer}
              onStopTaskTimer={this.stopTaskTimer}
            />

            <Footer
              tasks={tasks}
              onFilterChange={this.handleFilterChange}
              onDeleteCompletedTasks={this.deleteAllCompletedTasks}
            />
          </TimerContext.Provider>
        </section>
      </section>
    );
  }
}
