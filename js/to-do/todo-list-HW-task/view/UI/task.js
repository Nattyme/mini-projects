import { buttons } from './buttons.js';

class TaskHTML {
  constructor ({ id, text, buttonTypes }) {
    this.id = id,
    this.text = text,
    this.buttonTypes = buttonTypes;
  }

  // Ф-ция ищет html кнопкок массива buttonsNeed в св-вах объекта buttonsAll. Возвращает массив 
  getHTML () {
    const buttosHTML = this.buttonTypes.map(
      function (type) {
        if (type) {
          return buttons[type].html;
        } else {
          return '';
        }
      }
    );


    return  `
              <li class="list-group-item" data-id="${this.id}">
                  ${this.text}
                  ${buttosHTML.join(' ')}
              </li>
            `;
    
  }
}

export { TaskHTML };