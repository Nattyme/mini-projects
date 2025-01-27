export const useFormHandlers = (appState, setAppState) => {
  console.log('поле обновляетсмя');
  
  const updateFieldValue = (id, value) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      formData: {
        ...prevAppState.formData,
        [id]: value,
      }
    }));
  };

  const clickedFieldTarget = (e) => {
    const id = e.target.id; // Получаем id поля
    const isSelect = e.target.tagName === "SELECT"; // Проверяем, что это select

    if (!isSelect) {
      updateFieldValue(id, ""); // Очищаем поле для  input
    }
  };

  const handleBlurValue = (e) => {
    const { id } = e.target;

    if (appState.formData[id].trim() === "") {
      setAppState((prevAppState) => ({
        ...prevAppState,
        formData: {
          ...prevAppState.formData,
          [id]: appState.initialFormData[id]
        }
      }));
    }
  };

  return {updateFieldValue, clickedFieldTarget, handleBlurValue}
}
 