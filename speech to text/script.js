const startButton = document.getElementById("startButton");
const voiceInput = document.getElementById("voiceInput");
const response = document.getElementById("response");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

startButton.addEventListener("click", () => {
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            startButton.innerText = "Listening...";
            startButton.disabled = true;
            startButton.classList.add("listening");
        };

        recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript;
            voiceInput.value = text;
            respondToQuery(text);
        };

        recognition.onend = () => {
            startButton.innerText = "Start Listening";
            startButton.disabled = false;
            startButton.classList.remove("listening");
        };

        recognition.start();
    } else {
        alert('Speech recognition is not supported in your browser.');
    }
});

function respondToQuery(query) {
    // Add your logic to generate a response based on the user's input.
    // For now, we'll just echo back the input.
    response.value = `You said: ${query}`;
}
