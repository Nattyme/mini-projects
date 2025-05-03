let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedNote = null;

const columnsContainer = document.querySelector('.columns');
const columns = document.querySelectorAll('.column');
const notes = document.querySelectorAll('.note');
const headers = document.querySelectorAll('.column-header');
const btnAddColumn = document.querySelector('[data-action-addColumn]');



// Ф-ция обрабатываем заметки
const noteHandling = (noteElement) => {
  noteElement.addEventListener('dblclick', () => {
    noteElement.setAttribute('contentEditable', true);
    noteElement.focus();
  });

  noteElement.addEventListener('blur', () => noteElement.removeAttribute('contentEditable'));
  const dragstart_noteHandler = function (event)  {
    // console.log('dragstart_noteHandler', event, this);
    draggedNote = this;
    this.classList.add('dragged');
  }
  const dragend_noteHandler = function (event)  {
    // console.log('dragend_noteHandler', event, this);
    draggedNote = null;
    this.classList.remove('dragged');
  }
  const dragenter_noteHandler = function (event)  {
    if (this === draggedNote) return;
    console.log('dragenter_noteHandler', event, this);
    this.classList.add('under');
  }
  const dragover_noteHandler = function (event)  {
    if (draggedNote === this) return;
    console.log('dragover_noteHandler', event, this);
  }
  const dragleave_noteHandler = function (event)  {
    if (draggedNote === this) return;
    console.log('dragleave_noteHandler', event, this);
    this.classList.remove('under');
  }
  const drop_noteHandler = function (event)  {
    if (draggedNote === this) return;
    console.log('drop_noteHandler', event, this);
  }

  noteElement.addEventListener('dragstart', dragstart_noteHandler);
  noteElement.addEventListener('dragend', dragend_noteHandler);
  noteElement.addEventListener('dragover', dragover_noteHandler);
  noteElement.addEventListener('dragenter', dragenter_noteHandler);
  noteElement.addEventListener('dragleave', dragleave_noteHandler);
  noteElement.addEventListener('drop', drop_noteHandler);
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

// Ф-ция обрабатываем заголовков
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
  notes.forEach(noteElement => noteHandling(noteElement));

  // По двойному клику редактируем заголовок
  headers.forEach(headerElement => headerHandling(headerElement));
});

