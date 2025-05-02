let noteIdCounter = 8
let columnIdCounter = 4

const columnsContainer = document.querySelector('.columns');
const columns = document.querySelectorAll('.column');
const btnAddColumn = document.querySelector('[data-action-addColumn]');
const notes = document.querySelectorAll('.note');

// Ф-ция обрабатываем заметки
const noteHandling = (noteElement) => {
  noteElement.addEventListener('dblclick', () => {
    noteElement.setAttribute('contentEditable', true);
    noteElement.focus();
  });

  noteElement.addEventListener('blur', (event) => {
    noteElement.sremoveAttribute('contentEditable');
  });
}

// Ф-ция обрабатываем колонки
const columnHandling = (columnElement) => {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote');
  
    spanAction_addNote.addEventListener('click', () => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.setAttribute('draggable', 'true');
      noteElement.setAttribute('data-note-id', noteIdCounter);
      
      noteIdCounter++;
  
      columnElement.querySelector('[data-notes]').append(noteElement);

      // По двойному клику редактируем Note
      noteHandling(noteElement);
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
        <p class="column-header" contenteditable="true">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
          <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>
      `;
  
    columnsContainer.append(columnElement);
    columnHandling(columnElement);
  });
  
  // Слушаем клик по кнопке в каждой колонке
  columns.forEach(column => columnHandling(column));

  // По двойному клику редактируем Note
  notes.forEach(noteElement => noteHandling(noteElement));
});

