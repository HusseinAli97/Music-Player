const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const container = document.querySelector(".container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Titles
const tracks = [];

//Keep track
let trackIndex = 0;
cover.src = 'images/summer.jpg'

// darg
dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
});

function handleFileSelect(items) {
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        const entry = items[i].webkitGetAsEntry();
        if (entry) {
            traverseEntry(entry);
        }
    }
}

function traverseEntry(entry) {
    if (entry.isFile) {
        entry.file((file) => {
            if (file.type.startsWith("audio/")) {
                const track = {
                    name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension from name
                    url: URL.createObjectURL(file),
                };
                tracks.push(track);
            }
        });
    } else if (entry.isDirectory) {
        const directoryReader = entry.createReader();
        directoryReader.readEntries((entries) => {
            for (let j = 0; j < entries.length; j++) {
                traverseEntry(entries[j]);
            }
        });
    }
}

// Modified drop event listener
dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragover");
    dropZone.classList.add("none");
    container.setAttribute("style", "block");

    const items = event.dataTransfer.items;
    handleFileSelect(items);
});
function loadTrack(track) {
    const { name, url} = track;
    title.innerText = name;
    audio.src = url; // Directly assign the URL created with createObjectURL
}
function togglePlaying() {
    const isPlaying = musicContainer.classList.toggle("play");
    playBtn.querySelector("i.fas").classList.toggle("fa-play", !isPlaying);
    playBtn.querySelector("i.fas").classList.toggle("fa-pause", isPlaying);
    if (isPlaying) {
        loadTrack(tracks[trackIndex]);
        audio.play();
    } else {
        audio.pause();
    }
}
playBtn.addEventListener("click", togglePlaying);

function prevTrack() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
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
    loadTrack(tracks[trackIndex])
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
