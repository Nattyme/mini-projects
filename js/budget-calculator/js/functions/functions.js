// Функция проверяет данные в input
const validateInput = function () {
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
}

// Функция считает id для массива с записями
const calcArrayId = function (array, startId) {
  let id = array.length > 0 ? array[array.length - 1] + 1 : startId;
  return id;
}
 
// Функция форматирует номер
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

// Функция создаёт случайное число
const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
}

// Функция заполняет фомру тестовыми данными
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
  
  formElements.type.value = randomTestData['type'];
  formElements.title.value = randomTestData['title'];
  formElements.value.value = randomTestData['value'];
}

// Функция очищает поля формы
const clearForm = function () {
  form.reset();
}

// Функция считаем бюджет
const calcBudget = function (array) {
  console.log(array);
  
  const calcValuesTtl = function (array) {
    const total = {
      income : 0,
      expense : 0
    }
    if ( array.length === 0) return total;
 
    let totals = array.reduce(function (totals, element) {
      if (element.type === 'inc') {
        totals.income = totals.income + element.value;
        console.log(totals);
      }

      if (element.type === 'exp') {
        totals.expense = totals.expense + element.value;
        console.log(totals);
      }
  
      return totals;
    }, total);

    return totals;
  }

  let total = calcValuesTtl(array);
  
  // const totalBudget = totalIncome - totalExpense;
  const totalBudget = total.income - total.expense;

  let expensePercents = 0;

  if (total.income) {
    expensePercents = Math.round(total.expense * 100 / total.income);
  }

  headerElements.budget.innerHTML = priceFormatter.format(totalBudget);
  headerElements.totalIncome.innerHTML = '+ ' + priceFormatter.format(total.income);
  headerElements.totalExpence.innerHTML = '- ' + priceFormatter.format(total.expense);

  if (expensePercents) {
    const badgeHtml = `<div class="badge">${expensePercents}%</div>`;
    headerElements.percentsWrapper.innerHTML = badgeHtml;
  } else {
    headerElements.percentsWrapper.innerHTML = '';
  }
}

// Функция показывает месяц
const displayMonth = function () {
  const today = new Date();
  const todayYear = today.getFullYear();

  const timeFormatter = new Intl.DateTimeFormat('ru-Ru', {
    month : 'long'
  })
  const todayMonth = timeFormatter.format(today);

  headerElements.month.innerHTML = todayMonth;
  headerElements.year.innerHTML = todayYear;
}