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
    // if ( userAnswer === null && result) {
    //   return console.log('Поздравляем, вы закончили игру. Ваш результат:');
    // }
    return MESSAGES.INFO.null_value();
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

let score = 0;

const Result = function (question) {
  Question.call(this, question.question, question.correctAnswer,  question.options),
  this.checkResult = function (userAnswer) {
    let isCorrect = this.checkAnswer(userAnswer);
    return isCorrect ? true : false;
  }
}
// // Запишем в прототип Result метод проверки ответа, т.к. одинаковый для всех вопросов
Result.prototype = Object.create(Question.prototype);

// Вернём значение Result для конструктора
Result.prototype.constructor = Result;

Result.prototype.updateScore = function(isCorrect) {
  if (isCorrect === true) {
    score = score + 1;
  } else if (isCorrect === false && score > 0) {
    score = score - 1;
  }
  console.log('Текущий счет: ' + score);
};

// Массив всех доступныхх вопросов
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

// Сообщения
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
  let question = {};
  const randomizer = function () {
    return Math.floor(Math.random() * 3);
  };
  const randomIndex = randomizer();

  randomIndex === question.id ? randomizer() : randomIndex;
  randomQuestionObj = questionArray[randomIndex];
  // Создадим объект вопроса
  question =  new Question( randomQuestionObj.question, randomQuestionObj.answer, randomQuestionObj.options);

  return question;
}

// Функция слушает, когда польз-ль обновит страницу. 
const watchPageReload = function () {
  if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
    return true;
  } 
}

const displayQuestion = function (question) {
  question.customLog(question.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
 
  // Обходим массив вариантов и выводим в консоль
  for (let i = 0; i < question.options.length; i++) {
    console.info('%d. ' + ' ' + question.options[i], i+1);
  } 
}

const displayChoiceField = function () {
  return prompt(MESSAGES.INFO.promt_value());
}

const handlingUserAnswer = function (question) {
  // Запишем ответ пользователя в переменную
  let userAnswer = displayChoiceField();

  if ( userAnswer === 'exit' || userAnswer === null ) {
    return;
  }

  // Запустим функцию проверки ответа , передадим в неё текущий вопрос и запишем в переменную
  let result = new Result(question);
  let isCorrect = result.checkResult(userAnswer);

  // Обновляем счет на основании правильности ответа
  result.updateScore(isCorrect);
  console.groupEnd();

  const nextQuestion = randomizeQuestion(dataQuiz);
  displayQuestion(nextQuestion);
  handlingUserAnswer(nextQuestion);
}

const startingQuiz = function () {
  let isReload = watchPageReload();

  if ( isReload) {
    const firstQuestion = randomizeQuestion(dataQuiz);
    displayQuestion(firstQuestion);
    handlingUserAnswer(firstQuestion);
  } 

}

startingQuiz();




//  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
//***  Очищает консоль ***
// window.console.clear();
