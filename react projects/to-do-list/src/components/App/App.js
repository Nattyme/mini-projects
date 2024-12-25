import {Component}from 'react'; // need to convert into class
import data from './../../data/data.json';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Search from './../Search/Search';
import StatusBar from './../StatusBar/StatusBar';
import List from './../List/List';

import './App.css';

class App extends Component {
  state = {
    toDoData : data,
    term : '',
    status : 'all' // 'all', 'active', 'done'
  }

  toggleTask = (id, e) => {
    this.setState ( (state) => {
      // Clicked on 'button IMPORTANT'
      if ( e.target.dataset.button === 'important') {
        return {toDoData : this.toggleParam(id, 'important', state.toDoData)};
      }

       // Clicked 'task DELETE'
      if (e.target.dataset.button === 'remove') {
        return { toDoData : this.removeTask(id, state.toDoData)}
      }

      // Clicked 'task DONE'
      if (!e.target.dataset.button && e.target.closest('[data-item="task"]')) {
        return { toDoData :  this.toggleParam(id, 'done', state.toDoData)};
      }

    });
  }

  toggleParam (id, param, data) {
    return data.map((task) => {
      return {
        ...task,
        [param] : id === task.id ? !task[param] : task[param]
      }
    });
  }

  removeTask (id, data) {
      // Updated array
      return data.filter((task) => task.id !== id);

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
      if(item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1 ) return true;
    });
  }

  changeTerm = (term) => {
    this.setState({
      term: term,
    });
  }

  // check status
  filterByStatus = (items, status) => {
    switch (status) {
      case 'all' :
        return items;
      case 'active' : 
        return items.filter( (item) => item.done === false );
      case 'done' :
        return items.filter ( (item) => item.done === true )

      default : 
        return items;
  
    }
  }

  // change state status by button click
  changeStatus = (status) => {
    this.setState({status : status});
  }

  render() {
    const filteredBySearchItems = this.search(this.state.toDoData, this.state.term);
    const filteredByStatusItems = this.filterByStatus(filteredBySearchItems, this.state.status);

    return (
      <section className="todo-app p-5">
        <Header data = {this.state.toDoData}/>
        <div className="todo-app__search">
          <Search changeTerm={this.changeTerm} term={this.state.term}/>
          <StatusBar changeStatus={this.changeStatus} status = {this.state.status}/>
        </div>
        <List data = {filteredByStatusItems} toggleTask={this.toggleTask}/>
        <Footer addItem = {this.addItem}/>
      </section>
    )
  }

}

export default App;