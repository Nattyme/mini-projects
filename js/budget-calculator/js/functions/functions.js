// >> Validate
/**
 * Удаляет класс ошибки с элемента при получении фокуса.
 * @param {HTMLElement} element - Элемент формы, с которого удаляется класс ошибки.
 * @param {HTMLElement} parent - Родительский элемент формы для обработки события focus.
 */
const removeErrorOnFocus = function (element, parent) {

  // Слушаем событие 'focus' по форме 
  parent.addEventListener('focus', function (e) {

    // Если фокус на инпуте - удалим класс error
    if (e.target === element) { e.target.classList.remove('form__input--error'); }

  }, true);
}

/** 
 ** Проверяет валидность данных в массиве input.
 * @param {HTMLFormElement} form - Форма, содержащая инпуты.
 * @param {HTMLElement[]} inputArray - Массив инпутов для валидации.
 * @returns {boolean} - Возвращает true, если все инпуты валидны, иначе false.
 */
const validateInput = function (form, inputArray) {
  // Зададим флаг для валидации
  let isValid = true;
  const toggleErrorDisplay = function (input, form) {
    input.classList.add('form__input--error');
    removeErrorOnFocus(input, form);
  }

  inputArray.forEach(input => {
  
     // Проверка на пустую строку. Сменим флаг isValid в случае ошибки
    if (input.value.trim() === '') {    
      toggleErrorDisplay(input, form);
      isValid = false;
    } else {
      input.classList.remove('form__input--error');
    }

    // Если поле инпута заполнено
    if (input.value.trim() !== '' && input.type === 'text') {
      const allowed = /^[a-zA-Zа-яА-Я\s,.\?!;:"'()&+\-=\\]+$/; // Разрешены только буквы и несколько символов

      if (allowed.test(input.value) === false) {
        toggleErrorDisplay(input, form);
        isValid = false;
      }

    }

    // Если поле Input для ввода цифр, то доп. проверка
    if (input.type === 'number') {
      // Явно преобразуем в число с основ. 10
      const numberValue = parseInt(input.value.trim(), 10);
      if (isNaN(numberValue) || numberValue <= 0 || numberValue === Infinity || numberValue === - Infinity) {
        toggleErrorDisplay(input, form);
        isValid = false;
      }
    } 

  
  });

  return isValid;
}




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




// >>> Record functions
/**
 * Создаёт объект с данными для записи.
 * @param {Object} domArray - Массив элементов DOM формы.
 * @param {number} id - Уникальный id записи.
 * @returns {Object} - Объект с данными записи.
 */
const createObjRecord = function (domArray, id) {
  return {
      id: id,
      type : domArray.type.value,
      title : domArray.title.value.trim(),
      value : parseInt(domArray.value.value.trim(), 10)
    }
}

/**
 * Вставляет запись в нужный список в зависимости от типа.
 * @param {HTMLElement} listType - Тип списка (доход или расход).
 * @param {Object} record - Объект с данными записи.
 */
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

/**
 * Определяет тип списка в зависимости от типа записи.
 * @param {string} type - Тип записи ('inc' или 'exp').
 * @returns {HTMLElement} - Возвращает соответствующий список.
 */
const getRecordListType = function (type) {
  return type === 'inc' ? recordsLists.incomesList : recordsLists.expensesList;
}


/**
 * Отображает запись на странице.
 * @param {Array} budget - Массив с записями.
 * @param {Object} formElements - Элементы формы.
 */
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




// >>> Calc functions
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

  return total;
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
 * Рассчитывает общий бюджет.
 * @param {Array} budget - Массив с записями.
 */
// Ф-ция считаем бюджет
const calcBudget = function (budget) {
  // Вызовем ф-цию подсчета записей и запишем объект с новыми знач-ми в total
  let total = calcValuesTtl(budget);     
  
  // Посчитаем процент total.expense от total.income
  let expensePercents = calcPercent(total.expense, total.income); 

  // Покажем данные бюджета, дохода и расхода на странице
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