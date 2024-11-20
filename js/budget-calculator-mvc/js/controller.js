import * as model from './model/model.js';
import * as view from './view/view.js';

// Ф-ция при загрузке страницы: обновит месяц > заполним форму данными > обновит бюджет
const init = function () {
  view.renderMonth( model.getMonthAndYear() );
  view.renderTestData( model.getTestData() );
  view.renderBudget( model.calcBudgetTtl() );

  addEventListeners(); // Запускает прослушивание событий по клику
}

// Ф-ция создаёт запись после отправки формы
const createRecord = function (e) {
  e.preventDefault();
  
  // Проверяем массив инпутов с введёнными данными
  let isValid = view.validateInput( [view.elements.form.title, view.elements.form.value]);
  if (isValid === false) return;

  // Получим данные формы
  const formValues = view.getFormValues();

  // Рассчитаем id записи, (startNumber)
  let id = model.calcArrayId(1); 

  const record = model.createObjRecord(formValues, id);

  // Добавляем запись за страницу (array, obj, int)
  view.displayRecord(record); 

  // Получим цвет границы фигуры в зав-ти от типа добавленной записи
  let strokeColor = view.getCanvasFigureColor(record.type);
  // Временно изменим цвет
  view.changeBlockColorTemporarily(strokeColor);


  // Обновляем бюджет и показываем на странице
  view.renderBudget( model.calcBudgetTtl() );
  view.renderMonth( model.getMonthAndYear() );

  // Очистим форму > заполним форму новыми данными
  view.clearForm(isValid);   
  view.renderTestData( model.getTestData() );
}

// Ф-ция удаляет запись после клика по кнопке "Удалить"
const deleteRecord = function (e) {
  // Найдём кнопку 'delete' по атрибуту 'data-delete'
  const buttonDelete = view.getButtonDelete(e);

   // Если клик был по этой кнопке
  if (buttonDelete ) {
    const id = view.removeRecordHtml(buttonDelete);
    model.removeRecord(id);

    // Обновляем бюджет и показываем на странице
    view.renderBudget( model.calcBudgetTtl() );
    
  }

  if (!buttonDelete) return;
}

// Ф-ция запускает прослушивание событий
const addEventListeners = function () {
  // Добавление записи
  view.elements.formEl.addEventListener('submit', createRecord);

  // Удаление записи
  Object.values(view.elements.recordsLists).forEach(list => {
    list.addEventListener('click', deleteRecord);
  });

  // Удаление рамки ошибки при фокусе на элементе
  view.elements.formEl.addEventListener('focus', function (e) {
    view.removeErrorOnFocus(e, [view.elements.form.title, view.elements.form.value]);
  }, true);

}

// Старт работы
init();


// Настройка размеров canvas
const canvasSize = view.setCanvasSize( {width : view.MAPSET.CANVAS_WIDTH, height : view.MAPSET.CANVAS_HEIGHT} );


// Ф-ция запускает tick , создаётся цикл
const start = function (tick, map) {
  // Получим случ. место появления блока
  let randomPlace = model.getRandomInt(4, (view.MAPSET.COLUMNS_NUMBERS - 4));
  // Получим случ. тип блока
  let randomBlockType = model.getRandomFrom(view.START_BLOCK_NUMBERS);

  view.MAPSET.block = view.getBlock(randomBlockType, `rgba(255, 255, 255, 0.5)`, randomPlace);
  view.MAPSET.block.x = randomPlace;

  // Запустим функцию тик, передадим timestamp, карту
  const wrappedTick = function (timestamp) {
    // Получим случ. место появления блока
    let randomPlace = model.getRandomInt(4, (view.MAPSET.COLUMNS_NUMBERS - 4));
    // Получим случ. тип блока
    let randomBlockType = model.getRandomFrom(view.START_BLOCK_NUMBERS);

    tick(timestamp, map, randomBlockType, randomPlace); // Передаём timestamp, карту, случ. тип блока и случ место появления
    requestAnimationFrame(wrappedTick); // Вызываем wrappedTick
  };
  requestAnimationFrame(wrappedTick); // Запускаем первый кадр
}

// // Получаем матрицу карты
view.MAPSET.map = view.getMap();

// // Сохраним в переменную
const map = view.MAPSET.map;

// // Отрисовываем состояние карты
view.drawState(map);

// // Запустим ф-цию старт, передаем ей на запуск ф-цию tick и массив действий
start(view.tick, map);
