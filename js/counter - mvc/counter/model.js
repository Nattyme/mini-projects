const model = {
  counter : 0,
  increase : function () {
    this.counter = this.counter + 1;
  },

  decrease : function () {
    this.counter = this.counter - 1;
  },

  reset : function () {
    this.counter = 0;
  }
}

export default model;