import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

const Footer = ({ tasks, onFilterChange, onDeleteCompletedTasks }) => {
  const showNumberActiveTasks = useCallback(() => {
    const activeTasks = tasks.filter((task) => !task.completed);
    return activeTasks.length;
  }, [tasks]);

  return (
    <footer className="footer">
      <span className="todo-count">{showNumberActiveTasks()} items left</span>
      <TasksFilter tasks={tasks} onFilterChange={onFilterChange} />
      <button onClick={onDeleteCompletedTasks} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
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

export default Footer;
