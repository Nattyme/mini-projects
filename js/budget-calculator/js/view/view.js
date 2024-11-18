import { getRecordHtml } from './templates/templates.js';

// Объект DOM элементов страницы
const elements = {
  formEl : document.querySelector('#form'),

  form : {
    type  : document.querySelector('#type'),    // Найдём селект 
    title : document.querySelector('#title'),   // Найдём инпут названия 
    value : document.querySelector('#value')    // Найдём инпут значения 
  },

  recordsLists : {
    incomesList : document.querySelector('#incomes-list'),
    expensesList : document.querySelector('#expenses-list')
  },

  header : {
    budget : document.querySelector('#budget'),
    income : document.querySelector('#total-income'),
    expence : document.querySelector('#total-expense'),
    percentsWrapper : document.querySelector('#expense-percents-wrapper'),
    month : document.querySelector('#month'),
    year : document.querySelector('#year')
  }
}

// Ф-ция удаляет рамку ошибку при фокусе
const removeErrorOnFocus = function (element, parent) {

  // Слушаем событие 'focus' по форме 
  parent.addEventListener('focus', function (e) {

    // Если фокус на инпуте - удалим класс error
    if (e.target === element) { e.target.classList.remove('form__input--error'); }

  }, true);
}

// Ф-ция проверет введённые данные формы
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

// Ф-ция записывает данные флрмы в объект
const getFormValues = function () {
  const formValues = {
    type : elements.form.type.value,
    title : elements.form.title.value,
    value : elements.form.value.value 
  }
  return formValues;
}

// Ф-ция определяет тип списка с записями
const getRecordListType = function (type) {
  return type === 'inc' ? elements.recordsLists.incomesList : elements.recordsLists.expensesList;
}

const RecordHtml = function (recordValues, liClassMode, imgName) {
  this.values = recordValues;
  this.classMode = liClassMode;
  this.imgFolder = 'img';
  this.imgName = imgName;
  this.imgSrc = './' + this.imgFolder + '/' + this.imgName;
}

// Ф-ция добавляет HTML код записей
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

// Ф-ция отображает записи на странице
const displayRecord = function (record) {
  // Получим тип листа с записями
  let list = getRecordListType(record.type);

  // Добавим запись в нужный лист 
  insertRecordHtml(list, record);
}

// Ф-ция отображает бюджет на странице
const renderBudget = function ({income, expense, budget, expensePercents}) {

  // Покажем данные бюджета, дохода и расхода на странице
  elements.header.budget.innerHTML = priceFormatter.format(budget);
  elements.header.income.innerHTML = income > 0 ? '+ ' + priceFormatter.format(income) : priceFormatter.format(income);
  elements.header.expence.innerHTML = expense > 0 ? '- ' + priceFormatter.format(expense) : priceFormatter.format(expense);

  // Показываем бейдж в зав-ти от expensePercents
  elements.header.percentsWrapper.innerHTML = expensePercents ? `<div class="badge">${expensePercents}%</div>` : '';

}

// Ф-ция очищает форму и сбрасывает ошибки.
const clearForm = function (isValid) {
  elements.formEl.reset();

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

// Ф-ция отображает значения года и месяца на странице
const renderMonth = function ({todayMonth, todayYear}) {
  elements.header.month.innerHTML = todayMonth;
  elements.header.year.innerHTML = todayYear;
}

// Ф-ция отображает тестовые данные на странице
const renderTestData = function (randomTestData) {
  elements.form.type.value = randomTestData['type'];
  elements.form.title.value = randomTestData['title'];
  elements.form.value.value = randomTestData['value'];
}

// Ф-ция создает объект форматтера для чисел
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

const getButtonDelete = function (e) {
  return e.target.closest('[data-delete]');
}

const removeRecordHtml = function (buttonDelete) {
  const recordParent = buttonDelete.closest('li.budget-list__item');   // Найдём родительский элем. Li
  const id = recordParent.dataset.id;  //запишем id элем. li в перем
  console.log('view');
  console.log(id);
  recordParent.remove(id); // Удаляем со страницы
  
  return id; // Вернём id элемента Li
  // return parseInt(recordParent.dataset.id, 10);
}

export { elements, validateInput, displayRecord, renderBudget, clearForm, getFormValues, renderMonth, renderTestData, getButtonDelete, removeRecordHtml, priceFormatter };