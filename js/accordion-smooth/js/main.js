const accordion = function (selector, showOnlyOne = false) {
  const accordionWrapper = document.querySelector(selector);
 
  const accordionBtns = accordionWrapper.querySelectorAll('.accordion__btn');
  // console.log(accordionBtns);

  accordionBtns.forEach(button => {
    const showContent = function (e) {
      e.preventDefault(e);

      const currentItem = button.closest('.accordion__item');
      const currentContent = currentItem.querySelector('.accordion__content');

      currentItem.classList.toggle('active');

      if (currentItem.classList.contains('active')) {
        currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
      } else {
        currentContent.style.maxHeight = 0;
      }
    }

    const showOnlyOneContent = function (e) {
      e.preventDefault(e);

      const currentItem = button.closest('.accordion__item');
      const currentContent = currentItem.querySelector('.accordion__content');

      if (currentItem.classList.contains('active')) {

        currentItem.classList.remove('active');
        currentContent.style.maxHeight = 0;
      } else {
        const accordionItems = accordionWrapper.querySelectorAll('.accordion__item');

        accordionItems.forEach(item => {
          item.classList.remove('active');
        })

        // Скрываем все открытые панели 
        const contentBlocks = document.querySelectorAll('.accordion__content');

        contentBlocks.forEach( block => {
          block.style.maxHeight = 0;
        })

        // Делаем активным текущий блок
        currentItem.classList.add('active');

        currentContent.style.maxHeight = currentContent.scrollHeight + 'px';


      }
    }
  
    if (showOnlyOne === false ) {
      button.addEventListener ('click', showContent);
    } else {
      button.addEventListener ('click', showOnlyOneContent);
    }

  });
}

accordion('#accordion-1', true);