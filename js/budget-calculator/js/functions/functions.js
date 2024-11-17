// Ф-цтия удаляет рамку error c input при фокусе
const removeErrorOnFocus = function (element, parent) {
  parent.addEventListener('focus', function (e) {
    console.log('hey');
    
    if(e.target !== element) return;
    e.target.classList.remove('form__input--error');
  }, true);
}

// Функция проверяет данные в input
const validateInput = function (form) {
 
  // Проверка на пустую строку названия
  if (title.value.trim() === '') {    
    title.classList.add('form__input--error');
    removeErrorOnFocus(title, form);
  } else {
    title.classList.remove('form__input--error');
    return true;
  }


  if ( value.value.trim() === '' || +value.value <= 0) {
    value.classList.add('form__input--error');
    removeErrorOnFocus(value, form);
  } else {
    title.classList.remove('form__input--error');
    return true;
  }


  
  // const isAllowed = function (elementArray) {
  //   const allowed = /^[a-zA-Z0-9\s]+$/; // Разрешены только буквы, цифры и пробелы

  //   elementArray.forEach(element => {
  //     regex.test(element);
  //     console.log(regex.test(element));
      
  //   });
  // }

  // isAllowed([title, value]);

  return false;
}

// Функция считает id для массива с записями
const calcArrayId = function (array, startId) {
  let id = array.length > 0 ? array[array.length - 1] + 1 : startId;
  return id;
}
 
// Функция создаёт случайное число
const getRandomInt = function (maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
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

// Создаёт объект с данными для записи 
const createObjRecord = function (domArray, id) {
  return {
      id: id,
      type : domArray.type.value,
      title : domArray.title.value.trim(),
      value : parseInt(domArray.value.value)
    }
}

// Ф-ция добавляет запись в нужный лист в зав-ти от ListType
const insertRecordHtml = function (listType, record) {

  // В зав-ти от типа листа выбираем иконку и модификатор класса для Li
  const icon = listType === recordsLists.incomesList ? 'circle-green.svg' : 'circle-red.svg';

  // В зав-ти от типа листа выбираем модификатор класса для Li
  const classMode = listType === recordsLists.incomesList ? 'income' : 'expense';

  // Создадим объект с данными записи и сохр. в recordHtml
  let recordData =  new RecordHtml(record, classMode, icon);

  // Подставим знач-я записи в шаблон и добавим на страницу
  listType.insertAdjacentHTML('afterbegin', getRecordHtml(recordData));
}

// Ф-ция определяет тип листа с записями
const getRecordListType = function (type) {
  return type === 'inc' ? recordsLists.incomesList : recordsLists.expensesList;
}

 // Функция добавляет запись за страницу
const displayRecord = function (budget, formElements) {
  let id = calcArrayId(budget, 1);
  let record = createObjRecord(formElements, id);

  // Добавим объект с данными записи в массив budget
  budget.push(record);

  // Получим тип листа с записями
  let list = getRecordListType(record.type);
  // Добавим запись в нужный лист 
  insertRecordHtml(list, record);
}

// Ф-ция складывает value записей в листе бюджета в зав-ти от типа
const calcValuesTtl = function (array) {
  // Запишем в объект total начальные значения income, expense
  const total = {
    income : 0,
    expense : 0
  }

  if ( array.length === 0) {
    total.budget = total.income - total.expense; // Если в массиве нет записей - бюджет = 0
    return total; 
  }

  array.forEach ( (element) => {
    if (element.type === 'inc') {total.income = total.income + element.value;}

    if (element.type === 'exp') {total.expense = total.expense + element.value;}

    return;
  });

  total.budget = total.income - total.expense; // Сразу посчитаем бюджет и запишем в объект total

  return total;
}

// Ф-ция считает процент от суммы
const calcPercent = function (ofWhat, fromWhat) {
  return fromWhat ? Math.round(ofWhat * 100 / fromWhat) : 0;
}

// Ф-ция считаем бюджет
const calcBudget = function (array) {
  // Вызовем ф-цию подсчета записей и запишем объект с новыми знач-ми в total
  let total = calcValuesTtl(array);     
  
  // Посчитаем процент total.expense
  let expensePercents = calcPercent(total.expense, total.income); 
 
  headerTtlElements.budget.innerHTML = priceFormatter.format(total.budget);
  headerTtlElements.income.innerHTML = total.income > 0 ? '+ ' + priceFormatter.format(total.income) : priceFormatter.format(total.income);
  headerTtlElements.expence.innerHTML = total.expense > 0 ? '- ' + priceFormatter.format(total.expense) : priceFormatter.format(total.expense);

  // Показываем бейдж в зав-ти от expensePercents
  headerTtlElements.percentsWrapper.innerHTML = expensePercents ? `<div class="badge">${expensePercents}%</div>` : '';

}

// Функция показывает месяц и год
const displayMonth = function () {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = timeFormatter.format(today);

  // Покажем значения года и месяца на странице
  headerTtlElements.month.innerHTML = todayMonth;
  headerTtlElements.year.innerHTML = todayYear;
}