

// Делаем расчеты
const currentYear = new Date().getFullYear();
const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`); // берем текущий год и время

const currentTime = new Date(); // текущая дата и время
const difference = nextYear - currentTime; // разница в миллисекундах