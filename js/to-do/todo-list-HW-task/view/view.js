import * as NOTES  from './notes/notes.js';
import * as UI from './UI/index.js';

const Module = ( function () {
  const { getInput } = UI;

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

  // Модуль с действиями 
  const taskManager = {
    add(taskData) {
      const task = new UI.TaskHTML(taskData).getHTML(); // получаем HTML шаблон задачи
      elements.tasksList.insertAdjacentHTML('afterbegin', task); // Добавим задачу в список задач на странице
  
      elements.newTaskInput.value = ''; // Очищаем поле ввода для текста 
      changeTitle(); // Сменим заголовок

      return;
    },
    remove(e, message) {
      let task = e.target.closest('li'); // Найдём задачу
      let id = task.dataset.id; // Запишем её ID
  
      // Проверяем подтверждение удаления
      if (confirm(message)) {
        if (task) task.remove(); // удалим задачу
      }

      return id; // и вернём её id
    },
    edit(taskData, e) {
      const taskNew = getUpdatedHTML( taskData, e);  // Отрисуем разметку задачи с новыми кнопками
      const input = taskNew.querySelector('input'); // Найдём input

      input.removeAttribute('readonly');   // Разрешаем редактирование
    
      // Задаём фокус внутрь контейнера. 
      input.focus();

      return;
    },
    cancel(taskData, e) {
      const task = getParent(e, 'li'); // Получаем шаблон задачи
    
      task.querySelector('input').setAttribute('readonly', ''); // Запрещаем ред-ние шаблона задачи
      getUpdatedHTML( taskData, e);   // Заново отрисуем разметку задачи
    
      return;
    },
    save(taskData, e) {
      const task = getParent(e, 'li');  // Получаем шаблон задачи
      const input = task.querySelector('input[type = "text"]');   // Получаем инпут задачи
      
      input.setAttribute('readonly', '');  // Запрещаем редак-ние инпута
      input.value = taskData.text;  // сохраняем ввод в поле задачи
    
      console.log('Сообщение сохранено успешно'); // Выводим уведомление об успехе
    
      getUpdatedHTML( taskData, e);    // Отрисуем разметку задачи с новыми данными
    
      return;
    }
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

  return {
    elements,
    taskManager,
    getTaskID,
    getParent,
    getInput,
    changeTitle,
    doFilter
  }
  
}) ();


export { Module };