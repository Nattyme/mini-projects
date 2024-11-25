import * as model from '../model/model.js';
import * as view from '../view/view.js';


// Ф-ция проверяем, получены ли данные от модели
const isDataCreated = function (data) {
  const receivedData = data;

  if (receivedData !== undefined && receivedData !== null) return true;

  return false;
}

// Объект событий
const EVENT_TYPES = {
  CLICK : 'click',
  KEYUP : 'keyup',
  SUBMIT : 'submit'
}

// Типы событий и их методы 
const eventHandlers = {
  [EVENT_TYPES.CLICK] : (e) => {taskHandling(e)}, // запускает ф-ция обраб-ки задач
  [EVENT_TYPES.KEYUP] : (e) => {
          const filterEl = view.elements.filter;
          if (e.target === filterEl) {
            // Валидация ввода пользователя 
            const isValid = model.validateInput(view.elements.filter, { minLength : 1, maxLength : 30});
            if (isValid) view.doFilter(e, isValid);  // Запустим ф-цию фильтра
          }
  }, // запускает ф-цию фильтрации
  [EVENT_TYPES.SUBMIT] : (e) => {
          e.preventDefault(); // Отменяем станд. поведение
          
          view.changeTitle();    // Проверим список задач. По результату сменим заголовок
console.log(view.FUNC);

          const input = view.UI.getInput(view.elements.addForm); // Получим Input
          const isValid = model.validateInput(input);  // Проверим текст пользователя из формы 

          if( !isValid ) return 'Ошибка, данные не получены';   // Если проверки не пройдена - return


          const text = input.value;  // Если текст ок - запишем ввод в переменную
console.log(model);

          const taskData = model.createTaskData(text);  // Создадим объект задачи 
          const dataExist = isDataCreated(taskData); // Проверим, создан ли объект данных задачи
console.log(view);

          // Если данные получены - запускаем ф-цию add()
          if (dataExist) {
            view.FUNC.taskManager.add({...taskData});
          } else {
            console.log('Невозможно добавить задачу. Попробуйте ещё раз');
          }
  } // добавления задачи
}

// Ф-ция запускает метод евента, еслт он найден в объекте eventHandlers;
const handleEvent = function (type, event) {
  if (eventHandlers[type]) {
    eventHandlers[type](event);
  }
}

// Ф-ция запускает прослушивание событий
const startEventListeners = function () {

  // Слушаем keyup фильтра, запускаем ф-цию фильтра
  view.elements.filter.addEventListener(EVENT_TYPES.KEYUP, (e) => handleEvent(EVENT_TYPES.KEYUP, e));

  // Слушаем submit, запускаем ф-цию добавления задачи
  view.elements.addForm.addEventListener(EVENT_TYPES.SUBMIT, (e) => handleEvent(EVENT_TYPES.SUBMIT, e));

  // Слушаем click списка задач, запускаем ф-цию обработки задачи
  view.elements.tasksList.addEventListener(EVENT_TYPES.CLICK, (e) => handleEvent(EVENT_TYPES.CLICK, e));
}

// ::: Обработка задач :::
const taskHandling = function (e) {
  // Если клик по кнопке 'delete' - удаляем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'delete') {
    let removedTask = view.FUNC.taskManager.remove(e); // удаляем задачу со страницы
    model.removeTaskData(removedTask); // удаляем данные задачи из объекта

    // Сменим заголовок
    view.changeTitle();
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
    view.FUNC.taskManager.edit({...taskData, buttonTypes}, e);
  }

  // Если клик по кнопке 'cancel' - отмена редактирования задачи
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'cancel') {
    // Получим id текущей задачи
    const taskID = view.getTaskID(e);

    // Получим данные по задаче из модели
    const updatedTaskData = model.findTask(taskID);

    // Запустим функцию сохаранения, передадим копию объекта данных (кнопки по умолч)
    view.FUNC.taskManager.cancel({...updatedTaskData}, e);
  }

  // Если клик по кнопке 'save' - сохраняем задачу
  if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'save') {
    // Получим id текущей задачи
    const id = view.getTaskID(e);

    // Получаем шаблон задачи
    const task = view.getParent(e, 'li'); 

    // Получим Input
    const input = view.UI.getInput(task);

    // Проверим текст пользователяи запишем резул-т в переменную
    const isValid = model.validateInput(input);

    if ( ! isValid ) return 'Ошибка сохранения. Проверьте данные';

    // Запишем в переменную, если с текстом всё ок
    const text = view.UI.getInput(task).value; 

    // Обновим данные задачи в её объекте 
    model.updateTaskData({id, text});

    // Получим данные по задаче из модели
    const updatedTaskData = model.findTask(id);

    // Запустим функцию сохарнения, передадим новые данные по задаче
    view.FUNC.taskManager.save({...updatedTaskData}, e);
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

const init = function () {
  view.changeTitle (); // При загрузке страницы изменяем заголовок, если список задач пуст

  // Запускаем прослушивание событий
  startEventListeners();
}

export { init };


