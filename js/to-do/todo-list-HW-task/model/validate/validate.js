const validateInput = function (input, rules = {} ) {
  const { minLength = 3, maxLength = 20, allowed = /^[a-zA-Zа-яА-Я0-9\s,.\?!;:"'()&+\-=\\]+$/ } = rules;

  // Определим тип инпута
  let type = input.type || null;

  // Получаем ввод пользователя, убираем пробелы
  const inputValue = input.value.trim();

  // Зададим флаг проверки
  let isValid = true;

  // Сделаем проверки
  if (type = 'text' && inputValue === '') {
    console.log('Поле пустое');
    isValid = false;
  }

  // Проверка мин и макс длинны строки
  if ( type = 'text' && inputValue !== '' && inputValue.length < minLength ) {
    console.log('Поле слишком короткое');
    isValid = false;
  } else if ( inputValue !== '' && inputValue.length > maxLength ) {
    console.log('Поле слишком длинное. Максимальная длинна: ' + maxLength +' символов.');
  }

  // Если поле инпута заполнено
  if (inputValue !== '') {
    if (allowed.test(inputValue) === false) {
      isValid = false
      console.log('Недопустимые символы');
    };
  } 

  // Если поле type = number, то доп. проверка
  if ( type === 'number' ) {
    // Явно преобразуем в число с основ. 10
    const numberValue = parseInt(inputValue, 10);
    if (isNaN(numberValue) || numberValue <= 0 || numberValue === Infinity || numberValue === - Infinity) {
      isValid = false;
    }
  } 
  
  return isValid;
}

export { validateInput };