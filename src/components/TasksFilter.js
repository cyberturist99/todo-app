import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
  };

  render() {
    const { onFilterChange } = this.props;

    return (
      <ul className="filters">
        <li>
          <button onClick={() => onFilterChange('all')}>All</button>
        </li>
        <li>
          <button onClick={() => onFilterChange('active')}>Active</button>
        </li>
        <li>
          <button onClick={() => onFilterChange('completed')}>Completed</button>
        </li>
      </ul>
    );
  }
}
