// Ф-ция удаляет рамку ошибки при фокусе
const removeErrorOnFocus = function (e, elements) {
  // Если фокус на инпуте - удалим класс error
  if ( elements.includes(e.target) && e.target.classList.contains('form__input--error')) { 
    e.target.classList.remove('form__input--error'); 
  }
}

// Ф-ция проверет введённые данные формы
const validateInput = function (inputArray) {
  // Зададим флаг для валидации
  let isValid = true;
  const toggleErrorDisplay = function (input) {
    input.classList.add('form__input--error');
  }

  inputArray.forEach(input => {
  
     // Проверка на пустую строку. Сменим флаг isValid в случае ошибки
    if (input.value.trim() === '') {    
      toggleErrorDisplay(input);
      isValid = false;
    } else {
      input.classList.remove('form__input--error');
    }

    // Если поле инпута заполнено
    if (input.value.trim() !== '' && input.type === 'text') {
      const allowed = /^[a-zA-Zа-яА-Я\s,.\?!;:"'()&+\-=\\]+$/; // Разрешены только буквы и несколько символов

      if (allowed.test(input.value) === false) {
        toggleErrorDisplay(input);
        isValid = false;
      }

    }

    // Если поле Input для ввода цифр, то доп. проверка
    if (input.type === 'number' ) {
      if (input.value.trim() === '') {
        toggleErrorDisplay(input);
        isValid = false;
      }

      // Явно преобразуем в число с основ. 10
      const numberValue = parseInt(input.value.trim(), 10);
      if (isNaN(numberValue) || numberValue <= 0 || numberValue === Infinity || numberValue === - Infinity) {
        toggleErrorDisplay(input);
        isValid = false;
      }
    } 

  
  });

  return isValid;
}

export { removeErrorOnFocus, validateInput};