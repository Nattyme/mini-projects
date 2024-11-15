export default class Model {
  constructor () {
    this.tasks = [];
  }

    addTask(text) {
      this.tasks.push(text);
    }
}