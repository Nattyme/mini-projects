import * as model from './model/model.js';
import * as view from './view/view.js';



// При загрузке страницы: обновим месяц > заполним форму > обновим бюджет
model.displayMonth();
let data = model.insertTestData();
view.renderTestData(data);
// view.calcBudget(total);

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

  // Вызовем ф-цию подсчета записей и запишем объект с новыми знач-ми в total
  // let total = model.calcValuesTtl(model.budget); 

  // view.renderMonth(todayMonth, todayYear);

  // Обновим данные бюджета > очистим форму > заполним форму новыми данными
  // view.calcBudget(total); 
  view.clearForm(isValid);   
  let randomTestData = model.insertTestData();
  view.renderTestData(randomTestData);
});

// Удаление записи
Object.values(view.elements.recordsLists).forEach(list => {
  list.addEventListener('click', function (e) {
    // Найдём кнопку 'delete' по атрибуту 'data-delete'
    const buttonDelete = view.getButtonDelete(e);

    // Если клик был по этой кнопке
    if (buttonDelete) {
      const id = view.removeRecordHtml(buttonDelete);
      model.removeRecord(id);
   
      // Обновим бюджет
      // model.calcBudget(budget);
    }
  });
});
