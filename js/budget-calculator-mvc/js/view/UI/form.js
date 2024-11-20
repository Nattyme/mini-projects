import { elements } from '../view.js';

// Ф-ция записывает данные формы в объект
const getFormValues = function () {
  const formValues = {
    type : elements.form.type.value,
    title : elements.form.title.value,
    value : elements.form.value.value 
  }
  return formValues;
}

// Ф-ция очищает форму и сбрасывает ошибки.
const clearForm = function (isValid) {
  elements.formEl.reset();

  // Найдем ошибки (если есть)
  const errorsArray = document.querySelectorAll('.form__input--error');

  // Есть есть ошибки - сбросим
  if (errorsArray.length !== 0 ) {
    errorsArray.forEach(error => {
      error.classList.remove('form__input--error');
    });
  }

  // Вернём значение для isValid
  isValid = true;

}

export { clearForm, getFormValues } 