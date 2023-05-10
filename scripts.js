const nightModeToggle = document.getElementById('night-mode-toggle');
const fileInput = document.getElementById('file-input');
const noteText = document.getElementById('note-text');
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

  var quill = new Quill('#note-text', {
    theme: 'snow'
  });
  
  

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        noteText.value = e.target.result;
      };
      reader.readAsText(file);
    }
  });

  const autosaveInterval = 30000; // 30 seconds
const localStorageKey = 'xyph-journal-autosave';

noteText.value = localStorage.getItem(localStorageKey) || '';

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
  const data = noteText.value;
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
    canvas.width = noteText.clientWidth;
    canvas.height = noteText.clientHeight;
    context.font = getComputedStyle(noteText).font;
    context.fillText(noteText.value, 0, 20);
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

var toolbarOptions = [  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

quill.addModule('toolbar', {
  container: toolbarOptions
});



