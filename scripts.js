const nightModeToggle = document.getElementById('night-mode-toggle');
const fileInput = document.getElementById('file-input');
const noteEditor = document.getElementById('note-editor');
const saveTextFileButton = document.getElementById('save-text-file-button');
const saveImageButton = document.getElementById('save-image-button');
const textToSpeechButton = document.getElementById('text-to-speech-button');
const savePdfButton = document.getElementById('save-pdf-button');
const loadFileButton = document.getElementById('load-file-button');
const wordCounter = document.getElementById('word-counter');

nightModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
});

loadFileButton.addEventListener('click', () => {
  fileInput.click();
});

const quill = new Quill(noteEditor, {
  modules: {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  theme: 'snow'
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      quill.setText(e.target.result);
    };
    reader.readAsText(file);
  }
});

const autosaveInterval = 30000; // 30 seconds
const localStorageKey = 'xyph-journal-autosave';

quill.setText(localStorage.getItem(localStorageKey) || '');

setInterval(() => {
  localStorage.setItem(localStorageKey, noteText.value);
}, autosaveInterval);

function updateWordCount() {
  var text = quill.getText();
  var words = text.split(/\s+/).length;
  var characters = text.length;
  document.getElementById('word-counter').innerHTML = 'Words: ' + words + ' | Characters: ' + characters;
}


saveTextFileButton.addEventListener('click', () => {
  const data = quill.getText();
  const fileName = prompt('Please enter a file name:');
  if (fileName !== null) {
    const a = document.createElement('a');
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`;
    a.download = `${fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});

saveImageButton.addEventListener('click', () => {
  const fileName = prompt('Please enter a file name:');
  if (fileName !== null) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const quillInstance = new Quill(noteEditor);
    const contents = quillInstance.getContents();
    const text = quillInstance.getText();
    const font = getComputedStyle(noteEditor).font;
    const lineHeight = parseInt(getComputedStyle(noteEditor).lineHeight);
    const lines = text.split('\n');
    const textHeight = lineHeight * lines.length;
    const width = noteEditor.clientWidth;
    const height = textHeight + 20;
    canvas.width = width;
    canvas.height = height;
    context.font = font;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#000';
    quillInstance.formatText(0, text.length, {
      color: '#000',
      font: font
    });
    quillInstance.formatLine(0, contents.length - 1, {
      align: 'left',
      font: font
    });
    quillInstance.formatLine(contents.length - 1, 1, {
      align: 'center'
    });
    quillInstance.formatLine(contents.length - 1, 1, {
      align: 'center'
    });
    quillInstance.formatText(contents.length, 1, {
      'color': '#000',
      'font-size': '20px',
      'line-height': lineHeight + 'px',
      'font-weight': 'bold'
    });
    quillInstance.formatLine(contents.length, 1, {
      align: 'center'
    });
    quillInstance.formatLine(contents.length, 1, {
      align: 'center'
    });
    quillInstance.formatText(0, contents.length, {
      color: '#000',
      font: font
    });
    quillInstance.formatLine(0, contents.length - 1, {
      align: 'left',
      font: font
    });
    quillInstance.formatLine(contents.length - 1, 1, {
      align: 'center'
    });
    context.fillText(text, 0, lineHeight + 10);
    context.fillText(fileName, canvas.width / 2, canvas.height - 10);
    const dataUrl = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${fileName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});





textToSpeechButton.addEventListener('click', () => {
const utterance = new SpeechSynthesisUtterance(noteText.value);
speechSynthesis.speak(utterance);
});

savePdfButton.addEventListener('click', () => {
const fileName = prompt('Please enter a file name:');
if (fileName !== null) {
  const pdf = new jsPDF();
  pdf.text(noteText.value, 10, 10);
  pdf.save(`${fileName}.pdf`);
}
});
``
quill.on('text-change', function(delta, oldDelta, source) {
updateWordCount();
var text = quill.getText();
if (text.length > 0) {
  document.getElementById('save-text-file-button').disabled = false;
  document.getElementById('save-image-button').disabled = false;
  document.getElementById('text-to-speech-button').disabled = false;
  document.getElementById('save-pdf-button').disabled = false;
} else {
  document.getElementById('save-text-file-button').disabled = true;
  document.getElementById('save-image-button').disabled = true;
  document.getElementById('text-to-speech-button').disabled = true;
  document.getElementById('save-pdf-button').disabled = true;
}
});



