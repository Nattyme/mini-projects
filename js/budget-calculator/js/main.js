// Data
const budget = [];

const form = document.querySelector('#form');  // Найдем форму
const type = form.querySelector('#type');     // Найдём селект в форме
const title = form.querySelector('#title');     // Найдём инпут в форме
const value = form.querySelector('#value');
const incomesList = document.querySelector('#incomes-list');

// Добавим прослушивание события submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  console.log(type.value);
  console.log(title.value);
  console.log(value.value);

  // Расчёт id
  let id = 1;
  if (budget.length > 0) {
    const lastElement = budget[budget.length - 1];
    const lastElemId = lastElement.id;
    id = lastElemId + 1;
  }

  // Формирует запись
  const record = {
    id: id,
    type : type.value,
    title : title.value,
    value : value.value
  }
  budget.push(record);

  // Показываем запись на странице
  if (record.type === 'inc') {
    const recordHtml = `
          <li class="budget-list__item item item--income" data-id=${record.id}>
            <div class="item__title">${record.title}</div>
            <div class="item__right">
                <div class="item__amount">+ ${record.value}</div>
                <button class="item__remove">
                  <img src="./img/circle-green.svg" alt="delete" />
                </button>
            </div>
          </li>
    `;

    incomesList.insertAdjacentHTML('afterbegin', recordHtml);
  }
  console.log(budget);
  
});