let columnIdCounter = 4;


const columnsContainer = document.querySelector('.columns');
const columns = document.querySelectorAll('.column');
const notes = document.querySelectorAll('.note');
const headers = document.querySelectorAll('.column-header');
const btnAddColumn = document.querySelector('[data-action-addColumn]');

// Ф-ция обрабатывает колонки
const columnHandling = (columnElement) => {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote');
  
    spanAction_addNote.addEventListener('click', () => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.setAttribute('draggable', 'true');
      noteElement.setAttribute('data-note-id', Note.idCounter);
      
      Note.idCounter++;
  
      columnElement.querySelector('[data-notes]').append(noteElement)

      // Деалеам новую заметку сразу редактируемый, помещаем в фокус
      noteElement.setAttribute('contentEditable', true);
      noteElement.focus();

      // По двойному клику редактируем Note
      Note.noteHandling(noteElement);
    });
    
    columnElement.addEventListener('dragover', function (event)  {
      event.preventDefault();
    });
    
    columnElement.addEventListener('drop', function (event)  {
      if (Note.dragged) {
        return columnElement.querySelector('[data-notes]').append(Note.dragged);
      }
    });
}

// Ф-ция обрабатывает заголовки
const headerHandling = (headerElement) => {
  headerElement.addEventListener('dblclick', () => {
    headerElement.setAttribute('contentEditable', true);
    headerElement.focus();
  });

  headerElement.addEventListener('blur', () => {
    headerElement.removeAttribute('contentEditable');
  });

  
}

document.addEventListener('DOMContentLoaded', () => {
  btnAddColumn.addEventListener('click', (e) => {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('draggable', true);
    columnElement.setAttribute('data-column-id', columnIdCounter);
    columnIdCounter++;
  
    columnElement.innerHTML = 
      `
        <p class="column-header">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
          <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>
      `;
    const headerElement = columnElement.querySelector('.column-header');

    headerElement.addEventListener('dblclick', () => headerHandling(headerElement));
  
    columnsContainer.append(columnElement);
    columnHandling(columnElement);
  });
  
  // Слушаем клик по кнопке в каждой колонке
  columns.forEach(column => columnHandling(column));

  // По двойному клику редактируем Note
  notes.forEach(noteElement => Note.noteHandling(noteElement));

  // По двойному клику редактируем заголовок
  headers.forEach(headerElement => headerHandling(headerElement));
});

