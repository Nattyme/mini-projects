import * as model from './model/model.js';
import * as view from './view/view.js';


view.changeTitle (); // При загрузке страницы изменяем заголовок, если список задач пуст

// Прослушивание событий фильтра, запускаем функцию  фильтра
view.elements.filter.addEventListener('keyup', doFilter);

// Отмена стандарт. поведение формы - по нажатию на submit страница не будет обновляться
view.elements.addForm.addEventListener('submit', function(e) {
  e.preventDefault();
});

// Добавляем прослушивание контейнеру с задачами, запускаем функцию обработки задач
view.elements.mainContainer.addEventListener('click', taskHandling);
