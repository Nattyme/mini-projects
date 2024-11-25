import { RULES } from './validateRules.js';

// Типизация входных данных
const typeValidators  = {
  text : ( value, rules = {...RULES} ) => {
    const { MIN_LENGTH, MAX_LENGTH, ALLOWED } = rules;

    // Явно преобразуем в строку
    value = String(value).trim();

    // Если поле пустое
    if ( value === '') {
      console.log('Поле пустое');
      return false;
    }

    if ( value.length < MIN_LENGTH ) {
      console.log('Поле слишком короткое');
      return false;
    } 

    if ( value.length > MAX_LENGTH ) {
      console.log('Поле слишком длинное. Максимальная длинна: ' + MAX_LENGTH +' символов.');
      return false;
    }
  
    // Если поле инпута заполнено
    if (ALLOWED && !ALLOWED.test(value)) {
      console.log('Недопустимые символы');
      return false
    } 

    return true;

  },
  number : ( value, rules = {...RULES}) => {
    // Проверка на пустую строку
    if (value.trim() === '') {
      console.log('Поле не может быть пустым');
      return false;
    }
 
    // Явно преобразуем в число с основ. 10
    const parsedValue = Number(value);

    // Проверим на значения
    if (isNaN(parsedValue) || value === Infinity || value === - Infinity) {
      return false;
    }

    // Проверим на мин. число
    if (parsedValue < rules.MIN_VALUE) {
      console.log('Ошибка. Вы пытаетесь указать слишком маленькое число');
      return false;
    }

    // Проверим на макс. число
    if ( rules.MAX_VALUE && parsedValue > rules.MAX_VALUE) {
      console.log('Ошибка. Вы попытались указать слишком большое число');
      return false;
    }

    
    return true;
    
  }
} 

// Ф-ция проверяет данные
const validateInput = function ( input, rules = RULES ) {
  // Проверяем, что input получен
  if ( ! input ) {
    console.log('Параметр Input не передан в ф-цию');
    return false;
  }

  // Проверяем наличие типа и знач-я у инпута
  if (!input.type || !input.value) {
    console.log('Параметр Input должен содержать тип и значение');
    return false;
  }

  // Проверим, что тип задан в объекте входных данных
  if ( !typeValidators[input.type]) {
    console.log(`Тип валидатора ${input.type} не найден `);
    return false;
  }
  // Вызываем найденный валидатор, запишем реультат в перем.
  const isValid = typeValidators[input.type](input.value, rules);

  return  Boolean(isValid);

}

export { validateInput };