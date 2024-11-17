// >>> Form function
/**
 * Вычисляет id для записи в массиве.
 * @param {Array} array - Массив данных.
 * @param {number} startId - Начальное значение id.
 * @returns {number} - Возвращает уникальный id для новой записи.
 */
const calcArrayId = function (array, startId) {
  let id;

  // Присвоим значение id в завис-ти от длинны массива
  if ( array.length === 0) {
    id = startId;
  } else {
    let lastElement = array[array.length - 1];
    id = Number(lastElement.id + 1);
  }

  return id;
}


/**
 * Генерирует случайное целое число от 0 до maxExclusive.
 * @param {number} maxExclusive - Максимальное значение (не включается).
 * @returns {number} - Случайное целое число.
 */
// Функция создаёт случайное число
const getRandomInt = function (maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

// Заполняет форму тестовыми данными.
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


/**
 * Вычисляет процент от суммы.
 * @param {number} ofWhat - Число, для которого рассчитывается процент.
 * @param {number} fromWhat - Число, от которого вычисляется процент.
 * @returns {number} - Процент от суммы.
 */
const calcPercent = function (ofWhat, fromWhat) {
  // Если полуен элем., от кот. нужно посчитать % - считаем %
  return fromWhat ? Math.round(ofWhat * 100 / fromWhat) : 0;
}


/**
 * Подсчитывает суммы доходов и расходов.
 * @param {Array} budget - Массив с записями.
 * @returns {Object} - Объект с подсчитанными значениями дохода, расхода и бюджета.
 */
const calcValuesTtl = function (budget) {
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


/**
 * Очищает форму и сбрасывает ошибки.
 * @param {boolean} isValid - Флаг валидности формы.
 */
const clearForm = function (isValid) {
  form.reset();

  // Найдем ошибки (если есть)
  const errorsArray = document.querySelectorAll('.form__input--error');

  // Есть есть ошибки - сбросим
  if (errorsArray.length !== 0 ) {
    errorsArray.forEach(error => {
      error.classList.remove('form__input--error');
    });
  }

  // Вернём значение для isValid
  isValid = true;

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