import * as model from './model/model.js';
import * as view from './view/view.js';

const Controller = ( function () {
  // Ф-ция проверяем, получены ли данные от модели
  const isData = function (data) {
    const receivedData = data;

    if (receivedData !== undefined && receivedData !== null) return true;

    return false;
  }

  // Объект событий
  const EVENT_TYPES = {
    CLICK : 'click',
    KEYUP : 'keyup'
  }

  // Типы событий и их методы 
  const eventHandlers = {
    click : (e) => {console.log('Clicked: ', e.target);},
    keyup : (e) => {
      const filterEl = view.Module.elements.filter;
      if (e.target === filterEl) {
        // Валидация ввода пользователя 
        const isValid = model.Module.validateInput(view.Module.elements.filter, { minLength : 1, maxLength : 30});
        if (isValid) view.Module.doFilter(e, isValid);  // Запустим ф-цию фильтра
      }
    }
  }

  // Ф-ция запускает метод евента, еслт он найден в объекте eventHandlers;
  const handleEvent = function (type, event) {
    if (eventHandlers[type]) {
      eventHandlers[type](event);
    }
  }

  const startEventListeners = function () {
    // Слушаем keyup поля фильтра, запускаем ф-цию фильтра
    view.Module.elements.filter.addEventListener(EVENT_TYPES.KEYUP, (e) => handleEvent(EVENT_TYPES.KEYUP, e));

    // Отмена стандарт. поведение формы - по нажатию на submit страница не будет обновляться
    view.Module.elements.addForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Проверили список задач. По результату сменили заголовок списка
      view.Module.changeTitle();

      // Получим Input
      const input = view.Module.getInput(view.Module.elements.addForm);

      // Проверим текст пользователя из формы 
      const isValid = model.Module.validateInput(input);

      // Если проверки не пройдена - остновим програму
      if( !isValid ) return 'Ошибка, данные не получены';

      // Запишем в переменную, если с текстом всё ок
      const userText = view.Module.getInput(view.Module.elements.addForm).value; 

      // Создадим объект задачи 
      const taskData = model.Module.createTaskData(userText); 

      const dataExist = isData(taskData);

      // Если данные получены - запускаем функцию add()
      dataExist === true ? view.Module.add({...taskData}) : console.log('Невозможно добавить задачу. Попробуйте ещё раз');
    });

    // Добавляем прослушивание контейнеру с задачами, запускаем функцию обработки задач
    view.Module.elements.mainContainer.addEventListener('click', taskHandling);
  }

  // ::: Обработка задач :::
  const taskHandling = function (e) {
    // Если клик по кнопке 'delete' - удаляем задачу
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'delete') {
      let removedTask = view.Module.remove(e); // удаляем задачу со страницы
      model.Module.removeTaskData(removedTask); // удаляем данные задачи из объекта

      // Сменим заголовок
      view.Module.changeTitle();
    }

    // Если клик по кнопке 'edit' - редактируем задачу
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'edit') {
      // Получим id текущей задачи
      const taskID = view.Module.getTaskID(e);
  console.log(taskID);

      // Получим данные задачи 
      const taskData = model.Module.findTask(taskID);
      console.log(taskData);

      // Кнопки на замену
      const buttonTypes = ['cancel', 'save'];
    
      // Запустим функцию редактирования, передадим копию объекта данных и кнопки на замену
      view.Module.edit({...taskData, buttonTypes}, e);
    }

    // Если клик по кнопке 'cancel' - отмена редактирования задачи
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'cancel') {
      // Получим id текущей задачи
      const taskID = view.Module.getTaskID(e);

      // Получим данные по задаче из модели
      const updatedTaskData = model.Module.findTask(taskID);

      // Запустим функцию сохаранения, передадим копию объекта данных (кнопки по умолч)
      view.Module.cancel({...updatedTaskData}, e);
    }

    // Если клик по кнопке 'save' - сохраняем задачу
    if (e.target.getAttribute("data-action") && e.target.getAttribute("data-action") === 'save') {
      // Получим id текущей задачи
      const id = view.Module.getTaskID(e);
  console.log(id);

      // Получаем шаблон задачи
      const task = view.Module.getParent(e, 'li'); 
      console.log(task);

      // Получим Input
      const input = view.Module.getInput(task);

      // Проверим текст пользователяи запишем резул-т в переменную
      const isValid = model.Module.validateInput(input);
      console.log(isValid);

      if ( ! isValid ) return 'Ошибка сохранения. Проверьте данные';

      // Запишем в переменную, если с текстом всё ок
      const text = view.Module.getInput(task).value; 
      console.log(text);

      // Обновим данные задачи в её объекте 
      model.Module.updateTaskData({id, text});

      // Получим данные по задаче из модели
      const updatedTaskData = model.Module.findTask(id);

      // Запустим функцию сохарнения, передадим новые данные по задаче
      view.Module.save({...updatedTaskData}, e);
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


