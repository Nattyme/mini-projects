const Column = {
  idCounter : 4,
  increaseId () {this.idCounter++},
  handling (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote');

    spanAction_addNote.addEventListener('click', () => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.setAttribute('draggable', 'true');
      noteElement.setAttribute('data-note-id', Note.idCounter);
      
      Note.increaseId();

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
}