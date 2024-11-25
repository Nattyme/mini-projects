import { BUTTON_TYPES } from './buttonTypes.js';

class ButtonFactory {
  static createButton (type) {
    // Объект всех кнопок с настройками
    const buttonConfig = {
      [BUTTON_TYPES.EDIT] : {
        classList : ['btn', 'btn-warning', 'btn-sm', 'float-right', 'mr-1'],
        innerText : 'Редактировать',
        dataAction : BUTTON_TYPES.EDIT,
      },
      
      [BUTTON_TYPES.DELETE] : {
        classList : ['btn', 'btn-danger', 'btn-sm', 'float-right', 'mr-2'],
        innerText : 'Удалить',
        dataAction : BUTTON_TYPES.DELETE,
        get html() { 
          return  `
                    <button
                      data-action="${this.dataAction}"
                      type="button"
                      class="${this.classList.join(' ')}"
                    >
                        ${this.innerText}
                    </button>
                  `
      }
      },
    
      [BUTTON_TYPES.SAVE] : {
        classList : ['btn', 'btn-success', 'btn-sm', 'float-right', 'mr-1'],
        innerText : 'Сохранить',
        dataAction : BUTTON_TYPES.SAVE,
        get html() { 
          return  `
                    <button
                      data-action="${this.dataAction}"
                      type="button"
                      class="${this.classList.join(' ')}"
                    >
                        ${this.innerText}
                    </button>
                  `
      }
      },
    
      [BUTTON_TYPES.CANCEL] : {
        classList : ['btn', 'btn-light', 'btn-sm', 'float-right', 'mr-2'],
        innerText : 'Отмена',
        dataAction : BUTTON_TYPES.CANCEL,
        get html() { 
          return  `
                    <button
                      data-action="${this.dataAction}"
                      type="button"
                      class="${this.classList.join(' ')}"
                    >
                        ${this.innerText}
                    </button>
                  `
      }
      }
    };

    const button = buttonConfig[type]; // Запишем нужную кнопку в переменную
    if ( ! button ) return ''; // Если кнопка не найдена вернём пустую строку

    // Вернём шаблон для кнопки
    return  `
              <button data-action="${button.dataAction}" type="button" class="${button.classList.join(' ')}">
                  ${button.innerText}
              </button>
            `;
  }
  
}

export { ButtonFactory };