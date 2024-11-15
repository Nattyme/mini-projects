export default class Model {
  constructor () {
    this.tasks = [];
    this.loadFromLocalStorage();
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

  loadFromLocalStorage () {
    const data = localStorage.getItem('tasks');

    if(data) {
      this.tasks = JSON.parse(data);
    }
  }

  saveToLocalStorage() {
    // Сохраняем в локал storage , переведя в json 
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}