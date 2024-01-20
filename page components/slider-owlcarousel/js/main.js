$(document).ready(function() {
    // $('#photo-carousel').owlCarousel({
    //     items: 1, 
    //     loop: true,
    //     nav: true,
    //     navText: ['Prev', 'Next']
    // });

    // Находим элемент в котором будет инициализирована карусель
    const photoCarousel = $('#photo-carousel');

    // Создаем карусель в элементе #photo-carousel
    photoCarousel.owlCarousel({
        items: 1, 
        loop: true,
        nav: true,
        navText: ['Prev', 'Next']
    });

    // Находим кнопки назад и вперед
    const btnPrev = $('.nav-btn-left');
    const btnNext = $('.nav-btn-right');

    btnPrev.click(function(){
        photoCarousel.trigger('prev.owl.carousel')
    });

    btnNext.click(function(){
        photoCarousel.trigger('next.owl.carousel')
    });
});

// $(document).ready(function() {
//     $('#photo-carousel-2').owlCarousel({
//         items: 1, 
//         loop: true,
//         nav: true,
//         navText: ['Previouse slide', 'Next slide']
//     });
// });