import { priceFormatter, RecordHtml } from './constructor/constructor.js';
import { removeErrorOnFocus, validateInput } from './UI/validate.js';
import { getButtonDelete } from './UI/buttons.js';
import { getRecordHtml } from './UI/templates.js';
import { getFormValues, clearForm } from './UI/form.js';
import { displayRecord, removeRecordHtml } from './UI/lists.js';
import { MAPSET, canvas, clearCanvas, drawField, drawBlock, getMap, drawState, setCanvasSize, getBlock, tick, getField, getCanvasFigureColor, setField, changeBlockColorTemporarily} from './animation/tetris.js';

// Объект с переменными DOM элементов страницы
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

// Ф-ция отображает бюджет на странице
const renderBudget = function ({income, expense, budget, expensePercents}) {

  // Покажем данные бюджета, дохода и расхода на странице
  elements.header.budget.innerHTML = priceFormatter.format(budget);
  elements.header.income.innerHTML = income > 0 ? '+ ' + priceFormatter.format(income) : priceFormatter.format(income);
  elements.header.expence.innerHTML = expense > 0 ? '- ' + priceFormatter.format(expense) : priceFormatter.format(expense);

  // Показываем бейдж в зав-ти от expensePercents
  elements.header.percentsWrapper.innerHTML = expensePercents ? `<div class="badge">${expensePercents}%</div>` : '';

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


export { elements, MAPSET, canvas, elements as tetrisEl, getCanvasFigureColor, validateInput, removeErrorOnFocus, displayRecord, renderBudget, clearForm, getFormValues, renderMonth, renderTestData, getButtonDelete, removeRecordHtml, RecordHtml, getRecordHtml, priceFormatter, clearCanvas, drawField, drawBlock, getMap, drawState, setCanvasSize, getBlock, tick, getField, setField, changeBlockColorTemporarily};