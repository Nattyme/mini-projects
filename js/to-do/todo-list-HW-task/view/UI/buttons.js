// const buttons = {
//   edit : {
//     classList : ['btn', 'btn-warning', 'btn-sm', 'float-right', 'mr-1'],
//     innerText : 'Редактировать',
//     dataAction : 'edit',
//     get html() { 
//         return  `
//                   <button
//                     data-action="${this.dataAction}"
//                     type="button"
//                     class="${this.classList.join(' ')}"
//                   >
//                       ${this.innerText}
//                   </button>
//                 `
//     }
//   },
  
//   delete : {
//     classList : ['btn', 'btn-danger', 'btn-sm', 'float-right', 'mr-2'],
//     innerText : 'Удалить',
//     dataAction : 'delete',
//     get html() { 
//       return  `
//                 <button
//                   data-action="${this.dataAction}"
//                   type="button"
//                   class="${this.classList.join(' ')}"
//                 >
//                     ${this.innerText}
//                 </button>
//               `
//   }
//   },

//   save : {
//     classList : ['btn', 'btn-success', 'btn-sm', 'float-right', 'mr-1'],
//     innerText : 'Сохранить',
//     dataAction : 'save',
//     get html() { 
//       return  `
//                 <button
//                   data-action="${this.dataAction}"
//                   type="button"
//                   class="${this.classList.join(' ')}"
//                 >
//                     ${this.innerText}
//                 </button>
//               `
//   }
//   },

//   cancel : {
//     classList : ['btn', 'btn-light', 'btn-sm', 'float-right', 'mr-2'],
//     innerText : 'Отмена',
//     dataAction : 'cancel',
//     get html() { 
//       return  `
//                 <button
//                   data-action="${this.dataAction}"
//                   type="button"
//                   class="${this.classList.join(' ')}"
//                 >
//                     ${this.innerText}
//                 </button>
//               `
//   }
//   }
// }
class ButtonFactory {
  static createButton (type) {
    // Объект всех кнопок с настройками
    const buttonConfig = {
      edit : {
        classList : ['btn', 'btn-warning', 'btn-sm', 'float-right', 'mr-1'],
        innerText : 'Редактировать',
        dataAction : 'edit',
      },
      
      delete : {
        classList : ['btn', 'btn-danger', 'btn-sm', 'float-right', 'mr-2'],
        innerText : 'Удалить',
        dataAction : 'delete',
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
    
      save : {
        classList : ['btn', 'btn-success', 'btn-sm', 'float-right', 'mr-1'],
        innerText : 'Сохранить',
        dataAction : 'save',
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
    
      cancel : {
        classList : ['btn', 'btn-light', 'btn-sm', 'float-right', 'mr-2'],
        innerText : 'Отмена',
        dataAction : 'cancel',
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

    const button = buttonConfig[type]; // Запишем запрошенную кнопку в переменную
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