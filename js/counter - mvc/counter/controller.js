import model from './model.js';
import view from './view.js';

const btnGroup = document.querySelector('.btn-group');
const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const btnReset = document.querySelector('#btnReset');

view.updateCounter(model.counter);

btnGroup.addEventListener('click', function (e) {
  if (e.target === btnPlus) {
    model.increase();
  } 

  if (e.target === btnMinus) {
    model.decrease();
  }

  if (e.target === btnReset) {
    model.reset();
  }
 
  view.updateCounter(model.counter);
});
