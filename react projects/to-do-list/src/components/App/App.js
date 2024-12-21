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
      let newTaskData = { ...oldTaskData};   // Create new task obj


      // Clicked on 'button important'
      if ( e.target.type === 'button' && e.target.classList.contains('btn-outline-dark')) {
        newTaskData = { ...oldTaskData, important : !oldTaskData.important,  done : false};
      }

      // Clicked 'task done'
      if (e.target.type !== 'button' && e.target.closest('li')) {
        newTaskData = { ...oldTaskData, important : false, done : !oldTaskData.done};
      }
     
      const part1 = state.toDoData.slice(0, index);
      const part2 = state.toDoData.slice(index + 1);

      // Updated array
      const newArray = [...part1, newTaskData, ...part2];

      return {
        toDoData: newArray,
      }
    })
  }

  render() {
    console.log(this.state.toDoData);
    return (
      <section className="todo-app p-5">
        {<Header data = {this.state.toDoData}/>}
        {<Search/>}
        {<List data = {this.state.toDoData} toggleTask={this.toggleTask}/>}
        {<Footer/>}
      </section>
    )
  }

	// 	// Clicked button delete
	// 	if (  e.target.type === 'button' && e.target.classList.contains('btn-outline-danger') ) {
	// 		// data remove here?
	// 		// e.target.closest('li').remove();
	// 	}
	// }
}

export default App;