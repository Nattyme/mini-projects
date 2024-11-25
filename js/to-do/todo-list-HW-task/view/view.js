import * as NOTES  from './notes/notes.js';
import * as UI from './UI/index.js';
import * as FUNC  from './functions/index.js';


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

const getAllTasks = function () {
  return elements.tasksList.querySelectorAll('li');
}

// Ф-ция проверяет, в списке есть задачи или он пуст. По результату выводим нужный текст в заголовок.
function changeTitle () {
  const tasks = Array.from(getAllTasks());

  // Обойдём список. Если есть хоть одна задача без data-display = 'none'  - запишем в existList
  let existList = tasks.filter( (task) => {
    return task.hasAttribute('data-display') && task.getAttribute('data-display') !== 'none';
  });

  // Показывает заголовок в зав-ти от длинны массива
  if ( existList.length > 0) {
    elements.taskListTitle.textContent = 'Список дел';
  } else {
    elements.taskListTitle.textContent = 'Список дел пуст';
  }
}

// Ф-ция удаляем все кнопки контейнере event
const removeButtons = function (e) {
  let buttonsWrapper = getParent(e, 'div');
  buttonsWrapper.innerHTML = '';
}

// Ф-ция меняет кнопки задачи, возвращает HTML
const getUpdatedHTML = function (taskData, e) {
  // Надем задачу
  const task = getParent(e, 'li');

  // Найдем и удалим все кнопки в текущей задаче
  removeButtons(e);

  // Передаем копию объекта данных задачи 
  const editTask = new UI.TaskHTML ( {...taskData} );

  // Создадим новую разметку li 
  const editTaskHTML = editTask.getHTML();
  
  // Добавим задачу в список задач на странице
  task.outerHTML = editTaskHTML;

  return task;
}

// Ф-ция получает родителя e по типу элемента ('li', 'div' и т д)
const getParent = function (e, type) {
  return e.target.closest(type);
}

// Ф-ция получает id задачи
const getTaskID = function (e) {
  return e.target.closest('li').dataset.id;
}

// ::: Поиск по задачам :::
const doFilter = function (e , isValid) {
  
  let searchRequest = isValid ? elements.filter.value.toLowerCase() : '';  // Записываем строку запроса в переменную 
  let tasks = getAllTasks();  // Находим все задачи

  tasks.forEach(function (task) {
    // Получили текст задачи списка, убрали пробелы, перевели в ниж. регистр
    let taskText = task.querySelector('input[type="text"]').value.trim().toLowerCase();
      console.log(taskText);
      
    // Если подстрока найдена в задаче - показываем её
    if (taskText.includes(searchRequest) || e.target === '') {

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

export { 
  elements,
  UI,
  FUNC,
  getUpdatedHTML,
  getTaskID,
  getParent,
  changeTitle,
  doFilter
 };