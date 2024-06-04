import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import TimerContext from './TimerContext';

const Task = ({ task, onTaskToggle, onTaskDelete, onTaskEdit }) => {
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const { startTaskTimer, stopTaskTimer } = useContext(TimerContext);

  useEffect(() => {
    setNewDescription(task.description);
  }, [task.description]);

  const handleTaskClick = () => {
    onTaskToggle(task.id);
  };

  const handleDeleteClick = () => {
    onTaskDelete(task.id);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTask = { ...task, description: newDescription };
      onTaskEdit(newTask);
      setEditing(false);
    }
  };

  const startTimer = () => {
    startTaskTimer(task.id);
  };

  const stopTimer = () => {
    stopTaskTimer(task.id);
  };

  const formatSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const { isRunning, elapsedSeconds, totalSeconds } = task.timer;

  const remainingTime = totalSeconds - elapsedSeconds;

  let liClassName = task.completed ? 'completed' : '';
  if (editing) {
    liClassName += ' editing';
  }

  const view = (
    <div className="view">
      <input className="toggle" type="checkbox" checked={task.completed} onChange={handleTaskClick} />
      <label>
        <span className="title">{task.description}</span>
        <span className="description">
          <button className="icon icon-play" onClick={startTimer} disabled={isRunning}></button>
          <button className="icon icon-pause" onClick={stopTimer} disabled={!isRunning}></button>
          <span className="timer-remaining-time">{formatSeconds(remainingTime)}</span>
        </span>
        <span className="description">{formatDistanceToNow(task.created, { includeSeconds: true })}</span>
      </label>
      <button className="icon icon-edit" onClick={handleEditClick}></button>
      <button className="icon icon-destroy" onClick={handleDeleteClick}></button>
    </div>
  );

  const edit = (
    <input type="text" className="edit" value={newDescription} onChange={handleInputChange} onKeyDown={handleKeyDown} />
  );

  return <li className={liClassName}>{editing ? edit : view}</li>;
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number,
      seconds: PropTypes.number,
    }).isRequired,
  }).isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskEdit: PropTypes.func.isRequired,
};

export default Task;
