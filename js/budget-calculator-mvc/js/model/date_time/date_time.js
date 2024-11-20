// Ф-ция  cоздает объект форматтера для даты
const timeFormatter = new Intl.DateTimeFormat('ru-Ru', {
  month : 'long'
});

// Ф-ция вычисляет текущий месяц и год 
const getMonthAndYear = function () {
  const today = new Date();
  const todayMonth = timeFormatter.format(today);
  const todayYear = today.getFullYear();
 
  return {todayMonth, todayYear};
}

export {timeFormatter, getMonthAndYear}
