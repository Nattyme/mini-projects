import model from "./modules/model.js";
import view from "./view/view.js";

const controller = {
  handlingUserAnswer : function (question) {
    // Запишем ответ пользователя в переменную
    let userAnswer = view.displayChoiceField();
  
    // Запустим функцию проверки ответа , передадим в неё текущий вопрос и запишем в переменную
    let result = new model.Result(question);

    // Записываем значение полученного ответа в перем. 
    let answerStatus = result.checkResult(userAnswer);

    // В зав-ти от знач-я совершаем операции
    switch (answerStatus) {
      case 'cancel_value' : 
        view.MESSAGES.INFO.finish_value(model.score); 
   
        // Проверим, получено ли достижение, покажем сообщение
        if (model.handlingAchieve.checkAchieve('skipped')) { 
          view.MESSAGES.ACHIEVES.skipped(model.handlingAchieve.checkAchieve('skipped')); 
        } 

        if (model.handlingAchieve.checkAchieve('wisdom')) { 
          view.MESSAGES.ACHIEVES.wisdom(model.handlingAchieve.checkAchieve('wisdom')); 
        } 

        result.isCorrect = false; // Сменим флаг верного ответа 
        model.handlingAchieve.resetAchieve(['wisdom', 'combo']); // Сбрасываем достижения

        return;
      case 'empty_value' : 
        view.MESSAGES.ERROR.empty_value();

        model.handlingAchieve.resetAchieve(['correctAnswers', 'comboCount']);   // Сбрасываем достижения
        model.handlingAchieve.increaseAchieve(['skipped']); // Увеличиваем счетчик пропущенных ответов
     
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
        view.MESSAGES.SUCCESS.correсt_answer(); 

        result.isCorrect = true; // Сменим флаг ответа

        // Обновляем счёт
        model.score = result.updateScore(model.score);
        view.MESSAGES.INFO.score_value(model.score); // Показываем текущий результат

        // Обновляем достижения
        model.handlingAchieve.increaseAchieve(['wisdom', 'combo']);
  
        // Проверим, получено ли достижение, покажем сообщение
        if (model.handlingAchieve.checkAchieve('combo')) { 
          view.MESSAGES.ACHIEVES.combo(model.handlingAchieve.checkAchieve('combo')); 
        } 
      
        break;
      case false : 
        view.MESSAGES.INFO.incorrect_answer();
        result.isCorrect = false; // Сменим флаг

        // Обновляем счёт
        model.score = result.updateScore(model.score);
        view.MESSAGES.INFO.score_value(model.score); // Показываем текущий результат

        model.handlingAchieve.resetAchieve(['wisdom', 'combo']); // Сбрасываем достижения
        model.handlingAchieve.increaseAchieve(['uncorrectAnswers']);// Обновляем достижения
        console.log('uncorr   ' + model.achieveValues[1].value)

        view.displayQuestion(question); // Овтет не верный, поэтому покажем вопрос повторно
        controller.handlingUserAnswer(question); // Запускаем обработку ответа

        break;
    }
   
    if (result.isCorrect === false ) return; //  Не показываем след. вопрос

    const nextQuestion = model.randomizeQuestion(model.dataQuiz);
    view.displayQuestion(nextQuestion);
    controller.handlingUserAnswer(nextQuestion);
  }
}
  
// Модуль викторины
const consoleQuiz =  ( function () {
  view.backgroundImg('./i.webp'); // Добавим фоновое изображение

  // Функция начинает викторину
  const startingQuiz = function () {

    //Если была перезагрузка страницы - показываем вопрос
    if (model.watchPageReload()) {
      // Первый вопрос
      let firstQuestion = model.randomizeQuestion(model.dataQuiz);
      view.displayQuestion(firstQuestion);
      controller.handlingUserAnswer(firstQuestion);
    }
  }
  
  // Возврат ф-ций для пользователя
  return {
     start : startingQuiz
  }

}());
 
consoleQuiz.start();