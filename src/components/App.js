import { Component } from 'react';

import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';
import Footer from './Footer';

export default class App extends Component {
  state = {
    tasks: [],
    nextId: 4,
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
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    }));
  };

  handleTaskDelete = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  };

  handleTaskEdit = (editedTask) => {
    this.setState({
      tasks: this.state.tasks.map((task) => (task.id === editedTask.id ? editedTask : task)),
    });
  };

  AddItem = (taskDescription) => {
    const newTask = {
      id: this.state.nextId,
      description: taskDescription,
      completed: false,
      created: new Date(),
      selected: '',
    };

    this.setState((prevState) => ({
      tasks: prevState.tasks.concat(newTask),
      nextId: prevState.nextId + 1,
    }));
  };

  render() {
    const { tasks, filter, nextId } = this.state;

    return (
      <section className="todoapp">
        <header>
          <NewTaskForm AddItem={this.AddItem} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            onTaskToggle={this.handleTaskToggle}
            onTaskDelete={this.handleTaskDelete}
            onTaskEdit={this.handleTaskEdit}
            filter={filter}
            nextId={nextId}
          />
          <Footer
            tasks={tasks}
            onFilterChange={this.handleFilterChange}
            onDeleteCompletedTasks={this.deleteAllCompletedTasks}
          />
        </section>
      </section>
    );
  }
}
