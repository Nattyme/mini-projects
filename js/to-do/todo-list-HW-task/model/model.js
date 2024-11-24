import { MESSAGES } from './notes/notes.js';
import { validateInput } from './validate/validate.js';

const Module = ( function () {

  // Массива для хран-я объектов задач
  const tasks = [];
  console.log('model');
  console.log(tasks);

  // Класс задачи
  class Task {
    constructor ( id, text) {
      this.id = id;
      this.text = text;
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
  const createTaskData = function (text) {
    // Создадим ID для задачи
    const id = Task.getID();
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

  // Ф-ция находит и обновляет задачу в массиве task. Возвращает новый массив
  const updateTaskData = function ( {id, text} ) {
  
    const task = tasks.find( (task) => task.id === parseInt(id));

    if ( !task ) console.log('Задача не найдена');
    task.text = text;

    return task;
  }

  // Ф-ция ищет задачу в массиве по id и возвращает объект задачи
  const findTask = function (id) {
    let taskId = tasks.findIndex( function (task) {
      return parseInt(id) === task.id;
    });

    if ( taskId === '-1') {
      console.log('Объект задачи не найден');
      return;
    }

    return tasks[taskId];
  }

  return {
    createTaskData,
    removeTaskData,
    updateTaskData,
    findTask,
    validateInput
  }
}) ();


export { MESSAGES, Module, validateInput };