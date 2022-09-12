'use strict'

window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return; //stop the function from running
    audio.currentTime = 0 //rewind to start
    audio.play();

    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    console.log(key);
});