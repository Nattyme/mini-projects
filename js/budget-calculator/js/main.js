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
  budgetElement : header.querySelector('#budget'),
  totalIncomeElement : header.querySelector('#total-income'),
  totalExpenceElement : header.querySelector('#total-expense'),
  percentsWrapper : header.querySelector('#expense-percents-wrapper'),
  monthElement : header.querySelector('#month'),
  yearElement : header.querySelector('#year')
}

displayMonth()
insertTestData();
calcBudget();

// Добавим прослушивание события submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if ( title.value.trim() === '') {    
    title.classList.add('form__input--error');
    title.addEventListener('focus', function () {
      title.classList.remove('form__input--error');
    });
    return;
  } else {
    title.classList.remove('form__input--error');
  }

  if ( value.value.trim() === '' || +value.value <= 0) {
    value.classList.add('form__input--error');
    value.addEventListener('focus', function () {
      value.classList.remove('form__input--error');
    });
    return;

  }
 

  // Расчёт id
  let id = 1;
  if (budget.length > 0) {
    const lastElement = budget[budget.length - 1];
    const lastElemId = lastElement.id;
    id = lastElemId + 1;
  }

  // Формирует запись
  const record = {
    id: id,
    type : type.value,
    title : title.value.trim(),
    value : parseInt(value.value)
  }

  budget.push(record);

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

   
  calcBudget(); // Обновим бюджет
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
      calcBudget();
    }
  });
});
