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
  let isValid = view.validateInput( view.elements.formEl, [view.elements.form.title, view.elements.form.value]);
  if (isValid === false) return;

  // Получим данные формы
  const formValues = view.getFormValues();

  // Рассчитаем id записи, (startNumber)
  let id = model.calcArrayId(1); 

  const record = model.createObjRecord(formValues, id);

  // Добавляем запись за страницу (array, obj, int)
  view.displayRecord(record); 

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
}

const addEventListeners = function () {
  view.elements.formEl.addEventListener('submit', createRecord);

  Object.values(view.elements.recordsLists).forEach(list => {
    list.addEventListener('click', deleteRecord);
  });
}


// Старт работы
init();

