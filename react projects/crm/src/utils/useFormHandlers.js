export const useFormHandlers = (appState, setAppState) => {

  // Ф-ция обновляет поля формы в состоянии при вводе пользователя 
  const updateFieldValue = (id, value) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      formData: {
        ...prevAppState.formData,
        [id]: value,
      }
    }));
  };

  // Ф-ция делает поле пустым по клику и возвращает id этого элемента 
  const clearFieldOnClick = (e) => {
    const {id, tagName} = e.target; // Получаем id и тег поля
    const isSelect = tagName === "SELECT"; // Проверяем, если тег является select

    if (!isSelect) {
      updateFieldValue(id, ""); // Очищаем поле для  input
    }

    return id; // на случай использования 
  };

  // Ф-ция проверяет пустой ввод и вернёт предыдущее значение поля
  const handleBlurValue = (e) => {
    const { id } = e.target;

    if (appState.formData[id]?.trim() === "") {
      updateFieldValue(id, appState.initialFormData[id]);
    }
  };

  return {updateFieldValue, clearFieldOnClick, handleBlurValue}
}
 