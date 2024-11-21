import { MESSAGES } from './data/messages.js';

const tasks = [];

const createTaskData = function (id, text) {

  const taskData = new Task(id, text);
  tasks.push(taskData);

  return taskData;
}

const removeTaskData = function (id) {
  let removeTask = tasks.findIndex( function (taskData) {
    return parseInt(id) === taskData.id;
  });

  if (removeTask !== -1) tasks.splice(removeTask, 1); // Удаляем из массива 

}

const findTask = function (id) {
  
  let taskId = tasks.findIndex( function (taskData) {
    return parseInt(id) === taskData.id;
  });

  return tasks[taskId];
}

class Task {
  constructor ( id, text) {
    this.id = id,
    this.text = text
  }

  static getID = function ( startId = 1) {
    let id;

    if ( tasks.length === 0 ) {
      id = startId;
    } else {
      let lastElement = tasks[tasks.length - 1];
      id = lastElement.id + 1;
    }

    return id;
  }
}



export { MESSAGES, Task, createTaskData, removeTaskData, findTask };