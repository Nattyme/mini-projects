import { MESSAGES } from './data/messages.js';

// Массива для хран-я объектов задач
const tasks = [];

// Класс задачи
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

// Ф-ция создает задачу
const createTaskData = function (id, text) {

  const taskData = new Task(id, text);
  tasks.push(taskData);

  return taskData;
}

// Ф-ция удаляет задачу из массива tasks
const removeTaskData = function (id) {
  let removeTask = tasks.findIndex( function (taskData) {
    return parseInt(id) === taskData.id;
  });

  if (removeTask !== -1) tasks.splice(removeTask, 1); // Удаляем из массива 

}

// Ф-ция ищет задачу в массиве id и возвращает объект задачи
const findTask = function (id) {
  
  let taskId = tasks.findIndex( function (taskData) {
    return parseInt(id) === taskData.id;
  });

  return tasks[taskId];
}

export { MESSAGES, Task, createTaskData, removeTaskData, findTask };