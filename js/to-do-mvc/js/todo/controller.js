import Model from './model.js';
import View from './view.js';

const model = new Model ();
const view = new View (model.tasks);


// Добавление задачи
view.elements.form.addEventListener('submit', function (e){
  e.preventDefault();
  const newTask = model.addTask(view.elements.input.value);
  view.renderTask(newTask);
  view.clearInput();


})

// Отслеживаем клик по чекбоксу или по кнопке "удалить"
view.elements.tasksList.addEventListener('click', function (e) {

  // Проверяем клик по чекбоксу
  if (e.target.getAttribute('type') === 'checkbox') {
    const id = e.target.closest('.todo-item').dataset.id;
    const task = model.findTask(id);
    model.changeStatus(task);
    view.changeStatus(task);
  };


  // Слушаем клик по кнопке
  if (e.target.hasAttribute('data-delete') ) {
    const id = e.target.closest('.todo-item').dataset.id;
    const task = model.findTask(id);
    model.removeTask(task);
    view.removeTask(task);
    
  }
  
});


