import { TYPE, TEXT } from './messagesTypes.js';

const MESSAGES = {
  [TYPE.ERROR] : { 
    [TEXT.SHORT] : `<div class="alert alert-danger" role="alert"></div>Ошибка. Поле не может содержать менее 5-ти символов</div>`,
    [TEXT.EMPTY] :  `<div class="alert alert-danger" role="alert">Ошибка. Поле не может быть пустым.</div>`,
    [TEXT.UNVALID] : `<div class="alert alert-danger" role="alert">Ошибка сохранения. Вы указали недопустимые символы. Формат текста: [aA-Zа-яА-Я, 0-9, \?!;:"\()&+\-=]</div>`
  },

  [TYPE.SUCCESS] : {
    task_add : `<div class="alert alert-success" role="alert"></div>'Задача добавлена'</div>`,
    task_edit : `<div class="alert alert-success" role="alert"></div>Задача обновлена</div>`,
    task_save : `<div class="alert alert-success" role="alert"></div>Задача сохранена</div>`,
  },

  [TYPE.DELETE] : {
    // task_delete : prompt(`Вы уверены, что хотите удалить задачу?`),
  }
  
};

export { MESSAGES };