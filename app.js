"use strict";

function init() {
    Homey.log("Homey Simon says app ready!");
}

Homey.manager('speech-input').on('speech', function (speech) {
    sentence = speech.transcript;
    Homey.log('Simon says detected');
    
    Homey.manager('speech-output').say(sentence);

    Homey.manager('flow').trigger('simon_says_trigger', tokens, {session: speech.session, sentence:sentence}, function (err, result) {
        if (err) return Homey.error(err);
    });    
});

module.exports.init = init;