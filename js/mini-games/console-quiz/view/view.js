const view = {
  backgroundImg : function (url) {
    const body = document.querySelector('body');
    body.style = `background-color: #000; background-image: url(${url}); background-position: center center;   background-size: cover;   background-repeat: no-repeat;`
  },

  MESSAGES : {
    INFO : {
              promt_value : function () {
                return 'Введите номер верного ответа';
              },
  
              finish_value : function (score) {
                console.info(`Поздравляем, вы завершили прохождение викторины! 🎉 Ваш результат: ${score} баллов.`);
              },

              score_value : function (score) {
                console.info(`Ваш текущий результат: ${score} баллов.`);
              },

              incorrect_answer : function () {
                console.error('Неверный ответ. Попробуйте еще раз');
              }
  
    },
  
    ERROR : {
              nan_value : function () {
                console.error('Некорректный ввод. Выберите номер из списка.');
              },
  
              infinity_value : function () {
                console.error('Вы указали слишком большое число. Нужно выбрать номер из списка.');
              },
  
              no_integer_value : function () {
                console.error('В ответе должно быть целое число');
              },
  
              empty_value : function () {
                console.error('Вы не указали вариант ответа. Нужно выбрать номер из списка.');
              }
    },
  
    SUCCESS : {
                correсt_answer : function () {
                  console.log('Это верный ответ.');
                }
    },
  
    ACHIEVES : {
                  wisdom  : function () {
                    console.log('Получено достижение: 🧙‍♂️ - "Мудрец". Вы ответили правильно на все вопросы!');
                  },
                  
                  combo : function (comboCount) {
                    console.log(`Получено достижение: 🔥 - "Комбо!". Вы дали ${comboCount} правильных ответов подряд!`);
                  },

                  skipped : function () {
                    console.log(`Получено достижение: 💪🏻 - "Я тороплюсь". Вы скипнули все вопросы!`);
                  }
    }
  },
  
  customLog : function (message, style) {
    console.log(`%c \u2753 ${message}`, style);
  },

  displayQuestion : function (question) {
    // Стили для вопроса
    question.customLog(question.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
    
    // Обходим массив вариантов и выводим в консоль
    for (let i = 0; i < question.options.length; i++) {
      console.info('%d. ' + ' ' + question.options[i], i+1);
    } 
  
  },

  displayChoiceField : function () {
    return prompt(view.MESSAGES.INFO.promt_value());
  }

}

export default view;