import { NOTES } from './templates/templates.js';
import * as UI from './UI/index.js';

const tasks = []; // Массив для хранения объектов задач

const elements = {
  addForm : document.querySelector('#addForm'),  
  newTaskInput : addForm.querySelector('#newItemText'), 
  buttonSubmit : addForm.querySelector('#buttonSubmit'),

  mainContainer : document.querySelector('#main'), 
  filter : document.querySelector('#filter'),  


  taskListTitle : document.querySelector('#taskListTitle'),
  tasksList : document.querySelector('#items'), 
}

// = Уведомление 
const displayNotification = function (type, message, container) {
  let note = UI.NOTES.type;

  // Добавляем текcт в уведомление об ошибке
  type.insertAdjacentHTML('afterbegin', message);
  // Подумать
  if (!elements.addForm.nextElementSibling.classList.contains('alert-danger')) {
    container.after(note);
  }

  return note;
}

const validateInput = function () {
  if (elements.newTaskInput.value === '' && elements.newTaskInput.value.length < 4 ) {
    return false;
  }

  return true;
}

const getAllTasks = function (l) {
  return elements.tasksList.querySelectorAll('li');
}

// Функция проверяет, в списке есть задачи или он пуст. По результату выводим нужный текст в заголовок.
function changeTitle () {
  const tasks = Array.from(getAllTasks());

  let existList = tasks.filter( (task) => {
    return task.hasAttribute('data-display') && task.getAttribute('data-display') !== 'none';
  });
 
  if ( existList.length > 0) {
    elements.taskListTitle.textContent = 'Список дел';
  } else {
    elements.taskListTitle.textContent = 'Список дел пуст';
  }
}

const removeButtons = function (task, type) {
  let buttons = task.querySelectorAll(`[type = ${type}]`);
  buttons.forEach( (button) => {button.remove()} );
}

// Фу-ция меняет кнопки задачи, возвращает HTML
const getUpdatedHTML = function ( id, text, buttonsType, task) {
  // Найдем и удалим все кнопки в текущей задаче
  removeButtons(task, 'button');

  const editedTask = new UI.TaskHTML ( id, text, buttonsType );
  const newButtons = editedTask.getButtonsHTML();

   // Добавим задачу в список задач на странице
  task.insertAdjacentHTML('afterbegin', newButtons);

}

const getParent = function (e, type) {
  return e.target.closest(`${type}`);
}

const getTaskID = function (e, type) {
  return e.target.closest(`${type}`).dataset.id;
}

// = Удаление задачи со страницы =
const removeTask = function (e, message) {
  let task = e.target.closest('li');
  let id = task.dataset.id;

  // Подтверждение об удаления
  if (confirm(message)) {
    if (task) task.remove(id); 
    task.remove(); // удалим задачу
  }

  return id; // и вернём её id
}

// = Добавление задачи на страницу =
const addTask = function (id, userText, buttonsTypes) {
  const task = new UI.TaskHTML(id, userText, buttonsTypes).getHTML(); // получаем шаблон задачи

  // Добавим задачу в список задач на странице
  elements.tasksList.insertAdjacentHTML('afterbegin', task);

  // Очищаем поле ввода для текста 
  elements.newTaskInput.value = '';

  changeTitle();
}

// Функция редактирования текста задачи
const editTask = function (e) {
  let task = getParent(e, 'li');  // получаем шаблон задачи
  let id = getTaskID (e, 'li');  // получаем id задачи

  const text = task.textContent.trim(); // Получаем содержимое задачи
  const buttonsType = ['save', 'cancel'];

  // Обновим HTML задачи
  getUpdatedHTML(id, text, buttonsType, task); 
 
  // Разрешаем редактирование
  task.contentEditable = true;

  // Задаём фокус внутрь контейнера. 
  task.focus();

  return id;
}

const cancelTaskEdit = function (e) {
  let task = getParent(e, 'li');  // получаем шаблон задачи
  let id = getTaskID (e, 'li');  // получаем id задачи

  // Находим контейнер задачи - ближайший <li> и запрещаем редак-ние
  task.contentEditable = false;

  const buttonsType = ['delete', 'edit']; // Передадим новые кнопки 

  // Обновим HTML задачи
  getUpdatedHTML(id, text, buttonsType, task);
  
  // Вернем текст и id задачи
  return 
}

// Функция сохранения задачи
const saveTask = function (e) {
  // Получаем задачи
  let tasks =  elements.tasksList.querySelectorAll('li');

  // Обходим задачи
  tasks.forEach(function (task) {
    
    // Получили текст задачи списка, убрали пробелы, сохранили в новую переменную
    let taskNewText = task.firstChild.textContent.trim();
    
    // Проверяем, если поле задачи не пустое - сохраняем
    if (taskNewText !== '') {
      task.firstChild.textContent = taskNewText;

      // Выводим уведомление об успехе
      displayNotification(success, model.data.messages.success, elements.addForm)
 
    } else {
      // Или оставляем предыдущий текст
      // Проверка не работает
      task.firstChild.textContent = taskText;
    }
  });

      // Запрещаем редактирование блока задачи
      focusWrapper.contentEditable = false;

      // Скрываем кнопки "Сохранить", "Отмена"
      buttons.buttonSave.style.display = 'none';
      buttons.buttonCancel.style.display = 'none';

      // Показываем кнопки "Удалить", "Редактировать"
      buttons.buttonDelete.style.display = 'block';
      buttons.buttonEdit.style.display = 'block';

      // Запускаем функцию "Сохранить задачу"
      saveTask();

}

// ::: Поиск по задачам :::
const doFilter = function (e) {
  // Проверили список задач. По результату сменили заголовок списка
  changeTitle ();

  // Записываем в переменную строку запроса
  let searchRequest = e.target.value.toLowerCase();

  // Находим все задачи
  let tasks = getAllTasks();

  tasks.forEach(function (task) {
    // Получили текст задачи списка, убрали пробелы, перевели в ниж. регистр
    let taskText = task.firstChild.textContent.trim().toLowerCase();
      
    // Если подстрока найдена в задаче - показываем её
    if (taskText.indexOf(searchRequest) != -1 || e.target === '') {

      // Если строка найдена - показываем элемент li с задачей list-group-item
      task.style.display = 'block';
      task.setAttribute('data-display', '');
    } else {
      // Если строка не найдена - скрываем элементы li с задачей
      task.style.display = 'none';
      task.setAttribute('data-display', 'none');
    } 

     // Прослушивание события инпута для фильтра. Если он в фокусе - очистить поле.
     // > Но как после это вернуть отображение списка задач?
    e.target.onfocus = function() {
      e.target.value = '';
    };
      
  });

  // Проверили список задач. По результату сменили заголовок списка
  changeTitle ();

}


export { elements, NOTES, tasks, changeTitle, addTask, saveTask, removeTask, editTask, doFilter, displayNotification, validateInput, cancelTaskEdit, removeButtons, getAllTasks };