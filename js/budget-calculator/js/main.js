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

// Функции 
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
function clearForm () {
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
  console.log('totalInclome', totalIncome);

  // Считаем общий доход
  const totalExpense = budget.reduce(function (total, element) {
    if ( element.type === 'exp') {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);
  console.log('totalExpense', totalExpense);
  
  
}


insertTestData();

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
                <div class="item__amount">+ ${record.value}</div>
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
              <div class="item__amount">- ${record.value}</div>
              <button class="item__remove" data-delete>
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
          </div>
      </li>
    `;

    expensesList.insertAdjacentHTML('afterbegin', recordHtml);
  }

   // Обновим бюджет
   calcBudget();

  // Очистим поля формы
  clearForm();

  // Заполним форму новыми данными
  insertTestData();

 
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
