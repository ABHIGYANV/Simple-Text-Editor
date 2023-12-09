
    var editor = document.getElementById('editor');
    var prevState = editor.innerHTML;
    var undoStack = [];
    var redoStack = [];

    document.getElementById('colorPicker').addEventListener('input', applyStyles);
    document.getElementById('fontSelect').addEventListener('change', applyStyles);
    document.getElementById('fontSize').addEventListener('input', applyStyles);

    function applyStyles() {
      var color = document.getElementById('colorPicker').value;
      var font = document.getElementById('fontSelect').value;
      var fontSize = document.getElementById('fontSize').value;

      saveState();
      
      editor.style.color = color;
      editor.style.fontFamily = font;
      editor.style.fontSize = fontSize + 'px';
    }

    function saveState() {
      undoStack.push(editor.innerHTML);
      prevState = editor.innerHTML;
    }

    function undo() {
      if (undoStack.length > 0) {
        redoStack.push(editor.innerHTML);
        editor.innerHTML = undoStack.pop();
      }
    }

    function redo() {
      if (redoStack.length > 0) {
        undoStack.push(editor.innerHTML);
        editor.innerHTML = redoStack.pop();
      }
    }

    function saveDocument() {
      var content = editor.innerHTML;
      console.log(content);
      alert('Document Saved.');
    }

    function addText() {
      var newBox = document.createElement('div');
      newBox.classList.add('draggable-box');

      var newText = document.createElement('p');
      newText.textContent = 'Add Text Here';
      newBox.appendChild(newText);

      newBox.style.left = '0';
      newBox.style.top = '0';
      newBox.style.cursor = 'move';
      newBox.addEventListener('mousedown', startDrag);

      editor.appendChild(newBox);
      saveState();
    }

    var activeItem = null;
    var offsetX, offsetY;

    function startDrag(e) {
      activeItem = e.target;
      offsetX = e.clientX - activeItem.getBoundingClientRect().left;
      offsetY = e.clientY - activeItem.getBoundingClientRect().top;

      document.addEventListener('mousemove', dragItem);
      document.addEventListener('mouseup', endDrag);
    }

    function dragItem(e) {
      if (activeItem !== null) {
        activeItem.style.left = e.clientX - offsetX + 'px';
        activeItem.style.top = e.clientY - offsetY + 'px';
      }
    }

    function endDrag() {
      activeItem = null;
      document.removeEventListener('mousemove', dragItem);
      document.removeEventListener('mouseup', endDrag);
    }

    function placeText(e) {
      if (activeItem !== null) {
        activeItem.style.left = e.clientX - editor.getBoundingClientRect().left - offsetX + 'px';
        activeItem.style.top = e.clientY - editor.getBoundingClientRect().top - offsetY + 'px';
      }
    }