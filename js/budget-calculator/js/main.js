// Data
const budget = [];

const form = document.querySelector('#form');  // Найдем форму
const type = form.querySelector('#type');     // Найдём селект в форме
const title = form.querySelector('#title');     // Найдём инпут в форме
const value = form.querySelector('#value');
const incomesList = document.querySelector('#incomes-list');
const expensesList = document.querySelector('#expenses-list');
// const budgetTable = document.querySelector('#budget-table'); // Найдем секцию с задачами
const budgetList = document.querySelectorAll('[data-list]'); // Найдем секции с задачами

const header = document.querySelector('header');
const budgetElement = header.querySelector('#budget');
const totalIncomeElement = header.querySelector('#total-income');
const totalExpenceElement = header.querySelector('#total-expense');
const percentsWrapper = header.querySelector('#expense-percents-wrapper');

const monthElement = header.querySelector('#month');
const yearElement = header.querySelector('#year');



// Функции 
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
}

const insertTestData = function () {
  const testData = [
    {type : 'inc', title : 'Зарплата', value : 1000},
    {type : 'inc', title : 'Премия', value : 1000},
    {type : 'inc', title : 'Фриланс', value : 1000},
    {type : 'inc', title : 'Вклад', value : 1000},
    {type : 'exp', title : 'Продукты', value : 1000},
    {type : 'exp', title : 'Обед', value : 1000},
    {type : 'exp', title : 'Транспорт', value : 1000},
    {type : 'exp', title : 'Квартира', value : 1000}
  ];

  const randomIndex = getRandomInt(testData.length);
  const randomTestData = testData[randomIndex];
  
  type.value = randomTestData['type'];
  title.value = randomTestData['title'];
  value.value = randomTestData['value'];
}

// Функция очищает поля формы
const clearForm = function () {
  form.reset();
}

// Считаем бюджет
const calcBudget = function () {
  // Считаем общий доход
  const totalIncome = budget.reduce(function (total, element) {
    if ( element.type === 'inc') {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);

  // Считаем общий доход
  const totalExpense = budget.reduce(function (total, element) {
    if ( element.type === 'exp') {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);
  
  const totalBudget = totalIncome - totalExpense;

  let expensePercents = 0;

  if (totalIncome) {
    expensePercents = Math.round(totalExpense * 100 / totalIncome);
  }

  // budgetElement.innerHTML = totalBudget;
  budgetElement.innerHTML = priceFormatter.format(totalBudget);
  totalIncomeElement.innerHTML = '+ ' + priceFormatter.format(totalIncome);
  totalExpenceElement.innerHTML = '- ' + priceFormatter.format(totalExpense);

  if (expensePercents) {
    const badgeHtml = `<div class="badge">${expensePercents}%</div>`;
    percentsWrapper.innerHTML = badgeHtml;
  } else {
    percentsWrapper.innerHTML = '';
  }
}

const displayMonth = function () {
  const today = new Date();
  const todayYear = today.getFullYear();

  const timeFormatter = new Intl.DateTimeFormat('ru-Ru', {
    month : 'long'
  })
  const todayMonth = timeFormatter.format(today);

  monthElement.innerHTML = todayMonth;
  yearElement.innerHTML = todayYear;
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
    const recordHtml = `
          <li class="budget-list__item item item--income" data-id=${record.id}>
            <div class="item__title">${record.title}</div>
            <div class="item__right">
                <div class="item__amount">+ ${priceFormatter.format(record.value)}</div>
                <button class="item__remove" data-delete>
                  <img src="./img/circle-green.svg" alt="delete" />
                </button>
            </div>
          </li>
    `;

    incomesList.insertAdjacentHTML('afterbegin', recordHtml);
  }

  if (record.type === 'exp') {
    const recordHtml = `
      <li class="budget-list__item item item--expense" data-id=${record.id}>
          <div class="item__title">${record.title}</div>
          <div class="item__right">
              <div class="item__amount">- ${priceFormatter.format(record.value)}</div>
              <button class="item__remove" data-delete>
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
          </div>
      </li>
    `;

    expensesList.insertAdjacentHTML('afterbegin', recordHtml);
  }

   
  calcBudget(); // Обновим бюджет
  clearForm();   // Очистим поля формы
  insertTestData();   // Заполним форму новыми данными

 
});


// Удаление записи
budgetList.forEach(list => {
  list.addEventListener('click', function (e) {
    console.log('click');
    const buttonDelete = e.target.closest('[data-delete]');

    if (buttonDelete) {
      const recordParent = buttonDelete.closest('li.budget-list__item');
      const id = parseInt(recordParent.dataset.id);

      const index = budget.findIndex(function (element) {
        console.log(element);
        console.log(buttonDelete);
        console.log(element.id);
      
        return id === element.id;
      });
      
      budget.splice(index, 1); // Удаляем из массива 
      recordParent.remove(); // Удаляем со страницы

       // Обновим бюджет
      calcBudget();
    }
  });
});
