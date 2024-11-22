import * as model from './model/model.js';
import * as view from './view/view.js';

const startEventListeners = function () {
  // Прослушивание событий фильтра, запускаем функцию  фильтра
  view.elements.filter.addEventListener('keyup', view.doFilter);

  // Отмена стандарт. поведение формы - по нажатию на submit страница не будет обновляться
  view.elements.addForm.addEventListener('submit', function(e) {
     e.preventDefault();
    
    // Проверили список задач. По результату сменили заголовок списка
    view.changeTitle();

    const isValid = view.validateInput(view.elements.newTaskInput.value.trim());

    let id = model.Task.getID();
    let userText = isValid ? view.elements.newTaskInput.value.trim() : prompt('Ошибка сохранения текста. Попробуйте ещё раз.'); // Получим текст задачи
    
    // Создадим объект задачи 
    const createdTaskData = model.createTaskData(id, userText); 


    if ( isValid ) {
      view.addTask(createdTaskData);
    } else {
      console.log('Ошибка добавления задачи');
    }

  });

  // Добавляем прослушивание контейнеру с задачами, запускаем функцию обработки задач
  view.elements.mainContainer.addEventListener('click', taskHandling);
}

// ::: Обработка задач :::
const taskHandling = function (e) {
  // Если клик по кнопке 'delete' - удаляем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'delete') {
    let removedTask = view.removeTask(e); // удаляем задачу со страницы
    model.removeTaskData(removedTask); // удаляем данные задачи из объекта
  }

  // Если клик по кнопке 'edit' - редактируем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'edit') {
    // Получим id текущей задачи
    const taskID = view.getTaskID(e);

    // Получим данные задачи 
    const taskData = model.findTask(taskID);
    // Запустим функцию редактирования. 
    view.editTask(taskData, e);

    // Добавим в объект задачи данные по кнопкам
    // updatedTaskData.buttonTypes = buttonTypes;

    // Обновим HTML задачи
    // view.getUpdatedHTML(updatedT/askData, e); 
  }

  // Если клик по кнопке 'cancel' - отмена редактирования задачи
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'cancel') {
    // Запустим функцию отмены редактирования и получаем ID текущей задачи
    const taskID = view.cancelTaskEdit(e);
    const updatedTaskData = model.findTask(taskID);

    // Обновим HTML задачи
    view.getUpdatedHTML(updatedTaskData, e);

  }

  // Если клик по кнопке 'save' - сохраняем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'save') {
    // Запустим функцию отмены редактирования
    view.saveTask(e);
  }

  // Прослушивание события инпута для ввода новой задачи. Если после уведомления он снова в фокусе - скрыть уведомление
  view.elements.newTaskInput.onfocus = function() {
    // Скрыть уведомление об ошибке
    if (view.elements.addForm.nextElementSibling.classList.contains('alert-danger')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      view.elements.addForm.nextElementSibling.remove();
    }

    // Скрыть уведомление об успехе
    if (view.elements.addForm.nextElementSibling.classList.contains('alert-success')) {
      // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
      view.elements.addForm.nextElementSibling.remove();
    }
  };

  // Проверяем список и обновляем заголовок
  view.changeTitle ();
};

view.changeTitle (); // При загрузке страницы изменяем заголовок, если список задач пуст

startEventListeners();





