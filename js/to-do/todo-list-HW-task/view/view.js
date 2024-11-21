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


// Функция проверяет, в списке есть задачи или он пуст. По результату выводим нужный текст в заголовок.
function changeTitle () {
  if ( elements.tasksList.clientHeight > 0) {
    elements.taskListTitle.textContent = 'Список дел';
  } else {
    elements.taskListTitle.textContent = 'Список дел пуст';
  }
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
const addTask = function (taskData, buttonTypes) {
  const task = new UI.TaskHTML(taskData, buttonTypes).getHTML();// получаем шаблон задачи

  // Добавим задачу в список задач на странице
  elements.tasksList.insertAdjacentHTML('afterbegin', task);

  // Очищаем поле ввода для текста 
  elements.newTaskInput.value = '';
}

// Функция редактирования текста задачи
const editTask = function (taskId, buttonTypes) {
  console.log(buttonTypes);
  console.log(taskId);
  const task = new UI.TaskHTML(taskData).getHTML(); // получаем шаблон задачи

  // Добавим задачу в список задач на странице
  elements.tasksList.insertAdjacentHTML('afterbegin', task);
  // console.log(UI.getHTML());
  return

  // Находим список задач
  let tasks = elements.tasksList.querySelectorAll('li');

  // Обходим задачи
  tasks.forEach(function (task) {
    // Находим контецнер задачи - ближайший <li>. Разрешаем его редактирование
    let focusWrapper = e.target.closest('li');
    focusWrapper.contentEditable = true;

    // Задаём фокус внутрь контейнера. 
    // > Не получилось сдвинуть каретку в конец текста
    focusWrapper.focus();

    // Слушаем событтие "клик" по кнопке "Отмена"
    buttons.buttonCancel.addEventListener('click', function (e) {
      // Находим контейнер задачи - ближайший <li> и запрещаем редактирование
      focusWrapper.contentEditable = false;

      // Скрываем кнопки "Отмена", "Сохранить", "Удалить", "Редактировать"
      buttons.buttonCancel.style.display = 'none';
      buttons.buttonSave.style.display = 'none';
      buttons.buttonDelete.style.display = 'block';
      buttons.buttonEdit.style.display = 'block';
   
    });

    // Слушаем событие кнопки "Сохранить"
    buttons.buttonSave.addEventListener('click', function (e) {
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
     
    })
  });
}

// const toggleButtons = function (target) {
//   // Скрываем кнопку, по которой был клик
//   console.log( target.nextElementSibling);
//   // target.remove();
 
//   const classList = UI.buttons.edit.classList;
//   console.log(classList)
//   console.log(classList.push('display: none'))
//   console.log(classList)
  
//   const buttons = getButtons(target); //array
  
//   let type = target.getAttribute('data-action');
//   switch (type) {
//     case 'edit' :
//       buttons.buttonDelete.style.display = 'none';
//       buttons.buttonSave.style.display = 'block';
//       buttons.buttonCancel.style.display = 'block';
//       break;
//     case 'save' :

//    }

// }

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

}

// ::: Поиск по задачам :::
const doFilter = function (e) {
  // Проверили список задач. По результату сменили заголовок списка
  changeTitle ();

  // Записываем в переменную строку запроса
  let searchRequest = e.target.value.toLowerCase();

  // Находим все задачи
  let tasks = elements.tasksList.querySelectorAll('li');

  tasks.forEach(function (task) {
    
    // Получили текст задачи списка, убрали пробелы, перевели в ниж. регистр
    let taskText = task.firstChild.textContent.trim().toLowerCase();
      
    // Если подстрока найдена в задаче - показываем её
    if (taskText.indexOf(searchRequest) != -1 || e.target === '') {

      // Если строка найдена - показываем элемент li с задачей
      task.style.display = 'block';
    } else {
      // Если строка не найдена - скрываем элементы li с задачей
      task.style.display = 'none';
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


export { elements, NOTES, tasks, changeTitle, addTask, saveTask, removeTask, editTask, doFilter, displayNotification, validateInput };