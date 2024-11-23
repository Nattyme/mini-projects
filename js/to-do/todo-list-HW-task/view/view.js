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

const validateInput = function (element) {
  if (element.value === '' && element.value.length < 4 ) {
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

const removeButtons = function (e) {
  let buttonsWrapper = getParent(e, 'div');
  buttonsWrapper.innerHTML = '';
}

// Фу-ция меняет кнопки задачи, возвращает HTML
const getUpdatedHTML = function (taskData, e) {
  // Надем задачу
  const task = getParent(e, 'li');

  // Найдем и удалим все кнопки в текущей задаче
  removeButtons(e);

  // Запишем в перем. копию данных задачи и добавиим кнопки на замену
  const updatedTaskData = {...taskData};

  // Создадим новую разметку
  const editeTask = new UI.TaskHTML ( updatedTaskData );
  const editeTaskHTML = editeTask.getButtonsHTML();
 
   // Добавим задачу в список задач на странице
  task.querySelector('.buttons-wrapper').insertAdjacentHTML('afterbegin', editeTaskHTML);

}

const getParent = function (e, type) {
  return e.target.closest(`${type}`);
}

const getTaskID = function (e) {
  return e.target.closest('li').dataset.id;
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
const addTask = function (createdTaskData) {
  const task = new UI.TaskHTML(createdTaskData).getHTML(); // получаем шаблон задачи

  // Добавим задачу в список задач на странице
  elements.tasksList.insertAdjacentHTML('afterbegin', task);

  // Очищаем поле ввода для текста 
  elements.newTaskInput.value = '';

  changeTitle();
}

// Функция редактирования текста задачи
const editTask = function (taskData, e) {
  let task = getParent(e, 'li');  // получаем шаблон задачи
  let id = getTaskID (e, 'li');  // получаем id задачи

  // Разрешаем редактирование
  task.querySelector('p').contentEditable = true;

  // Задаём фокус внутрь контейнера. 
  task.focus();

  // Заново отрисуем разметку задачи
  getUpdatedHTML( taskData, e);
 
  return id;
}

const cancel = function (e) {
  const task = getParent(e, 'li');  // получаем шаблон задачи
  const id = getTaskID(e, 'li');

  // Находим контейнер задачи - ближайший <li> и запрещаем ред-ние
  task.contentEditable = false;

  return id;
}

// Функция сохранения задачи
const saveTask = function (e) {
  // Получаем задачи
  let tasks =  elements.tasksList.querySelectorAll('li');
   
  // Обходим задачи
  tasks.forEach(function (task) {
    // Получаем ввод пользователя, удаляем пробелы
    let userText = task.querySelector('p').textContent.trim();

    // Проверяем ввод пользователя
    const isValid = validateInput(userText);
   
    let taskNewText = isValid ? userText : prompt('Ошибка сохранения текста. Попробуйте ещё раз.'); // Получим текст задачи
    
    // Проверяем, если поле задачи не пустое - сохраняем
    if ( isValid ) {
      task.firstChild.textContent = taskNewText;
      // Выводим уведомление об успехе
      console.log('Сообщение сохранено успешно');
      
      // displayNotification(success, model.data.messages.success, elements.addForm)
 
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


export { elements, NOTES, tasks, changeTitle, getTaskID, addTask, saveTask, removeTask, editTask, doFilter, displayNotification, validateInput, cancel, removeButtons, getAllTasks, getUpdatedHTML };