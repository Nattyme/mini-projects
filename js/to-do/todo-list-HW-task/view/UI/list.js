import { buttons } from './buttons.js';

class Task {
  constructor (text, buttonTypes) {
    this.text = text,
    this.buttonTypes = buttonTypes
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
              <li class="list-group-item">
                  ${this.text}
                  ${buttosHTML.join(' ')}
              </li>
            `;
    
  }
}



export { Task };