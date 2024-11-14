import Question from "./question.js";

const Result = function (question) {
  Question.call(this, question.question, question.correctAnswer,  question.options)
}

// Запишем в прототип Result метод проверки ответа, т.к. одинаковый для всех вопросов
Result.prototype = Object.create(Question.prototype);
// Вернём значение Result для конструктора
Result.prototype.constructor = Result;
// Запишем в прототип функцию обновления счёта
Result.prototype.updateScore = function(isCorrect) {
  if (isCorrect === true) {
    score = score + 1;
  } else if (isCorrect === false && score > 0) {
    score = score - 1;
  }
};

Result.prototype.checkResult = function(userAnswer) {
  return this.checkAnswer(userAnswer);
};

Result.prototype.isCorrect = false;

Result.prototype.checkAchieve = function(isCorrect) {
    if (isCorrect === true) {
      correctAnswers = correctAnswers + 1;
      comboCount = comboCount + 1;
      return ACHIEVEMENTS.combo(comboCount); 
    } else {
      comboCount = 0; 
    }
};

export default Result;