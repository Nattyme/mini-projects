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

const question1 = 'В Древнем мире, человека, который не способен увидеть эту звезду, не брали в лучники. Как называется эта звезда?'
const answer1 = 'Алькор';
const options1 = ['Алькор', 'Алиот', 'Мицар'];

const question2 = 'Над изображением чёрной дыры "Гаргантюа" для этого фильма, работал физик Кип Торн с командой учёных. Они точно рассчитали её внешний вид за 5 лет до получения первых снимков из космоса! Как называется этот фильм?';
const answer2 = 'Интерстеллар';
const options2 = ['Пекло', 'Миссия Европа', 'Интерстеллар'];

// Создадим объект 1го вопроса
const questionBody = new Question(question1, options1, answer1);
const questionBody2 = new Question(question2, options2, answer2);
console.dir(questionBody);
console.dir(questionBody2);
console.dir(questionBody.checkAnswer(1));



const question3 = 'В фильме "Сквозь горизонт"("Горизонт событий") команда отправляется к короблю, который появился спустя 20 лет после пропажи. Что оказалось причиной исчезновения?';
const answer3 = 'Новый вариант двигателя. Во время варп-перехода корабль оказался в другой точке пространства-времени. Возможно, в аду.';
const options3 = ['Этот корабль захватили Создатели. Они вывели на нём первые экземпляры "Чужих". Оттуда началось их распространение', 'Корабль направлялся в Плутону. Психика экипажа не выдержала длинного полёта. Координировать действия команды стало невозможно. Это привело к летальному исходу', 'Новый вариант двигателя. Во время варп-перехода корабль оказался в другой точке пространства-времени. Возможно, в аду.'];