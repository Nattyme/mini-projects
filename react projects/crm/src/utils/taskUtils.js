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
    task.phone = validate.phone(task.phone).value; // уберем пробелы и символы из номера 

    return task;
  }

}