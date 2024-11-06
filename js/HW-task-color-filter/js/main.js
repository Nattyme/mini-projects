// Находим контейнер с кнопками цветов
const colorsWrapper = document.querySelector('#colorsSelector'); 

// Находим контейнер для фото
const carImageWrapper = document.querySelector('#imgHolder');

// Объявляем массив для доступных машин
const carsPark = [];

// Объявляем массив для доступных цветов
const colors = [];

// Создаем конструктор c инфо о цветах
const GetColor = function (nameEng, classColor, mode = 'light') {
  this.nameEng = nameEng,
  this.classColor = classColor,
  this.mode = mode
}

// Создаём конструктор c инфо о машине
const CreateCar = function (model, color,  imgFileName, imgFolder, imgHost = 'https://webcademy.ru/') {
  this.model = model,
  this.color = color,
  this.imgFileName = imgFileName,
  this.imgFolder = imgFolder,
  this.imgHost = imgHost,
  this.imgPath = this.imgHost + this.imgFolder + this.imgFileName
}

// Дефолтный выбор для отображения фото и кнопки при первой загрузке
const makeDefaultChoice = function (colorsList) {

  const defaultChoice = colorsList[3];
    // Устанавливаем кнопке атрибут active
  defaultChoice.setAttribute('data-active', '');

  // и добавляем класс актив. стиля
  defaultChoice.classList.add('colorItem--active');

  // Добавляем фото
  carImageChange(defaultChoice);
}

// Функция обходит массив с цветами и показывает кнопки на странице
const colorsButtonsCreate = function (colorsArray) {

  // Обходим массив объектов с цветами и показываем на странице
  colorsArray.forEach( color => {

    // Шаблон для кнопки с цветом
    const colorButtonTemplate = `
      <div class="colorItem ${color.classColor}" data-color=${color.nameEng}></div>  
    `;

    // Вставляем фото на страницу 
    colorsWrapper.insertAdjacentHTML('afterbegin', colorButtonTemplate);
  });

  // Найдем коллекцию цветов
  const colorsList = colorsWrapper.querySelectorAll('.colorItem'); 
  makeDefaultChoice(colorsList);
}


// Функция запускает действия после клика на кнопку
const colorButtonClicked = function (e) {
  
  // Если кнопка найдена - записываем в переменную
  let targetButton = e.target;
  
  // Найдём и запишем в переменную коллекцию с цветами
  const colorsList = colorsWrapper.querySelectorAll('.colorItem'); 

  // Ловим клик по кнопке, проверяем, что у неё есть атрибут 'data-color'
  if (targetButton.hasAttribute('data-color')) {
  
    // Пройдёмся по кнопкам, удалим атрибуты data-action и уберем активный класс. Зададим их по кнопке с кликом
    colorBtnChangeActive(targetButton, colorsList);

    // Если у кнопки data-active = 'active' - меняем фото машины
    carImageChange(targetButton);
    
  }

}

// Функция устанавливает либо удаляет атрибут data-active и активный класс у кнопок. 
const colorBtnChangeActive = function (targetButton, colorsList) {

  colorsList.forEach(color => {
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

// Функция добавляет фотографию в зав-ти от цвета кнопки, по которой был клик
const carImageChange = function (targetButton) {

  if (targetButton.hasAttribute('data-active')) {

    // Очищаем конейнер с фото
    if(carImageWrapper.querySelector('img')) {
      carImageWrapper.querySelector('img').remove();
    }

    // Сохраняем цвет активной кнопки в переменную
    const targetButtonColor = targetButton.getAttribute('data-color');

    // В массиве carPark находим объект машины с нужным цветом. Сохраняем в переменную
    const carImgCurrent = carsPark.find(car => car.color === targetButtonColor);


    // Шаблон для фото
    const imgCurrentTemplate = `
        <img class="img-bg" src="${carImgCurrent.imgPath}" alt="${carImgCurrent.model}" />
    `;
    
    
    // Вставляем фото в контейнер
    carImageWrapper.insertAdjacentHTML('afterbegin', imgCurrentTemplate);
    
    // В массиве цветов находим объект машины с нужным цветом. Сохраняем в переменную значение св-ва mode 
    let colorMode = colors.find(color => color.nameEng === targetButtonColor);
    colorMode = colorMode.mode;

    // Проверяем, св-во mode у цвета и убираем, либо добавляем тёмный фон к фото
    if (colorMode === 'dark') {
      carImageWrapper.querySelector('img').classList.add('img-bg--dark');
    } else {
      carImageWrapper.querySelector('img').classList.remove('img-bg--dark');
    }


  }
}

// Функция выводит на страницу инфо о машине и фильтр цветов 
const displayCarsData = function (colorsArray) {
  // Показываем кнопки доступных цветов на странице. 
  colorsButtonsCreate(colorsArray);

  // Прослушиванием клик по контейнеру с цветами
  colorsWrapper.addEventListener('click',  colorButtonClicked);

}

// Наполняем массив доступных машин
carsPark.push(new CreateCar('Solaris', 'black', 'black.png', 'files/js2020/solaris/'));
carsPark.push(new CreateCar('Solaris', 'blue', 'blue.png', 'files/js2020/solaris/'));
carsPark.push(new CreateCar('Solaris', 'graphite', 'graphite.png', 'files/js2020/solaris/'));
carsPark.push(new CreateCar('Solaris', 'orange', 'orange.png', 'files/js2020/solaris/'));
carsPark.push(new CreateCar('Solaris', 'red', 'red.png', 'files/js2020/solaris/'));
carsPark.push(new CreateCar('Solaris', 'white', 'white.png', 'files/js2020/solaris/'));
carsPark.push(new CreateCar('Solaris', 'white-pure', 'white-pure.png', 'files/js2020/solaris/'));

// Наполняем массив доступных цветов
colors.push(new GetColor('graphite', 'colorGraphite'));
colors.push(new GetColor('orange', 'colorOrange', 'dark'));
colors.push(new GetColor('white-pure', 'colorWhitePure', 'dark'));
colors.push(new GetColor('black', 'colorBlack'));
colors.push(new GetColor('red', 'colorRed', 'dark'));
colors.push(new GetColor('white', 'colorWhite', 'dark'));
colors.push(new GetColor('blue', 'colorBlue'));

 
// ::::: СТАРТ > Вызываем функцию отображения полной инфо о машине. Передаём массив доступных цветов :::::
displayCarsData(colors);
