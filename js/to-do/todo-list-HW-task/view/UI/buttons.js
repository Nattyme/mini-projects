const buttons = {
  edit : {
    classList : ['btn', 'btn-warning', 'btn-sm', 'float-right', 'mr-1'],
    innerText : 'Редактировать',
    dataAction : 'edit',
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
}

// Ф-ция ищет html кнопкок массива buttonsNeed в св-вах объекта buttonsAll. Возвращает массив 
const getButtons = function (buttonsAll, buttonsNeed) {
  const buttons = [];
 
   buttonsNeed.forEach ( button => {
    for (let key in buttonsAll) {
      if (key === button) {
        buttons.push(buttonsAll[key].html);
      }
     }
  });

 return buttons.join(' ');
  
}


export { buttons, getButtons };