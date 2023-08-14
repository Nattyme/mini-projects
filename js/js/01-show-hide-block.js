let btn = document.querySelector('#button');
let card = document.querySelector('.card');
console.log(btn);
console.log(card);
btn.addEventListener('click', function(){
    card.classList.remove('content-hidden');
});