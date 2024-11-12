// Констр-р, создающий объект с вопросом
const Question = function (question, correctAnswer, options) {
  this.question = question,
  this.options = options,
  this.correctAnswer = correctAnswer
}

// Запишем в прототип метод проверки ответа, т.к. он одинаковый для всех вопросов
Question.prototype.checkAnswer = function (userAnswer) {
  // Если пользователь выбрал "Отмена"
  if ( userAnswer === null) {
    // if ( userAnswer === null && result) {
    //   return console.log('Поздравляем, вы закончили игру. Ваш результат:');
    // }
    return MESSAGES.ERROR.null_value();
  } 

  if (String(userAnswer).trim() === '' ) {
    return MESSAGES.ERROR.empty_value();
  }

  if (Number.isNaN(Number(userAnswer)) ) {
    return MESSAGES.ERROR.nan_value();
  } else if (!isFinite( Number(userAnswer) )) {
    return MESSAGES.ERROR.infinity_value();
  } else if (Number.isInteger(userAnswer) ) {
    return MESSAGES.ERROR.no_integer_value();
  } 

  if (Number(userAnswer) === this.getCorrectField(this.options, this.correctAnswer) + 1) {
    MESSAGES.SUCCESS.correсt_answer();
    return true;
  } 
  
  return  MESSAGES.ERROR.incorrect_answer();
};

// Запишем в прототип метод для поиска индекса верного ответа, т.к. одинаковый для всех вопросов
Question.prototype.getCorrectField = function (options, correctAnswer) {
  return options.findIndex(element => element === correctAnswer);
}
// Запишем в прототим quesiton метода стилизации консоли
Question.prototype.customLog = function (message, style) {
  console.group(`%c \u2753 ${message}`, style);
}

const Result = function (question) {
  Question.call(this, question.question, question.correctAnswer,  question.options),
  this.checkResult = function (score, userAnswer) {
    const isCorrect = this.checkAnswer(userAnswer);
    score = this.score(score, isCorrect);
    return score;
  },
  this.score = function (score, isCorrect) {
    if ( !isCorrect && score > 0) {
      score = score - 1;
    } else if (isCorrect) {
      score = score + 1;
    }

    return score;
  }

}
// // Запишем в прототип Result метод проверки ответа, т.к. одинаковый для всех вопросов
Result.prototype = Object.create(Question.prototype);
Result.prototype.constructor = Result;

const dataQuiz = [
  {
    id : 1,
    question : 'В Древнем мире считалось, что человек, который не способен увидеть эту звезду, обладает плохим зрением. Выберите название звезды',
    answer : 'Алькор',
    options : ['Алькор', 'Алиот', 'Мицар']
  },

  {
    id : 2,
    question : 'Над изображением чёрной дыры "Гаргантюа" для этого фильма, работал физик Кип Торн с командой учёных. Они точно рассчитали её внешний вид за 5 лет до получения первых снимков из космоса! Как называется этот фильм?',
    answer : 'Интерстеллар',
    options : ['Пекло', 'Миссия Европа', 'Интерстеллар']
  },
  {
    id : 3,
    question : 'В фильме "Сквозь горизонт"("Горизонт событий") команда отправляется к кораблю, который появился спустя 20 лет после пропажи. Что оказалось причиной исчезновения?',
    answer : 'Дело в двигателе. Корабль оказался в другой точке пространства-времени. В аду.',
    options : ['Произошло столкновение с', 'Психика экипажа не выдержала длинного полёта. Экипаж потерял управление кораблём', 'Дело в двигателе. Корабль оказался в другой точке пространства-времени. В аду.']
  },
];

const MESSAGES = {
  INFO : {
            promt_value : function () {
              return 'Введите номер верного ответа';
            },

            null_value : function () {
              console.info('Вы отменили прохождение викторины');
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
            },

            incorrect_answer : function () {
              console.error('Неверный ответ');
            }

  },

  SUCCESS : {
              correсt_answer : function () {
                console.log('Верный ответ');
              }
  }
}
  
// Функция возвращает случайный вопрос
function randomizeQuestion (questionArray) {
  let randomQuestionObj = {};
  let prevIndex = 0;
  let question = {};
  const randomizer = function () {
    return Math.floor(Math.random() * 3);
  };
  const randomIndex = randomizer();

  randomIndex === prevIndex ? randomizer() : randomIndex;
  randomQuestionObj = questionArray[randomIndex];
  // Создадим объект вопроса
  question =  new Question( randomQuestionObj.question, randomQuestionObj.answer, randomQuestionObj.options);
  prevIndex = randomIndex;

  return question;
}

let score = 0;

// Слушаем, когда польз-ль обновит страницу. 
 if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
  let question = {};
  let userAnswer = '';
  let result = {};

  // Показываем случайный вопрос из массива dataQuiz. Передаём стили для консоли
  question =  randomizeQuestion(dataQuiz);
  question.customLog(question.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
 
  // Обходим массив вариантов и выводим в консоль
  for (let i = 0; i < question.options.length; i++) {
    console.info('%d.' + ' ' + question.options[i], i+1);
  }

  // Запишем ответ пользователя в переменную
  userAnswer = prompt(MESSAGES.INFO.promt_value());

  // Запустим функцию проверки ответа , передадим в неё текущий вопрос и запишем в переменную
  result = new Result (question);

  // Запишем в score обновлённый результат
  score = score + result.checkResult(score, userAnswer);
  console.log(score);

} else {
  console.info( "Что - то пошло не так.  Повторите попытку");
}

//  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
//***  Очищает консоль ***
// window.console.clear();
