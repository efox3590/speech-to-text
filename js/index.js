var startBtn, stopBtn, hypothesisDiv, phraseDiv, statusDiv, key, languageOptions, formatOptions;
var SDK;
var recognizer;
var previousSubscriptionKey;

document.addEventListener("DOMContentLoaded", function() {
    createBtn = document.getElementById("createBtn");
    startBtn = document.getElementById("startBtn");
    stopBtn = document.getElementById("stopBtn");
    phraseDiv = document.getElementById("phraseDiv");
    hypothesisDiv = document.getElementById("hypothesisDiv");
    statusDiv = document.getElementById("statusDiv");
    key = document.getElementById("key");
    languageOptions = document.getElementById("languageOptions");
    formatOptions = document.getElementById("formatOptions");

    languageOptions.addEventListener("change", function() {
        Setup();
    });

    formatOptions.addEventListener("change", function() {
        Setup();
    });

    startBtn.addEventListener("click", function() {
        if (!recognizer || previousSubscriptionKey != key.value) {
            previousSubscriptionKey = key.value;
            Setup();
        }

        hypothesisDiv.innerHTML = "";
        phraseDiv.innerHTML = "";
        RecognizerStart(SDK, recognizer);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener("click", function() {
        RecognizerStop(SDK);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    Initialize(function(speechSdk) {
        SDK = speechSdk;
        startBtn.disabled = false;
    });
});

function Setup() {
    recognizer = RecognizerSetup(SDK, SDK.RecognitionMode.Interactive, languageOptions.value, SDK.SpeechResultFormat[formatOptions.value], key.value);
}

function UpdateStatus(status) {
    statusDiv.innerHTML = status;
}

function UpdateRecognizedHypothesis(text) {
    hypothesisDiv.innerHTML = text;
}

function OnSpeechEndDetected() {
    stopBtn.disabled = true;
}

function UpdateRecognizedPhrase(text) {
    phraseDiv.innerHTML = text;
}

function OnComplete() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
}