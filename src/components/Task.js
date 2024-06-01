import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import TimerContext from './TimerContext';

export default class Task extends Component {
  state = {
    editing: false,
    newDescription: this.props.task.description,
  };

  static contextType = TimerContext;

  componentDidUpdate(prevProps) {
    if (prevProps.task.description !== this.props.task.description) {
      this.setState({ newDescription: this.props.task.description });
    }
  }

  handleTaskClick = () => {
    this.props.onTaskToggle(this.props.task.id);
  };

  handleDeleteClick = () => {
    this.props.onTaskDelete(this.props.task.id);
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleInputChange = (e) => {
    this.setState({ newDescription: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTask = { ...this.props.task, description: this.state.newDescription };
      this.props.onTaskEdit(newTask);
      this.setState({ editing: false, newDescription: newTask.description });
    }
  };

  startTimer = () => {
    this.context.startTaskTimer(this.props.task.id);
  };

  stopTimer = () => {
    this.context.stopTaskTimer(this.props.task.id);
  };

  formatSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  render() {
    const { task } = this.props;
    const { editing, newDescription } = this.state;
    const { isRunning, elapsedSeconds, totalSeconds } = task.timer;

    const remainingTime = totalSeconds - elapsedSeconds;

    let liClassName = task.completed ? 'completed' : '';
    if (editing) {
      liClassName += ' editing';
    }

    const view = (
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} onChange={this.handleTaskClick} />
        <label>
          <span className="title">{task.description}</span>
          <span className="description">
            <button className="icon icon-play" onClick={this.startTimer} disabled={isRunning}></button>
            <button className="icon icon-pause" onClick={this.stopTimer} disabled={!isRunning}></button>
            <span className="timer-remaining-time">{this.formatSeconds(remainingTime)}</span>
          </span>
          <span className="description">{formatDistanceToNow(task.created, { includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={this.handleEditClick}></button>
        <button className="icon icon-destroy" onClick={this.handleDeleteClick}></button>
      </div>
    );

    const edit = (
      <input
        type="text"
        className="edit"
        value={newDescription}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
      />
    );

    return <li className={liClassName}>{editing ? edit : view}</li>;
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};
