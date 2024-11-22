import { buttons } from './buttons.js';

class TaskHTML {
  constructor ( {id, text, buttonTypes = ['edit', 'delete'] }) {
    this.id = id,
    this.text = text,
    this.buttonTypes = buttonTypes;
  }

   // Метод ищет html кнопкок массива buttonsNeed в св-вах объекта buttonsAll. Возвращает разметку
  getButtonsHTML () {
    return  this.buttonTypes.map( (type) => type ?  buttons[type].html : '').join(' ');
  }

  // Метод возвращает разметку задачи 
  getHTML () {
    
    return  `
              <li class="list-group-item" data-display data-id="${this.id}">
                  <p>${this.text}</p>
                  <div class="buttons-wrapper d-flex justify-content-end">
                    ${this.getButtonsHTML(this.buttonTypes)}
                  </div>
              </li>
            `;
    
  }
}

export { TaskHTML };