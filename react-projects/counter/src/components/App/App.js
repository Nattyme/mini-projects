import {Component} from 'react';
import data from './../../data/data.json';
import Form from './../Form/Form';


import './App.css';

class App extends Component {
  state = {
    input : data.input,
    term : 0,
    formButtons : data.buttons
  }

  // Change state term
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

  // Form submit handling
  handleFormSubmit = (e) => {
    e.preventDefault();
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
          inputs= {this.state.input} 
          buttons = {this.state.formButtons}/>
      </div>
    )
  }
}

export default App;
