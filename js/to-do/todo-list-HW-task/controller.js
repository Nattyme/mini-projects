import * as model from './model/model.js';
import * as view from './view/view.js';

// Ф-цтя проверяем, получены ли данные от модели
const isData = function (data) {
  const receivedData = data;

  if (receivedData !== undefined && receivedData !== null) return true;

  return false;
}

const startEventListeners = function () {
  // Прослушивание событий фильтра, запускаем функцию  фильтра
  view.elements.filter.addEventListener('keyup', view.doFilter);

  // Отмена стандарт. поведение формы - по нажатию на submit страница не будет обновляться
  view.elements.addForm.addEventListener('submit', function(e) {
     e.preventDefault();
    
    // Проверили список задач. По результату сменили заголовок списка
    view.changeTitle();

    // Проверим текст пользователя из формы 
    const isValid = view.UI.validateInput(view.elements.addForm);

    // Если проверки не пройдена - остновим програму
    if( !isValid ) return 'Ошибка, данные не получены';
    // Запишем в переменную, если с текстом всё ок
    const userText = view.UI.getInputValue(view.elements.addForm); 

    // Создадим объект задачи 
    const taskData = model.createTaskData(userText); 

    const dataExist = isData(taskData);

    // Если данные получены - запускаем функцию add()
    dataExist === true ? view.add({...taskData}) : console.log('Невозможно добавить задачу. Попробуйте ещё раз');
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

    // Кнопки на замену
    const buttonTypes = ['cancel', 'save'];
  
    // Запустим функцию редактирования, передадим копию объекта данных и кнопки на замену
    view.edit({...taskData, buttonTypes}, e);
  }

  // Если клик по кнопке 'cancel' - отмена редактирования задачи
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'cancel') {
    // Получим id текущей задачи
    const taskID = view.getTaskID(e);

    // Получим данные по задаче из модели
    const updatedTaskData = model.findTask(taskID);

    // Запустим функцию сохаранения, передадим копию объекта данных (кнопки по умолч)
    view.cancel({...updatedTaskData}, e);
  }

  // Если клик по кнопке 'save' - сохраняем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'save') {
    // Получим id текущей задачи
    const id = view.getTaskID(e);

    // Получаем шаблон задачи
    const task = view.getParent(e, 'li'); 

    // Проверим текст пользователяи запишем резул-т в переменную
    const isValid = view.UI.validateInput(task); 

    if ( ! isValid ) return 'Ошибка сохранения. Проверьте данные';

    // Запишем в переменную, если с текстом всё ок
    const text = view.UI.getInputValue(task); 

    // Обновим данные задачи в её объекте 
    model.updateTaskData({id, text});

    // Получим данные по задаче из модели
    const updatedTaskData = model.findTask(id);

    // Запустим функцию сохарнения, передадим новые данные по задаче
    view.save({...updatedTaskData}, e);
  }

  // // Прослушивание события инпута для ввода новой задачи. Если после уведомления он снова в фокусе - скрыть уведомление
  // view.elements.newTaskInput.onfocus = function() {
  //   // Скрыть уведомление об ошибке
  //   if (view.elements.addForm.nextElementSibling.classList.contains('alert-danger')) {
  //     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
  //     view.elements.addForm.nextElementSibling.remove();
  //   }

  //   // Скрыть уведомление об успехе
  //   if (view.elements.addForm.nextElementSibling.classList.contains('alert-success')) {
  //     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
  //     view.elements.addForm.nextElementSibling.remove();
  //   }
  // };
};

view.changeTitle (); // При загрузке страницы изменяем заголовок, если список задач пуст

// Запускаем прослушивание событий
startEventListeners();





