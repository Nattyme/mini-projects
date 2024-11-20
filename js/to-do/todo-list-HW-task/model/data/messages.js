const MESSAGES = {
  notifications : {
    error : { 
      short_value : () => console.log('Ошибка. Поле не может содержать менее 5-ти символов'),
      empty_value : () => console.log('Ошибка. Поле не может быть пустым.')
    },

    success : {

    },

    confirm : {
      task_delete : () => console.log(`Вы уверены, что хотите удалить задачу "${taskText}"?`),
    }


  }
  
}

export { MESSAGES };