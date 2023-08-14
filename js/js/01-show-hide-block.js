const button = document.querySelector('#button');
const content = document.querySelector('#content');
console.log(button);
console.log(content);
button.addEventListener('click', function(){
    content.classList.toggle('content-hidden');
});