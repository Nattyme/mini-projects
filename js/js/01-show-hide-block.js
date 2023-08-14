const button = document.querySelector('#button');
const content = document.querySelector('#content');
console.log(button);
console.log(content);
button.addEventListener('click', function(){
    
    if(content.classList.toggle('content-hidden')) {
        button.textContent = "Открыть блок";
    } else {
        button.textContent = "Закрыть блок";
    }
     



    /*
    if(content.classList.contains('content-hidden')) {
        button.textContent = "Открыть блок";
    } else {
        button.textContent = "Закрыть блок";
    }
    */
});