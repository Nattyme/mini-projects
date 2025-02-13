import {Component} from 'react';

import Input from  './../Inputs/Input';
import Button from  './../Button/Button';
import './Footer.css';

class Footer extends Component {
  state = {
    taskTitle : ''
  }

  onInputChange = (e) => {
    this.setState ({
      taskTitle: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    // validate empty input
    if ( this.state.taskTitle.trim() ) this.props.addItem(this.state.taskTitle);

    // clean input after task is added
    this.setState({
      taskTitle: ''
    });
  }

  render() {
    return (
      <footer className="footer">
        <form onSubmit={this.onSubmit} className="footer__form form">
          <Input value={this.state.taskTitle} onchange = {this.onInputChange} placeholder="Что необходимо сделать"/>
          <Button type = 'submit' classNames='btn-primary' text='Добавить'/>
        </form>
      </footer>
    )
  }
}

export default Footer;