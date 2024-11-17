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

