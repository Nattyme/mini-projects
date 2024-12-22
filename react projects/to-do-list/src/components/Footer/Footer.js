import React from 'react';

import Input from  './../Inputs/Input';
import Button from  './../Button/Button';
import './Footer.css';

class Footer extends React.Component {
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
    console.log('Submit');
    this.props.addItem(this.state.taskTitle);
  }

  render() {
    return (
      <footer className="footer">
        <form onSubmit={this.onSubmit} className="footer__form form">
          <Input onchange = {this.onInputChange} placeholder="Что необходимо сделать"/>
          <Button type = 'submit' classNames='btn-primary' text='Добавить'/>
        </form>
      </footer>
    )
  }
}

export default Footer;