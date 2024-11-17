import * as view from './view/view.js';

// Data (array with objs)
const budget = [];

// DOM elements
const form = document.querySelector('#form');  
const header = document.querySelector('header');
const formElements = {
  type  : form.querySelector('#type'),    // Найдём селект 
  title : form.querySelector('#title'),   // Найдём инпут названия 
  value : form.querySelector('#value')    // Найдём инпут значения 
}
const recordsLists = {
  incomesList : document.querySelector('#incomes-list'),
  expensesList : document.querySelector('#expenses-list')
}
const headerTtlElements = {
  budget : header.querySelector('#budget'),
  income : header.querySelector('#total-income'),
  expence : header.querySelector('#total-expense'),
  percentsWrapper : header.querySelector('#expense-percents-wrapper'),
  month : header.querySelector('#month'),
  year : header.querySelector('#year')
}

// При загрузке страницы: обновим месяц > заполним форму > обновим бюджет
displayMonth(); 
insertTestData();
calcBudget(budget);

// Добавим прослушивание события submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Проверяем массив инпутов с введёнными данными
  let isValid = validateInput( form, [formElements.title, formElements.value]);
  
  if (isValid === false) return;

  // Рассчитаем id записи, (array, startNumber)
  let id = calcArrayId(budget, 1); 

  // Добавляем запись за страницу (array, obj, int)
  displayRecord(budget, formElements, id); 

  // Обновим данные бюджета > очистим форму > заполним форму новыми данными
  calcBudget(budget); 
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
