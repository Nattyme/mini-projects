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
                const message = `:::::: Поздравляем, вы завершили прохождение викторины! 🎉 Ваш результат: ${score} баллов. ::::::`;
                const style = 'padding: 10px 15px; font-family: "Arial"; font-size: 14px; color: #fff; background-color: #25547b; font-weight: 500';
                view.customLog(message, style);
              },

              score_value : function (score) {
                const message = `~ Ваш текущий результат: ${score} баллов.`;
                const style = 'padding: 10px 15px; font-family: "Arial"; font-size: 12px; color: #000; background-color: #fff473; font-weight: 600;';
                view.customLog(message, style);
              },

              incorrect_answer : function () {
                const message = 'Неверный ответ. Попробуйте еще раз';
                const style = 'padding: 10px 15px; font-family: "Arial"; font-size: 12px; color: #fff; background-color: #bf4330; font-weight: 600;';
                view.customLog(message, style);
              }
  
    },
  
    ERROR : {
              nan_value : function () {
                console.log('Некорректный ввод. Выберите номер из списка.');
              },
  
              infinity_value : function () {
                console.log('Вы указали слишком большое число. Нужно выбрать номер из списка.');
              },
  
              no_integer_value : function () {
                console.log('В ответе должно быть целое число');
              },
  
              empty_value : function () {
                console.log('Вы не указали вариант ответа. Нужно выбрать номер из списка.');
              }
    },
  
    SUCCESS : {
                correсt_answer : function () {
                  const message = 'Это верный ответ';
                  const style = 'padding: 10px 15px; font-family: "Arial"; font-size: 12px; color: #fff; background-color: #238d43; font-weight: 600;';
                  view.customLog(message, style);
                }
    },
  
    ACHIEVES : {
                  wisdom  : function () {
                    const message = `>> Получено достижение: 🧙‍♂️ - " Мудрец ". Вы ответили правильно на все вопросы! <<`;
                    const style = 'padding: 10px 15px; font-family: "Arial"; font-size: 14px; color: #fff; background-color: #25547b; font-weight: 500';
                    view.customLog(message, style);
                  },
                  
                  combo : function (comboCount) {
                    const message = `>> Получено достижение: 🔥 - " Комбо! ". Вы дали ${comboCount} правильных ответов подряд! <<`;
                    const style = 'padding: 5px 15px; font-family: "Arial"; font-size: 14px; color: #fff; background-color: #25547b; font-weight: 500';
                    view.customLog(message, style);
                  },

                  skipped : function () {
                    const message = `>> Получено достижение: 💪🏻 - " Я тороплюсь ". Вы скипнули все вопросы! <<`;
                    const style = 'padding: 10px 15px; font-family: "Arial"; font-size: 14px; color: #fff; background-color: #25547b; font-weight: 500';
                    view.customLog(message, style);
                  }
    }
  },
  
  customLog : function (message, style) {
    console.log(`%c ${message}`, style);
  },

  displayQuestion : function (question) {
    const icon = '\u2753';
    const style = 'padding: 10px 10px 10px 15px; font-family: "Arial"; font-size: 14px; color: #000; background-color: #fff; font-weight: 500';

    view.customLog((icon + ' ' + '[ ' + question.question + ' ]'), style);

    console.group(' ');
    // Обходим массив вариантов и выводим в консоль
    for (let i = 0; i < question.options.length; i++) {
      let style = 'padding: 10px 15px; font-family: "Arial"; font-size: 14px; color: #000; font-weight: 600';
      view.customLog(('', `${i + 1}. ${question.options[i]}`), style);
    } 

    console.groupEnd();
  
  },

  displayChoiceField : function () {
    return prompt(view.MESSAGES.INFO.promt_value());
  }

}

export default view;