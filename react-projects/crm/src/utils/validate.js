import { formatCamelWords } from './formatters';

const validate =  {
  full_name : (full_name) => {
    if(!full_name) {
      return {
        valid : false,
        error : 'Ошибка.Поле full_name пустое или некорректно заполнено'
      };
    } 
 
    let nameValid = String(full_name).trim(); // Преобразуем в строку, удалим пробелы
    
    const nameRegex = /^[a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+$/; // Если пользователь ввел фамилию и имя
    const threeNameRegex = /^[a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+$/; // Если пользователь ввёл ФИО

    // Проверка на пустую строку
    if( nameValid === '' ) {
      return {
        valid: false, 
        error: 'Ошибка. Пустое поле имени' 
      } 
    }  

    // Проверка на рег. выражения
    if( !nameRegex.test(nameValid) && !threeNameRegex.test(nameValid)) {
      return {
        valid: false, 
        error: 'Ошибка. Неверный формат имени. Введите имя и фамилию в текстовом формате.'
      } 
    } 

    nameValid = formatCamelWords(nameValid);
    
    // Если всё ок 
    return {valid: true, value : nameValid};
  },

  phone : (phone) => {
    // Если номер не получен - ошибка
    if(!phone) {
      return {
        valid : false,
        error : 'Ошибка.Поле phone пустое или некорректно заполнено'
      };
    } 

    const phoneValid = String(phone).replace(/\D/g, '').trim(); // Удалим все, кроме цифр. Приведем к строке
    const phoneRegex = /^\+?[0-9\s\-()]{10,}$/; // Проверка номера

    // Проверка на пустую строку
    if( phoneValid === '') {
      return {valid : false, error : console.log('Ошибка. Пустое поле телефона')};
    }

    // Проверка NaN и рег.выражения
    if (isNaN(phoneValid) || !phoneRegex.test(phoneValid) ) {
      return {valid : false, error : console.log('Ошибка. Неверный формат номера телефона')};
    } 

    // Если всё ок 
    return {valid: true, value : phoneValid};
  },

  email : (email) => {
    // Если email не получен - ошибка
    if(!email) {
      return {
        valid : false,
        error : 'Ошибка.Поле email пустое или некорректно заполнено'
      };
    } 
 
    const emailValid = String(email).trim(); // Преобразуем в строку, удалим пробелы

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/; // Общий формат email
    const emailRegexParts = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Проверка на имя, один символ @ и домен

    // Проверка на пустую строку
    if (emailValid === '') {
      return {valid: false, error : 'Ошибка. Поле email не должно быть пустым'
      };
    }

    // Проверка на макс. длинну
    if ( emailValid.length > 320 ) {
      return {valid: false, error : 'Ошибка. Значение поля email слишком длинное.'};
    };

    // Проверка на рег. выражение 
    if ( !emailRegex.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Недопустимые символы в поле email.'};
    }

    // Проверка на рег. выражение имени и домена
    if ( !emailRegexParts.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Неверный формат email.'};
    };

    // Если всё ок 
    return {valid: true, value : emailValid};
  },
  
  empty : (dataObj) => {
    for ( const field in dataObj) {
      if ( dataObj[field] === null || dataObj[field] === undefined) {
        return false;
      }
      return true;
    }
  },
  
  valuesInObject : (dataObj, fieldsArray) => {
    let result = true;
    // Проверяем только указанные поля
    for (const field of fieldsArray) {
      if (!(field in dataObj)) {
        result = false;
        return; 
      }

      const validationMethod = validate[field];  // Проверяем значение 

      if (validationMethod) {
          const validationResult = validationMethod(dataObj[field]);
        
          if (!validationResult.valid) {return  console.log(`Ошибка в поле ${field}`);}
          dataObj[field] = validationResult.value; // Обновляем значение поля на валидированное
          
          return dataObj;
      } 
    }

    return result;
  },
  
  fieldsOfTaskObj : (task, valuesToCheck) => {
    let result = true;
    let isFilled = validate.empty(task);

    if(!isFilled) {
      result = false;
      console.log('Ошибка данных: есть пустое поле. Запись не добавлена.')
      return;
    }; 

    const valuesValid = validate.valuesInObject(task, valuesToCheck);  // Проверяем только указанные поля

    if (!valuesValid) result = false;
    return result;
  }
}


export default validate;