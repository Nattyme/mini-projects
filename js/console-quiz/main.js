/**
 * Модуль consoleQuiz - консольная викторина.
 * Реализует игровую механику с вопросами, проверкой ответов, начислением очков и достижений.
 * Поддерживает случайный выбор вопросов, обработку ошибок ввода и отображение результата.
 * 
 * @module consoleQuiz
 *
 * const consoleQuiz = (function () {
  /** @type {number} score - Текущий счёт игрока */
  let score = 0;

  /** @type {number} correctAnswers - Количество правильных ответов */
  let correctAnswers = 0;

  /** @type {number} comboCount - Счётчик последовательных правильных ответов */
  let comboCount = 0;

  /**
   * Конструктор для создания объекта вопроса.
   * @constructor
   * @param {string} question - Текст вопроса.
   * @param {string} correctAnswer - Правильный ответ.
   * @param {string[]} options - Варианты ответов.
   */
  const Question = function (question, correctAnswer, options) {
    this.question = question;
    this.options = options;
    this.correctAnswer = correctAnswer;
  };

  /**
   * Проверяет ответ пользователя.
   * @param {string|null} userAnswer - Введённый пользователем ответ.
   * @returns {boolean|void} Возвращает true, если ответ правильный; иначе выводит сообщение об ошибке.
   */
  Question.prototype.checkAnswer = function (userAnswer) {
    if (userAnswer === null || userAnswer === 'exit') {
      MESSAGES.INFO.finish_value(score);
      ACHIEVEMENTS.allCorrect(dataQuiz.length, correctAnswers);
      return;
    }

    if (String(userAnswer).trim() === '') return MESSAGES.ERROR.empty_value();
    if (isNaN(Number(userAnswer))) return MESSAGES.ERROR.nan_value();
    if (!isFinite(Number(userAnswer))) return MESSAGES.ERROR.infinity_value();
    if (!Number.isInteger(Number(userAnswer))) return MESSAGES.ERROR.no_integer_value();

    if (Number(userAnswer) === this.getCorrectField(this.options, this.correctAnswer) + 1) {
      MESSAGES.SUCCESS.correct_answer();
      return true;
    }
    return MESSAGES.ERROR.incorrect_answer();
  };

  /**
   * Возвращает индекс правильного ответа.
   * @param {string[]} options - Массив вариантов ответов.
   * @param {string} correctAnswer - Правильный ответ.
   * @returns {number} Индекс правильного ответа.
   */
  Question.prototype.getCorrectField = function (options, correctAnswer) {
    return options.findIndex(element => element === correctAnswer);
  };

  /**
   * Стилизованный вывод сообщения в консоль.
   * @param {string} message - Сообщение для вывода.
   * @param {string} style - CSS стиль для сообщения.
   */
  Question.prototype.customLog = function (message, style) {
    console.log(`%c \u2753 ${message}`, style);
  };

  /**
   * Конструктор для создания объекта с результатом.
   * @constructor
   * @extends Question
   * @param {Object} question - Вопрос для проверки.
   */
  const Result = function (question) {
    Question.call(this, question.question, question.correctAnswer, question.options);
    this.checkResult = function (userAnswer) {
      return this.checkAnswer(userAnswer) ? true : false;
    };
  };

  Result.prototype = Object.create(Question.prototype);
  Result.prototype.constructor = Result;

  /**
   * Обновляет счёт пользователя.
   * @param {boolean} isCorrect - Результат ответа (true - правильный).
   */
  Result.prototype.updateScore = function (isCorrect) {
    if (isCorrect) score++;
    else if (score > 0) score--;
    console.log('Текущий счёт: ' + score);
  };

  /** @type {Object[]} dataQuiz - Набор вопросов для викторины */
  const dataQuiz = [
    {
      id: 1,
      question: 'Вопрос 1',
      answer: 'Ответ 1',
      options: ['Вариант 1', 'Вариант 2', 'Вариант 3']
    },
    // Другие вопросы
  ];

  /**
   * Объект сообщений для пользователя.
   */
  const MESSAGES = {
    INFO: {
      promt_value: () => 'Введите номер верного ответа',
      finish_value: score => console.info(`Ваш результат: ${score} баллов.`)
    },
    ERROR: {
      nan_value: () => console.error('Некорректный ввод.'),
      infinity_value: () => console.error('Слишком большое число.'),
      no_integer_value: () => console.error('В ответе должно быть целое число'),
      empty_value: () => console.error('Не выбран вариант.'),
      incorrect_answer: () => console.error('Неверный ответ')
    },
    SUCCESS: {
      correct_answer: () => console.log('Это верный ответ')
    },
    ACHIEVES: {
      excellent: () => console.log('Достижение: "Мудрец". Все ответы верны!'),
      combo: comboCount => console.log(`Достижение: Комбо из ${comboCount} правильных ответов!`)
    }
  };

  /**
   * Объект достижений.
   */
  const ACHIEVEMENTS = {
    allCorrect: (totalQuestions, correctAnswers) => {
      if (correctAnswers >= totalQuestions) MESSAGES.ACHIEVES.excellent();
    },
    combo: comboCount => {
      if (comboCount > 1) MESSAGES.ACHIEVES.combo(comboCount);
    }
  };

  /**
   * Возвращает случайный вопрос из массива.
   * @param {Object[]} questionArray - Массив вопросов.
   * @returns {Question} Случайный вопрос.
   */
  const randomizeQuestion = function (questionArray) {
    let randomIndex = Math.floor(Math.random() * questionArray.length);
    let randomQuestionObj = questionArray[randomIndex];
    return new Question(randomQuestionObj.question, randomQuestionObj.answer, randomQuestionObj.options);
  };

  /**
   * Проверяет перезагрузку страницы.
   * @returns {boolean} true, если страница перезагружена.
   */
  const watchPageReload = function () {
    return window.performance.getEntriesByType('navigation')[0].type === 'reload';
  };

  /**
   * Отображает вопрос и варианты ответа.
   * @param {Question} question - Вопрос для отображения.
   */
  const displayQuestion = function (question) {
    question.customLog(question.question, "padding: 5px; font-size: 14px;");
    question.options.forEach((option, i) => console.info('%d. %s', i + 1, option));
  };

  /**
   * Выводит окно ввода ответа.
   * @returns {string|null} Ответ пользователя.
   */
  const displayChoiceField = function () {
    return prompt(MESSAGES.INFO.promt_value());
  };

  /**
   * Проверяет достижения на основе правильности ответа.
   * @param {boolean} isCorrect - Правильность ответа.
   */
  const checkAchieve = function (isCorrect) {
    if (isCorrect) {
      correctAnswers++;
      comboCount++;
      ACHIEVEMENTS.combo(comboCount);
    } else {
      comboCount = 0;
    }
  };

  /**
   * Обрабатывает ответ пользователя и выводит следующий вопрос.
   * @param {Question} question - Текущий вопрос.
   */
  const handlingUserAnswer = function (question) {
    let userAnswer = displayChoiceField();
    if (userAnswer === 'exit' || userAnswer === null) {
      MESSAGES.INFO.finish_value(score);
      ACHIEVEMENTS.allCorrect(dataQuiz.length, correctAnswers);
      return;
    }
    let result = new Result(question);
    let isCorrect = result.checkResult(userAnswer);
    result.updateScore(isCorrect);
    checkAchieve(isCorrect);
    let nextQuestion = randomizeQuestion(dataQuiz);
    displayQuestion(nextQuestion);
    handlingUserAnswer(nextQuestion);
  };

  /**
   * Запускает викторину.
   */
  const startingQuiz = function () {
    if (watchPageReload()) {
      let firstQuestion = randomizeQuestion(dataQuiz);
      displayQuestion(firstQuestion);
      handlingUserAnswer(firstQuestion);
    }
  };

  /**
   * Начинает игру.
   */
  function startGame() {
    startingQuiz();
  }
/* *******  */



// Модуль викторины
const consoleQuiz =  ( function () {
  // Переменная для хранения очков
  let score = 0;

  // Переменные ачивок
  let correctAnswers = 0;
  let comboCount = 0;


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
      MESSAGES.INFO.finish_value(score);

      // Проверим, получено ли достижение
      ACHIEVEMENTS.allCorrect(dataQuiz.length, correctAnswers);

      return 
    } 

    if (String(userAnswer).trim() === '' ) {
      return MESSAGES.ERROR.empty_value();
    }

    if (Number.isNaN(Number(userAnswer)) ) {
      return MESSAGES.ERROR.nan_value();
    } else if (!isFinite( Number(userAnswer) )) {
      return MESSAGES.ERROR.infinity_value();
    } else if (!Number.isInteger( Number(userAnswer) ) ) {
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

  // Запишем в прототим quesiton метода стилизации консоли,  т.к. одинаковый для всех вопросов
  Question.prototype.customLog = function (message, style) {
    console.log(`%c \u2753 ${message}`, style);
  }

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

  // Запишем в прототип функцию обновления счёта
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
      question : 'Внешний вид чёрной дыры в этом фильме было точно рассчитан за 5 лет до получения первых снимков из космоса! Название фильма?',
      answer : 'Интерстеллар',
      options : ['Пекло', 'Европа', 'Интерстеллар', 'Гравитация']
    },
    {
      id : 3,
      question : 'В фильме "Сквозь горизонт" команда отправляется к кораблю, который появился спустя годы после пропажи. Причина его исчезновения?',
      answer : 'Дело в двигателе. Корабль оказался в другой точке пространства-времени, в аду.',
      options : ['Корабль был захвачет создателями "чужих". Экипаж использовали для экспериментов', 'Психика экипажа не выдержала длинного полёта. Управление кораблём было потеряно', 'Дело в двигателе. Корабль оказался в другой точке пространства-времени, в аду.']
    },

    {
      id : 4,
      question : 'Терминатор - это...',
      answer : 'Граница светлой и тёмной частей небесного тела.',
      options : ['Граница светлой и тёмной частей небесного тела.', 'Граница красного пятна Юпитера', 'Граница видимой Вселенной', `I'll be back..`]
    }
  ];

  // Переменная с сообщениями для пользователя
  const MESSAGES = {
    INFO : {
              promt_value : function () {
                return 'Введите номер верного ответа';
              },

              finish_value : function (score) {
                console.info(`Поздравляем, вы завершили прохождение викторины! Ваш результат: ${score} баллов.`);
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
                  console.log('Это верный ответ');
                }
    },

    ACHIEVES : {
      excellent  : function () {
        console.log('Получено достижение: 🧙‍♂️ - "Мудрец". Вы ответили правильно на все вопросы!');
      },
      
      combo : function (comboCount) {
        console.log(`Получено достижение: 🔥 - "Комбо из ${comboCount} правильных ответов подряд!"`);
      }
    }
  }

  // Переменная с ачивками
  const ACHIEVEMENTS = {
        allCorrect: function (totalQuestions, correctAnswers) {
          if (correctAnswers >= totalQuestions) {
            return MESSAGES.ACHIEVES.excellent();
          }
        },
  
        combo: function (comboCount) {
          if (comboCount > 1) {
            return MESSAGES.ACHIEVES.combo(comboCount);
          }
        }
  }

  // Функция возвращает случайный вопрос
  const randomizeQuestion = function (questionArray) {
    let randomQuestionObj = {};
    let question = {};
    let questionQuantity = questionArray.length;

    const randomizer = function () {
      return Math.floor(Math.random() * questionQuantity);
    };

    const randomIndex = randomizer();

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

  // Функция показывает вопрос
  const displayQuestion = function (question) {
    // Стили для вопроса
    question.customLog(question.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
    
    // Обходим массив вариантов и выводим в консоль
    for (let i = 0; i < question.options.length; i++) {
      console.info('%d. ' + ' ' + question.options[i], i+1);
    } 

  }

  // Функция показывает окно для ввода ответа
  const displayChoiceField = function () {
    return prompt(MESSAGES.INFO.promt_value());
  }

  // Проверка ачивок
  const checkAchieve = function (isCorrect) {
    if (isCorrect === true) {
      correctAnswers = correctAnswers + 1;
      comboCount = comboCount + 1;
      return ACHIEVEMENTS.combo(comboCount); 
    } else {
      comboCount = 0; 
    }

  }

  // Фунция обрабатывает ответ пользователя
  const handlingUserAnswer = function (question) {
    // Запишем ответ пользователя в переменную
    let userAnswer = displayChoiceField();

    // Если ввели exit или "отмена" - остановить функцию
    if ( userAnswer === 'exit' || userAnswer === null ) {
      MESSAGES.INFO.finish_value(score);

      // Прповерим, получено ли достижение
      ACHIEVEMENTS.allCorrect(dataQuiz.length, correctAnswers);
      return;
    }

    // Запустим функцию проверки ответа , передадим в неё текущий вопрос и запишем в переменную
    let result = new Result(question);
    let isCorrect = result.checkResult(userAnswer);

    // Обновляем счет на основании правильности ответа
    result.updateScore(isCorrect);

     // Проверка ачивок
     checkAchieve(isCorrect);

    const nextQuestion = randomizeQuestion(dataQuiz);
    displayQuestion(nextQuestion);
    handlingUserAnswer(nextQuestion);

  }

  // Функция начинает викторину
  const startingQuiz = function () {
    let isReload = watchPageReload();

    if ( isReload) {
      const firstQuestion = randomizeQuestion(dataQuiz);
      displayQuestion(firstQuestion);
      handlingUserAnswer(firstQuestion);
    } 

  }

  const startGame = function () {
    startingQuiz();
  } 
    

  // Возврат ф-ций для пользователя
  return {
    start : startGame
  }

}) ();

consoleQuiz.start();