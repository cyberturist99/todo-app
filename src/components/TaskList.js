import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ tasks, onTaskToggle, onTaskDelete, onTaskEdit, onStartTaskTimer, onStopTaskTimer, filter }) => {
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
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  onTaskToggle: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onStartTaskTimer: PropTypes.func.isRequired,
  onStopTaskTimer: PropTypes.func.isRequired,
};

export default TaskList;
