try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
}

var start = document.getElementById('start');
/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        //noteContent += transcript;
        console.log(transcript);
        voiceControl(transcript);
    }
};

recognition.onstart = function() {
    console.log('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
    console.log('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
        console.log('No speech was detected. Try again.');
    };
}

/*-----------------------------
      Speech Synthesis 
------------------------------*/
var speech = new SpeechSynthesisUtterance();

function readOutLoud(message) {

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 2;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

start.addEventListener('click', () => {
    recognition.start();
    readOutLoud('Start your instructions');
});

function voiceControl(instr) {
    //let re = new RegExp(instr.trim());
    if (instr.match(/do.[ůu]/i))
        cursor.move("ArrowDown");

    if (instr.match(/nastav/i)) {
        subinstr = instr.replace(/nastav/i, '');
        if (subinstr.match(/rychlost/i)) {
            console.log((subinstr.replace(/rychlost/i, '')));
            cursor.speed = parseInt(subinstr.replace(/rychlost/i, ''));
        }
    }

    if (instr.match(/nahoru/i))
        cursor.move("ArrowUp");

    if (instr.match(/(doleva|vlevo)/i))
        cursor.move("ArrowLeft");

    if (instr.match(/(do[ ]?prava|vpravo)/i))
        cursor.move("ArrowRight");

    if (instr.match(/(nerozumíš|jsi blbý|co děláš|kam jedeš)/i)) {
        readOutLoud('Sorry, I am such an idiot');
    }

    if (instr.match(/(dobře|skvěle|výborně|no vidíš|bezva|fajn)/i)) {
        readOutLoud('Of course, I am a genius');
    }

    if (instr.match(/(rychl|honem|pohni|šlap|jeď|makej)/i))
        cursor.move("NumpadAdd");

    if (instr.match(/(pomalu|zpomal|nehoň se|nespěchej|počkej)/i))
        cursor.move("NumpadSubtract");

    if (instr.match(/(stop|zastav|stát|nehni)/i))
        cursor.move("Space");

}