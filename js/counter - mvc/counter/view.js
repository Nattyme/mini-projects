const view = {
  input : document.querySelector('#input'),
  updateCounter : function (counter) {
    this.input.value = counter;
  }
}

export default view;