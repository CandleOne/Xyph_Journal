// Check if the browser supports speech recognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Create a new SpeechRecognition object
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Set the language for speech recognition
    recognition.lang = 'en-US';

    // Define the event handler for the 'result' event
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        document.getElementById('output').textContent = result;
    };

    // Start listening for voice input
    recognition.start();
} else {
    document.getElementById('output').textContent = 'Speech recognition not supported in this browser.';
}
