import { MESSAGES } from './data/messages.js';

const tasks = [];

const createTaskData = function (id, text, buttonTypes) {

  const taskData = new Task(id, text, buttonTypes);
  tasks.push(taskData);

  return taskData;
}

const removeTaskData = function (id) {
  let removeTask = tasks.findIndex( function (taskData) {
    return parseInt(id) === taskData.id;
  });

  if (removeTask !== -1) tasks.splice(removeTask, 1); // Удаляем из массива 

}

class Task {
  constructor ( id, text, buttonTypes) {
    this.id = id,
    this.text = text,
    this.buttonTypes = buttonTypes
  }

  static getID = function ( startId = 1) {
    let id;

    if ( tasks.length === 0 ) {
      id = startId;
    } else {
      let lastElement = tasks[tasks.length - 1];
      id = lastElement.id + 1;
      console.log('lastElement.id');
      console.log(lastElement);
      console.log(lastElement.id);
      
    }

    return id;
  }
}

console.log(tasks);

export { MESSAGES, Task, createTaskData, removeTaskData };