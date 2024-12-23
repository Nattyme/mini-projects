import React from 'react'; // need to convert into class
import data from './../../data/data.json';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Search from './../Search/Search';
import List from './../List/List';

import './App.css';

class App extends React.Component {
  state = {
    toDoData : data
  }


  toggleTask = (id, e) => {
    this.setState ( (state) => {
      // Find task in data by id 
      const index = state.toDoData.findIndex( (el) => {
        return el.id === id;
      });
      const oldTaskData = state.toDoData[index];  // Get old task obj

      // Clicked on 'button important'
      if ( e.target.dataset.button === 'important') {
        return {toDoData : this.markImportantTask(index, oldTaskData, state.toDoData)};
      }

       // Clicked 'task delete'
      if (e.target.dataset.button === 'remove') {
        return { toDoData : this.removeTask(index, state.toDoData)}
      }

      // Clicked 'task done'
      if (!e.target.dataset.button && e.target.closest('[data-item="task"]')) {
        return { toDoData :  this.markDoneTask(index, oldTaskData, state.toDoData)};
      }

    });
  }

  markImportantTask (index, oldTaskData, data) {
    const newTaskData = { ...oldTaskData, important : !oldTaskData.important,  done : false};   // Create new task obj
    return [...data.slice(0, index), newTaskData, ...data.slice(index + 1)];
  }

  markDoneTask (index, oldTaskData, data) {
    const newTaskData = { ...oldTaskData, important : false, done : !oldTaskData.done};
    return [...data.slice(0, index), newTaskData, ...data.slice(index + 1)];
  }

  removeTask (index, data) {
    // Updated array
    return  [...data.slice(0, index), ...data.slice(index + 1)];
  }

  addItem = (title) => {

    this.setState((state)=>{
      const id = state.toDoData[state.toDoData.length - 1]['id'] + 1;
      const newItem = {id : id, title: title, important: false, done: false}
      const newArray = [...state.toDoData, newItem];

      return {
        toDoData : newArray,
      }
    })
  }

  render() {

    return (
      <section className="todo-app p-5">
        <Header data = {this.state.toDoData}/>
        <Search/>
        <List data = {this.state.toDoData} toggleTask={this.toggleTask}/>
        <Footer addItem = {this.addItem}/>
      </section>
    )
  }

}

export default App;