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

// Отслеживаем чек
view.elements.tasksList.addEventListener('click', function (e) {
  console.log(e.target);

  // Проверяем клик по чекбоксу
  if (e.target.getAttribute('type') === 'checkbox') {

  };
  
});

// model.addTask('Заверстать стартовый шаблон');
// model.addTask('Написать скрипт');
// model.addTask('Записать урок');
// model.doneTask(model.tasks[1]);



