// === Global Variables ===
let currentSong = new Audio();
let playButton = document.querySelector("#play");
let songList = [];
let currentAlbumPath = "";
let currentSongIndex = -1;

// === Utility Functions ===
function secondsToMinutes(seconds) {
  seconds = Math.floor(seconds);
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function highlightPlaying(index) {
  document.querySelectorAll(".songlist li").forEach((li, i) => {
    li.classList.toggle("playing", i === index);
  });
}

function highlightAlbum(folder) {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.toggle("active", card.dataset.folder === folder);
  });
}

// === Load Album and Songs ===
async function loadAlbum(albumFolder) {
  currentAlbumPath = `/songs/${albumFolder}`;
  let response = await fetch(`${currentAlbumPath}/info.json`);
  let album = await response.json();
  songList = album.songs || [];

  const songUL = document.querySelector(".songlist ul");
  songUL.innerHTML = songList.map((song, i) => `
    <li class="pointer" data-index="${i}">
      <img class="invert" src="img/music.svg" alt="">
      <div class="info">
        <div class="songname">${song.title}</div>
        <div class="songartist">${song.artist}</div>
      </div>
      <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="img/play.svg" alt="">
      </div>
    </li>
  `).join("");

  document.querySelectorAll(".songlist li").forEach(li => {
    li.addEventListener("click", () => {
      const index = parseInt(li.dataset.index);
      playMusic(index);
    });
  });

  highlightAlbum(albumFolder);
}

// === Play Music ===
function playMusic(index, pause = false) {
  let song = songList[index];
  let fullSrc = `${currentAlbumPath}/${song.file}`;

  currentSong.src = fullSrc;
  currentSongIndex = index; // <-- track current index

  if (!pause) currentSong.play();

  document.querySelector(".songinfo").textContent = song.title;
  document.querySelector(".songtime").textContent = "00:00";
  highlightPlaying(index);
}


// === Display Albums ===
async function displayAlbums() {
  let folders = ["bhajans","Bollywood","Haryanvi","Rajasthani","sigma"]; // Add more album folders here or fetch dynamically
  let cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  for (let folder of folders) {
    try {
      let res = await fetch(`/songs/${folder}/info.json`);
      let data = await res.json();

      cardContainer.innerHTML += `
        <div class="card" data-folder="${folder}">
          <button><i class="fa-solid fa-play" style="color: #000000;"></i></button>
          <img src="/songs/${folder}/${data.cover}" alt="">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
        </div>
      `;
    } catch (err) {
      console.warn("Error loading album:", folder);
    }
  }

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", async () => {
      await loadAlbum(card.dataset.folder);
      playMusic(0);
    });
  });
}

// === Setup Player Controls ===
function setupPlayer() {
  // Play/Pause button
  playButton.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
    } else {
      currentSong.pause();
    }
  });

  // Update Play/Pause icon
  currentSong.addEventListener("play", () => playButton.src = "img/pause.svg");
  currentSong.addEventListener("pause", () => playButton.src = "img/play.svg");

  // Error handler
  currentSong.addEventListener("error", () => {
    alert("Error playing the selected song.");
    playButton.src = "img/play.svg";
  });

  // Update time and seekbar
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").textContent =
      `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration || 0)}`;
    document.querySelector(".circle").style.left =
      `${(currentSong.currentTime / currentSong.duration) * 100}%`;
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.offsetWidth);
    currentSong.currentTime = percent * currentSong.duration;
  });

  // Volume controls
  document.querySelector(".volume input").addEventListener("input", (e) => {
    currentSong.volume = e.target.value / 100;
    document.querySelector("#volume-img").src = currentSong.volume > 0 ? "img/volume.svg" : "img/mute.svg";
  });

  document.querySelector("#volume-img").addEventListener("click", () => {
    if (currentSong.volume > 0) {
      currentSong.volume = 0;
      document.querySelector("#volume-img").src = "img/mute.svg";
      document.querySelector(".volume input").value = 0;
    } else {
      currentSong.volume = 0.5;
      document.querySelector("#volume-img").src = "img/volume.svg";
      document.querySelector(".volume input").value = 50;
    }
  });

  // Spacebar play/pause
  document.body.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      playButton.click();
    }
  });

  // Next/Previous buttons
  document.querySelector("#next")?.addEventListener("click", () => {
    if (currentSongIndex + 1 < songList.length) {
      playMusic(currentSongIndex + 1);
    }
  });
  
  document.querySelector("#previous")?.addEventListener("click", () => {
    if (currentSongIndex > 0) {
      playMusic(currentSongIndex - 1);
    }
  });
  

  // Auto-play next on song end
  currentSong.addEventListener("ended", () => {
    if (currentSongIndex + 1 < songList.length) {
      playMusic(currentSongIndex + 1);
    }
  });
  
}

// === Main Function ===
async function main() {
  setupPlayer();
  await displayAlbums();
  await loadAlbum("bhajans"); // Default album
  playMusic(0, true);
}

main();

