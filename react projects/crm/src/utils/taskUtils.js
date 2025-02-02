import validate from './validate';

export const setTimeStamp = () => {
  return Date.now();
}

export const createNewTask = (task) => {
  const checkFieldValues = ['full_name', 'phone', 'email']; // Поля для проверки
  const isValid = validate.fieldsOfTaskObj(task, checkFieldValues);

  if (isValid) {
    task.timestamp = setTimeStamp();
    task.changed = setTimeStamp();
    task.status = !task.status ? 'new' : task.status;
    task.phone = validate.phone(task.phone).value; // уберем пробелы и символы из номера 

    return task;
  }

}

// Ф-ция отправляет данные формы
export const sendNewFormData = async (path, type, data, setAppState, id=null) => {
  const newTask = createNewTask(data);
  const serverPath = id ? `${path}/${id}` : path;

  try {
    const response = await fetch(serverPath, {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (type !== 'DELETE' && !response.ok) {
      console.log("Не получены задачи с сервера");
      return;
    }

    const newTaskData = await response.json();

    setAppState((prevState) => ({
      ...prevState,
      data: [...prevState.data, newTaskData],
    }));
  } catch (error) {
    console.log(`Ошибка при сохранении новой задачи`);
    return;
  } 
};

export const removeTask = async (id, path, setAppState, navigate) => {
    if (!window.confirm(`Удалить задачу №${id}?`))  return;
    
  
    try {
      await sendNewFormData(`${path}/${id}`, "DELETE"); // Удаляем задачу с сервера
  
      setAppState((prev) => ({
        ...prev,
        data: prev.data.filter((task) => task.id !== id), // Меняем состояние
      }));
  
      navigate("/tasks"); // Возврат к списку задач
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
};

