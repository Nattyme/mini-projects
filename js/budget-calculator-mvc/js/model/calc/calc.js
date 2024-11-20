// Ф-ция создаёт случайное число
const getRandomInt = function (maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
};

// Ф-ция считает процент от суммы
const calcPercent = function (ofWhat, fromWhat) {
  if (!fromWhat) return 0;
  // Если полуен элем., от кот. нужно посчитать % - считаем %
  return Math.round((ofWhat * 100) / fromWhat);
}

export { getRandomInt, calcPercent };