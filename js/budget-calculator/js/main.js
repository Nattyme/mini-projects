const budget = [];

// DOM elements
const form = document.querySelector('#form');  
const header = document.querySelector('header');
const formElements = {
  type : form.querySelector('#type'),     // Найдём селект в форме
  title : form.querySelector('#title'),   // Найдём инпут названия в форме
  value : form.querySelector('#value')    // Найдём инпут значения в форме
}
const recordsLists = {
  incomesList : document.querySelector('#incomes-list'),
  expensesList : document.querySelector('#expenses-list')
}
const headerElements = {
  budget : header.querySelector('#budget'),
  totalIncome : header.querySelector('#total-income'),
  totalExpence : header.querySelector('#total-expense'),
  percentsWrapper : header.querySelector('#expense-percents-wrapper'),
  month : header.querySelector('#month'),
  year : header.querySelector('#year')
}

displayMonth()
insertTestData();
calcBudget(budget);

// Добавим прослушивание события submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateInput();      // Проверим введенные данные

  let id = calcArrayId(budget, 1); // Рассчитаем id записи, (array, startNumber)

  // Объект записи
  const record = {
    id: id,
    type : type.value,
    title : title.value.trim(),
    value : parseInt(value.value)
  }

  budget.push(record);


// const displayRecord = function () {

// }
  // Показываем запись на странице
  if (record.type === 'inc') {
    let recordsIncome = new RecordHtml(record, 'income', 'circle-green.svg');
    const recordHtml = getRecordHtml(recordsIncome); 
    recordsLists.incomesList.insertAdjacentHTML('afterbegin', recordHtml);
  }

  if (record.type === 'exp') {
    let recordsExpense = new RecordHtml(record, 'expense', 'circle-red.svg');
    const recordHtml = getRecordHtml(recordsExpense); 
    recordsLists.expensesList.insertAdjacentHTML('afterbegin', recordHtml);
  }

   
  calcBudget(budget); // Обновим бюджет
  clearForm();   // Очистим поля формы
  insertTestData();   // Заполним форму новыми данными

 
});


// Удаление записи
[recordsLists.incomesList, recordsLists.expensesList].forEach(list => {
  list.addEventListener('click', function (e) {
    const buttonDelete = e.target.closest('[data-delete]');

    if (buttonDelete) {
      const recordParent = buttonDelete.closest('li.budget-list__item');
      const id = parseInt(recordParent.dataset.id);

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
