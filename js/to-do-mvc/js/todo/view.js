export default class View {
  constructor (tasks) {
    tasks.forEach((task) => {
      this.renderTask(task);
    });
  }

  elements = {
    input : document.querySelector('#newTask'),
    form : document.querySelector('#form'),
    tasksList : document.querySelector('#tasksList')
  }

  renderTask(taskObject) {
    let completeClass = taskObject.status === 'done' ? 'completed' : '';
    let checked = taskObject.status === 'done' ? 'checked' : '';


    const taskHTML = `
                  <li class="todo-item">
                    <label class="todo-item-label">
                      <input class="checkbox" type="checkbox" ${checked}/>
                      <span class="${completeClass}">${taskObject.text}</span>
                      <button class="btn btn-secondary btn-sm">Удалить</button>
                    </label>
                  </li>
    `

    this.elements.tasksList.insertAdjacentHTML('beforeend', taskHTML);
  }

  clearInput() {
    this.elements.input.value = '';
  }
}