// Пример:
const calculateModule = ( function () {
  
  // Переменная для записи результата
  let result = 0;

  // В переменной храним инфо о возм-ти сброса знач-я
  let saveResult = false;

  // Объявим переменные a и b для выполнения арифм. действий
  let a;
  let b;

  // Объект с уведомлениями
  const MESSAGES = {
    ERROR : {
      infinity_value : function () {
        alert ('Невозможно обработать. Число слишком большое.');
      },

      no_integer_value : function () {
        alert ('Введите число!');
      },

      below_zero_value : function () {
        alert (`Число должно быть больше \'0\'!`);
      },

      divide_zero_value : function () {
        alert ('Нельзя делить на 0'); 
      }

    }
  }

  function setMode (saveResult) {
    if (saveResult) {
      this.saveResult = true;
    } else {
      this.saveResult = false;
    }
  }

  function checkValues (value_1, value_2) {
    if (!isFinite(value_1) || !isFinite(value_2)) {
      MESSAGES.ERROR.infinity_value();
      return false;
    }

    // Если введено не целое число - ошибка
    if ( !Number.isInteger(value_1) || !Number.isInteger(value_2) ) {
      MESSAGES.ERROR.no_integer_value();
      return false;
    }

    // Если число меньше или равно 0 - ошибка
    if ( value_1 <= 0 || value_2 <= 0 ) {
      MESSAGES.ERROR.below_zero_value(); 
      return false;
    }
     
  }

  function reset () {
    result = 0;
  }

   // Фун-ция устанав. значение
  function setValue (value_1, value_2) {
    if (!checkValues(value_1, value_2)) {
      return false;
    }

    a = value_1;
    b = value_2;

  }
 
  // Фун-ция выполняет сложение
  function sum () {
    if (saveResult) {
      result = result + (a + b);
    } else {
      result = a + b;
    }
  }
  
  // Фун-ция выполняет вычитание
  function difference () {
    if (saveResult) {
      result = result + (a - b);
    } else {
      result = a - b;
    }

  }
  
  // Фун-ция выполняет умножение
  function multiply () {
    if (saveResult) {
      result = result + (a * b);
    } else {
      result = a * b;
    }
  }
  
  // Фун-ция выполняет деление
  function divide () {
    if ( b === 0) {
      return MESSAGES.ERROR.divide_zero_value(); 
    }

    if (saveResult) {
      result = result + a / b;
    } else {
      result = a / b;
    }
    
  }
  
  //Фун-ция возвращает результат
  function  getresult () {
    if (result !== undefined) {
      return console.log(result);
    }
    
  }
  
  return {
    setValue : setValue,
    setMode : setMode,
    sum : sum,
    difference : difference,
    multiply : multiply,
    divide : divide,
    getresult : getresult
  }
  
}) ();
calculateModule.setValue(Infinity, Infinity);
// calculateModule.sum();
// calculateModule.difference();
calculateModule.divide();
calculateModule.getresult();