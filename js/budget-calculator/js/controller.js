import * as view from './view/view.js';

// Data (array with objs)
const budget = [];

// При загрузке страницы: обновим месяц > заполним форму > обновим бюджет
displayMonth(); 
insertTestData();
calcBudget(budget);

// Добавим прослушивание события submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Проверяем массив инпутов с введёнными данными
  let isValid = validateInput( view.elements.form, [view.elements.formElements.title, view.elements.formElements.value]);
  if (isValid === false) return;

  // Рассчитаем id записи, (array, startNumber)
  let id = calcArrayId(budget, 1); 

  // Добавляем запись за страницу (array, obj, int)
  displayRecord(budget, view.elements.formElements, id); 


  // Вызовем ф-цию подсчета записей и запишем объект с новыми знач-ми в total
  let total = calcValuesTtl(budget);     


  // Обновим данные бюджета > очистим форму > заполним форму новыми данными
  view.calcBudget(total); 
  clearForm(isValid);   
  insertTestData();   
});

// Удаление записи
Object.values(recordsLists).forEach(list => {
  list.addEventListener('click', function (e) {
    // Найдём кнопку 'delete' по атрибуту 'data-delete'
    const buttonDelete = e.target.closest('[data-delete]');

    // Если клик был по этой кнопке
    if (buttonDelete) {
      // Найдём родительский элем. Li
      const recordParent = buttonDelete.closest('li.budget-list__item');

      // Запишем в переменную id элемента Li
      const id = parseInt(recordParent.dataset.id, 10);

      // В массиве budget найдём индекс записи, в кот. id равен id элемента Li 
      const index = budget.findIndex(function (element) {
        return id === element.id;
      });
      
      budget.splice(index, 1); // Удаляем из массива 
      recordParent.remove(); // Удаляем со страницы

       // Обновим бюджет
      calcBudget(budget);
    }
  });
});
