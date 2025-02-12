const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");
// Добавление новой задачи 
const addItem = (e) => {
  e.preventDefault();

  const newItemInput = document.getElementById("newItemText");
  const newItemText = newItemInput.value;

  renderTask(newItemText);
  tasks.push(newItemText); // Добюавляем задачу в массив

  const jsonTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', jsonTasks);

  // Очистим поле добавления новой задачи
  newItemInput.value = "";
}
const renderTask = (taskText) => {
  const newElement = document.createElement("li");
  newElement.className = "list-group-item";

  const newTextNode = document.createTextNode(taskText);
  newElement.appendChild(newTextNode);


  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  deleteBtn.className = "btn btn-light btn-sm float-right";
  deleteBtn.dataset.action = "delete";

  // Помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);
  itemsList.prepend(newElement);
}
// Удаление задачи
const removeItem = (e) => {
  if (
      e.target.hasAttribute("data-action") &&
      e.target.getAttribute("data-action") == "delete"
  ) {
      if (!confirm("Удалить задачу?")) return;

      e.target.parentNode.remove();

      const taskText = e.target.closest('.list-group-item').firstChild.textContent;
      const index = tasks.findIndex(item => taskText === item);
      
      if (index !== -1) tasks.splice(index, 1); // Если индекс найден - удаляем задачу из массива
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Перезаписываем LS
  }
}
// Фильтр задач
const filterItems = (e) => {
  // Получаем фразу для поиска и переводим ее в нижний регистр
  const searchedText = e.target.value.toLowerCase();

  // 1. Получаем списко всех задач
  const items = itemsList.querySelectorAll("li");

  // 2. Перебираем циклом все найденные теги li с задачами
  items.forEach(function(item) {
      // Получаем текст задачи из списка и переводим его в нижний регистр
      const itemText = item.firstChild.textContent.toLowerCase();

      // Проверяем вхождение искомой подстроки в текст задачи
      if (itemText.indexOf(searchedText) != -1) {
          // Если вхождение есть - показываем элемент с задачей
          item.style.display = "block";
      } else {
          // Если вхождения нет - скрываем элемент с задачей
          item.style.display = "none";
      }
  });
}


let tasks = [];

if (localStorage.getItem('tasks')) tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach((item) => renderTask(item));
form.addEventListener("submit", addItem);
itemsList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);




