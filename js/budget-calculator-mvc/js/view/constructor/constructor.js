// Ф-ция создает объект форматтера для чисел
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style : 'currency',
  currency : 'USD',
  maximumFractionDigits : 0
});

// Констр-р создаёт объект с данными записи 
const RecordHtml = function (recordValues, liClassMode, imgName) {
  this.values = recordValues;
  this.classMode = liClassMode;
  this.imgFolder = 'img';
  this.imgName = imgName;
  this.imgSrc = './' + this.imgFolder + '/' + this.imgName;
}

export { priceFormatter, RecordHtml };