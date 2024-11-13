(function () {
  // Создаём конструктор вопросов
  const Question = function (question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  // Метод, который будет выводить вопоросы и ответы
  Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (let i = 0; i < this.answers.length; i++) {
      console.log(i + '. ' + this.answers[i]);
    }
  }

  // Метод для проверки корректного ответа
  Question.prototype.checkAnswer = function (answer) {
    if (answer === this.correct ) {
      console.log('Это правильный ответ');
    } else {
      console.log('Неверный ответ. Попробуйте ещё раз.')
    }
  };

  // Создаём объекты вопросов 
  const q1 = new Question(
    'Javascript самый лучший язык программирования?',
    ['Да', 'Нет'],
    0
  );

  const q2 = new Question (
    'This внутри метода всегда ссылается на:',
    ['Window', 'Document', 'Объект'],
    2
  );

  const q3 = new Question (
    'Что такое scope в Java script?',
    ['Документ с разметкой', 'Все методы внутри объекта', 'Движок JavaScript', 'Область видимости'],
    3
  );

  const questions = [q1, q2, q3];

  let n = Math.floor(Math.random() * questions.length);

  // Распечатываем в консоль случайный вопрос с вариантами ответов
  questions[n].displayQuestion();

  // Ответ пользователя
  let answer = parseInt(prompt('Введите номер верного ответа: '));

  // Проверка ответа с помощью метода checkAnswer
  questions[n].checkAnswer(answer);
});