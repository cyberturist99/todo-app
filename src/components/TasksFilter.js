import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ onFilterChange }) => {
  const handleFilterChange = useCallback(
    (filter) => {
      onFilterChange(filter);
    },
    [onFilterChange]
  );

  return (
    <ul className="filters">
      <li>
        <button onClick={() => handleFilterChange('all')}>All</button>
      </li>
      <li>
        <button onClick={() => handleFilterChange('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
