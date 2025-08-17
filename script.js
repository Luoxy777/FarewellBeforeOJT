const songs = [
    { title: "Domine Fili Unigenite", src: "assets/VivaldiGloria.mp3" },
    { title: "Waltz No. 2", src: "assets/WaltzNo2.mp3" },
    { title: "For Unto Us A Child Is Born", src: "assets/handel_ForUntoUsAChildIsBorn.mp3" }
];
const imageNames = [
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "pic4.png",
    "pic5.png",
    "pic6.png",
    "pic7.png",
    "pic8.png",
    "pic9.png",
    "pic10.png",
    "pic11.png",
    "pic12.png",
    "pic13.png",
    "pic14.png",
    "pic15.png",
    "pic16.png",
    "pic17.png",
    "pic18.png",
    "pic19.png",
    "pic20.png",
    "pic21.png",
    "pic22.png",
    "pic23.png"
];

let currentSong = 0;
const audio = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");
const progressBar = document.getElementById("progressBar");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");
const volumeLevel = document.getElementById("volumeLevel");
const volumeIcon = document.getElementById("volumeIcon");
const playPauseButton = document.getElementById("playpause-button");


const btn = document.getElementById("contactme-btn");
const overlay = document.getElementById("contactme-container");
const closeBtn = document.getElementById("close-btn");


const folderPath = "assets/";
const gallery = document.getElementById("gallery");
const overlayM = document.getElementById("overlayM");
const openGalleryBtn = document.querySelector(".open-gallery-btn");
const closeBtnM = document.getElementById("closeBtnM");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
document.addEventListener("DOMContentLoaded", () => {
    // Map project titles to corresponding section IDs
    const projectMap = {
        "KERJAIN": "kerjain",
        "PLAYSNAP": "playsnap",
        "ZEN DRAGON": "zen",
        "ANIMEDXD": "animedxd",
        "RAHMAT": "rahmat",
    };

    const projectBoxes = document.querySelectorAll(".project-box");
    const sections = document.querySelectorAll(".box1-content"); // all content sections inside box1

    projectBoxes.forEach(box => {
        box.addEventListener("click", () => {
            // Extract project keyword from the box text (e.g., "Website - KERJAIN" -> "KERJAIN")
            const text = box.querySelector("h3").textContent.toUpperCase();
            let matchedKey = null;

            for (const key in projectMap) {
                if (text.includes(key)) {
                    matchedKey = projectMap[key];
                    break;
                }
            }

            if (matchedKey) {
                // Hide all sections
                sections.forEach(section => section.classList.add("d-none"));
                projectBoxes.forEach(section => section.classList.remove("active-section"));

                // Show the matched one
                const target = document.getElementById(matchedKey);
                if (target) {
                    target.classList.remove("d-none");
                    box.classList.add("active-section");
                };
            }
        });
    });
    const homeBtn = document.getElementById('home-icon');
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            sections.forEach(section => section.classList.add("d-none"));
            projectBoxes.forEach(section => section.classList.remove("active-section"));
            const target = document.getElementById("home");
            if (target) target.classList.remove("d-none");
        });
    }
});
const introBtn = document.querySelector(".introduction");
const whatBtn = document.querySelector(".what-about-you");
const introContent = document.querySelector(".introduction-content");
const whatContent = document.querySelector(".what-about-you-content");

// Default state: show introduction
introContent.classList.remove("d-none");
whatContent.classList.add("d-none");

introBtn.addEventListener("click", function () {
    introContent.classList.remove("d-none");
    whatContent.classList.add("d-none");

    introBtn.classList.add("active-tab");
    whatBtn.classList.remove("active-tab");
});

whatBtn.addEventListener("click", function () {
    whatContent.classList.remove("d-none");
    introContent.classList.add("d-none");

    whatBtn.classList.add("active-tab");
    introBtn.classList.remove("active-tab");
});

// Build gallery dynamically
imageNames.forEach((name, index) => {
    const img = document.createElement("img");
    img.src = folderPath + name;
    img.dataset.index = index;
    img.addEventListener("click", () => openLightbox(index));
    gallery.appendChild(img);
});

// Open overlay
openGalleryBtn.addEventListener("click", () => {
    overlayM.style.display = "flex";
    const images = gallery.querySelectorAll("img");
    images.forEach((img, i) => {
        setTimeout(() => img.classList.add("show"), i * 200);
    });
});

// Close overlay
closeBtnM.addEventListener("click", () => {
    overlayM.style.display = "none";
    gallery.querySelectorAll("img").forEach(img => img.classList.remove("show"));
});

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = folderPath + imageNames[currentIndex];
    lightbox.style.display = "flex";
}

// Close lightbox
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Navigation
prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + imageNames.length) % imageNames.length;
    lightboxImg.src = folderPath + imageNames[currentIndex];
});

nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % imageNames.length;
    lightboxImg.src = folderPath + imageNames[currentIndex];
});

// Klik tombol buka modal
btn.addEventListener("click", () => {
    overlay.style.display = "flex";
});

// Klik tombol X tutup modal
closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Klik area gelap tutup modal
overlayM.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
});


function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    audio.load();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<img src="/assets/pause_ic.svg" alt="Pause Icon" class="icon">';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<img src="/assets/play.svg" alt="Play Icon" class="icon">';
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

function updateProgress() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + "%";
        currentTimeText.textContent = formatTime(audio.currentTime);
        durationText.textContent = formatTime(audio.duration);
    }
}

function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function setVolume(e) {
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = slider.offsetHeight;
    const volume = 1 - (clickY / height);
    audio.volume = Math.max(0, Math.min(1, volume));
    updateVolumeUI();
}

function updateVolumeUI() {
    const levelHeight = audio.volume * 100;
    volumeLevel.style.height = `${levelHeight}%`;
    if (audio.volume === 0) {
        volumeIcon.innerHTML = '<img src="/assets/mute.svg" alt="Mute Icon" class="icon">';
    } else {
        volumeIcon.innerHTML = '<img src="/assets/volume.svg" alt="Volume Icon" class="icon">';
    }
}

function toggleMute() {
    if (audio.volume > 0) {
        audio.volume = 0;
    } else {
        audio.volume = 1;
    }
    updateVolumeUI();
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// Initialize player
loadSong(currentSong);
audio.volume = 1;
updateVolumeUI();

document.getElementById("form-wby").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
        formName: "WbyResponses", // target sheet
        input: e.target.wby.value,
    };

    fetch("https://script.google.com/macros/s/AKfycbxHKOczKA1DBsXVJ0i3VRNPURrk0E90gldq1anxNL8gBFOW_-CmfXuvbUhylPX91J3ExA/exec", {
        method: "POST",
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
            alert("Saved to " + data.sheet + " successfully!");
            form.reset();
        })
        .catch(err => alert("Error: " + err));
});

document.getElementById("form-osint").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
        formName: "ContactInfoResponses", // target sheet
        input: e.target.osint.value,
    };

    fetch("https://script.google.com/macros/s/AKfycbxHKOczKA1DBsXVJ0i3VRNPURrk0E90gldq1anxNL8gBFOW_-CmfXuvbUhylPX91J3ExA/exec", {
        method: "POST",
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
            alert("Saved to " + data.sheet + " successfully!");
            form.reset();
        })
        .catch(err => alert("Error: " + err));
});
