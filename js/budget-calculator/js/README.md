```js
/**
 * Массив для хранения записей бюджета.
 * @type {Array<Object>}
 */
const budget = [];

/**
 * Содержит элементы формы для ввода данных.
 * @type {Object}
 * @property {HTMLElement} type - Селект для выбора типа записи.
 * @property {HTMLElement} title - Поле для ввода названия записи.
 * @property {HTMLElement} value - Поле для ввода значения записи.
 */
const formElements = {
  type  : form.querySelector('#type'),
  title : form.querySelector('#title'),
  value : form.querySelector('#value')
};

/**
 * Содержит элементы списка для отображения доходов и расходов.
 * @type {Object}
 * @property {HTMLElement} incomesList - Список доходов.
 * @property {HTMLElement} expensesList - Список расходов.
 */
const recordsLists = {
  incomesList : document.querySelector('#incomes-list'),
  expensesList : document.querySelector('#expenses-list')
};

/**
 * Содержит элементы для отображения итоговых данных в шапке.
 * @type {Object}
 * @property {HTMLElement} budget - Элемент для отображения бюджета.
 * @property {HTMLElement} income - Элемент для отображения доходов.
 * @property {HTMLElement} expence - Элемент для отображения расходов.
 * @property {HTMLElement} percentsWrapper - Элемент для отображения процентов расходов.
 * @property {HTMLElement} month - Элемент для отображения текущего месяца.
 * @property {HTMLElement} year - Элемент для отображения текущего года.
 */
const headerTtlElements = {
  budget : header.querySelector('#budget'),
  income : header.querySelector('#total-income'),
  expence : header.querySelector('#total-expense'),
  percentsWrapper : header.querySelector('#expense-percents-wrapper'),
  month : header.querySelector('#month'),
  year : header.querySelector('#year')
};

/**
 * Обновляет текущий месяц и год на странице.
 * Вызывается при загрузке страницы.
 */
displayMonth();

/**
 * Заполняет форму тестовыми данными.
 * Вызывается при загрузке страницы.
 */
insertTestData();

/**
 * Рассчитывает и отображает текущий бюджет.
 * Вызывается при загрузке страницы.
 * @param {Array<Object>} budget - Массив с записями бюджета.
 */
calcBudget(budget);

/**
 * Обрабатывает отправку формы для добавления новой записи в бюджет.
 * @param {Event} e - Событие отправки формы.
 */
form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  let isValid = validateInput(form, [formElements.title, formElements.value]);
  
  if (isValid === false) return;
  
  let id = calcArrayId(budget, 1);
  
  displayRecord(budget, formElements, id);
  
  calcBudget(budget);
  clearForm(isValid);
  insertTestData();
});

/**
 * Обрабатывает удаление записи из списка бюджета.
 * Удаляет запись из массива и со страницы.
 */
Object.values(recordsLists).forEach(list => {
  list.addEventListener('click', function (e) {
    const buttonDelete = e.target.closest('[data-delete]');
    
    if (buttonDelete) {
      const recordParent = buttonDelete.closest('li.budget-list__item');
      const id = parseInt(recordParent.dataset.id, 10);
      
      const index = budget.findIndex(function (element) {
        return id === element.id;
      });
      
      budget.splice(index, 1);
      recordParent.remove();
      
      calcBudget(budget);
    }
  });
});
