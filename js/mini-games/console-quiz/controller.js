import model from "./modules/model.js";
import view from "./view/view.js";

const controller = {
  handlingUserAnswer : function (question) {
    // Запишем ответ пользователя в переменную
    let userAnswer = view.displayChoiceField();
  
    // Запустим функцию проверки ответа , передадим в неё текущий вопрос и запишем в переменную
    let result = new model.Result(question);
    // let isCorrect = result.checkResult(userAnswer);
    let answerStatus = result.checkResult(userAnswer);


    switch (answerStatus) {
      case 'cancel_value' : 
        view.MESSAGES.INFO.finish_value(model.score);
          // Проверим, получено ли достижение
        if (model.ACHIEVE.allCorrect(model.dataQuiz.length, question.correctAnswers) === true) {
          view.MESSAGES.ACHIEVES.excellent();
        }

        result.isCorrect = false;
        return 
        
        break;
      case 'empty_value' : 
        view.MESSAGES.ERROR.empty_value();

        // Сбрасываем достижения
        model.correctAnswers = 0;
        model.comboCount = 0;
        break;
      case 'nan_value' : 
        view.MESSAGES.ERROR.nan_value();
        break;
      case 'infinity_value' : 
        view.MESSAGES.ERROR.infinity_value();
        break;
      case 'no_integer_value' : 
        view.MESSAGES.ERROR.no_integer_value();
        break;
      case true :
        result.isCorrect = true; // Сменим флаг ответа
     
        view.MESSAGES.SUCCESS.correсt_answer(); // Сообщение, что ответ верный
        model.score = model.score + 1;   // Увеличиваем счёт
        view.MESSAGES.INFO.score_value(model.score); // Показываем текущий результат

        // Увеличиваем достижения
        model.correctAnswers = model.correctAnswers + 1;
        model.comboCount = model.comboCount + 1;

        // Проверим, получено ли достижение
        if (model.ACHIEVE.combo(model.comboCount) === true) {
          view.MESSAGES.ACHIEVES.combo(model.comboCount);
        } 

        break;
      case false : 
        result.isCorrect = false; // Сменим флаг
        // Уменьшаем счёт
        model.score = model.score > 0 ? model.score - 1 : 0;
       
        // Сбрасываем достижения
        model.correctAnswers = 0;
        model.comboCount = 0;

        // Сообщение
        view.MESSAGES.INFO.incorrect_answer();
        view.MESSAGES.INFO.score_value(model.score); // Показываем текущий результат

        model.displayQuestion(question);
        controller.handlingUserAnswer(question);

        break;
    }
   
    if (result.isCorrect === false ) return; //  Не показываем след вопрос

    const nextQuestion = model.randomizeQuestion(model.dataQuiz);
    model.displayQuestion(nextQuestion);
    controller.handlingUserAnswer(nextQuestion);
  }
}
  
// Модуль викторины
const consoleQuiz =  ( function () {
  // Функция начинает викторину
  const startingQuiz = function () {

    //Если была перезагрузка страницы - показываем вопрос
    if (model.watchPageReload()) {
      // Первый вопрос
      let firstQuestion = model.randomizeQuestion(model.dataQuiz);
      model.displayQuestion(firstQuestion);
      controller.handlingUserAnswer(firstQuestion);
    }
  }
  
  // Возврат ф-ций для пользователя
  return {
     start : startingQuiz
  }

}());
 
consoleQuiz.start();