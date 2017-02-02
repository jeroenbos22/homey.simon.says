"use strict";

var sentence = '';

function init() {
    Homey.log("Homey Simon says app ready!");
}

Homey.manager('speech-input').on('speech', function (speech) {
    sentence = speech.transcript;
    sentence = sentence.replace('simon says','').replace('echo','').trim();
    
    Homey.log('Simon says detected: '+sentence);
    
    Homey.manager('speech-output').say(sentence);
    
    Homey.manager('flow').trigger('simon_says_trigger', {sentence:sentence}, {session: speech.session}, function (err, result) {
        if (err) return Homey.error(err);
    });
});

module.exports.init = init;