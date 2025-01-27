export const useFormHandlers = (appState, setAppState) => {

  const updateFieldValue = (id, value) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      formData: {
        ...prevAppState.formData,
        [id]: value,
      }
    }));
  };

  // Function check clicked target
  const clickedFieldTarget = (e) => {
    const id = e.target.id; // Получаем id поля
    const isSelect = e.target.tagName === "SELECT"; // Проверяем, что это select

    if (!isSelect) {
      updateFieldValue(id, ""); // Очищаем поле для  input
    }

    return id;
  };

  // Funtion set prev form field data if field value is not changed
  const handleBlurValue = (e) => {
    const { id } = e.target;

    if (appState.formData[id].trim() === "") {
      updateFieldValue(id, appState.initialFormData[id]);
    }
  };

  return {updateFieldValue, clickedFieldTarget, handleBlurValue}
}
 