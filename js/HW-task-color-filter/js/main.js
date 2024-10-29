// При первом открытии страницы ни один цвет не выбран. Как можно добавить?

// Находим контейнер с кнопками цветов
const colorsWrapper = document.querySelector('#colorsSelector'); 

// Найдём контейнер для фото
const carImageWrapper = document.querySelector('#imgHolder');

// Создаём массив для доступных машин
const carPark = [];

// Создаем массив для доступных цветов
const colors = [];

// Создаем конструктор для инфо о цветах
const GetColor = function (nameEng, classColor, mode) {
  this.nameEng = nameEng,
  this.classColor = classColor,
  this.mode = mode
}

// Создаём конструктор для инфо о машине
const CreateCar = function (model, color,  imgName, imgSrc) {
  this.model = model,
  this.color = color,
  this.imgName = imgName;
  this.imgSrc = imgSrc;
  this.imgPath = this.imgSrc + this.imgName;
}

// Функция обходим массив с цветами и показывает кнопки на странице
const colorsButtonsCreate = function (colors) {

  // Обходим массив объектов с цветами и показываем на странице
  colors.forEach( color => {

    // Шаблон для кнопки с цветом
    const colorButtonTemplate = `
      <div class="colorItem ${color.classColor}" data-color=${color.nameEng}></div>  
    `;

    // Вставляем фото на страницу 
    colorsWrapper.insertAdjacentHTML('afterbegin', colorButtonTemplate);

  });

}

// Функция запускает события после клика на кнопку
const colorButtonClicked = function (e) {
  
  // Если кнопка найдена - записываем в переменную
  let targetButton = e.target;
  
  // Запишем в переменную коллекцию с цветами
  const colorsPack = colorsWrapper.querySelectorAll('.colorItem'); 

  // Ловим клик по кнопке, проверяем, что у неё есть атрибут 'data-color'
  if (targetButton.hasAttribute('data-color')) {
  
    // Пройдёмся по кнопкам, удалим атрибуты data-action и уберем активный класс. Зададим их по кнопке с кликом
    colorBtnChangeActive(targetButton,  colorsPack);

    // Если у кнопки data-active = 'active' - меняем фото машины
    carImageChange(targetButton);
    
  }

}

// Функция устанавливает, либо удаляет атрибут data-active и активные класс
const colorBtnChangeActive = function (targetButton,  colorsPack) {

  colorsPack.forEach(color => {
    // Обходим все кнопки и удаляем атрибут data-active 
    color.removeAttribute('data-active');

    // Удаляем класс актив. стиля
    color.classList.remove('colorItem--active');
  });

  // Если найденная кнопка - та, по кот. мы кликнули - устанавливаем атрибут data-active
  targetButton.setAttribute('data-active', '');

  // и добавляем класс актив. стиля
  targetButton.classList.add('colorItem--active');
}

// Функция добавялет фотографию в зав-ти от цвета кнопки по которой был клик
const carImageChange = function (targetButton) {

  if (targetButton.hasAttribute('data-active')) {

    // Очищаем конейнер с фото
    carImageWrapper.querySelector('img').remove();

    // Сохраняем цвет активной кнопки в переменную
    const targetButtonColor = targetButton.getAttribute('data-color');

    // В массиве carPark находим объект машины с нужным цветом. Сохраняем в переменную
    const carImgCurrent = carPark.find(car => car.color === targetButtonColor);

    // Шаблон для фото
    const imgCurrentTemplate = `
        <img src="${carImgCurrent.imgPath}" alt="${carImgCurrent.model}" />
    `;

    // В массиве цветов находим объект машины с нужным цветом. Сохраняем в переменную значение св-ва mode 
    let colorMode = colors.find(color => color.nameEng === targetButtonColor);
    colorMode = colorMode.mode;
    
    // Проверяем, если у цвета mode = dark - добавим темный фон 
    if (colorMode === 'dark') {
      carImageWrapper.classList.add('imgHolder--dark');
    } else {
      carImageWrapper.classList.remove('imgHolder--dark');
    }
    
    // Вставляем фото в контейнер
    carImageWrapper.insertAdjacentHTML('afterbegin', imgCurrentTemplate);

  }
}

// Функция выводит на страницу информацию о машине и фильтр цветов 
const displayCarsData = function () {

  // Показываем кнопки доступных цветов на странице. 
  colorsButtonsCreate(colors);

  // Прослушиванием клик по контейнеру с цветами
  colorsWrapper.addEventListener('click', function(e) {
    colorButtonClicked(e);
  });

}

// Создаём парк доступных машин
carPark.push(new CreateCar('Solaris', 'black', 'black.png', 'https://webcademy.ru/files/js2020/solaris/'));
carPark.push(new CreateCar('Solaris', 'blue', 'blue.png', 'https://webcademy.ru/files/js2020/solaris/'));
carPark.push(new CreateCar('Solaris', 'graphite', 'graphite.png', 'https://webcademy.ru/files/js2020/solaris/'));
carPark.push(new CreateCar('Solaris', 'orange', 'orange.png', 'https://webcademy.ru/files/js2020/solaris/'));
carPark.push(new CreateCar('Solaris', 'red', 'red.png', 'https://webcademy.ru/files/js2020/solaris/'));
carPark.push(new CreateCar('Solaris', 'white', 'white.png', 'https://webcademy.ru/files/js2020/solaris/'));
carPark.push(new CreateCar('Solaris', 'white-pure', 'white-pure.png', 'https://webcademy.ru/files/js2020/solaris/'));

// Создаем пак доступных цветов
colors.push(new GetColor('black', 'colorBlack', 'light'));
colors.push(new GetColor('blue', 'colorBlue', 'light'));
colors.push(new GetColor('graphite', 'colorGraphite', 'light'));
colors.push(new GetColor('orange', 'colorOrange', 'dark'));
colors.push(new GetColor('red', 'colorRed', 'dark'));
colors.push(new GetColor('white', 'colorWhite', 'dark'));
colors.push(new GetColor('white-pure', 'colorWhitePure', 'dark'));

 
// ::::: Вызываем функцию отображения полной инфо о машине. Передаём массив доступных цветов и парка автомобилей :::::
displayCarsData();

