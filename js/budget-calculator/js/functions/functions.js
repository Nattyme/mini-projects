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

  headerElements.budgetElement.innerHTML = priceFormatter.format(totalBudget);
  headerElements.totalIncomeElement.innerHTML = '+ ' + priceFormatter.format(totalIncome);
  headerElements.totalExpenceElement.innerHTML = '- ' + priceFormatter.format(totalExpense);

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

  headerElements.monthElement.innerHTML = todayMonth;
  headerElements.yearElement.innerHTML = todayYear;
}