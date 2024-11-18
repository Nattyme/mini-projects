import * as model from './model/model.js';
import * as view from './view/view.js';



// При загрузке страницы: обновим месяц > заполним форму > обновим бюджет
view.renderMonth( model.getMonthAndYear() );
view.renderTestData( model.getTestData() );

// Обновляем бюджет и показываем на странице
view.renderBudget( model.calcBudgetTtl() );

// Добавим прослушивание события submit
view.elements.formEl.addEventListener('submit', function (e) {
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
});

// Удаление записи
Object.values(view.elements.recordsLists).forEach(list => {
  list.addEventListener('click', function (e) {
    // Найдём кнопку 'delete' по атрибуту 'data-delete'
    const buttonDelete = view.getButtonDelete(e);

    // Если клик был по этой кнопке
    if (buttonDelete ) {
      const id = view.removeRecordHtml(buttonDelete);
      model.removeRecord(id);
   
      // Обновляем бюджет и показываем на странице
      view.renderBudget( model.calcBudgetTtl() );
    }
  });
});
