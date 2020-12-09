const effects = new Array();
effects[0] = new Audio('../effects/goodfood.wav');
effects[1] = new Audio('../effects/badfood.mp3');
effects[2] = new Audio('../effects/fooddown.mp3');
effects[3] = new Audio('../effects/gameover.mp3');
effects[4] = new Audio('../effects/gamemusic.mp3');

audio = document.getElementById('audio');
function volumeUp() {
    if (audio.volume < 1) audio.volume += 0.1;
}

function volumeDown() {
    if (audio.volume > 0) audio.volume -= 0.1;
}

function muteMusic() {
    if (audio.muted) {
        audio.muted = false;
    } else {
        audio.muted = true;
    }
}