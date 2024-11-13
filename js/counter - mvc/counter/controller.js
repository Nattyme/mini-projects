const btnMinus = document.querySelector('btnMinus');
const btnReset = document.querySelector('btnReset');
const btnPlus = document.querySelector('btnPlus');

updateCounter(counter);

btnPlus.addEventListener('click', function () {
  increase();
  updateCounter(counter);
});

btnPlus.addEventListener('click', function () {
  decrease();
  updateCounter(counter);
});

btnPlus.addEventListener('click', function () {
  reset();
  updateCounter(counter);
});

