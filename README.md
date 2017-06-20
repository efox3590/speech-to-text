# nycda-final-project: Speech to text (speech recognition)
App transcribe audio streams into text that can display to the user or act upon as command input. 

### Note:
* The Microsoft Speech Service returns only one recognition phrase result for all recognition modes. There is a maximum limit of 15 seconds for any single utterance.
* Bleeps out profanity with asterisks 

### Sample Responses
The payload result:
``{
  "RecognitionStatus": "Success",
  "DisplayText": "Remind me to buy cat food",
  "Offset": "1236645672289",
  "Duration": "1236645672289"
}``

It is defaulted to only display the ``DisplayText`` for this application.


# Installation Instructions
## Clone Project
``$ git clone [this_repo] && cd [this_repo]``

## Run
``python -m SimpleHTTPServer 3000``

# API Framework
Microsoft's WebSocket Speech Recognition API
https://azure.microsoft.com/en-us/

# FE Framework
HTML5 UP! https://html5up.net/

Background image: National Geographic


