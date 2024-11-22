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

    const isValid = view.validateInput();

    let id = model.Task.getID();
    let userText = view.elements.newTaskInput.value.trim(); // Получим текст задачи
    let buttonsType = ['delete', 'edit'];
    
    // Создадим объект задачи (startNumber)
    model.createTaskData(id, userText); 
    
    isValid ? view.addTask(id, userText, buttonsType) : console.log('error');
   
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
    // Запустим функцию рендера 
    view.editTask(e);
  }

  // Если клик по кнопке 'cancel' - отмена редактирования задачи
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'cancel') {
     // Запустим функцию отмены редактирования
     view.cancelTaskEdit(e);
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





