// list of languages is probably not loaded, wait for it
function speakOut(text) {
    if (window.speechSynthesis.getVoices().length == 0) {
        window.speechSynthesis.addEventListener('voiceschanged', function () {
            textToSpeech();
        });
    }
    else {
        // languages list available, no need to wait
        textToSpeech()
    }

    function textToSpeech() {
        // get all voices that browser offers
        var available_voices = window.speechSynthesis.getVoices();

        // this will hold an english voice
        var english_voice = '';

        // find voice by language locale "en-US"
        // if not then select the first voice
        for (var i = 0; i < available_voices.length; i++) {
            if (available_voices[i].lang === 'en-US') {
                english_voice = available_voices[i];
                break;
            }
        }
        if (english_voice === '')
            english_voice = available_voices[1];

        // new SpeechSynthesisUtterance object
        var utter = new SpeechSynthesisUtterance();
        utter.rate = 1;
        utter.pitch = 0.5;
        utter.text = text;
        utter.voice = english_voice;
        utter.volume = 1;

        // event after text has been spoken

        // speak
        window.speechSynthesis.speak(utter);
    }
}

export default speakOut;