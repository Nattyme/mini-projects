import validate from './validate';

export const setTimeStamp = () => {
  return Date.now();
}

// Ф-ция проверяет полученную задачу и возвращает валидные данные для сохранения
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

// Создание новой задачи
export const createTask = async (path, data, setAppState) => {
  const newTask = createNewTask(data);

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      console.log("Ошибка при добавлении задачи");
      return;
    }

    const createdTask = await response.json();

    setAppState((prevState) => ({
      ...prevState,
      data: [...prevState.data, createdTask], // Добавляем новую задачу
    }));
  } catch (error) {
    console.log("Ошибка при отправке новой задачи:", error);
  }
};

// Ф-ция обновляет задачу
export const updateTask = async (path, id, data, setAppState) => {
  const updatedTask = createNewTask(data); // Проверяем поля формы, записыываем в переменную
  const serverPath = `${path}/${id}`;

  try {
    const response = await fetch(serverPath, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      console.log("Ошибка при сохранении обновления задачи");
      return;
    }

    const taskToUpdate = await response.json();

    setAppState((prevState) => ({
      ...prevState,
      data: prevState.data.map((task) =>
        task.id === +taskToUpdate.id ? { ...task, ...taskToUpdate } : task
      ),
    }));
  } 
  
  catch (error) {
    console.log("Ошибка при сохранения обновления задачи:", error);
  }
};

// Ф-ция удаляет задачу
export const deleteTask = async (path, id, setAppState, navigate) => {
  if (!window.confirm(`Удалить задачу №${id}?`)) return;

  try {
    await fetch(`${path}/${id}`, {
      method: "DELETE",
    });

    setAppState((prevState) => ({
      ...prevState,
      data: prevState.data.filter((task) => task.id !== id),
    }));

    navigate("/tasks"); // Возврат к списоку задач
  } 
  
  catch (error) {
    console.log("Ошибка при удалении задачи:", error);
  }
};
