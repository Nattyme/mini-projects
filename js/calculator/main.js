// Пример:
const calculateModule = ( function () {
  
  // Переменная для записи результата
  let result = 0;
  let a = 0;
  let b = 0;

   // Фун-ция устанав. значение
  function setValue (value_1, value_2) {
   
    // Если введено не целое число - ошибка
    if ( ! Number.isInteger(value_1) || ! Number.isInteger(value_2) ) {
      return console.log ('Введите число!');
    }

    // Если число меньше или равно 0 - ошибка
    if ( ( value_1 || value_2 ) <= 0 && Number.isInteger(value_1) && Number.isInteger(value_2) ) {
      alert (`Число должно быть больше \'0\'!`);
    }
    
    a = value_1;
    b = value_2;
   
  }
 

  // Фун-ция выполняет сложение
  function sum () {
   result = a + b;
  }
  
  // Фун-ция выполняет вычитание
  function difference () {
    result = a - b;
  }
  
  // Фун-ция выполняет умножение
  function multiply () {
    result = a * b;
  }
  
  // Фун-ция выполняет деление
  function divide () {
    if ( b === 0) {
      return console.log('Нельзя делить на 0');
    }
    result = a / b;
  }
  
  //Фун-ция возвращает результат
  function  getresult () {
    return console.log(result);
  }
  
  return {
    setValue : setValue,
    sum : sum,
    difference : difference,
    multiply : multiply,
    divide : divide,
    getresult : getresult
  }
  
}) ();
calculateModule.setValue(5, 0);
// calculateModule.sum();
// calculateModule.difference();
calculateModule.divide();
calculateModule.getresult();