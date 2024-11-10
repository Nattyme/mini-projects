// Констр-р, создающий объект с вопросом
const Question = function (question, options, correctAnswer) {
  this.question = question,
  this.options = options,
  this.correctAnswer = correctAnswer
}

// Запишем в прототип метод проверки ответа, т.к. одинаковый для всех вопросов
Question.prototype.checkAnswer = function (userAnswer) {
  // Если пользователь выбрал "Отмена"
  if ( userAnswer === null) {
    if ( userAnswer === null && result) {
      return console.log('Поздравляем, вы закончили игру. Ваш результат:');
    }

    return console.log('Вы отменили прохождение викторины');
  } 

  if (String(userAnswer).trim() === '' ) {
    return console.log('Вы не указали вариант ответа. Нужно выбрать номер из списка.');
  }

  if (isNaN(Number(userAnswer)) ) {
    return console.log('Некорректный ввод. Выберите номер из списка.');
  }  else if (!isFinite( Number(userAnswer) )) {
    return console.log('Вы указали слишком большое число. Нужно выбрать номер из списка.');
  } else if (!Number.isInteger(userAnswer) ) {
    return onsole.log('В ответе должно быть целое число');
  } 

  if (Number(userAnswer) + 1 === this.getCorrectField()) {
    return console.log('Верный ответ');
  } 

  return console.log('Не верный ответ');
};

// Запишем в прототип метод для поиска индекса верного ответа, т.к. одинаковый для всех вопросов
Question.prototype.getCorrectField = function () {
  return this.options.findIndex(element => element === this.correctAnswer);
}

const dataQuiz = [
  {
    question : 'В Древнем мире считалось, что человек, который не способен увидеть эту звезду, обладает плохим зрением. Выберите название звезды',
    answer : 'Алькор',
    options : ['Алькор', 'Алиот', 'Мицар']
  },

  {
    question : 'Над изображением чёрной дыры "Гаргантюа" для этого фильма, работал физик Кип Торн с командой учёных. Они точно рассчитали её внешний вид за 5 лет до получения первых снимков из космоса! Как называется этот фильм?',
    answer : 'Интерстеллар',
    options : ['Пекло', 'Миссия Европа', 'Интерстеллар']
  },
  {
    question : 'В фильме "Сквозь горизонт"("Горизонт событий") команда отправляется к кораблю, который появился спустя 20 лет после пропажи. Что оказалось причиной исчезновения?',
    answer : 'Новый вариант двигателя. Во время варп-перехода корабль оказался в другой точке пространства-времени. Возможно, в аду.',
    options : ['Произошло столкновение с', 'Психика экипажа не выдержала длинного полёта. Экипаж потерял управление кораблём', 'Дело в двигателе. Корабль оказался в другой точке пространства-времени. В аду.']
  },
]

//Создадим объект вопроса
const question = new Question( dataQuiz[0].question, dataQuiz[0].options, dataQuiz[0].answer);


// Слушаем, когда польз-ль обновит страницу. 
 if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
  function customLog (message, style) {
    console.group(`%c \u2753 ${message}`, style);
  }
  console.groupEnd();

  customLog(question.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
 
  // Обходим массив вариантов и выводим в консоль
  for (let i = 0; i < question.options.length; i++) {
    console.info('%d.' + ' ' + question.options[i], i+1);
  }

  // Запишем ответ пользователя в переменную
  let userAnswer = prompt('Введите номер верного ответа');


  // Запустим функцию проверки ответа и запишем в переменную
  let userResult = question.checkAnswer(userAnswer);
  console.log(userResult);

} else {
  console.info( "Что - то пошло не так.  Повторите попытку");
}
  
//  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
//***  Очищает консоль ***
// window.console.clear();
