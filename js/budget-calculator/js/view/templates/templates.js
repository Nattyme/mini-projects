import { elements, validateInput, displayRecord, calcBudget, clearForm, getFormValues, renderMonth, renderTestData, priceFormatter } from '../view.js';

const getRecordHtml = function (recordValuesObj) {
  return `
          <li class="budget-list__item item item--${recordValuesObj.classMode}" data-id=${recordValuesObj.values.id}>
            <div class="item__title">${recordValuesObj.values.title}</div>
            <div class="item__right">
                <div class="item__amount">+ ${priceFormatter.format(recordValuesObj.values.value)}</div>
                <button class="item__remove" data-delete>
                  <img src="${recordValuesObj.imgSrc}" alt="delete" />
                </button>
            </div>
          </li>
  `;
}

export {getRecordHtml} ;

