import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    minutes: 0,
    seconds: 0,
  };

  handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && evt.target.name === 'new-todo' && evt.target.value !== '') {
      const taskDescription = evt.target.value;
      this.props.AddItem(taskDescription, this.state.minutes, this.state.seconds);
      evt.target.value = '';
      const minutesInput = document.querySelector('.new-todo-form__timer[name="minutes"]');
      const secondsInput = document.querySelector('.new-todo-form__timer[name="seconds"]');
      minutesInput.value = '';
      secondsInput.value = '';
      this.setState({ minutes: 0, seconds: 0 });
    } else if (evt.target.className === 'new-todo-form__timer') {
      const inputName = evt.target.name;
      const inputValue = parseInt(evt.target.value, 10) || 0;
      this.setState({
        [inputName]: inputValue,
      });
    }
  };

  handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = parseInt(e.target.value, 10) || 0;
    this.setState({
      [inputName]: inputValue,
    });
  };

  static propTypes = {
    AddItem: PropTypes.func.isRequired,
  };

  render() {
    return (
      <form className="new-todo-form">
        <input name="new-todo" onKeyDown={this.handleKeyDown} className="new-todo" placeholder="Task" autoFocus />
        <input name="minutes" onChange={this.handleInputChange} className="new-todo-form__timer" placeholder="Min" />
        <input name="seconds" onChange={this.handleInputChange} className="new-todo-form__timer" placeholder="Sec" />
      </form>
    );
  }
}
