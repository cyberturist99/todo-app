import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    filter: 'all',
  };
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
    nextId: PropTypes.number.isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onTaskToggle: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
  };

  render() {
    const { tasks, onTaskToggle, onTaskDelete, filter, onTaskEdit, onStartTaskTimer, onStopTaskTimer } = this.props;

    const filteredTasks =
      filter === 'all'
        ? tasks
        : filter === 'active'
          ? tasks.filter((task) => !task.completed)
          : tasks.filter((task) => task.completed);

    return (
      <ul className="todo-list">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskToggle={onTaskToggle}
            onTaskDelete={onTaskDelete}
            onTaskEdit={onTaskEdit}
            onStartTimer={onStartTaskTimer}
            onStopTimer={onStopTaskTimer}
          />
        ))}
      </ul>
    );
  }
}
