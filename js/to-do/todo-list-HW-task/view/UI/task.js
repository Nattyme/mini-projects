import { ButtonFactory } from './buttons.js';

class TaskHTML {
  constructor ( {id, text, buttonTypes = ['edit', 'delete'] }) {
    this.id = id,
    this.text = text,
    this.buttonTypes = buttonTypes;
    console.log('Button Types in Constructor:', this.buttonTypes);
  }

   // Метод ищет html кнопок массива buttonsNeed в св-вах объекта buttonsAll. Возвращает разметку
  getButtonsHTML() {
    return  this.buttonTypes.map( (type) => ButtonFactory.createButton(type)).join(' ');
  }
  getButtonsHTML() {
    return this.buttonTypes.map(type => ButtonFactory.createButton(type)).join(' ');
  }
  

  // Метод возвращает разметку задачи 
  getHTML () {
    let inputBorder = 'style = "border-color: transparent; background-color: transparent;"';
    if (this.getButtonsHTML().includes('save')) {
      inputBorder = 'style = "border-color: #ced4da; background-color: #e9ecef;"';
    }
  
    return  `
              <li class="list-group-item" data-display data-id="${this.id}">
                  <input type="text" class="form-control mr-2 mb-3 flex-grow-1" ${inputBorder} value="${this.text}">
                  <div class="buttons-wrapper d-flex justify-content-end">
                    ${this.getButtonsHTML(this.buttonTypes)}
                  </div>
              </li>
            `;
    
  }
}

export { TaskHTML };