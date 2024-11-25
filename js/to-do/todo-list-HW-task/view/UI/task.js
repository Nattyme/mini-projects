import { ButtonFactory } from './buttons.js';
import { BUTTON_TYPES } from './buttonTypes.js';

class TaskFactory {
  constructor ( {id, text, buttonTypes = [BUTTON_TYPES.EDIT, BUTTON_TYPES.DELETE] }) {
    this.id = id,
    this.text = text,
    this.buttonTypes = buttonTypes;
    console.log('Button Types in Constructor:', this.buttonTypes);
  }

   // Метод получает от фабрики кнопок нужную разметку
  getButtonsHTML() {
    return  this.buttonTypes.map( (type) => ButtonFactory.createButton(type)).join(' ');
  }
  getButtonsHTML() {
    return this.buttonTypes.map(type => ButtonFactory.createButton(type)).join(' ');
  }
  

  // Метод возвращает разметку задачи 
  getHTML () {
    // Меняем стиль рамки для инпута задачи
    const inputBorder = this.buttonTypes.includes(BUTTON_TYPES.SAVE) 
    ? 'style = "border-color: #ced4da; box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);"'
    : 'style = "border-color: transparent; box-shadow: 0 0 0 .2rem transparent; background-color: transparent"';
  
  
    return  `
              <li class="list-group-item" data-display data-id="${this.id}">
                  <input 
                      type="text" 
                      class="form-control mr-2 mb-3 flex-grow-1" 
                      ${inputBorder} 
                      value="${this.text}"
                      readonly
                      >
                  <div class="buttons-wrapper d-flex justify-content-end">
                    ${this.getButtonsHTML(this.buttonTypes)}
                  </div>
              </li>
            `;
    
  }
}

export { TaskFactory };