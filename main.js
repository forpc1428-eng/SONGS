import { initAudioEngine } from "./core/audioEngine.js";
import { loadSongs } from "./services/songService.js";
import { renderList } from "./ui/listUI.js";

const audio = document.getElementById("audio");

let songs = [];
let currentIdx = -1;

/* ===== FONT MORPH SYSTEM (10 STYLES) ===== */
const fontStates = [
    { family: "'Playfair Display'", weight: "900", spacing: "-3px" },
    { family: "'Inter'", weight: "100", spacing: "10px" },
    { family: "'Fraunces'", weight: "900", spacing: "0px" },
    { family: "'Bebas Neue'", weight: "400", spacing: "2px" },
    { family: "'Orbitron'", weight: "700", spacing: "3px" },
    { family: "'Oswald'", weight: "500", spacing: "1px" },
    { family: "'Raleway'", weight: "100", spacing: "8px" },
    { family: "'Montserrat'", weight: "900", spacing: "-2px" },
    { family: "'Poppins'", weight: "300", spacing: "5px" },
    { family: "'Libre Baskerville'", weight: "700", spacing: "0px" }
];

let state = 0;

function morphFonts(){
    const t = document.getElementById("title");
    const s = fontStates[state % fontStates.length];

    t.style.fontFamily = s.family;
    t.style.fontWeight = s.weight;
    t.style.letterSpacing = s.spacing;

    state++;
}

setInterval(morphFonts, 4000);

/* ===== PORTAL ===== */
window.ignite = async function(){
    document.getElementById("portal").classList.add("hide");

    setTimeout(()=>{
        document.getElementById("app").classList.remove("hidden");
    }, 1200);

    initAudioEngine();

    songs = await loadSongs();
    renderList(songs);
};

/* ===== PLAYER ===== */
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
        document.getElementById("play-btn").innerText = "⏸";
    } else {
        audio.pause();
        document.getElementById("play-btn").innerText = "▶";
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

window.seek = function(e){
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
};

audio.ontimeupdate = () => {
    document.getElementById("fill").style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
};
