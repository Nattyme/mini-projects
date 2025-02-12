const backTopBtn = document.querySelector("#backtop");

/**** Кнопка перемещения наверх страницы *****/
backTopBtn.style.opacity = 0;

document.addEventListener('scroll', function(){
  if(window.scrollY > 500) {
      backTopBtn.style.opacity = 1;
  } else {
      backTopBtn.style.opacity = 0;
  }
});