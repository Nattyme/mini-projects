// Ф-ция находит кнопку 'удалить'
const getButtonDelete = function (e) {
  return e.target.closest('[data-delete]');
}

export { getButtonDelete };