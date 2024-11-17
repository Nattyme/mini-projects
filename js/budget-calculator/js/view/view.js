import { getRecordHtml } from './templates/templates.js';

const elements = {
  form : document.querySelector('#form'),
  header : document.querySelector('header'),
  formElements : {
    type  : form.querySelector('#type'),    // Найдём селект 
    title : form.querySelector('#title'),   // Найдём инпут названия 
    value : form.querySelector('#value')    // Найдём инпут значения 
  },

  recordsLists : {
    incomesList : document.querySelector('#incomes-list'),
    expensesList : document.querySelector('#expenses-list')
  },

  header : {
  budget : header.querySelector('#budget'),
  income : header.querySelector('#total-income'),
  expence : header.querySelector('#total-expense'),
  percentsWrapper : header.querySelector('#expense-percents-wrapper'),
  month : header.querySelector('#month'),
  year : header.querySelector('#year')
  }
}

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
 * Определяет тип списка в зависимости от типа записи.
 * @param {string} type - Тип записи ('inc' или 'exp').
 * @returns {HTMLElement} - Возвращает соответствующий список.
 */
const getRecordListType = function (type) {
  return type === 'inc' ? elements.recordsLists.incomesList : elements.recordsLists.expensesList;
}



/**
 * Вставляет запись в нужный список в зависимости от типа.
 * @param {HTMLElement} listType - Тип списка (доход или расход).
 * @param {Object} record - Объект с данными записи.
 */
const insertRecordHtml = function (listType, record) {

  // В зав-ти от типа листа выбираем иконку и модификатор класса для Li
  const icon = listType === elements.recordsLists.incomesList ? 'circle-green.svg' : 'circle-red.svg';

  // В зав-ти от типа листа выбираем модификатор класса для Li
  const classMode = listType === elements.recordsLists.incomesList ? 'income' : 'expense';

  // Создадим объект с данными записи и сохр. в recordHtml
  let recordData =  new RecordHtml(record, classMode, icon);

  // Подставим знач-я записи в шаблон и добавим на страницу
  listType.insertAdjacentHTML('afterbegin', getRecordHtml(recordData));
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
  controller.budget.push(record);

  // Получим тип листа с записями
  let list = getRecordListType(record.type);
  // Добавим запись в нужный лист 
  insertRecordHtml(list, record);
}



// >>> Calc functions
/**
 * Рассчитывает общий бюджет.
 * @param {Array} budget - Массив с записями.
 */
// Ф-ция считаем бюджет
const calcBudget = function ({income, expense, budget, expensePercents}) {

  // Покажем данные бюджета, дохода и расхода на странице
  elements.header.budget.innerHTML = priceFormatter.format(budget);
  elements.header.income.innerHTML = income > 0 ? '+ ' + priceFormatter.format(income) : priceFormatter.format(income);
  elements.header.expence.innerHTML = expense > 0 ? '- ' + priceFormatter.format(expense) : priceFormatter.format(expense);

  // Показываем бейдж в зав-ти от expensePercents
  elements.header.percentsWrapper.innerHTML = expensePercents ? `<div class="badge">${expensePercents}%</div>` : '';

}





// Создает объект форматтера для чисел
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

export { elements, validateInput, priceFormatter };