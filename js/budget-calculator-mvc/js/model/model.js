import { getMonthAndYear } from './date_time/date_time.js';
import { getRandomInt, getRandomFrom, calcPercent } from './calc/calc.js';

// Данные
const budget = [];


// >>> Работа с записями <<<
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

// Ф-ция создаёт объект записи и добавляет в budget
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

// Ф-ция заполняет форму тестовыми данными.
const getTestData = function () {
  const testData = [
    {type : 'inc', title : 'Зарплата', value : 700},
    {type : 'inc', title : 'Премия', value : 600},
    {type : 'inc', title : 'Фриланс', value : 80},
    {type : 'inc', title : 'Вклад', value : 10},
    {type : 'exp', title : 'Продукты', value : 100},
    {type : 'exp', title : 'Обед', value : 15},
    {type : 'exp', title : 'Транспорт', value : 40},
    {type : 'exp', title : 'Квартира', value : 100}
  ];

  const randomIndex = getRandomInt(0, testData.length);
  const randomTestData = testData[randomIndex];

  return randomTestData;
}

// Ф-ция удаляет запись из массива budget 
const removeRecord = function (id) {
 
  const index = budget.findIndex(function (element) {
    return parseInt(id) === element.id;
  });
    
  if (index !== -1) budget.splice(index, 1); // Удаляем из массива 
}

// Ф-ция считает бюджет
const calcBudgetTtl = function () {
  // Запишем в объект total начальные значения income, expense, budget
  const total = {
    income : 0,
    expense : 0,
    budget : 0
  }

  // Обойдём массив budget 
  budget.forEach ( (element) => {
    // Если элемент списка "Доход" - увелич. total.income
    if (element.type === 'inc') {total.income = total.income + element.value;}

    // Если элемент списка "Расход" - увелич. total.expense
    if (element.type === 'exp') {total.expense = total.expense + element.value;}
  });

  // Посчитаем бюджет и обновим в объекте total
  total.budget = total.income - total.expense; 

  // Посчитаем процент total.expense от total.income
  total.expensePercents = calcPercent(total.expense, total.income); 

  return total;
}


export { calcArrayId, getRandomInt, getRandomFrom, calcBudgetTtl, createObjRecord, getTestData, removeRecord, getMonthAndYear };
