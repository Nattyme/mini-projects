import * as model from './model/model.js';
import * as view from './view/view.js';

const Controller = ( function () {
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
            const filterEl = view.Module.elements.filter;
            if (e.target === filterEl) {
              // Валидация ввода пользователя 
              const isValid = model.Module.validateInput(view.Module.elements.filter, { minLength : 1, maxLength : 30});
              if (isValid) view.Module.doFilter(e, isValid);  // Запустим ф-цию фильтра
            }
    }, // запускает ф-цию фильтрации
    [EVENT_TYPES.SUBMIT] : (e) => {
            e.preventDefault(); // Отменяем станд. поведение
            
            view.Module.changeTitle();    // Проверим список задач. По результату сменим заголовок

            const input = view.Module.getInput(view.Module.elements.addForm); // Получим Input
            const isValid = model.Module.validateInput(input);  // Проверим текст пользователя из формы 

            if( !isValid ) return 'Ошибка, данные не получены';   // Если проверки не пройдена - return


            const text = input.value;  // Если текст ок - запишем ввод в переменную
            const taskData = model.Module.createTaskData(text);  // Создадим объект задачи 
            const dataExist = isDataCreated(taskData); // Проверим, создан ли объект данных задачи

            // Если данные получены - запускаем ф-цию add()
            if (dataExist) {
              view.Module.taskManager.add({...taskData});
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
    view.Module.elements.filter.addEventListener(EVENT_TYPES.KEYUP, (e) => handleEvent(EVENT_TYPES.KEYUP, e));

    // Слушаем submit, запускаем ф-цию добавления задачи
    view.Module.elements.addForm.addEventListener(EVENT_TYPES.SUBMIT, (e) => handleEvent(EVENT_TYPES.SUBMIT, e));

    // Слушаем click списка задач, запускаем ф-цию обработки задачи
    view.Module.elements.tasksList.addEventListener(EVENT_TYPES.CLICK, (e) => handleEvent(EVENT_TYPES.CLICK, e));
  }

  // ::: Обработка задач :::
  const taskHandling = function (e) {
    // Если клик по кнопке 'delete' - удаляем задачу
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'delete') {
      let removedTask = view.Module.taskManager.remove(e); // удаляем задачу со страницы
      model.Module.removeTaskData(removedTask); // удаляем данные задачи из объекта

      // Сменим заголовок
      view.Module.changeTitle();
    }

    // Если клик по кнопке 'edit' - редактируем задачу
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'edit') {
      // Получим id текущей задачи
      const taskID = view.Module.getTaskID(e);

      // Получим данные задачи 
      const taskData = model.Module.findTask(taskID);

      // Кнопки на замену
      const buttonTypes = ['cancel', 'save'];
    
      // Запустим функцию редактирования, передадим копию объекта данных и кнопки на замену
      view.Module.taskManager.edit({...taskData, buttonTypes}, e);
    }

    // Если клик по кнопке 'cancel' - отмена редактирования задачи
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'cancel') {
      // Получим id текущей задачи
      const taskID = view.Module.getTaskID(e);

      // Получим данные по задаче из модели
      const updatedTaskData = model.Module.findTask(taskID);

      // Запустим функцию сохаранения, передадим копию объекта данных (кнопки по умолч)
      view.Module.taskManager.cancel({...updatedTaskData}, e);
    }

    // Если клик по кнопке 'save' - сохраняем задачу
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'save') {
      // Получим id текущей задачи
      const id = view.Module.getTaskID(e);

      // Получаем шаблон задачи
      const task = view.Module.getParent(e, 'li'); 

      // Получим Input
      const input = view.Module.getInput(task);

      // Проверим текст пользователяи запишем резул-т в переменную
      const isValid = model.Module.validateInput(input);

      if ( ! isValid ) return 'Ошибка сохранения. Проверьте данные';

      // Запишем в переменную, если с текстом всё ок
      const text = view.Module.getInput(task).value; 

      // Обновим данные задачи в её объекте 
      model.Module.updateTaskData({id, text});

      // Получим данные по задаче из модели
      const updatedTaskData = model.Module.findTask(id);

      // Запустим функцию сохарнения, передадим новые данные по задаче
      view.Module.taskManager.save({...updatedTaskData}, e);
    }

    // // Прослушивание события инпута для ввода новой задачи. Если после уведомления он снова в фокусе - скрыть уведомление
    // view.Module.elements.newTaskInput.onfocus = function() {
    //   // Скрыть уведомление об ошибке
    //   if (view.Module.elements.addForm.nextElementSibling.classList.contains('alert-danger')) {
    //     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    //     view.Module.elements.addForm.nextElementSibling.remove();
    //   }

    //   // Скрыть уведомление об успехе
    //   if (view.Module.elements.addForm.nextElementSibling.classList.contains('alert-success')) {
    //     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    //     view.Module.elements.addForm.nextElementSibling.remove();
    //   }
    // };
  };

  const init = function () {
    view.Module.changeTitle (); // При загрузке страницы изменяем заголовок, если список задач пуст

    // Запускаем прослушивание событий
    startEventListeners();
  }

  return { init }
  }) ();

  Controller.init();


