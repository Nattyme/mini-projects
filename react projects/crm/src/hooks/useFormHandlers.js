export const useFormHandlers = (formData, initialFormData, setAppState) => {
  const updateFieldValue = (id, value) => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      [formData[id]]: value,
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

    if (formData[id].trim() === "") {
      setAppState((prevAppState) => ({
        ...prevAppState,
        [formData[id]]: initialFormData[id],
      }));
    }
  };

  return {updateFieldValue, clickedFieldTarget, handleBlurValue}
}
 