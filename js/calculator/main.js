
/**
 * Модуль для выполнения арифметических операций с сохранением результата и проверками на корректность данных.
 * Модуль поддерживает следующие операции: сложение, вычитание, умножение, деление.
 * Также имеется возможность сохранять результат последней операции для накопительных вычислений.
 * Т.е. к предыдущему результату прибавляется текущий расчёт двух чисел.
 *
 * @module calculateModule
 * 
 * @example
 * // Установка значений для вычислений
 * calculateModule.setValue('5', '3');
 * 
 * // Выполнение операций
 * calculateModule.sum(); // Результат: 8
 * calculateModule.multiply(); // Результат: 15
 * 
 * // Получение результата
 * calculateModule.getresult(); // Результат: 15
 * 
 * // Сброс значений и результата
 * calculateModule.reset();
 * 
 * @returns {Object} Объект с доступными функциями для работы с калькулятором:
 * - setValue(value_1, value_2) - Устанавливает значения для вычислений.
 * - setSave(toSave) - Устанавливает режим сохранения результата последней операции.
 * - reset() - Сбрасывает результат в 0.
 * - sum() - Выполняет сложение.
 * - difference() - Выполняет вычитание.
 * - multiply() - Выполняет умножение.
 * - divide() - Выполняет деление.
 * - getresult() - Получает результат последней операции.
 
 * - Проверяется, чтобы введенные значения были числами и больше нуля.
 * - Выводятся сообщения об ошибке для различных случаев (например, деление на ноль или пустые значения).
 */

const calculateModule = ( function () {
 
  let isValueSet = false;  // Переменная показывает, установлены ли начал. значения
  let result = 0; // Переменная для записи результата
  let saveResult = false;   // В переменной храним инфо о возм-ти сброса знач-я

 
  let a;  // Объявим переменные a и b для выполнения арифм. действий
  let b;  // Объявим переменные a и b для выполнения арифм. действий
  
  
  // Объект с текст. уведомлениями
  // Я заменила alert на consol, чтобы не закрывать их постоянно 
  const MESSAGES = {
    ERROR : {
      infinity_value : function () {
        console.error ('Невозможно обработать. Число слишком большое.');
        
        return;
      },

      no_integer_value : function () {
        console.error ('Введите целое число!');
        
        return;
      },

      below_zero_value : function () {
        console.error (`Число должно быть больше нуля!`);
        
        return;
      },

      divide_zero_value : function () {
        console.error ('Нельзя делить на ноль'); 
        
        return;
      },
      
      unset_value : function () {
        console.error ('Задайте значения для вычислений'); 
        
        return;
      },
      
      empty_value : function () {
        console.error ('Пустые поля значений'); 
        
        return;
      },
      
      no_result : function () {
        console.error ('Расчёт не выполнен'); 
        
        return;
      }

    },
    
    SUCCESS : {
      result : function (result) {
        console.log(`Результат вычислений: ${result}`);
      }
    }
  }
  
  
  
  // Ф-ция складывает текущий результат с резултатом вычисления
  function accumulatedResult (currentResult) {
    result = result + currentResult;
  }
  
  // Ф-ция проверяет входящие значения value_1 и value_2
  function checkValues (value_1, value_2) {
    if (value_1.trim() === "" || value_2.trim() === "") {
        MESSAGES.ERROR.empty_value();
        return false;
    }
    
     if ( !/^\d+$/.test(value_1.trim()) || !/^\d+$/.test(value_2.trim()) ) {
        MESSAGES.ERROR.no_integer_value();
        return false;
     }
    
     const num_1 = Number(value_1.trim());
     const num_2 = Number(value_2.trim());
    
   
    // Если введено не целое число - ошибка
    if (!Number.isInteger(num_1) || !Number.isInteger(num_2) ) {
      MESSAGES.ERROR.no_integer_value();
      return false;
    }

    // Если число меньше 0 - ошибка
    if ( num_1 < 0 || num_2 < 0 ) {
      MESSAGES.ERROR.below_zero_value(); 
      return false;
    } 
    
    if (!Number.isFinite(num_1) || !Number.isFinite(num_2)) {
       MESSAGES.ERROR.infinity_value();
       return false;
    }
    
    return true;
  }
  
  // Ф-ция проверяет, установлены ли значения
  function checkAreValueSet () {
    if (isValueSet === false) {
       return false;
    }
    
    return true;
  }
 
  
  // Ф-ция устанав. значение
  function setValue (value_1, value_2) {
  
    // Если есть ошибки при проверке - закончить выполнение ф-ции
    if ( !checkValues(value_1, value_2) ) {
      isValueSet = false;
      return;
    };
  
    
    // Сохраняем значения в a и b. Преобразуем в число, чтобы точно не было строки после проверок
    a = Number(value_1);
    b = Number(value_2);
    
    // Сменим флаг установленных значений
    isValueSet = true;

  }
  
  // Ф-ция устанавливает режим сохран. последнего результата
  function setSaveMode (toSave) {
    saveResult = toSave;
  }
  
  // Ф-ция сбрасывает текущ. результат в 0
  function reset () {
    result = 0;
    isValueSet = false;
  }
 
  // Ф-ция выполняет сложение
  function sum () {
    // Если не установлены значения - не выполнять ф-цию
    if (!checkAreValueSet()) return;
    
    saveResult ? accumulatedResult( a + b ) : result = a + b;
    
    return result;
  }
  
  // Ф-ция выполняет вычитание
  function difference () {   
    // Если не установлены значения - не выполнять ф-цию
    if (!checkAreValueSet()) return;
  
    saveResult ? accumulatedResult( a - b ) : result = a - b;
    
    return result;

  }
  
  // Ф-ция выполняет умножение
  function multiply () {
    // Если не установлены значения - не выполнять ф-цию
    if (!checkAreValueSet()) return;
    
    saveResult ? accumulatedResult(  a * b ) : result =  a * b;
    
    return result;
  }
  
  // Ф-ция выполняет деление
  function divide () {
    // Если не установлены значения - не выполнять ф-цию
    if (!checkAreValueSet()) return;
    
    if ( b === 0) {
      MESSAGES.ERROR.divide_zero_value(); 
      return;
    }
    
    saveResult ? accumulatedResult( a / b ) : result = a / b;
    
    return result;
  }
  
  
  
  // Ф-ция возвращает результат
  function getresult () {
    // Если не установлены значения - не выполнять ф-цию
    if (!checkAreValueSet()) return;
    
    if ( isNaN(result) ) {
     MESSAGES.ERROR.no_result();
     return;
    } 
    
 
    return MESSAGES.SUCCESS.result(Number(result)); 

  }
  
  // Возврат ф-ций для пользователя
  return {
    setValue : setValue,
    setSave : setSaveMode,
    reset : reset,
    sum : sum,
    difference : difference,
    multiply : multiply,
    divide : divide,
    getresult : getresult
  }
  
}) ();
                      
                      
calculateModule.setValue('5', '5zxz55');
calculateModule.setSave(true);
// calculateModule.sum();
// calculateModule.sum();
calculateModule.difference();
// calculateModule.multiply();
// calculateModule.divide();
// calculateModule.reset();
calculateModule.getresult();