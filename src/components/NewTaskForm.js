import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && evt.target.value !== '') {
      const taskDescription = evt.target.value;
      this.props.AddItem(taskDescription);
      evt.target.value = '';
    }
  };

  static propTypes = {
    AddItem: PropTypes.func.isRequired,
  };

  render() {
    return <input onKeyDown={this.handleKeyDown} className="new-todo" placeholder="What needs to be done?" autoFocus />;
  }
}
