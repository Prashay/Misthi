// Misthi - Dynamic Cloud Music Player (YouTube Music & JioSaavn Inspired)
(function () {
  "use strict";

  const CLOUD_API = "https://itunes.apple.com/search";
  const LOCAL_PLAYLIST_URL = "./songs.json";

  const BG_VIDEOS = [
    "./Assets/Videos/vid1.mp4",
    "./Assets/Videos/vid2.mp4",
    "./Assets/Videos/vid4.mp4",
    "./Assets/Videos/vid3.mp4"
  ];

  const AVATAR_FITS = ["objectFitCover", "objectFitContain", "none"];

  // Curated 90s Collections
  const COLLECTIONS_90S = [
    {
      id: "90s-romance",
      title: "90s Romantic Melodies",
      subtitle: "Kumar Sanu, Alka Yagnik, Udit Narayan",
      query: "90s bollywood romantic hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9c/0b/ff/9c0bfff2-d815-5858-aa86-7a7187c3ee42/886443659223.jpg/400x400bb.jpg"
    },
    {
      id: "90s-sanualka",
      title: "Kumar Sanu & Alka Yagnik",
      subtitle: "The Golden Duets of the 90s",
      query: "kumar sanu alka yagnik romantic hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a4/c8/f5/a4c8f5c9-948f-8012-70b7-3b2d6a362bc8/8903431600851_cover.jpg/400x400bb.jpg"
    },
    {
      id: "90s-udit",
      title: "Udit Narayan 90s Classics",
      subtitle: "Iconic Romantic Superhits",
      query: "udit narayan 90s hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/c3/0f/33c30f40-349f-b3dc-8e54-5264b58e7278/8903431600868_cover.jpg/400x400bb.jpg"
    },
    {
      id: "90s-sad",
      title: "90s Heartbreak & Sad Melodies",
      subtitle: "Emotional Soulful Classics",
      query: "90s hindi sad songs",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c7/23/e4/c723e4ee-be18-20eb-ce1b-7a13c9df1b4a/886444988623.jpg/400x400bb.jpg"
    },
    {
      id: "90s-dance",
      title: "90s Retro Dance & Party",
      subtitle: "Govinda, Karisma & 90s Beats",
      query: "90s bollywood dance hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e5/28/aa/e528aa7a-8f64-fa7d-8153-f7a934aa779e/8903431633514_cover.jpg/400x400bb.jpg"
    }
  ];

  // Curated Latest Collections
  const COLLECTIONS_LATEST = [
    {
      id: "latest-top",
      title: "Trending Bollywood Hits 2024-2026",
      subtitle: "Top Chartbusters Today",
      query: "latest bollywood hindi hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/64/43/40/64434079-c5c6-5590-3453-e3b97b1029c7/8903431998521_cover.jpg/400x400bb.jpg"
    },
    {
      id: "latest-arijit",
      title: "Arijit Singh Latest",
      subtitle: "Soulful New Releases",
      query: "arijit singh latest",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/bf/1e/86/bf1e86d2-3bf9-a9a3-5c74-2c6c06df2614/8903431910608_cover.jpg/400x400bb.jpg"
    },
    {
      id: "latest-punjabi",
      title: "Punjabi Party Hits",
      subtitle: "Karan Aujla, Diljit, AP Dhillon",
      query: "punjabi latest hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/31/6f/9b/316f9b89-a29d-ee1b-535d-b2b8006d15b2/8903431980311_cover.jpg/400x400bb.jpg"
    },
    {
      id: "latest-romantic",
      title: "Hindi Romantic 2025",
      subtitle: "Love Anthems of the Year",
      query: "bollywood romantic love songs",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8e/3c/6f/8e3c6fbc-8919-450f-54bf-5a21079d86a6/8903431945198_cover.jpg/400x400bb.jpg"
    },
    {
      id: "latest-lofi",
      title: "Bollywood Lofi & Chill",
      subtitle: "Relaxing Acoustic & Slowed",
      query: "hindi lofi acoustic",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/65/59/3a/65593a2e-ae4b-7008-0114-16a3cb840c83/197188737298.jpg/400x400bb.jpg"
    }
  ];

  // Curated Singers
  const SINGERS_LIST = [
    {
      name: "Arijit Singh",
      subtitle: "Voice of the Nation",
      query: "arijit singh",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/400x400bb.jpg"
    },
    {
      name: "Shreya Ghoshal",
      subtitle: "Melody Queen",
      query: "shreya ghoshal bollywood",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8e/3c/6f/8e3c6fbc-8919-450f-54bf-5a21079d86a6/8903431945198_cover.jpg/400x400bb.jpg"
    },
    {
      name: "Atif Aslam",
      subtitle: "Romantic King",
      query: "atif aslam bollywood",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/64/a7/e4/64a7e4b9-e1ae-f6e4-4fa0-f65eec6c3d49/886443659216.jpg/400x400bb.jpg"
    },
    {
      name: "KK",
      subtitle: "Eternal Soul Voice",
      query: "kk krishnakumar kunnath hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b8/0a/61/b80a61ca-79ba-26f6-cf9a-a70d65b1aa97/886443659209.jpg/400x400bb.jpg"
    },
    {
      name: "Kumar Sanu",
      subtitle: "King of 90s Romance",
      query: "kumar sanu hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a4/c8/f5/a4c8f5c9-948f-8012-70b7-3b2d6a362bc8/8903431600851_cover.jpg/400x400bb.jpg"
    },
    {
      name: "Alka Yagnik",
      subtitle: "90s Golden Voice",
      query: "alka yagnik hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9c/0b/ff/9c0bfff2-d815-5858-aa86-7a7187c3ee42/886443659223.jpg/400x400bb.jpg"
    },
    {
      name: "Sonu Nigam",
      subtitle: "Lord of Melodies",
      query: "sonu nigam hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4e/7d/1b/4e7d1b33-e0aa-16cf-7d27-6f0141a084c7/8903431600875_cover.jpg/400x400bb.jpg"
    },
    {
      name: "Kishore Kumar",
      subtitle: "Evergreen Legend",
      query: "kishore kumar best hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/db/e6/f1/dbe6f19e-e31e-4ee2-f67f-44247e1d52dc/886443659230.jpg/400x400bb.jpg"
    },
    {
      name: "Lata Mangeshkar",
      subtitle: "Nightingale of India",
      query: "lata mangeshkar golden hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/9e/7b/cf/9e7bcf5f-5197-2009-db99-63ff0d6bb644/886443659247.jpg/400x400bb.jpg"
    },
    {
      name: "Diljit Dosanjh",
      subtitle: "Global Punjabi Star",
      query: "diljit dosanjh latest hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/31/6f/9b/316f9b89-a29d-ee1b-535d-b2b8006d15b2/8903431980311_cover.jpg/400x400bb.jpg"
    },
    {
      name: "Mohit Chauhan",
      subtitle: "Soul of Rockstar",
      query: "mohit chauhan hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c6/26/d2/c626d2e6-fa37-e029-7988-9580aa8e1041/886443659254.jpg/400x400bb.jpg"
    },
    {
      name: "Neha Kakkar",
      subtitle: "Party & Pop Sensation",
      query: "neha kakkar hits",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6c/8a/aa/6c8aaa36-5ac1-2f18-3718-a6c27e98a53e/8903431705778_cover.jpg/400x400bb.jpg"
    }
  ];

  // Curated Iconic Albums
  const ALBUMS_LIST = [
    {
      title: "Aashiqui 2",
      year: "2013",
      artist: "Mithoon, Ankit Tiwari, Jeet Gannguli",
      query: "aashiqui 2 soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/80/7e/6b/807e6b0a-7da4-9844-3151-5183dbfa962a/8902894354294_cover.jpg/400x400bb.jpg"
    },
    {
      title: "Kabir Singh",
      year: "2019",
      artist: "Sachet-Parampara, Mithoon, Vishal Mishra",
      query: "kabir singh soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/55/96/60/5596603a-3453-272e-d006-25805562ea83/8903431766625_cover.jpg/400x400bb.jpg"
    },
    {
      title: "Animal",
      year: "2023",
      artist: "JAM8, Vishal Mishra, Manan Bhardwaj",
      query: "animal ranbir kapoor soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c6/99/a6/c699a6d9-8131-419b-640a-c466456f4d5e/8903431962386_cover.jpg/400x400bb.jpg"
    },
    {
      title: "Yeh Jawaani Hai Deewani",
      year: "2013",
      artist: "Pritam",
      query: "yeh jawaani hai deewani soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/31/59/a2/3159a2da-078c-0fc8-8d48-7359560f1ca0/886443936669.jpg/400x400bb.jpg"
    },
    {
      title: "Rockstar",
      year: "2011",
      artist: "A. R. Rahman",
      query: "rockstar ar rahman soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6b/25/61/6b256193-41bb-ad61-382a-a95cf104d440/886443318991.jpg/400x400bb.jpg"
    },
    {
      title: "Dilwale Dulhania Le Jayenge",
      year: "1995",
      artist: "Jatin-Lalit",
      query: "dilwale dulhania le jayenge ddlj soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/cf/c9/89/cfc98910-be55-9003-8898-0c6a5a22839b/886444856007.jpg/400x400bb.jpg"
    },
    {
      title: "Jab We Met",
      year: "2007",
      artist: "Pritam & Sandesh Shandilya",
      query: "jab we met soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/09/b6/2a/09b62a63-faae-3bda-dbff-47f6eb079c65/886443318984.jpg/400x400bb.jpg"
    },
    {
      title: "Kal Ho Naa Ho",
      year: "2003",
      artist: "Shankar-Ehsaan-Loy",
      query: "kal ho naa ho soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/bd/e6/73/bde67393-2720-e22b-e1c0-08ef61737cf6/886443659261.jpg/400x400bb.jpg"
    },
    {
      title: "Veer-Zaara",
      year: "2004",
      artist: "Madan Mohan & Sanjeev Kohli",
      query: "veer zaara soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a7/b0/43/a7b04394-bb9e-4e4b-639a-5f939beea3e3/886444856014.jpg/400x400bb.jpg"
    },
    {
      title: "Kuch Kuch Hota Hai",
      year: "1998",
      artist: "Jatin-Lalit",
      query: "kuch kuch hota hai soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/11/4a/bc/114abc06-c875-9e61-a0ea-46b0a1d604e3/886443659278.jpg/400x400bb.jpg"
    },
    {
      title: "Dil Se",
      year: "1998",
      artist: "A. R. Rahman",
      query: "dil se ar rahman soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/f4/bf/d1/f4bfd193-c917-1977-991f-0e48714eb651/886443659285.jpg/400x400bb.jpg"
    },
    {
      title: "Shershaah",
      year: "2021",
      artist: "Jasleen Royal, B Praak, Tanishk Bagchi",
      query: "shershaah soundtrack",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/21/df/b6/21dfb6ba-fba0-59be-5ec2-dcfbf1c678a1/8903431835772_cover.jpg/400x400bb.jpg"
    }
  ];

  // Curated YouTube Video IDs for instant full song playback
  const YOUTUBE_CACHE = {
    "Kesariya": "BddP6PYo2gs",
    "Apna Bana Le": "ElZfdU54Cp8",
    "Ve Kamleya": "k5q6_wN-x8U",
    "Tauba Tauba": "LK7-_dgAVQE",
    "Pani Da Rang": "L-wE_kXQG_U",
    "Tum Hi Ho": "IJq0yyWug1k",
    "Channa Mereya": "284Ov7ysmfA",
    "O Maahi": "gfkTfcpPPQ8",
    "Pehle Bhi Main": "iAIBF2ngbWY",
    "Tere Vaaste": "2v8ptZkgGcg",
    "Agar Tum Saath Ho": "sK7riqg2mr4",
    "Dil Diyan Gallan": "mevO4I0f5lg",
    "Tujhe Dekha Toh": "cNV5hLKLGt8",
    "Chaiyya Chaiyya": "PQmrmVs10X8",
    "Kal Ho Naa Ho": "g0eO74UmRBs",
    "Gerua": "AEIVhBS6baE",
    "Hawayein": "cYOB941gyXI",
    "Raataan Lambiyan": "gvyUuxdRdR4",
    "Raabta": "z-diRlh_K4A",
    "Shayad": "bCdZ3OQ_q1E",
    "Tujh Mein Rab Dikhta Hai": "qoq8B8ThgEM",
    "Aankh Marey": "k4yXQkG2s1E",
    "Lut Gaye": "sCbbMZ-q4-I",
    "Dilbar": "JFcgOboQZ08",
    "Ghungroo": "qFkNATtc3mc",
    "Nashe Si Chadh Gayi": "Wd2B8OAotU8",
    "Kun Faya Kun": "T94PHkuydcw",
    "Ae Dil Hai Mushkil": "6FURuLYrR_Q",
    "Ghar More Pardesiya": "pp8vZE1P-nU"
  };

  // State
  let playlist = [];
  let currentIndex = 0;
  let isPlaying = false;
  let bgVideoIndex = 0;
  let avatarFitIndex = 0;
  let activeTab = "player"; // 'player' | 'search' | 'latest' | '90s' | 'singers' | 'albums'
  let searchDebounceTimer = null;

  // DOM Elements
  let audioElement, bgVideoElement, songNameEl, songArtistEl, songAlbumEl, songAvatarEl;
  let currentTimeEl, totalDurationEl, progressBarEl, playBtnEl, prevBtnEl, nextBtnEl;
  let browseOverlay, browseContentArea, nowPlayingPill, pillThumb, pillTitle, pillStatus;
  let ytEmbedWrapper, ytIframe, btnPlayFullInApp, btnSwitchAvatar;
  let ytFullPlayerBtn, playerStatusBadge;

  // Helper to escape HTML characters
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Resolve YouTube Video ID dynamically for ANY song (prioritizing embeddable audio/lyric versions)
  async function resolveYouTubeVideoId(songName, artistName) {
    if (!songName) return "k5q6_wN-x8U";
    
    // Check local dictionary
    for (const [key, id] of Object.entries(YOUTUBE_CACHE)) {
      if (songName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(songName.toLowerCase())) {
        return id;
      }
    }

    const cleanQuery = `${songName} ${artistName || ""} audio lyrical`
      .replace(/[^\w\s]/gi, " ")
      .trim();

    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}`;
    const proxies = [
      (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
      (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`
    ];

    for (const makeProxy of proxies) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4500);
        const res = await fetch(makeProxy(searchUrl), { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const text = await res.text();
          const match = text.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
          if (match && match[1]) {
            YOUTUBE_CACHE[songName] = match[1];
            return match[1];
          }
        }
      } catch (e) {}
    }

    return "k5q6_wN-x8U"; // Reliable fallback
  }

  // Play Full Song In-App via YouTube Embed
  async function playFullSongInApp(track) {
    if (!track) return;
    switchTab("player");

    // Pause audio element preview
    audioElement.pause();
    setIsPlayingState(false);

    // Update metadata
    songNameEl.textContent = track.songName || "Now Playing";
    songArtistEl.textContent = track.songArtist || "Artist";
    if (songAlbumEl) {
      songAlbumEl.innerHTML = `<i class="fa-solid fa-compact-disc"></i> ${escapeHtml(track.albumName || "Soundtrack")}`;
    }

    if (playerStatusBadge) {
      playerStatusBadge.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Loading full song from YouTube...`;
    }

    // Switch view to YouTube embed
    if (songAvatarEl) songAvatarEl.style.display = "none";
    if (ytEmbedWrapper) ytEmbedWrapper.classList.add("active");
    if (btnSwitchAvatar) btnSwitchAvatar.classList.add("active");

    const videoId = await resolveYouTubeVideoId(track.songName, track.songArtist);
    if (ytIframe && videoId) {
      const originParam = window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : "";
      ytIframe.referrerPolicy = "strict-origin-when-cross-origin";
      ytIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1${originParam}`;
      if (playerStatusBadge) {
        playerStatusBadge.innerHTML = `<i class="fa-brands fa-youtube" style="color:#ff0000;"></i> Playing Full Song (YouTube In-App) • <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;">Direct Link ↗</a>`;
      }
    }
  }

  // Switch back to classic Disk Avatar
  function switchToDiskAvatar() {
    if (ytIframe) ytIframe.src = "";
    if (ytEmbedWrapper) ytEmbedWrapper.classList.remove("active");
    if (btnSwitchAvatar) btnSwitchAvatar.classList.remove("active");
    if (songAvatarEl) songAvatarEl.style.display = "block";
    if (playerStatusBadge) {
      playerStatusBadge.innerHTML = `<i class="fa-solid fa-bolt" style="color:var(--accent-color);"></i> Cloud Preview (30s)`;
    }
    if (playlist[currentIndex]) {
      audioElement.play().then(() => setIsPlayingState(true)).catch(() => {});
    }
  }

  // Render Full Application UI into #root
  function renderApp() {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = `
      <div class="container">
        <!-- Background Video -->
        <audio id="audioElement" preload="metadata"></audio>
        <video id="bgVideo" src="${BG_VIDEOS[0]}" loop muted autoplay playsinline class="backgroundVideo"></video>
        <div class="blackScreen"></div>

        <!-- Top Navigation Bar (YouTube Music / JioSaavn Style) -->
        <header class="misthi-nav">
          <div class="misthi-logo" id="logoBtn">
            <i class="fa-solid fa-compact-disc"></i>
            <span>Misthi</span>
          </div>

          <div class="misthi-tabs">
            <button class="nav-tab-btn active" data-tab="player">
              <i class="fa-solid fa-play"></i> Now Playing
            </button>
            <button class="nav-tab-btn" data-tab="search">
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
            <button class="nav-tab-btn" data-tab="latest">
              <i class="fa-solid fa-fire"></i> Latest
            </button>
            <button class="nav-tab-btn" data-tab="90s">
              <i class="fa-solid fa-radio"></i> 90s Hits
            </button>
            <button class="nav-tab-btn" data-tab="singers">
              <i class="fa-solid fa-microphone-lines"></i> Singers
            </button>
            <button class="nav-tab-btn" data-tab="albums">
              <i class="fa-solid fa-record-vinyl"></i> Albums
            </button>
          </div>

          <div class="nav-right-actions">
            <button class="quick-search-trigger" id="quickSearchBtn">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>Explore Cloud</span>
            </button>
          </div>
        </header>

        <!-- Main Center Player Card (Classic Floating Card) -->
        <div class="music-Container" id="playerCard">
          <p class="musicPlayer">Misthi Cloud Player</p>
          <p class="music-Head-Name" id="songName">Connecting to Cloud...</p>
          <p class="music-Artist-Name" id="songArtist">Free Cloud Music</p>
          <p class="music-Album-Name" id="songAlbum"><i class="fa-solid fa-compact-disc"></i> Album: Loading...</p>
          <!-- Disk Avatar Mode -->
          <img 
            src="./Assets/Images/image1.jpg" 
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='./Assets/Images/image1.jpg';"
            class="objectFitCover" 
            alt="song Avatar" 
            id="songAvatar" 
          />

          <!-- Full Song YouTube In-App Player Frame -->
          <div class="yt-embed-wrapper" id="ytEmbedWrapper">
            <iframe id="ytIframe" src="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          </div>

          <button class="btn-switch-avatar" id="btnSwitchAvatar">
            <i class="fa-solid fa-compact-disc"></i> Back to Disk Avatar
          </button>

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

          <!-- YouTube Full Song Play In-App Button -->
          <div class="player-action-row">
            <button class="btn-play-full-inapp" id="btnPlayFullInApp">
              <i class="fa-brands fa-youtube"></i>
              <span>Play Full Song In-App</span>
            </button>
            <a href="#" target="_blank" rel="noopener" class="yt-full-player-btn" id="ytFullPlayerBtn" title="Play Full Song on YouTube" style="display:none;">
              <i class="fa-brands fa-youtube"></i>
            </a>
          </div>

          <div class="preview-info-notice" id="previewNotice">
            <i class="fa-solid fa-bolt" style="color:var(--accent-color);"></i>
            <span id="playerStatusBadge">Free Cloud Stream</span>
          </div>
        </div>

        <!-- Video Background Switcher (Retained) -->
        <div class="changeBackBtn" id="changeBackBtn">Update Background</div>

        <!-- Copyright / Portfolio Link (Retained) -->
        <a href="https://prashay.github.io/prashantj/" title="Info" class="youtube-Subs" target="_blank" rel="noopener">
          <img src="./Assets/Images/pj.jpeg" alt="Logo" />
          <p>Copyright © <span id="copyrightYear">2026</span> All rights reserved | <b>Prashant Jha</b></p>
        </a>

        <!-- Browse & Explore Overlay Panel (YouTube Music / JioSaavn Style) -->
        <div class="browse-overlay hidden" id="browseOverlay">
          <div id="browseContentArea"></div>
        </div>

        <!-- Floating Now Playing Pill (When in Browse view) -->
        <div class="now-playing-pill" id="nowPlayingPill" style="display:none;">
          <img 
            src="./Assets/Images/image1.jpg" 
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='./Assets/Images/image1.jpg';"
            id="pillThumb" 
            alt="Thumb" 
          />
          <div class="now-playing-pill-text">
            <span class="now-playing-pill-title" id="pillTitle">No Song</span>
            <span class="now-playing-pill-status" id="pillStatus">Paused</span>
          </div>
          <i class="fa-solid fa-play" id="pillPlayIcon" style="color:var(--accent-color);font-size:0.9rem;"></i>
        </div>
      </div>
    `;

    // Cache element references
    audioElement = document.getElementById("audioElement");
    bgVideoElement = document.getElementById("bgVideo");
    songNameEl = document.getElementById("songName");
    songArtistEl = document.getElementById("songArtist");
    songAlbumEl = document.getElementById("songAlbum");
    songAvatarEl = document.getElementById("songAvatar");
    ytEmbedWrapper = document.getElementById("ytEmbedWrapper");
    ytIframe = document.getElementById("ytIframe");
    btnSwitchAvatar = document.getElementById("btnSwitchAvatar");
    btnPlayFullInApp = document.getElementById("btnPlayFullInApp");
    currentTimeEl = document.getElementById("currentTime");
    totalDurationEl = document.getElementById("totalDuration");
    progressBarEl = document.getElementById("progressBar");
    playBtnEl = document.getElementById("playBtn");
    prevBtnEl = document.getElementById("prevBtn");
    nextBtnEl = document.getElementById("nextBtn");
    browseOverlay = document.getElementById("browseOverlay");
    browseContentArea = document.getElementById("browseContentArea");
    nowPlayingPill = document.getElementById("nowPlayingPill");
    pillThumb = document.getElementById("pillThumb");
    pillTitle = document.getElementById("pillTitle");
    pillStatus = document.getElementById("pillStatus");
    ytFullPlayerBtn = document.getElementById("ytFullPlayerBtn");
    playerStatusBadge = document.getElementById("playerStatusBadge");

    const yearEl = document.getElementById("copyrightYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    bindCoreEvents();
    bindNavigationEvents();

    // Load initial latest hits
    fetchCloudSongs("latest bollywood hindi", "Latest Bollywood Hits");
  }

  // Format time (seconds to "mm : ss")
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "00 : 00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" + mins : mins} : ${secs < 10 ? "0" + secs : secs}`;
  }

  // Load and play song by index in current active playlist
  function loadSong(index, autoPlay = true) {
    if (!playlist || playlist.length === 0) return;
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;

    currentIndex = index;
    const song = playlist[currentIndex];

    songNameEl.textContent = song.songName || "Unknown Track";
    songArtistEl.textContent = song.songArtist || "Unknown Artist";
    if (songAlbumEl) {
      songAlbumEl.innerHTML = `<i class="fa-solid fa-compact-disc"></i> ${escapeHtml(song.albumName || "Soundtrack / Single")}`;
    }
    songAvatarEl.src = song.songAvatar || "./Assets/Images/image1.jpg";
    audioElement.src = song.songSrc;

    // Update YouTube Full Song Direct Link
    if (ytFullPlayerBtn) {
      const ytQuery = encodeURIComponent(`${song.songName} ${song.songArtist} audio full song`);
      ytFullPlayerBtn.href = `https://www.youtube.com/results?search_query=${ytQuery}`;
    }

    // Update status badge
    if (playerStatusBadge) {
      if (song.isFullTrack) {
        playerStatusBadge.textContent = "Full Track Playing";
      } else {
        playerStatusBadge.textContent = "30s Cloud Preview • Click YouTube button for full song";
      }
    }

    // Update floating pill
    if (pillThumb) pillThumb.src = song.songAvatar || "./Assets/Images/image1.jpg";
    if (pillTitle) pillTitle.textContent = song.songName || "Unknown Track";

    // Set duration & reset progress
    const trackDur = song.duration || 30;
    totalDurationEl.textContent = formatTime(trackDur);
    progressBarEl.value = 0;
    currentTimeEl.textContent = "00 : 00";

    // Update active highlight in tracklist if open
    highlightCurrentTrackInView();

    if (autoPlay) {
      audioElement.play().then(() => {
        setIsPlayingState(true);
      }).catch((err) => {
        console.log("Playback gesture required:", err);
        setIsPlayingState(false);
      });
    } else {
      setIsPlayingState(false);
    }
  }

  function setIsPlayingState(playing) {
    isPlaying = playing;
    const pillIcon = document.getElementById("pillPlayIcon");
    if (isPlaying) {
      playBtnEl.classList.remove("fa-circle-play");
      playBtnEl.classList.add("fa-pause-circle");
      if (pillStatus) pillStatus.textContent = "Playing...";
      if (pillIcon) {
        pillIcon.classList.remove("fa-play");
        pillIcon.classList.add("fa-pause");
      }
    } else {
      playBtnEl.classList.remove("fa-pause-circle");
      playBtnEl.classList.add("fa-circle-play");
      if (pillStatus) pillStatus.textContent = "Paused";
      if (pillIcon) {
        pillIcon.classList.remove("fa-pause");
        pillIcon.classList.add("fa-play");
      }
    }
  }

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

  function changeBackground() {
    bgVideoIndex = (bgVideoIndex + 1) % BG_VIDEOS.length;
    bgVideoElement.src = BG_VIDEOS[bgVideoIndex];
    bgVideoElement.play().catch(() => {});
  }

  function cycleAvatarFit() {
    avatarFitIndex = (avatarFitIndex + 1) % AVATAR_FITS.length;
    AVATAR_FITS.forEach((cls) => songAvatarEl.classList.remove(cls));
    songAvatarEl.classList.add(AVATAR_FITS[avatarFitIndex]);
  }

  // Highlight the playing song item in current tracklist view
  function highlightCurrentTrackInView() {
    const items = document.querySelectorAll(".track-item");
    const currentSong = playlist[currentIndex];
    if (!currentSong) return;

    items.forEach((item) => {
      const title = item.getAttribute("data-title");
      if (title === currentSong.songName) {
        item.classList.add("playing");
      } else {
        item.classList.remove("playing");
      }
    });
  }

  // Core API Fetcher (100% Free Cloud Source)
  async function fetchCloudTracks(query, limit = 30) {
    try {
      const url = `${CLOUD_API}?term=${encodeURIComponent(query)}&entity=song&limit=${limit}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.results) {
          return data.results
            .filter((item) => item.previewUrl)
            .map((item) => {
              const rawImg = item.artworkUrl100 || item.artworkUrl60 || "";
              const highResImg = rawImg ? rawImg.replace(/100x100bb/, "500x500bb") : "./Assets/Images/image1.jpg";
              return {
                songName: item.trackName,
                songArtist: item.artistName,
                albumName: item.collectionName || "Bollywood Hits",
                songSrc: item.previewUrl,
                songAvatar: highResImg,
                duration: 30, // Official preview duration
                fullDuration: item.trackTimeMillis ? Math.round(item.trackTimeMillis / 1000) : 30,
                isFullTrack: false
              };
            });
        }
      }
    } catch (err) {
      console.warn("Cloud API error:", err);
    }
    return [];
  }

  // Fetch and replace active player playlist
  async function fetchCloudSongs(query, displayName = "") {
    const badge = document.getElementById("playerStatusBadge");
    if (badge) badge.textContent = `Loading ${displayName || query}...`;

    const cloudTracks = await fetchCloudTracks(query, 30);

    // Merge with any custom local songs.json tracks
    let customTracks = [];
    try {
      const res = await fetch(LOCAL_PLAYLIST_URL);
      if (res.ok) customTracks = await res.json();
    } catch (e) {}

    if (cloudTracks.length > 0 || customTracks.length > 0) {
      playlist = [...customTracks, ...cloudTracks];
      if (badge) badge.textContent = `${displayName || "Cloud"}: ${playlist.length} Songs`;
      loadSong(0, false);
    }
  }

  // UI Navigation & View Switching
  function switchTab(tabName) {
    activeTab = tabName;

    // Update active tab button
    document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
      if (btn.getAttribute("data-tab") === tabName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (tabName === "player") {
      // Show main player, hide browse overlay
      browseOverlay.classList.add("hidden");
      nowPlayingPill.style.display = "none";
      document.getElementById("playerCard").style.display = "flex";
      document.getElementById("changeBackBtn").style.display = "block";
    } else {
      // Show browse overlay
      browseOverlay.classList.remove("hidden");
      nowPlayingPill.style.display = "flex";
      document.getElementById("playerCard").style.display = "none";
      document.getElementById("changeBackBtn").style.display = "none";

      renderBrowseView(tabName);
    }
  }

  // Render Content inside Browse Overlay
  function renderBrowseView(tab) {
    switch (tab) {
      case "search":
        renderSearchView();
        break;
      case "latest":
        renderLatestView();
        break;
      case "90s":
        render90sView();
        break;
      case "singers":
        renderSingersView();
        break;
      case "albums":
        renderAlbumsView();
        break;
      default:
        renderLatestView();
    }
  }

  // View: Search
  function renderSearchView() {
    browseContentArea.innerHTML = `
      <div class="search-header-box">
        <div class="search-input-wrapper">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            class="main-search-input" 
            id="mainSearchInput" 
            placeholder="Search any song, singer, album, or movie (e.g. Arijit Singh, Animal, 90s Romantic)..." 
            autocomplete="off"
            autofocus
          />
          <i class="fa-solid fa-circle-xmark search-clear-btn" id="searchClearBtn"></i>
        </div>

        <div class="quick-tags-container">
          <span class="quick-tag" data-q="Arijit Singh">🎶 Arijit Singh</span>
          <span class="quick-tag" data-q="90s Bollywood Romantic">📻 90s Romantic</span>
          <span class="quick-tag" data-q="Karan Aujla Punjabi">⚡ Karan Aujla</span>
          <span class="quick-tag" data-q="Shreya Ghoshal">💖 Shreya Ghoshal</span>
          <span class="quick-tag" data-q="Kumar Sanu">🎙️ Kumar Sanu</span>
          <span class="quick-tag" data-q="Atif Aslam">🎸 Atif Aslam</span>
          <span class="quick-tag" data-q="Diljit Dosanjh">🔥 Diljit Dosanjh</span>
        </div>
      </div>

      <div id="searchResultsSection">
        <div style="text-align:center;color:var(--text-dim);padding:40px 20px;">
          <i class="fa-solid fa-music" style="font-size:2.5rem;margin-bottom:12px;color:rgba(255,255,255,0.2);"></i>
          <p>Search over millions of free cloud songs instantly.</p>
        </div>
      </div>
    `;

    const input = document.getElementById("mainSearchInput");
    const clearBtn = document.getElementById("searchClearBtn");

    input.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      clearBtn.style.display = q ? "block" : "none";

      clearTimeout(searchDebounceTimer);
      if (q.length >= 2) {
        searchDebounceTimer = setTimeout(() => {
          performSearch(q);
        }, 350);
      }
    });

    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.style.display = "none";
      document.getElementById("searchResultsSection").innerHTML = `
        <div style="text-align:center;color:var(--text-dim);padding:40px 20px;">
          <p>Type above to search cloud songs.</p>
        </div>
      `;
    });

    document.querySelectorAll(".quick-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        const query = tag.getAttribute("data-q");
        input.value = query;
        clearBtn.style.display = "block";
        performSearch(query);
      });
    });
  }

  async function performSearch(query) {
    const resultsContainer = document.getElementById("searchResultsSection");
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div style="text-align:center;color:#fff;padding:30px;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size:1.8rem;color:var(--accent-color);"></i>
        <p style="margin-top:12px;font-size:0.88rem;">Searching cloud for "${query}"...</p>
      </div>
    `;

    const tracks = await fetchCloudTracks(query, 30);

    if (tracks.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align:center;color:var(--text-dim);padding:40px;">
          <p>No songs found for "${query}". Try another title or artist.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="section-title-row">
        <h3 class="section-title">
          <i class="fa-solid fa-bolt"></i> Results for "${query}"
        </h3>
        <button class="btn-play-album" id="playAllSearchBtn">
          <i class="fa-solid fa-play"></i> Play All (${tracks.length})
        </button>
      </div>
      <div class="tracklist-container" id="searchTracklist"></div>
    `;

    const tracklistEl = document.getElementById("searchTracklist");
    tracks.forEach((track, idx) => {
      tracklistEl.appendChild(createTrackItemElement(track, idx, tracks));
    });

    document.getElementById("playAllSearchBtn").addEventListener("click", () => {
      playlist = tracks;
      loadSong(0, true);
    });
  }

  // View: Latest Hits
  function renderLatestView() {
    browseContentArea.innerHTML = `
      <div class="browse-section">
        <div class="section-title-row">
          <h2 class="section-title">
            <i class="fa-solid fa-fire"></i> Latest Trending Playlists
          </h2>
          <span class="section-badge">Updated Daily</span>
        </div>
        <div class="cards-grid" id="latestCollectionsGrid"></div>
      </div>

      <div class="browse-section">
        <div class="section-title-row">
          <h2 class="section-title">
            <i class="fa-solid fa-music"></i> Top Fresh Tracks
          </h2>
        </div>
        <div class="tracklist-container" id="latestTracksContainer">
          <div style="text-align:center;padding:30px;color:var(--text-dim);">
            <i class="fa-solid fa-circle-notch fa-spin"></i> Loading latest tracks...
          </div>
        </div>
      </div>
    `;

    const grid = document.getElementById("latestCollectionsGrid");
    COLLECTIONS_LATEST.forEach((col) => {
      const card = document.createElement("div");
      card.className = "music-card";
      card.innerHTML = `
        <div class="music-card-img-wrap">
          <img src="${col.img}" class="music-card-img" alt="${col.title}" />
          <div class="card-play-overlay"><i class="fa-solid fa-play"></i></div>
        </div>
        <h4 class="card-title">${col.title}</h4>
        <p class="card-subtitle">${col.subtitle}</p>
      `;
      card.addEventListener("click", () => {
        openCollectionDetail(col.title, col.subtitle, col.img, col.query, "Playlist");
      });
      grid.appendChild(card);
    });

    // Populate top tracks
    fetchCloudTracks("latest bollywood hindi hits", 15).then((tracks) => {
      const container = document.getElementById("latestTracksContainer");
      if (!container) return;
      container.innerHTML = "";
      tracks.forEach((track, idx) => {
        container.appendChild(createTrackItemElement(track, idx, tracks));
      });
    });
  }

  // View: 90s Hits
  function render90sView() {
    browseContentArea.innerHTML = `
      <div class="browse-section">
        <div class="section-title-row">
          <h2 class="section-title">
            <i class="fa-solid fa-radio"></i> Golden 90s Bollywood Playlists
          </h2>
          <span class="section-badge">Pure Nostalgia</span>
        </div>
        <div class="cards-grid" id="retroCollectionsGrid"></div>
      </div>

      <div class="browse-section">
        <div class="section-title-row">
          <h2 class="section-title">
            <i class="fa-solid fa-heart"></i> Timeless 90s Melodies
          </h2>
        </div>
        <div class="tracklist-container" id="retroTracksContainer">
          <div style="text-align:center;padding:30px;color:var(--text-dim);">
            <i class="fa-solid fa-circle-notch fa-spin"></i> Loading 90s evergreen melodies...
          </div>
        </div>
      </div>
    `;

    const grid = document.getElementById("retroCollectionsGrid");
    COLLECTIONS_90S.forEach((col) => {
      const card = document.createElement("div");
      card.className = "music-card";
      card.innerHTML = `
        <div class="music-card-img-wrap">
          <img src="${col.img}" class="music-card-img" alt="${col.title}" />
          <div class="card-play-overlay"><i class="fa-solid fa-play"></i></div>
        </div>
        <h4 class="card-title">${col.title}</h4>
        <p class="card-subtitle">${col.subtitle}</p>
      `;
      card.addEventListener("click", () => {
        openCollectionDetail(col.title, col.subtitle, col.img, col.query, "90s Collection");
      });
      grid.appendChild(card);
    });

    fetchCloudTracks("90s bollywood romantic hits", 15).then((tracks) => {
      const container = document.getElementById("retroTracksContainer");
      if (!container) return;
      container.innerHTML = "";
      tracks.forEach((track, idx) => {
        container.appendChild(createTrackItemElement(track, idx, tracks));
      });
    });
  }

  // View: Singers
  function renderSingersView() {
    browseContentArea.innerHTML = `
      <div class="browse-section">
        <div class="section-title-row">
          <h2 class="section-title">
            <i class="fa-solid fa-microphone-lines"></i> Explore by Singer / Artist
          </h2>
          <span class="section-badge">Legendary & Trending</span>
        </div>
        <div class="cards-grid" id="singersGrid"></div>
      </div>
    `;

    const grid = document.getElementById("singersGrid");
    SINGERS_LIST.forEach((singer) => {
      const card = document.createElement("div");
      card.className = "music-card singer-card";
      card.innerHTML = `
        <div class="music-card-img-wrap">
          <img src="${singer.img}" class="music-card-img" alt="${singer.name}" />
          <div class="card-play-overlay"><i class="fa-solid fa-play"></i></div>
        </div>
        <h4 class="card-title" style="text-align:center;">${singer.name}</h4>
        <p class="card-subtitle" style="text-align:center;">${singer.subtitle}</p>
      `;
      card.addEventListener("click", () => {
        openCollectionDetail(singer.name, singer.subtitle, singer.img, singer.query, "Artist");
      });
      grid.appendChild(card);
    });
  }

  // View: Albums
  function renderAlbumsView() {
    browseContentArea.innerHTML = `
      <div class="browse-section">
        <div class="section-title-row">
          <h2 class="section-title">
            <i class="fa-solid fa-record-vinyl"></i> Iconic Soundtracks & Albums
          </h2>
          <span class="section-badge">Complete Albums</span>
        </div>
        <div class="cards-grid" id="albumsGrid"></div>
      </div>
    `;

    const grid = document.getElementById("albumsGrid");
    ALBUMS_LIST.forEach((album) => {
      const card = document.createElement("div");
      card.className = "music-card";
      card.innerHTML = `
        <div class="music-card-img-wrap">
          <img src="${album.img}" class="music-card-img" alt="${album.title}" />
          <div class="card-play-overlay"><i class="fa-solid fa-play"></i></div>
        </div>
        <h4 class="card-title">${album.title}</h4>
        <p class="card-subtitle">${album.year} • ${album.artist}</p>
      `;
      card.addEventListener("click", () => {
        openCollectionDetail(album.title, `${album.year} • ${album.artist}`, album.img, album.query, "Album");
      });
      grid.appendChild(card);
    });
  }

  // Open Album / Singer Detail View with Tracklist
  async function openCollectionDetail(title, subtitle, coverUrl, query, typeBadge = "Album") {
    browseContentArea.innerHTML = `
      <div class="album-details-view">
        <div class="album-hero-banner">
          <img src="${coverUrl}" class="album-hero-cover" alt="${title}" />
          <div class="album-hero-info">
            <span class="album-hero-badge">${typeBadge}</span>
            <h1 class="album-hero-title">${title}</h1>
            <p class="album-hero-desc">${subtitle}</p>
            <div class="album-actions-row">
              <button class="btn-play-album" id="albumPlayAllBtn" disabled>
                <i class="fa-solid fa-circle-notch fa-spin" id="playBtnSpinner"></i>
                <span id="playBtnText">Loading Tracks...</span>
              </button>
              <button class="btn-back-album" id="albumBackBtn">
                <i class="fa-solid fa-arrow-left"></i> Back
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 style="font-size:1.15rem;margin-bottom:14px;color:#fff;">
            <i class="fa-solid fa-list"></i> Tracklist
          </h3>
          <div class="tracklist-container" id="albumTracksList">
            <div style="text-align:center;padding:40px;color:var(--text-dim);">
              <i class="fa-solid fa-circle-notch fa-spin"></i> Fetching songs...
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("albumBackBtn").addEventListener("click", () => {
      renderBrowseView(activeTab);
    });

    const tracks = await fetchCloudTracks(query, 25);
    const tracklistEl = document.getElementById("albumTracksList");
    const playAllBtn = document.getElementById("albumPlayAllBtn");
    const spinner = document.getElementById("playBtnSpinner");
    const playBtnText = document.getElementById("playBtnText");

    if (tracks.length === 0) {
      tracklistEl.innerHTML = `
        <div style="text-align:center;padding:30px;color:var(--text-dim);">
          <p>No tracks found for this collection.</p>
        </div>
      `;
      if (playAllBtn) playAllBtn.disabled = true;
      return;
    }

    tracklistEl.innerHTML = "";
    tracks.forEach((track, idx) => {
      tracklistEl.appendChild(createTrackItemElement(track, idx, tracks));
    });

    if (spinner) spinner.style.display = "none";
    if (playBtnText) playBtnText.textContent = `Play All (${tracks.length})`;
    if (playAllBtn) {
      playAllBtn.disabled = false;
      playAllBtn.addEventListener("click", () => {
        playlist = tracks;
        loadSong(0, true);
      });
    }
  }

  // Create Individual Track Item in Tracklist
  function createTrackItemElement(track, idx, parentPlaylist) {
    const item = document.createElement("div");
    item.className = "track-item";
    item.setAttribute("data-title", track.songName);

    const isCurrent = playlist[currentIndex] && playlist[currentIndex].songName === track.songName;
    if (isCurrent) item.classList.add("playing");

    const fallbackImg = "./Assets/Images/image1.jpg";
    const ytQuery = encodeURIComponent(`${track.songName} ${track.songArtist} audio full song`);

    item.innerHTML = `
      <div class="track-left">
        <span class="track-index">${idx + 1}</span>
        <img 
          src="${track.songAvatar || fallbackImg}" 
          referrerpolicy="no-referrer"
          onerror="this.onerror=null;this.src='${fallbackImg}';"
          class="track-thumb" 
          alt="${escapeHtml(track.songName)}" 
        />
        <div class="track-meta">
          <span class="track-title">${escapeHtml(track.songName)}</span>
          <span class="track-artist"><i class="fa-solid fa-microphone-lines"></i> ${escapeHtml(track.songArtist)}</span>
          <span class="track-album"><i class="fa-solid fa-compact-disc"></i> ${escapeHtml(track.albumName || "Soundtrack / Single")}</span>
        </div>
      </div>

      <div class="track-right">
        <button 
          class="track-yt-btn" 
          title="Play Full Song In-App"
          type="button"
        >
          <i class="fa-brands fa-youtube"></i> Full Song
        </button>
        <span class="track-duration">${track.isFullTrack ? formatTime(track.duration) : "00 : 30"}</span>
        <i class="fa-solid fa-circle-play track-play-icon" style="font-size:1.25rem;"></i>
      </div>
    `;

    // Click full song button -> In-App YouTube playback
    const fullBtn = item.querySelector(".track-yt-btn");
    if (fullBtn) {
      fullBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playlist = parentPlaylist;
        currentIndex = idx;
        playFullSongInApp(track);
      });
    }

    item.addEventListener("click", () => {
      // Set the active playlist to this collection & play track preview
      switchToDiskAvatar();
      playlist = parentPlaylist;
      loadSong(idx, true);
    });

    return item;
  }

  // Core Event Bindings
  function bindCoreEvents() {
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

    // Auto next track on finish
    audioElement.addEventListener("ended", playNext);

    // Scrubber seek
    progressBarEl.addEventListener("input", (e) => {
      if (audioElement.duration && !isNaN(audioElement.duration)) {
        audioElement.currentTime = (e.target.value * audioElement.duration) / 100;
      }
    });

    // Background video button (Retained)
    const changeBackBtn = document.getElementById("changeBackBtn");
    if (changeBackBtn) changeBackBtn.addEventListener("click", changeBackground);

    // Avatar fit click (Retained)
    if (songAvatarEl) songAvatarEl.addEventListener("click", cycleAvatarFit);

    // In-App Full Song Play & Avatar Switch Buttons
    if (btnPlayFullInApp) {
      btnPlayFullInApp.addEventListener("click", () => {
        if (playlist[currentIndex]) {
          playFullSongInApp(playlist[currentIndex]);
        }
      });
    }

    if (btnSwitchAvatar) {
      btnSwitchAvatar.addEventListener("click", switchToDiskAvatar);
    }

    // Floating Now Playing Pill Click
    if (nowPlayingPill) {
      nowPlayingPill.addEventListener("click", () => {
        switchTab("player");
      });
    }

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

  // Navigation Event Bindings
  function bindNavigationEvents() {
    // Tabs click
    document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        switchTab(tab);
      });
    });

    // Logo click (returns to player)
    const logoBtn = document.getElementById("logoBtn");
    if (logoBtn) {
      logoBtn.addEventListener("click", () => switchTab("player"));
    }

    // Quick search trigger
    const quickSearchBtn = document.getElementById("quickSearchBtn");
    if (quickSearchBtn) {
      quickSearchBtn.addEventListener("click", () => switchTab("search"));
    }
  }

  // Initialize
  window.addEventListener("DOMContentLoaded", renderApp);
  if (document.readyState === "complete" || document.readyState === "interactive") {
    renderApp();
  }
})();
