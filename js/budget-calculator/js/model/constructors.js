const RecordHtml = function (recordValues, liClassMode, imgName) {
  this.values = recordValues;
  this.classMode = liClassMode;
  this.imgFolder = 'img';
  this.imgName = imgName;
  this.imgSrc = './' + this.imgFolder + '/' + this.imgName;
}
