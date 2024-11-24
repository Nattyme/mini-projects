const getInput = function (element, selector='input[type = "text"') {
  // Если получили инпут - записываем в перем., если контейнер - ищем
  const input = element.matches( selector ) ? element : element.querySelector( selector );

  // Если не найдём Input
  if(!selector) console.error('Input не найден');

  // Возвращаем ввод пользователя
  return input;
}

export { getInput };