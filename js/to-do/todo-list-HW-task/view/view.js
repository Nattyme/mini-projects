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



// const validateInput = function (element) {
//   // Получаем ввод пользователя, убираем пробелы
//   const inputText = getInput(element).trim();

//   // Зададим флаг проверки
//   let isValid = true;

//   // Сделаем проверки
//   if (inputText === '') {
//     console.log('Поле пустое');
//     isValid = false;
//     return;
//   }

//   // Если слишком короткое
//   if ( inputText.length < 4 ) {
//     console.log('Поле слишком короткое');
//     isValid = false;
//     return;
//   } 

//   // Если поле инпута заполнено
//   if (inputText !== '') {
//     const allowed = /^[a-zA-Zа-яА-Я\s,.\?!;:"'()&+\-=\\]+$/; // Разрешены только буквы и несколько символо
//     if (allowed.test(inputText) === false) isValid = false;
//   }

//   if (isValid === false) return;

//   return inputText;
// }

const getAllTasks = function () {
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

  // Передаем копию объекта данных задачи 
  const editTask = new UI.TaskHTML ( {...taskData} );

  // Создадим новую разметку li 
  const editTaskHTML = editTask.getHTML();
  
  // Добавим задачу в список задач на странице
  task.outerHTML = editTaskHTML;

  return task;
}

const getParent = function (e, type) {
  return e.target.closest(type);
}

const getTaskID = function (e) {
  return e.target.closest('li').dataset.id;
}

// = Удаление задачи со страницы =
const remove = function (e, message) {
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
const add = function (createdTaskData) {
  const task = new UI.TaskHTML(createdTaskData).getHTML(); // получаем шаблон задачи

  // Добавим задачу в список задач на странице
  elements.tasksList.insertAdjacentHTML('afterbegin', task);

  // Очищаем поле ввода для текста 
  elements.newTaskInput.value = '';

  changeTitle();
}

// Функция редактирования текста задачи
const edit = function (taskData, e) {
  // Заново отрисуем разметку задачи
  const taskNew = getUpdatedHTML( taskData, e);

  // Найдём input
  const input = taskNew.querySelector('input');
  // Разрешаем редактирование
  input.removeAttribute('readonly');
  console.log(taskNew.querySelector('input'));

  // Задаём фокус внутрь контейнера. 
  // input.focus();
  setTimeout(() => {
    input.focus();
    // Переместим курсор в конец текста (если требуется)
    const length = input.value.length;
    input.setSelectionRange(length, length);
  }, 0);


}

const cancel = function (taskData, e) {
  // Получаем шаблон задачи
  const task = getParent(e, 'li'); 

  // Запрещаем ред-ние шаблона задачи
   // Запрещаем ред-ние шаблона задачи
   task.querySelector('input').setAttribute('readonly', '');

  // Заново отрисуем разметку задачи
  getUpdatedHTML( taskData, e);

  return;
}

// Функция сохранения задачи
const save = function (taskData, e) {
  // Получаем шаблон задачи
  const task = getParent(e, 'li'); 
  const input = task.querySelector('input[type = "text"]');
  
  // Запрещаем его редак-ние
  input.setAttribute('readonly', '');

  // Проверяем, если поле задачи не пустое - сохраняем
  input.value = taskData.text;

  // Выводим уведомление об успехе
  console.log('Сообщение сохранено успешно');

  // Заново отрисуем разметку задачи
  getUpdatedHTML( taskData, e);

  // Запускаем функцию "Сохранить задачу"
  return;
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


export { 
  elements, 
  NOTES, 
  tasks, 
  UI, 
  changeTitle, 
  getTaskID, 
  getParent, 
  add, 
  save, 
  remove, 
  edit, 
  doFilter, 
  displayNotification, 
  cancel, 
  removeButtons, 
  getAllTasks, 
  getUpdatedHTML 
};