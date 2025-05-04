const Note =  {
  idCounter : 8,
  dragged : null,
  noteHandling (noteElement) {
    noteElement.addEventListener('dblclick', () => {
      noteElement.setAttribute('contentEditable', true);
      noteElement.removeAttribute('draggable');
      noteElement.closest('.column').removeAttribute('draggable');
      noteElement.focus();
    });

    noteElement.addEventListener('blur', () => {
      noteElement.removeAttribute('contentEditable');
      noteElement.setAttribute('draggable', true);
      noteElement.closest('.column').setAttribute('draggable', true);
      if(!noteElement.textContent.trim().length) noteElement.remove();
    });
    noteElement.addEventListener('dragstart', Note.dragstart);
    noteElement.addEventListener('dragend', Note.dragend);
    noteElement.addEventListener('dragover', Note.dragover);
    noteElement.addEventListener('dragenter', Note.dragenter);
    noteElement.addEventListener('dragleave', Note.dragleave);
    noteElement.addEventListener('drop', Note.drop);
  },
  dragstart : function (event)  {
    event.stopPropagation();
    Note.dragged = this;
    this.classList.add('dragged');
  },
  
  dragend : function (event)  {
    Note.dragged = null;
    this.classList.remove('dragged');
  
    columnsContainer
    .querySelectorAll('.note')
    .forEach(x => x.classList.remove('under'));
  },
  
  dragenter : function (event)  {
    if (this === Note.dragged) return;
   
    this.classList.add('under');
  },
  
  dragover : function (event)  {
    event.preventDefault();
    if (Note.dragged === this) return;
  },
  
  dragleave : function (event)  {
    if (Note.dragged === this) return;
    
    this.classList.remove('under');
  },
  
  drop : function (event)  {
    event.stopPropagation();
    if (Note.dragged === this) return;
  
  
    if (this.parentElement !== Note.dragged.parentElement) {
      this.parentElement.insertBefore(Note.dragged, this);
    } else {
      const notes = Array.from(this.parentElement.querySelectorAll('.note'));
      const indexDraggedNote = notes.indexOf(Note.dragged);
      const indexUnderNote = notes.indexOf(this);
  
      if (indexUnderNote < indexDraggedNote) {
        this.parentElement.insertBefore(Note.dragged, this);
      } else {
        this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
      }
    }
    
  }
}
