import { initAudioEngine, getBass } from "./core/audioEngine.js";
import { loadSongs } from "./services/songService.js";
import { renderList } from "./ui/listUI.js";
import { animateParticles } from "./visual/particles.js";

const audio = document.getElementById("audio");

let songs = [];
let currentIdx = -1;

/* PORTAL */
window.ignite = async function(){
    document.getElementById("portal").classList.add("hide");

    setTimeout(()=>{
        document.getElementById("app").classList.remove("hidden");
    }, 1200);

    initAudioEngine();
    animateParticles(getBass);

    songs = await loadSongs();
    renderList(songs);
};

/* PLAYER */
window.playSong = function(i){
    currentIdx = i;
    audio.src = songs[i].url;
    audio.play();

    document.getElementById("track-name").innerText = songs[i].name;
};

window.toggle = function(){
    if(audio.paused) audio.play();
    else audio.pause();
};

window.next = function(){
    if(currentIdx < songs.length - 1) playSong(currentIdx+1);
};

window.prev = function(){
    if(currentIdx > 0) playSong(currentIdx-1);
};

/* PWA SERVICE WORKER */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
