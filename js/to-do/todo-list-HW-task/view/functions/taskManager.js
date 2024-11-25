import * as UI from '../UI/index.js';
import { elements, changeTitle, getUpdatedHTML, getParent } from '../view.js';

const taskManager = {
  add(taskData) {
    const task = new UI.TaskFactory(taskData).getHTML(); // получаем HTML шаблон задачи
    elements.tasksList.insertAdjacentHTML('afterbegin', task); // Добавим задачу в список задач на странице

    elements.newTaskInput.value = ''; // Очищаем поле ввода для текста 
    changeTitle(); // Сменим заголовок

    return;
  },
  remove(e, message) {
    let task = e.target.closest('li'); // Найдём задачу
    let id = task.dataset.id; // Запишем её ID

    // Проверяем подтверждение удаления
    if (confirm(message)) {
      if (task) task.remove(); // удалим задачу
    }

    return id; // и вернём её id
  },
  edit(taskData, e) {
    const taskNew = getUpdatedHTML( taskData, e);  // Отрисуем разметку задачи с новыми кнопками
    const input = taskNew.querySelector('input'); // Найдём input

    input.removeAttribute('readonly');   // Разрешаем редактирование
  
    // Задаём фокус внутрь контейнера. 
    input.focus();

    return;
  },
  cancel(taskData, e) {
    const task = getParent(e, 'li'); // Получаем шаблон задачи
  
    task.querySelector('input').setAttribute('readonly', ''); // Запрещаем ред-ние шаблона задачи
    getUpdatedHTML( taskData, e);   // Заново отрисуем разметку задачи
  
    return;
  },
  save(taskData, e) {
    const task = getParent(e, 'li');  // Получаем шаблон задачи
    const input = task.querySelector('input[type = "text"]');   // Получаем инпут задачи
    
    input.setAttribute('readonly', '');  // Запрещаем редак-ние инпута
    input.value = taskData.text;  // сохраняем ввод в поле задачи
  
    console.log('Сообщение сохранено успешно'); // Выводим уведомление об успехе
  
    getUpdatedHTML( taskData, e);    // Отрисуем разметку задачи с новыми данными
  
    return;
  }
}

export { taskManager };
