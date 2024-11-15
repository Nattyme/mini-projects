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
});