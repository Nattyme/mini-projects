

// Делаем расчеты
const currentYear = new Date().getFullYear();
const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`); // берем текущий год и время

// текущая дата и время
const currentTime = new Date(); 
// разница в миллисекундах
const difference = nextYear - currentTime; 


//Перевод в сек>минуты>часы>сутки, округление
const daysLeft = Math.floor(difference / 1000 / 60 / 60 / 24); 
//  Всего часов осталось. Далее берем остаток от деления на 24(преобразование в дни) и получаем часы неполного дня
const hoursLeft = Math.floor(difference / 1000 / 60 / 60) % 24;

//  Всего минут осталось. Далее берем остаток от деления на 60(преобразование в минуты) и получаем минуты неполного дня
const minutesLeft = Math.floor(difference / 1000 / 60 ) % 60;
//  Всего сек осталось. Далее берем остаток от деления на 60(преобразование в сек) и получаем сек неполного дня
const secLeft = Math.floor(difference / 1000) % 60;

console.log(daysLeft, hoursLeft, minutesLeft, secLeft )