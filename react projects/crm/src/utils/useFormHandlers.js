import { createNewTask } from "../utils/taskUtils";

// Ф-ция обновляет поля формы в состоянии при вводе пользователя 
export const updateFieldValue = (id, value, setAppState) => {
  setAppState((prevAppState) => ({
    ...prevAppState,
    formData: {
      ...prevAppState.formData,
      [id]: value,
    }
  }));
};

// Ф-ция делает поле пустым по клику и возвращает id этого элемента 
export const clearFieldOnClick = (e, setAppState) => {
  const {id, tagName} = e.target; // Получаем id и тег поля
  const isSelect = tagName === "SELECT"; // Проверяем, если тег является select

  if (!isSelect) {
    updateFieldValue(id, "", setAppState); // Очищаем поле для  input
  }

  return id; // на случай использования 
};

// Ф-ция проверяет пустой ввод и вернёт предыдущее значение поля
export const handleBlurValue = (e, appState, setAppState) => {
  const { id } = e.target;

  if (appState.formData[id]?.trim() === "") {
    updateFieldValue(id, appState.initialFormData[id], setAppState);
  }
};

// Ф-ция обрабатывает клик по кнопке формы
export const btnClicked = async (e, path, appState,  setAppState) => {
  if (e.target.dataset.btn !== "submit") return;

  e.preventDefault();
  const newTask = createNewTask(appState.formData);

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });
    
    if (!response.ok) {
      console.log('Не получены задачи с сервера');	
      return;
    }

    const newTaskData = await response.json();

    setAppState((prevState) => ({
      ...prevState,
      data: [...prevState.data, newTaskData]
    }))
  }
  catch (error) {
    console.log(`Ошибка при сохранении новой задачи: ${error}`);
  }
  
};

 

 