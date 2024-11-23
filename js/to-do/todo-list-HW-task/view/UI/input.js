const getInputValue = function (element) {
  // Находим input type="text"
  const input = element.querySelector('input[type = "text"]');

  // Возвращаем ввод пользователя
  return input.value;
}

const validateInput = function (element) {
  // Получаем ввод пользователя, убираем пробелы
  const inputText = getInputValue(element).trim();

  // Зададим флаг проверки
  let isValid = true;

  // Сделаем проверки
  if (inputText === '') {
    console.log('Поле пустое');
    isValid = false;
  }

  // Если слишком короткое
  if ( inputText !== '' && inputText.length < 4 ) {
    console.log('Поле слишком короткое');
    isValid = false;
  } 

  // Если поле инпута заполнено
  if (inputText !== '') {
    const allowed = /^[a-zA-Zа-яА-Я0-9\s,.\?!;:"'()&+\-=\\]+$/; // Разрешены только буквы и несколько символов
    if (allowed.test(inputText) === false) isValid = false;
  }
  console.log(isValid);
  
  return isValid
}

export { validateInput, getInputValue };