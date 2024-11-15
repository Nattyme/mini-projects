import Model from './model.js';
const model = new Model ();

model.addTask('Заверстать стартовый шаблон');
model.addTask('Написать скрипт');
model.addTask('Записать урок');
console.log(model.tasks)
model.doneTask(model.tasks[0]);

console.log(model.tasks);

model.removeTask(model.tasks[0]);
console.log(model.tasks);




