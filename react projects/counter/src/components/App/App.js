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

  changeTerm = (term) => {
    this.setState({
      term : term
    },
    () => {console.log(this.state)}
    );

  }

  render () {
    return (
      <div className = 'app p-3'>
        <h1>Counter</h1>
        <Form changeTerm = {this.changeTerm} term = {this.state.term} input = {this.state.input} buttons={this.state.formButtons}/>
      </div>
    )
  }
}

export default App;
