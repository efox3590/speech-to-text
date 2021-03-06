// On doument load resolve the SDK dependecy
function Initialize(onComplete) {
    require(["Speech.Browser.Sdk"], function(SDK) {
        onComplete(SDK);
    });
}

// Setup the recongizer
function RecognizerSetup(SDK, recognitionMode, language, format, subscriptionKey) {
    var recognizerConfig = new SDK.RecognizerConfig(
        new SDK.SpeechConfig(
            new SDK.Context(
                new SDK.OS(navigator.userAgent, "Browser", null),
                new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
        recognitionMode, // SDK.RecognitionMode.Interactive  (Options - Interactive/Conversation/Dictation>)
        language, // Supported laguages are specific to each recognition mode. Refer to docs.
        format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)

    // Alternatively use SDK.CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) for token auth
    var authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);

    return SDK.CreateRecognizer(recognizerConfig, authentication);
}

// Start the recognition
function RecognizerStart(SDK, recognizer) {
    recognizer.Recognize((event) => {
            /*
             Alternative syntax for typescript devs.
             if (event instanceof SDK.RecognitionTriggeredEvent)
            */
            switch (event.Name) {
                case "RecognitionTriggeredEvent":
                    UpdateStatus("Initializing");
                    break;
                case "ListeningStartedEvent":
                    UpdateStatus("Listening");
                    break;
                case "RecognitionStartedEvent":
                    UpdateStatus("Listening_Recognizing");
                    break;
                case "SpeechStartDetectedEvent":
                    UpdateStatus("Listening_DetectedSpeech_Recognizing");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechHypothesisEvent":
                    UpdateRecognizedHypothesis(event.Result.Text);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechEndDetectedEvent":
                    OnSpeechEndDetected();
                    UpdateStatus("Processing_Adding_Final_Touches");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechSimplePhraseEvent":
                    UpdateRecognizedPhrase(JSON.stringify(event.Result.DisplayText));
                    break;

                case "SpeechDetailedPhraseEvent":
                    UpdateRecognizedPhrase(JSON.parse(event.Result, null, 2));
                    break;

                case "RecognitionEndedEvent":
                    OnComplete();
                    UpdateStatus("Idle");
                    console.log(JSON.stringify(event)); // Debug information
                    break;
            }
        })
        .On(() => {
                // The request succeeded. Nothing to do here.
            },
            (error) => {
                console.error(error);
            });
}

// Stop the Recognition.
function RecognizerStop(SDK, recognizer) {
    console.log("ERROR: YOU PRESSED THE STOP BUTTON");
    recognizer.AudioSource.TurnOff();
}
