const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Titles
const tracks = ["Al-Najm", "Al-Zumor", "Menshawy"];

//Keep track
let trackIndex = 1;

//initially load details
loadTrack(tracks[trackIndex]);

function loadTrack(track) {
    title.innerText = track;
    audio.src = `music/${track}.mp3`;
    cover.src = `images/${track}.jpg`;
    cover.addEventListener("error", () => {
        cover.src = `images/summer.jpg`;
    });
}

function togglePlaying() {
    const isPlaying = musicContainer.classList.toggle("play");
    console.log(isPlaying);
    playBtn.querySelector("i.fas").classList.toggle("fa-play", !isPlaying);
    playBtn.querySelector("i.fas").classList.toggle("fa-pause", isPlaying);
    if (isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
}
playBtn.addEventListener("click", togglePlaying);

function prevTrack() {
    trackIndex--;
    console.log(trackIndex);
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
        console.log(trackIndex);
    }
    playing(trackIndex);
}
function nextTrack() {
    trackIndex++;
    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }
    playing(trackIndex);
}
function playing(trackIndex) {
    loadTrack(tracks[trackIndex]);
    audio.play();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPrcanet = (currentTime / duration) * 100;
    progress.style.width = `${progressPrcanet}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
