// Ф-ция создаёт случайное число
const getRandomInt = function (min, max) {
  return min + Math.floor(Math.random() * (max - min ));
};

// Ф-ция считает процент от суммы
const calcPercent = function (ofWhat, fromWhat) {
  if (!fromWhat) return 0;
  // Если полуен элем., от кот. нужно посчитать % - считаем %
  return Math.round((ofWhat * 100) / fromWhat);
}

// Ф-ция считает случайный индекс из массива (для блоков анимации)
function getRandomFrom (array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

export { getRandomInt, getRandomFrom, calcPercent };