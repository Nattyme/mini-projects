<?php

function createThumbnail($imagePath, $cropWidth = 100, $cropHeight = 100) {

  /* Чтение изображения */
  $imagick = new Imagick($imagePath);
  $width = $imagick->getImageWidth();
  $height = $imagick->getImageHeight();

  /* Проверить корректно ли это изображение, проверка на тип файла */
  //Сделать проверку

  //Изменение размера
  $imagick->thumbnailImage($cropWidth, $cropHeight);

  //Определяем размеры  полученной миниатюры
  $width = $imagick->getImageWidth();
  $height = $imagick->getImageHeight();

  //Определяем центр изображения
  $centerX = round($width / 2);
  $centerY = round($height / 2);

  //Определяем точку для обрезки по центру
  $cropWidthHalf = round($cropWidth / 2);
  $cropHeightHalf = round($cropHeight / 2);

  //Координаты для старта обрезки
  $startX = max(0, $centerX - $cropWidthHalf);
  $startY = max(0, $centerY - $cropHeightHalf);

  $imagick->cropImage($cropWidth, $cropHeight, $startX, $startY);

  //Возвращаем готовое изображение
  return $imagick;
}