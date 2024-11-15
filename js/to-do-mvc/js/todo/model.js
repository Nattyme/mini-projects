export default class Model {
  constructor () {
    this.tasks = [];
  }

  addTask(text) {
    // this.tasks.push(text);

    const newTask = {
      status : 'active',
      text : text,
    }

    this.tasks.push(newTask);


  }

  doneTask(task) {
    task.status = 'done';
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    console.log(index);
    
  }
}