import Question from "./question.js";

const Result = function (question) {
  Question.call(this, question.question, question.correctAnswer,  question.options)
}

// Запишем в прототип Result метод проверки ответа, т.к. одинаковый для всех вопросов
Result.prototype = Object.create(Question.prototype);
// Вернём значение Result для конструктора
Result.prototype.constructor = Result;
// Запишем в прототип функцию обновления счёта
Result.prototype.updateScore = function(currentScore) {
  if (this.isCorrect === true) {
    currentScore = currentScore + 1;
  } else if (this.isCorrect === false && currentScore > 0) {
    currentScore = currentScore - 1;
  }
  return currentScore;
};

Result.prototype.checkResult = function(userAnswer) {
  return this.checkAnswer(userAnswer);
};

Result.prototype.isCorrect = true;

export default Result;