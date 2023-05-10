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
    const noteEditorBounds = noteEditor.getBoundingClientRect();
    canvas.width = noteEditorBounds.width;
    canvas.height = noteEditorBounds.height;
    const data = quill.root.innerHTML;
    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${fileName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    image.src = 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="' + noteEditorBounds.width + '" height="' + noteEditorBounds.height + '">' + '<foreignObject width="100%" height="100%">' + data + '</foreignObject>' + '</svg>');
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



