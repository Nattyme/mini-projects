// Data
const budget = [];


const form = document.querySelector('#form');  // Найдем форму
const type = form.querySelector('#type');     // Найдём селект в форме
const title = form.querySelector('#title');     // Найдём инпут в форме
const value = form.querySelector('#value');

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
  console.log(budget);
  
});