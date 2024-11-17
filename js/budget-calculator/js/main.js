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

  // Проверяем массив ипутов с введёнными данными
  // let inputsArray = Object.values([title, value]);
  let isValid = validateInput( form, [title, value]);
  
  if (isValid === false) return;

  // Рассчитаем id записи, (array, startNumber)
  let id = calcArrayId(budget, 1); 

  // Добавляем запись за страницу (array, obj)
  displayRecord(budget, formElements, id); 

  // Обновим данные бюджета > очистим форму > заполним форму новыми данными
  calcBudget(budget); 
  clearForm();   
  insertTestData();   
});

// Удаление записи
Object.values(recordsLists).forEach(list => {
  list.addEventListener('click', function (e) {
    const buttonDelete = e.target.closest('[data-delete]');

    if (buttonDelete) {
      const recordParent = buttonDelete.closest('li.budget-list__item');
      const id = parseInt(recordParent.dataset.id, 10);

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
