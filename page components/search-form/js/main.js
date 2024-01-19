const searchForm = document.querySelector('.search');
const searchButton = document.querySelector('.search__button');

searchButton.addEventListener('click', function(e){
    e.preventDefault();
    searchForm.classList.toggle('search--visible');
});