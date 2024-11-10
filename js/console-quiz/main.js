// Констр-р, создающий объект с вопросом
const Question = function (question, options, correctAnswer) {
  this.question = question,
  this.options = options,
  this.correctAnswer = correctAnswer
}

// Запишем в прототип метод проверки ответа, т.к. одинаковый для всех вопросов
Question.prototype.checkAnswer = function (answerIndex) {
  if (answerIndex !== this.getCorrectField()) {
    return false;
  }
  return true;
};

// Запишем в прототип метод для поиска индекса верного ответа, т.к. одинаковый для всех вопросов
Question.prototype.getCorrectField = function () {
  return this.options.findIndex(element => element === this.correctAnswer);
}

// const dataQuiz = [
//   {
//     question : 'В Древнем мире, человека, который не способен увидеть эту звезду, не брали в лучники. Как называется эта звезда?',
//     answer : 'Алькор',
//     options : ['Алькор', 'Алиот', 'Мицар']
//   },

//   {
//     question : 'Над изображением чёрной дыры "Гаргантюа" для этого фильма, работал физик Кип Торн с командой учёных. Они точно рассчитали её внешний вид за 5 лет до получения первых снимков из космоса! Как называется этот фильм?',
//     answer : 'Интерстеллар',
//     options : ['Пекло', 'Миссия Европа', 'Интерстеллар']
//   },
//   {
//     question : 'В фильме "Сквозь горизонт"("Горизонт событий") команда отправляется к кораблю, который появился спустя 20 лет после пропажи. Что оказалось причиной исчезновения?',
//     answer : 'Новый вариант двигателя. Во время варп-перехода корабль оказался в другой точке пространства-времени. Возможно, в аду.',
//     options : ['Произошло столкновение с', 'Психика экипажа не выдержала длинного полёта. Экипаж потерял управление кораблём', 'Дело в двигателе. Корабль оказался в другой точке пространства-времени. В аду.']
//   },
// ]
// const question1 = 'В Древнем мире, человека, который не способен увидеть эту звезду, не брали в лучники. Как называется эта звезда?'
// const answer1 = 'Алькор';
// const options1 = ['Алькор', 'Алиот', 'Мицар'];

// const question2 = 'Над изображением чёрной дыры "Гаргантюа" для этого фильма, работал физик Кип Торн с командой учёных. Они точно рассчитали её внешний вид за 5 лет до получения первых снимков из космоса! Как называется этот фильм?';
// const answer2 = 'Интерстеллар';
// const options2 = ['Пекло', 'Миссия Европа', 'Интерстеллар'];

// Создадим объект 1го вопроса
// const questionBody = new Question(question1, options1, answer1);
// const questionBody2 = new Question(question2, options2, answer2);

const question3 = 'В фильме "Сквозь горизонт"("Горизонт событий") команда отправляется к короблю, который появился спустя 20 лет после пропажи. Назовите причину исчезновения.';
const answer3 = 'Новый вариант двигателя. Во время варп-перехода корабль оказался в другой точке пространства-времени. Возможно, в аду.';
const options3 = ['Этот корабль захватили Создатели. Они вывели на нём первые экземпляры "Чужих". Оттуда началось их распространение', 'Корабль направлялся в Плутону. Психика экипажа не выдержала длинного полёта. Координировать действия команды стало невозможно. Это привело к летальному исходу', 'Новый вариант двигателя. Во время варп-перехода корабль оказался в другой точке пространства-времени. Возможно, в аду.'];
const questionBody3 = new Question(question3, options3, answer3);

// Слушаем, когда польз-ль обновит страницу. 
 if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
  function customLog (message, style) {
    console.group(`%c \u2753 ${message}`, style);
  }
  console.groupEnd();

  customLog(questionBody3.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
 
  // Обходим массив вариантов и выводим в консоль
  for (let i = 0; i < questionBody3.options.length; i++) {
    console.info('%d.' + ' ' + questionBody3.options[i], i+1);
  }
  
  let userAnswer = Number(prompt('Введите номер верного ответа') - 1);

  if (userAnswer.trim() === '' ) {
    console.log('Вы не указали вариант ответа. Нужно выбрать номер из списка.')
  }

  if (isNaN(userAnswer) ) {
   
    if (userAnswer === NULL || userAnswer !== Infinity) {
      console.log('Вы указали слишком большое число. Нужно выбрать номер из списка.')
    }

    console.log('Введите номер из списка.')
  }
  

  if (userAnswer === questionBody3.question) {
    console.log('Верный ответ')
  } else {
    console.log('Не верный ответ')
  }
 
 
 } else {
   console.info( "Что - то пошло не так.  Повторите попытку");
 }

//  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
//***  Очищает консоль ***
// window.console.clear();
