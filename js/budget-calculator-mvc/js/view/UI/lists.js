import { elements, RecordHtml, getRecordHtml } from '../view.js';

// Ф-ция определяет тип списка с записями
const getRecordListType = function (type) {
  return type === 'inc' ? elements.recordsLists.incomesList : elements.recordsLists.expensesList;
}

// Ф-ция добавляет HTML код записей
const insertRecordHtml = function (listType, record) {

  // В зав-ти от типа листа выбираем иконку и модификатор класса для Li
  const icon = listType === elements.recordsLists.incomesList ? 'circle-green.svg' : 'circle-red.svg';

  // В зав-ти от типа листа выбираем модификатор класса для Li
  const classMode = listType === elements.recordsLists.incomesList ? 'income' : 'expense';

  // Создадим объект с данными записи и сохр. в recordHtml
  let recordData =  new RecordHtml(record, classMode, icon);

  // Подставим знач-я записи в шаблон и добавим на страницу
  listType.insertAdjacentHTML('afterbegin', getRecordHtml(recordData));
}

// Ф-ция отображает записи на странице
const displayRecord = function (record) {
  // Получим тип листа с записями
  let list = getRecordListType(record.type);

  // Добавим запись в нужный лист 
  insertRecordHtml(list, record);
}

// Ф-ция удаляет запись со страницы
const removeRecordHtml = function (buttonDelete) {
  const recordParent = buttonDelete.closest('li.budget-list__item');  
  const id = recordParent.dataset.id;  

  if (recordParent) recordParent.remove(id); 
  
  return id; // Вернём id элемента Li
}


export { displayRecord, insertRecordHtml, removeRecordHtml, getRecordListType };