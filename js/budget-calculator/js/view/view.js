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

  headerTtlElements : {
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

// Создает объект форматтера для чисел
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

export { elements, validateInput, priceFormatter };