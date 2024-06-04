import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ AddItem }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleKeyDown = useCallback(
    (evt) => {
      if (evt.key === 'Enter' && evt.target.name === 'new-todo' && evt.target.value !== '') {
        const taskDescription = evt.target.value;
        AddItem(taskDescription, minutes, seconds);
        evt.target.value = '';
        const minutesInput = document.querySelector('.new-todo-form__timer[name="minutes"]');
        const secondsInput = document.querySelector('.new-todo-form__timer[name="seconds"]');
        minutesInput.value = '';
        secondsInput.value = '';
        setMinutes(0);
        setSeconds(0);
      } else if (evt.target.className === 'new-todo-form__timer') {
        const inputName = evt.target.name;
        const inputValue = parseInt(evt.target.value, 10) || 0;
        if (inputName === 'minutes') {
          setMinutes(inputValue);
        } else if (inputName === 'seconds') {
          setSeconds(inputValue);
        }
      }
    },
    [AddItem, minutes, seconds]
  );

  const handleInputChange = useCallback((e) => {
    const inputName = e.target.name;
    const inputValue = parseInt(e.target.value, 10) || 0;
    if (inputName === 'minutes') {
      setMinutes(inputValue);
    } else if (inputName === 'seconds') {
      setSeconds(inputValue);
    }
  }, []);

  return (
    <form className="new-todo-form">
      <input name="new-todo" onKeyDown={handleKeyDown} className="new-todo" placeholder="Task" autoFocus />
      <input name="minutes" onChange={handleInputChange} className="new-todo-form__timer" placeholder="Min" />
      <input name="seconds" onChange={handleInputChange} className="new-todo-form__timer" placeholder="Sec" />
    </form>
  );
};

NewTaskForm.propTypes = {
  AddItem: PropTypes.func.isRequired,
};

export default NewTaskForm;
