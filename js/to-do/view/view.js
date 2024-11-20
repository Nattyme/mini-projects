import { successHtml,  errorHtml } from './templates/templates.js';

const elements = {
  addForm : document.querySelector('#addForm'),  
  mainContainer : document.querySelector('#main'), 
  itemsList : document.querySelector('#items'), 
  newItemInput : document.querySelector('#newItemText'), 
  filter : document.querySelector('#filter'),  
  buttonSubmit : document.querySelector('#buttonSubmit'),
  itemTemplateWrapper : document.querySelector('#tmpl-list-group-item'),
  taskListTitle : document.querySelector('#taskListTitle'),
}

// Функция проверяет, в списке есть задачи или он пуст. По результату выводим нужный текст в заголовок.
function changeTitle () {
  if (itemsList.clientHeight > 0) {
    taskListTitle.textContent = 'Список дел';
  } else {
    taskListTitle.textContent = 'Список дел пуст';
  }
}

// = Добавление задачи на страницу =
const addTask = function () {

  // Находим <li> - контейнер для задачи 
  let itemTemplate = itemTemplateWrapper.content.querySelector('.list-group-item'); 

  // Клонируем элем. li. Записываем в переменную
  let newItem = itemTemplate.cloneNode(true);
  
  // Добавляем текст новой задачи в начало newItem
  newItem.insertAdjacentHTML('afterbegin', newItemInput.value);

  // Добавляем задачу в список задач в начало контейнера 
  itemsList.prepend(newItem);

  // Очищаем поле ввода для текста 
  newItemInput.value = '';
}

// Функция сохранения задачи
const saveTask = function (e) {
  // Получаем задачи
  let tasks = itemsList.querySelectorAll('li');

  // Обходим задачи
  tasks.forEach(function (task) {
    
    // Получили текст задачи списка, убрали пробелы, сохранили в новую переменную
    let taskNewText = task.firstChild.textContent.trim();
    
    // Проверяем, если поле задачи не пустое - сохраняем
    if (taskNewText !== '') {
      task.firstChild.textContent = taskNewText;

      // Выводим уведомление об успехе
      success(addForm, e);
    } else {
      // Или оставляем предыдущий текст
      // Проверка не работает
      task.firstChild.textContent = taskText;
    }
  });

}

// = Удаление задачи со страницы =
const removeTask = function (e) {
  // Находим контейнер задача - ближайший элемент <li> от кнопки , по кот клик
  let taskText = e.target.closest('li').firstChild.textContent.trim();

  // Подтверждение об удаления
  if (confirm(`Вы уверены, что хотите удалить задачу "${taskText}"?`)) {
    e.target.closest('li').remove();
  }
}
   
// Функция редактирования текста задачи
const editTask = function (e) {
  // Скрываем кнопку, по которой был клик
  e.target.style.display = 'none';

  // Находим кнопки по 'родителю' кнопки первого клика
  let buttonSave = e.target.parentNode.querySelector('[data-action = "save"]');
  let buttonDelete = e.target.parentNode.querySelector('[data-action="delete"]');
  let buttonCancel = e.target.parentNode.querySelector('[data-action="cancel"]');
  let buttonEdit = e.target.parentNode.querySelector('[data-action="edit"]');

  // Скрываем кнопки "Удалить", "Сохранить", "Отмена"
  buttonDelete.style.display = 'none';
  buttonSave.style.display = 'block';
  buttonCancel.style.display = 'block';

  // Находим список задач
  let tasks = itemsList.querySelectorAll('li');

  // Обходим задачи
  tasks.forEach(function (task) {
    // Находим контецнер задачи - ближайший <li>. Разрешаем его редактирование
    let focusWrapper = e.target.closest('li');
    focusWrapper.contentEditable = true;

    // Задаём фокус внутрь контейнера. 
    // > Не получилось сдвинуть каретку в конец текста
    focusWrapper.focus();

    // Слушаем событтие "клик" по кнопке "Отмена"
    buttonCancel.addEventListener('click', function (e) {
      // Находим контейнер задачи - ближайший <li> и запрещаем редактирование
      focusWrapper.contentEditable = false;

      // Скрываем кнопки "Отмена", "Сохранить", "Удалить", "Редактировать"
      buttonCancel.style.display = 'none';
      buttonSave.style.display = 'none';
      buttonDelete.style.display = 'block';
      buttonEdit.style.display = 'block';
   
    });

    // Слушаем событие кнопки "Сохранить"
    buttonSave.addEventListener('click', function (e) {
      // Запрещаем редактирование блока задачи
      focusWrapper.contentEditable = false;

      // Скрываем кнопки "Сохранить", "Отмена"
      buttonSave.style.display = 'none';
      buttonCancel.style.display = 'none';

      // Показываем кнопки "Удалить", "Редактировать"
      buttonDelete.style.display = 'block';
      buttonEdit.style.display = 'block';

      // Запускаем функцию "Сохранить задачу"
      saveTask();
     
    })
  });
}

// = Уведомление об ошибке =
const error = function (container) {
  let errorTemplate = itemTemplateWrapper.content.querySelector('.alert-danger'); // Находим div с уведомления

  // Клонируем элем. li. Записываем в переменную
  let error = errorTemplate.cloneNode(true);

  // Добавляем текст новой задачи в начало newItem
  error.insertAdjacentHTML('afterbegin', 'Ошибка. Поле не может быть пустым и содержать менее 5-ти символов');

  // Добавляем уведомление 
  if (!addForm.nextElementSibling.classList.contains('alert-danger')) {
    container.after(error);
  }
}

// = Уведомление об успехе =
const success = function (container) {
  let successTemplate = itemTemplateWrapper.content.querySelector('.alert-success'); // Находим div с уведомления

  // Клонируем элем. li. Записываем в переменную
  let success = successTemplate.cloneNode(true);

  // Добавляем текст новой задачи в начало newItem
  success.insertAdjacentHTML('afterbegin', 'Задача успешно обновлена');

  // Добавляем уведомление 
  if (!addForm.nextElementSibling.classList.contains('alert-success')) {
    container.after(success);
  }
}

// ::: Поиск по задачам :::
const doFilter = function (e) {
  // Проверили список задач. По результату сменили заголовок списка
  changeTitle ();

  // Записываем в переменную строку запроса
  let searchRequest = e.target.value.toLowerCase();

  // Находим все задачи
  let tasks = itemsList.querySelectorAll('li');

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

// ::: Обработка задач :::
const taskHandling = function (e) {
  // Проверили список задач. По результату сменили заголовок списка
  changeTitle ();

  // Если клик по кнопке 'submit' - если поле не пустое и есть минимум 4 символа - добавляем задачу
  if (e.target === buttonSubmit ) {
    if (newItemInput.value === '' && newItemText.value.length < 4 ) {
      error(addForm, e);
    } else {
      addTask();
    }
  } 

  // Если клик по кнопке 'delete' - удаляем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'delete') {
    removeTask(e);
  }

  // Если клик по кнопке 'edit' - удаляем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'edit') {
    editTask(e);
  }

  // Прослушивание события инпута для ввода новой задачи. Если после уведомления он снова в фокусе - скрыть уведомление
  newItemInput.onfocus = function() {
    // Скрыть уведомление об ошибке
    if (addForm.nextElementSibling.classList.contains('alert-danger')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      addForm.nextElementSibling.remove();
    }

    // Скрыть уведомление об успехе
    if (addForm.nextElementSibling.classList.contains('alert-success')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      addForm.nextElementSibling.remove();
    }
  };

  // Проверяем список и обновляем заголовок
  changeTitle ();
};




export { elements, changeTitle, addTask, saveTask, removeTask, editTask, error, success, taskHandling, doFilter };