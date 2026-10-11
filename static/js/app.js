// Misthi - Dynamic Cloud Music Player
(function () {
  "use strict";

  // Cloud API Configuration
  const CLOUD_SEARCH_API = "https://itunes.apple.com/search";
  const LOCAL_PLAYLIST_URL = "./songs.json";

  const BG_VIDEOS = [
    "./Assets/Videos/vid1.mp4",
    "./Assets/Videos/vid2.mp4",
    "./Assets/Videos/vid4.mp4",
    "./Assets/Videos/vid3.mp4"
  ];

  const AVATAR_FITS = ["objectFitCover", "objectFitContain", "none"];

  // State
  let playlist = [];
  let currentIndex = 0;
  let isPlaying = false;
  let bgVideoIndex = 0;
  let avatarFitIndex = 0;
  let currentCategory = "latest bollywood hindi";

  // Cache fallback songs
  const fallbackSongs = [
    {
      songName: "Kesariya (From Brahmastra)",
      songArtist: "Pritam, Arijit Singh & Amitabh Bhattacharya",
      songSrc: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a",
      songAvatar: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg"
    },
    {
      songName: "Apna Bana Le (From Bhediya)",
      songArtist: "Arijit Singh & Sachin-Jigar",
      songSrc: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/28/97/54/289754f9-245c-e5ae-9562-b7e28b8cf4ba/mzaf_14959196349340051147.plus.aac.p.m4a",
      songAvatar: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/bf/1e/86/bf1e86d2-3bf9-a9a3-5c74-2c6c06df2614/8903431910608_cover.jpg/600x600bb.jpg"
    },
    {
      songName: "Tauba Tauba (From Bad Newz)",
      songArtist: "Karan Aujla",
      songSrc: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/95/9d/98959d20-f421-4f51-b844-307963d76e27/mzaf_12411516086884024467.plus.aac.p.m4a",
      songAvatar: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/64/43/40/64434079-c5c6-5590-3453-e3b97b1029c7/8903431998521_cover.jpg/600x600bb.jpg"
    },
    {
      songName: "Pani Da Rang",
      songArtist: "Ayushmann Khurrana",
      songSrc: "./Assets/songs/128-Pani.mp3",
      songAvatar: "./Assets/Images/image1.jpg"
    }
  ];

  // DOM Elements
  let audioElement, bgVideoElement, songNameEl, songArtistEl, songAvatarEl;
  let currentTimeEl, totalDurationEl, progressBarEl, playBtnEl, prevBtnEl, nextBtnEl;
  let statusBadgeEl;

  // Render Base HTML into #root
  function renderLayout() {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = `
      <div class="container">
        <audio id="audioElement" preload="metadata"></audio>
        <video id="bgVideo" src="${BG_VIDEOS[0]}" loop muted autoplay playsinline class="backgroundVideo"></video>
        <div class="blackScreen"></div>

        <div class="music-Container">
          <p class="musicPlayer">Misthi</p>

          <!-- Dynamic Cloud Category Bar -->
          <div id="cloudCategoryBar" style="display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;max-width:100%;padding:4px 0;">
            <button class="cat-pill active" data-query="latest bollywood hindi">🔥 Latest</button>
            <button class="cat-pill" data-query="arijit singh latest">🎶 Arijit</button>
            <button class="cat-pill" data-query="punjabi latest hits">⚡ Punjabi</button>
            <button class="cat-pill" data-query="bollywood romantic songs">💖 Romantic</button>
          </div>

          <p class="music-Head-Name" id="songName">Loading Cloud Songs...</p>
          <p class="music-Artist-Name" id="songArtist">Please wait</p>
          <img src="./Assets/Images/image1.jpg" class="objectFitCover" alt="song Avatar" id="songAvatar" />

          <div class="musicTimerDiv">
            <p class="musicCurrentTime" id="currentTime">00 : 00</p>
            <p class="musicTotalLenght" id="totalDuration">00 : 00</p>
          </div>

          <input type="range" name="musicProgressBar" class="musicProgressBar" id="progressBar" value="0" min="0" max="100" />

          <div class="musicControlers">
            <i class="fa-solid fa-backward musicControler" id="prevBtn" title="Previous Song"></i>
            <i class="fa-solid fa-circle-play playBtn" id="playBtn" title="Play / Pause"></i>
            <i class="fa-solid fa-forward musicControler" id="nextBtn" title="Next Song"></i>
          </div>

          <div id="cloudStatus" style="font-size:0.75rem;margin-top:10px;color:rgba(255,255,255,0.7);font-weight:400;">
            ☁️ <span id="statusText">Connecting to cloud music...</span>
          </div>
        </div>

        <div class="changeBackBtn" id="changeBackBtn">Update Background</div>

        <a href="https://prashay.github.io/prashantj/" title="Info" class="youtube-Subs">
          <img src="./Assets/Images/pj.jpeg" alt="Logo" />
          <p>Copyright © <span id="copyrightYear"></span> All rights reserved | <b>Prashant Jha</b></p>
        </a>
      </div>
    `;

    // Add styles for category buttons
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .cat-pill {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 14px;
        padding: 3px 10px;
        font-size: 0.72rem;
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.25s ease;
      }
      .cat-pill:hover, .cat-pill.active {
        background: #fff;
        color: #111;
        border-color: #fff;
      }
      #cloudCategoryBar::-webkit-scrollbar {
        height: 0px;
      }
    `;
    document.head.appendChild(styleEl);

    // Cache element references
    audioElement = document.getElementById("audioElement");
    bgVideoElement = document.getElementById("bgVideo");
    songNameEl = document.getElementById("songName");
    songArtistEl = document.getElementById("songArtist");
    songAvatarEl = document.getElementById("songAvatar");
    currentTimeEl = document.getElementById("currentTime");
    totalDurationEl = document.getElementById("totalDuration");
    progressBarEl = document.getElementById("progressBar");
    playBtnEl = document.getElementById("playBtn");
    prevBtnEl = document.getElementById("prevBtn");
    nextBtnEl = document.getElementById("nextBtn");
    statusBadgeEl = document.getElementById("statusText");

    const yearEl = document.getElementById("copyrightYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    bindEvents();
  }

  // Format time (seconds to "mm : ss")
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "00 : 00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" + mins : mins} : ${secs < 10 ? "0" + secs : secs}`;
  }

  // Load and play a song by index
  function loadSong(index, shouldPlay = true) {
    if (!playlist || playlist.length === 0) return;
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;

    currentIndex = index;
    const song = playlist[currentIndex];

    songNameEl.textContent = song.songName || "Unknown Track";
    songArtistEl.textContent = song.songArtist || "Unknown Artist";
    songAvatarEl.src = song.songAvatar || "./Assets/Images/image1.jpg";
    audioElement.src = song.songSrc;

    // Reset scrubber
    progressBarEl.value = 0;
    currentTimeEl.textContent = "00 : 00";

    if (shouldPlay) {
      audioElement.play().then(() => {
        setIsPlayingState(true);
      }).catch((err) => {
        console.log("Autoplay waiting for user gesture:", err);
        setIsPlayingState(false);
      });
    } else {
      setIsPlayingState(false);
    }
  }

  // Set play / pause icon state
  function setIsPlayingState(playing) {
    isPlaying = playing;
    if (isPlaying) {
      playBtnEl.classList.remove("fa-circle-play");
      playBtnEl.classList.add("fa-pause-circle");
    } else {
      playBtnEl.classList.remove("fa-pause-circle");
      playBtnEl.classList.add("fa-circle-play");
    }
  }

  // Toggle play/pause
  function togglePlay() {
    if (!audioElement.src) {
      if (playlist.length > 0) loadSong(0, true);
      return;
    }

    if (audioElement.paused) {
      audioElement.play().then(() => {
        setIsPlayingState(true);
      }).catch(console.error);
    } else {
      audioElement.pause();
      setIsPlayingState(false);
    }
  }

  function playNext() {
    loadSong(currentIndex + 1, true);
  }

  function playPrev() {
    loadSong(currentIndex - 1, true);
  }

  // Cycle background video
  function changeBackground() {
    bgVideoIndex = (bgVideoIndex + 1) % BG_VIDEOS.length;
    bgVideoElement.src = BG_VIDEOS[bgVideoIndex];
    bgVideoElement.play().catch(() => {});
  }

  // Cycle avatar object-fit
  function cycleAvatarFit() {
    avatarFitIndex = (avatarFitIndex + 1) % AVATAR_FITS.length;
    AVATAR_FITS.forEach((cls) => songAvatarEl.classList.remove(cls));
    songAvatarEl.classList.add(AVATAR_FITS[avatarFitIndex]);
  }

  // Fetch dynamic songs from free cloud source
  async function fetchCloudSongs(searchTerm) {
    statusBadgeEl.textContent = `Fetching latest songs for "${searchTerm}"...`;
    let cloudSongs = [];

    // 1. Try iTunes Search API (100% Free, live cloud, CORS enabled)
    try {
      const url = `${CLOUD_SEARCH_API}?term=${encodeURIComponent(searchTerm)}&entity=song&limit=40`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.results && data.results.length > 0) {
          cloudSongs = data.results
            .filter((item) => item.previewUrl)
            .map((item) => ({
              songName: item.trackName,
              songArtist: item.artistName,
              songSrc: item.previewUrl,
              songAvatar: (item.artworkUrl100 || "").replace("100x100bb", "600x600bb") || "./Assets/Images/image1.jpg"
            }));
        }
      }
    } catch (e) {
      console.warn("Cloud API fetch error:", e);
    }

    // 2. Try loading local/custom songs.json playlist
    let customSongs = [];
    try {
      const jsonRes = await fetch(LOCAL_PLAYLIST_URL);
      if (jsonRes.ok) {
        customSongs = await jsonRes.json();
      }
    } catch (e) {
      console.log("No custom songs.json found or failed to load:", e);
    }

    // Combine custom songs + live cloud songs
    const combined = [...customSongs, ...cloudSongs];

    if (combined.length > 0) {
      playlist = combined;
      statusBadgeEl.textContent = `Loaded ${playlist.length} cloud songs (${searchTerm})`;
    } else {
      playlist = fallbackSongs;
      statusBadgeEl.textContent = `Using fallback playlist (${fallbackSongs.length} songs)`;
    }

    // Load first song
    loadSong(0, false);
  }

  // Bind all interactive events
  function bindEvents() {
    playBtnEl.addEventListener("click", togglePlay);
    nextBtnEl.addEventListener("click", playNext);
    prevBtnEl.addEventListener("click", playPrev);

    // Audio time update
    audioElement.addEventListener("timeupdate", () => {
      const cur = audioElement.currentTime;
      const dur = audioElement.duration;

      currentTimeEl.textContent = formatTime(cur);

      if (dur && !isNaN(dur)) {
        totalDurationEl.textContent = formatTime(dur);
        progressBarEl.value = Math.floor((cur / dur) * 100);
      }
    });

    audioElement.addEventListener("loadedmetadata", () => {
      if (audioElement.duration && !isNaN(audioElement.duration)) {
        totalDurationEl.textContent = formatTime(audioElement.duration);
      }
    });

    // Auto next on end
    audioElement.addEventListener("ended", playNext);

    // Scrubber seek
    progressBarEl.addEventListener("input", (e) => {
      if (audioElement.duration && !isNaN(audioElement.duration)) {
        audioElement.currentTime = (e.target.value * audioElement.duration) / 100;
      }
    });

    // Change background button
    const changeBackBtn = document.getElementById("changeBackBtn");
    if (changeBackBtn) changeBackBtn.addEventListener("click", changeBackground);

    // Song avatar click
    songAvatarEl.addEventListener("click", cycleAvatarFit);

    // Category button clicks
    const catButtons = document.querySelectorAll(".cat-pill");
    catButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        catButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const query = btn.getAttribute("data-query");
        currentCategory = query;
        fetchCloudSongs(query);
      });
    });

    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        playNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        playPrev();
      }
    });
  }

  // Initialize
  window.addEventListener("DOMContentLoaded", () => {
    renderLayout();
    fetchCloudSongs(currentCategory);
  });

  // Fallback if DOMContentLoaded already fired
  if (document.readyState === "complete" || document.readyState === "interactive") {
    renderLayout();
    fetchCloudSongs(currentCategory);
  }
})();
