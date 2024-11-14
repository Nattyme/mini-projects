import Question from './question.js';
import Result from './result.js';

const model = {
  score : 0,
  achieveValues : [
    {
      name : 'wisdom',
      value : 0,
      check : function () {
        let uncorrectAnswers = model.achieveValues.find(item => item.name === 'uncorrectAnswers');
        let skippedAnswers = model.achieveValues.find(item => item.name === 'skipped');
        return uncorrectAnswers.value > 0 || skippedAnswers.value > 0 ? false : true;
      },
      increment : function () {
        this.value = this.value + 1;
        return this.value;
      },
      reset : function () {
        this.value = 0;
      }
    },
    {
      name : 'uncorrectAnswers',
      value : 0,
      check : function () {
        if (this.value > 0) {
          return true;
        }
      },
      increment : function () {
       this.value = this.value + 1;
       return  this.value;
      },
      reset : function () {
        this.value = 0;
      }
    },
    {
      name : 'combo',
      value : 0,
      check : function () {
        return this.value > 1 ? this.value : false;
      },
      increment : function () {
        this.value = this.value + 1;
        return this.value;
      },
      reset : function () {
        this.value = 0;
      }
    },
    {
      name : 'skipped',
      value : 0,
      check : function () {
        let uncorrectAnswers = model.achieveValues.find(item => item.name === 'uncorrectAnswers');
        let wisdom = model.achieveValues.find(item => item.name === 'wisdom');
        if (this.value > 0 && wisdom.value === 0 && uncorrectAnswers.value === 0) {
          return true;
        }
      },
      increment : function () {
        this.value = this.value + 1;
      },
      reset : function () {
        this.value = 0;
      }
    }
  ],
  Question : Question,
  Result: Result,
  dataQuiz : [
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
  ],
  handlingAchieve : {
    checkAchieve : function (acheiveName) {
      let currentAcheiveObj = model.achieveValues.find(item => item.name === acheiveName); 
      
      if (!currentAcheiveObj) {
        return false;
      }
      return currentAcheiveObj.check() ? currentAcheiveObj.check() : false;
    },
    resetAchieve : function (achievesArray) {
      achievesArray.forEach(achieveName => {
        const currentAcheiveObj = model.achieveValues.find(item => item.name === achieveName);
        if (currentAcheiveObj) {
          currentAcheiveObj.reset();
        };
      });
    },
    increaseAchieve : function (achievesArray) {
 
      achievesArray.forEach(achieveName => {
        const currentAcheiveObj = model.achieveValues.find(item => item.name === achieveName);
     
        if (currentAcheiveObj) { 
          currentAcheiveObj.increment();
        }
      });

      return;
    }, 
  },
  randomizeQuestion : function (questionArray) {
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
  },
  displayQuestion : function (question) {
    // Стили для вопроса
    question.customLog(question.question, "padding: 5px 5px 5px 15px; font-size: 14px; color: black; background-color: #fff; font-weight: 600");
    
    // Обходим массив вариантов и выводим в консоль
    for (let i = 0; i < question.options.length; i++) {
      console.info('%d. ' + ' ' + question.options[i], i+1);
    } 
  
  },
  watchPageReload : function () {
    if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
      return true;
    } 
  }
}

export default model;