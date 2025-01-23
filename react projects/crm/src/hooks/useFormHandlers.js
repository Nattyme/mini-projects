export const useFormHandlers = (formData, initialFormData, setFormData) => {
  const updateFieldValue = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: initialFormData[id],
      }));
    }
  };

  return {updateFieldValue, clickedFieldTarget, handleBlurValue}
}
 