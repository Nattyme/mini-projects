import React from 'react'; // need to convert into class
import data from './../../data/data.json';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Search from './../Search/Search';
import List from './../List/List';

import './App.css';

class App extends React.Component {
  state = {
    toDoData : data,
    term : ''
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

  search = (items, term) => {
    // case empty search
    if (term.trim().length === 0) return items;

    return items.filter((item)=>{
      if(item.title.indexOf(term.trim()) > -1 ) return true;
    });
  }

  changeTerm = (term) => {
    console.log('changer term start', term);
    this.setState({
      term: term,
    });
  }

  render() {
    const visibleItems = this.search(this.state.toDoData, this.state.term);

    return (
      <section className="todo-app p-5">
        <Header data = {this.state.toDoData}/>
        <Search changeTerm={this.changeTerm}/>
        <List data = {visibleItems} toggleTask={this.toggleTask}/>
        <Footer addItem = {this.addItem}/>
      </section>
    )
  }

}

export default App;