const MESSAGES = {
  notifications : {
    error : { 
      short_value : 'Ошибка. Поле не может содержать менее 5-ти символов',
      empty_value : 'Ошибка. Поле не может быть пустым.',
      unvalide_value : 'Вы указали недопустимые символы. Формат текста: [aA-Zа-яА-Я, 0-9, \?!;:"\()&+\-=]'
    },

    success : {
      task_add : 'Задача добавлена',
      task_edit : 'Задача обновлена',
      task_save : 'Задача сохранена',
    },

    confirm : {
      task_delete : `Вы уверены, что хотите удалить задачу?`,
    }
  }
  
}

export { MESSAGES };