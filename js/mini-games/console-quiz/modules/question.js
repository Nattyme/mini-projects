// Констр-р, создающий объект с вопросом
const Question = function (question, correctAnswer, options) {
  this.question = question,
  this.options = options,
  this.correctAnswer = correctAnswer
}
// Запишем в прототип метод проверки ответа, т.к. он одинаковый для всех вопросов
Question.prototype.checkAnswer = function (userAnswer) {
  // Если пользователь выбрал "Отмена"
  if ( userAnswer === null || userAnswer === 'exit') {
    return 'cancel_value';
  } 
  
  // Если пустая строка
  if (String(userAnswer).trim() === '' ) {
    return 'empty_value'
  }

  // Валидация ввода пользователя
  if (Number.isNaN(Number(userAnswer)) ) {
    return 'nan_value';
  } else if (!isFinite( Number(userAnswer) )) {
    return 'infinity_value';
  } else if (!Number.isInteger( Number(userAnswer) ) ) {
    return 'no_integer_value';
  } 

  // Если всё ок и ответ правильный
  if (Number(userAnswer) === this.getCorrectField(this.options, this.correctAnswer) + 1) {
    return true;
  } 

  // Если ответ не правильный
  return false;
};

// Запишем в прототип метод для поиска индекса верного ответа, т.к. одинаковый для всех вопросов
Question.prototype.getCorrectField = function (options, correctAnswer) {
  return options.findIndex(element => element === correctAnswer);
}

// Запишем в прототим quesiton метода стилизации консоли,  т.к. одинаковый для всех вопросов
Question.prototype.customLog = function (message, style) {
  console.log(`%c \u2753 ${message}`, style);
}

export default Question;