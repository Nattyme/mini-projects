// БД (array with objs)
const budget = [];

// Ф-ция создаёт случайное число
const getRandomInt = function (maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
};

// Ф-ция считает id для записи
const calcArrayId = function (startId) {
  let id;

  // Присвоим значение id в завис-ти от длинны массива
  if ( budget.length === 0) {
    id = startId;
  } else {
    let lastElement = budget[budget.length - 1];
    id = Number(lastElement.id + 1);
  }

  return id;
};

const createObjRecord = function (formValues, id) {
  const record = {
      id: id,
      type : formValues.type,
      title : formValues.title.trim(),
      value : parseInt(formValues.value.trim(), 10)
  }

  // Добавим объект с данными записи в массив budget
  budget.push(record);

  return record;
}

// Заполняет форму тестовыми данными.
const getTestData = function () {
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

  return randomTestData;
}

// Ф-ция находит в массиве budget индекс записи, в кот. id равен id элемента Li и удаляет ее
const removeRecord = function (id) {
 
  const index = budget.findIndex(function (element) {
    return parseInt(id) === element.id;
  });
    
  if (index !== -1) budget.splice(index, 1); // Удаляем из массива 
}

const calcPercent = function (ofWhat, fromWhat) {
  // Если полуен элем., от кот. нужно посчитать % - считаем %
  return fromWhat ? Math.round(ofWhat * 100 / fromWhat) : 0;
}

const calcBudgetTtl = function () {
  // Запишем в объект total начальные значения income, expense
  const total = {
    income : 0,
    expense : 0
  }

  // Если в массиве нет записей
  if ( budget.length === 0) {
    total.budget = 0; 
    total.income = 0;
    total.income = 0;
    return total; 
  }

  // Обойдём массив budget 
  budget.forEach ( (element) => {
    // Если элемент списка "Доход" - увелич. total.income
    if (element.type === 'inc') {total.income = total.income + element.value;}

     // Если элемент списка "Расход" - увелич. total.expense
    if (element.type === 'exp') {total.expense = total.expense + element.value;}

    return;
  });

  // Посчитаем бюджет и обновим в объекте total
  total.budget = total.income - total.expense; 

  // Посчитаем процент total.expense от total.income
  total.expensePercents = calcPercent(total.expense, total.income); 

  return total;
}

// Ф-ция  оздает объект форматтера для даты
const timeFormatter = new Intl.DateTimeFormat('ru-Ru', {
  month : 'long'
});

// Ф-ция вычисляет текущий месяц и год 
const getMonthAndYear = function () {
  const today = new Date();
  const todayMonth = timeFormatter.format(today);
  const todayYear = today.getFullYear();
 
  return {todayMonth, todayYear};
}


export { calcArrayId, getRandomInt, calcBudgetTtl, createObjRecord, getTestData, removeRecord, getMonthAndYear };
