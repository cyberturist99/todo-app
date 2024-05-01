import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

export default class Footer extends Component {
  showNumberActiveTasks = () => {
    const { tasks } = this.props;
    const activeTasks = tasks.filter((task) => !task.completed);
    return activeTasks.length;
  };

  render() {
    const { tasks, onFilterChange } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{this.showNumberActiveTasks()} items left</span>
        <TasksFilter tasks={tasks} onFilterChange={onFilterChange} />
        <button onClick={this.props.onDeleteCompletedTasks} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onDeleteCompletedTasks: PropTypes.func.isRequired,
  };
  static defaultProps = {
    tasks: [],
    filter: PropTypes.oneOf(['all', 'completed', 'active']),
  };
}
