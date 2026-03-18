import { initAudioEngine } from "./core/audioEngine.js";
import { loadSongs } from "./services/songService.js";
import { renderList } from "./ui/listUI.js";

window.audio = document.getElementById("audio");

let songs = [];
let currentIdx = -1;

window.playSong = function(i){
    currentIdx = i;
    audio.src = songs[i].url;
    audio.play();
    document.getElementById("track-name").innerText = songs[i].name;
    document.getElementById("play-btn").innerText = "⏸";
};

window.toggle = function(){
    if(audio.paused){
        audio.play();
        play-btn.innerText = "⏸";
    } else {
        audio.pause();
        play-btn.innerText = "▶";
    }
};

window.next = function(){
    if(currentIdx < songs.length - 1){
        playSong(currentIdx + 1);
    }
};

window.prev = function(){
    if(currentIdx > 0){
        playSong(currentIdx - 1);
    }
};

document.getElementById("portal").onclick = async () => {
    document.getElementById("portal").style.display = "none";
    document.getElementById("app").classList.remove("hidden");

    initAudioEngine();

    songs = await loadSongs();
    renderList(songs);
};
