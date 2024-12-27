import {Component} from 'react';
import data from './../../data/data.json';
import Form from './../Form/Form';
import Button from './../Button/Button';
import Input from './../Input/Input';

import './App.css';

class App extends Component {
  state = {
    input : data.input,
    term : 0,
    formButtons : data.buttons
  }

  changeTerm = (term) => {
    this.setState({
      term : term
    });
  }

  // Listen to button click
  clickedButton = (e) => {
    this.handleFormSubmit(e);

    let newValue;

    switch (e.target.id) {
      case 'btnMinus' :
        newValue = this.state.term > 0 ? this.state.term - 1 : 0;
        break;
      case 'btnPlus' : 
        newValue = this.state.term + 1;
        break;
      case 'btnReset' : 
        newValue = 0;
        break;
      default : 
        break;
    }

    this.changeTerm(newValue);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
  } 

  renderButtons = (buttons) => {
    return buttons.map( (button) => {
      return  <Button
                id = {button.id}
                key = {button.id}
                type = {button.type}
                classNames = {button.classNames}
                text = {button.text}
              />
    });
  }

  // Render inputs to page
  renderInput = (formInputs, term) => {
    return formInputs.map( (input) => {
  
      return (
        <Input
          id = {input.id}
          key = {input.id}
          classNames = {input.classNames}
          value = {term}
          disabled = {input.disabled}
        />
      )
    });
  } 

  render () {
    return (
      <div className = 'app p-3'>
        <h1>Counter</h1>
        <Form 
          handleFormSubmit = {this.handleFormSubmit}
          clickedButton = {this.clickedButton}
          changeTerm = {this.changeTerm} 
          term = {this.state.term} 
          renderInput = {this.renderInput(this.state.input, this.state.term)} 
          renderButtons = {this.renderButtons(this.state.formButtons)}/>
      </div>
    )
  }
}

export default App;
