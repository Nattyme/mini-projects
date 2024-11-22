import { buttons } from './buttons.js';

class TaskHTML {
  constructor ( id, text, buttonTypes ) {
    this.id = id,
    this.text = text,
    this.buttonTypes = buttonTypes;
  }

   // Метод ищет html кнопкок массива buttonsNeed в св-вах объекта buttonsAll. Возвращает разметку
  getButtonsHTML () {
    return this.buttonTypes.map( (type) => type ?  buttons[type].html : '').join(' ');
  }

  // Метод возвращает разметку задачи 
  getHTML () {
    
    return  `
              <li class="list-group-item" data-display data-id="${this.id}">
                  ${this.text}
                  ${this.getButtonsHTML()}
              </li>
            `;
    
  }
}

export { TaskHTML };