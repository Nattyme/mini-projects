const input = document.querySelector('#input');
const btnMinus = document.querySelector('btnMinus');
const btnReset = document.querySelector('btnReset');
const btnPlus = document.querySelector('btnPlus');

let counter = 0;
input.value = counter;

btnPlus.addEventListener('click', function () {
  counter = counter + 1;
  input.value = counter;
});

btnMinus.addEventListener('click', function () {
  counter = counter - 1;
  input.value = counter;
});

btnReset.addEventListener('click', function () {
  counter = 0;
  input.value = counter;
});