/**
 * Конструктор для создания объекта записи бюджета с HTML-структурой.
 * 
 * @constructor
 * @param {Object} recordValues - Объект, содержащий данные записи.
 * @param {string} recordValues.title - Название записи.
 * @param {number} recordValues.value - Сумма записи.
 * @param {string} recordValues.id - Уникальный идентификатор записи.
 * @param {string} liClassMode - Класс для элемента списка (например, для разных типов записей).
 * @param {string} imgName - Имя изображения для кнопки удаления.
 * 
 * @property {Object} values - Данные записи.
 * @property {string} classMode - Класс для элемента списка.
 * @property {string} imgFolder - Папка с изображениями (по умолчанию "img").
 * @property {string} imgName - Имя изображения для кнопки удаления.
 * @property {string} imgSrc - Путь к изображению для кнопки удаления.
 */

const RecordHtml = function (recordValues, liClassMode, imgName) {
  this.values = recordValues;
  this.classMode = liClassMode;
  this.imgFolder = 'img';
  this.imgName = imgName;
  this.imgSrc = './' + this.imgFolder + '/' + this.imgName;
}

// Создает объект форматтера для чисел
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

// Создает объект форматтера для даты
const timeFormatter = new Intl.DateTimeFormat('ru-Ru', {
  month : 'long'
})

