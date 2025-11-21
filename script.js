const musicContainer = document.querySelector('.player-section'); // Updated selector
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#current-time');
const durTime = document.querySelector('#duration');

const playlistBtn = document.getElementById('playlist-btn');
const closePlaylistBtn = document.getElementById('close-playlist');
const playlistContainer = document.getElementById('playlist-container');
const playlistItems = document.getElementById('playlist-items');

const lyricsBox = document.getElementById('lyrics-box');
const lyricsContainer = document.getElementById('lyrics-container');

// Song titles
const songs = [
    "七里香",
    "不能说的秘密",
    "不该",
    "东风破",
    "以父之名",
    "你听得到",
    "借口",
    "兰亭序",
    "最长的电影",
    "千里之外",
    "半岛铁盒",
    "反方向的钟",
    "发如雪",
    "可爱女人",
    "听妈妈的话",
    "告白气球",
    "夜曲",
    "安静",
    "我是如此相信",
    "我落泪情绪零碎",
    "手写的从前",
    "搁浅",
    "明明就",
    "星晴",
    "晴天",
    "暗号",
    "枫",
    "烟花易冷",
    "爱你没差",
    "爱在西元前",
    "珊瑚海",
    "稻香",
    "等你下课",
    "简单爱",
    "红尘客栈",
    "给我一首歌的时间",
    "花海",
    "蒲公英的约定",
    "说了再见",
    "说好的幸福呢",
    "轨迹",
    "退后",
    "青花瓷",
    "黑色毛衣",
    "龙卷风"
];

// Images available
const totalImages = 80;

// Keep track of song
let songIndex = 0;

// Lyrics Array
let currentLyrics = [];

// Initially load song info DOM
loadSong(songs[songIndex]);
renderPlaylist();

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/周杰伦-${song}.mp3`;
    
    const imgIndex = (songIndex % totalImages) + 1;
    cover.src = `imgs/${imgIndex}.png`;

    // Reset lyrics
    lyricsBox.innerHTML = '';
    lyricsBox.style.transform = 'translateY(0px)';
    currentLyrics = [];
    
    // Load lyrics from lyricsData object (provided by lyrics_data.js)
    if (typeof lyricsData !== 'undefined' && lyricsData[song]) {
        parseLyrics(lyricsData[song]);
    } else {
        lyricsBox.innerHTML = '<p class="lyric-line">暂无歌词</p>';
    }

    // Update active class in playlist
    updateActivePlaylistItem();
    
    // Reset progress
    progress.style.width = '0%';
    const handle = document.querySelector('.progress-handle');
    if(handle) handle.style.left = '0%';
}

// No more fetchLyrics needed, using local variable

// Parse LRC Format
function parseLyrics(text) {
    const lines = text.split('\n');
    const lyrics = [];
    
    // Regex to match time format [mm:ss.xx]
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

    lines.forEach(line => {
        const match = line.match(timeRegex);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const milliseconds = parseInt(match[3]);
            
            // Convert to seconds
            const time = minutes * 60 + seconds + milliseconds / 1000;
            const content = line.replace(timeRegex, '').trim();
            
            if (content) {
                lyrics.push({ time, content });
            }
        }
    });

    currentLyrics = lyrics;
    renderLyricsDOM();
}

function renderLyricsDOM() {
    lyricsBox.innerHTML = '';
    if (currentLyrics.length === 0) {
        lyricsBox.innerHTML = '<p class="lyric-line">纯音乐 / 暂无歌词</p>';
        return;
    }

    currentLyrics.forEach((line, index) => {
        const p = document.createElement('p');
        p.classList.add('lyric-line');
        p.innerText = line.content;
        p.dataset.index = index;
        lyricsBox.appendChild(p);
    });
}

// Play song
function playSong() {
    // Add play class to main container if needed for overall effects, or specific section
    musicContainer.classList.add('play'); 
    document.querySelector('.main-container').classList.add('play'); // Ensure main container gets play for rotation if css targets it

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    document.querySelector('.main-container').classList.remove('play');

    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update handle position
    const handle = document.querySelector('.progress-handle');
    if(handle) {
        handle.style.left = `${progressPercent}%`;
    }
    
    // Time display
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10) durationSeconds = '0' + durationSeconds;
    
    if(durationSeconds){
        durTime.innerText = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    
    currTime.innerText = `${currentMinutes}:${currentSeconds}`;

    // Update Lyrics
    syncLyrics(currentTime);
}

function syncLyrics(currentTime) {
    if (currentLyrics.length === 0) return;

    let activeIndex = -1;

    // Find the current line
    for (let i = 0; i < currentLyrics.length; i++) {
        if (currentTime >= currentLyrics[i].time) {
            activeIndex = i;
        } else {
            break;
        }
    }

    if (activeIndex !== -1) {
        const lines = document.querySelectorAll('.lyric-line');
        const activeLine = lines[activeIndex];
        const currentlyActive = document.querySelector('.lyric-line.active');

        if (currentlyActive !== activeLine) {
            if(currentlyActive) currentlyActive.classList.remove('active');
            if (activeLine) {
                activeLine.classList.add('active');
                
                // Improved Scroll Logic using Element.offsetTop
                // Container height is usually fixed, we want the active line in the center
                const containerHeight = lyricsContainer.clientHeight;
                const lineTop = activeLine.offsetTop;
                const lineHeight = activeLine.offsetHeight;
                
                // Calculate offset to center the line:
                // box needs to move up by (lineTop - halfContainer + halfLine)
                const offset = lineTop - (containerHeight / 2) + (lineHeight / 2);
                
                lyricsBox.style.transform = `translateY(-${offset}px)`;
            }
        }
    }
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Generate Playlist
function renderPlaylist() {
    playlistItems.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', index);
        
        if(index === songIndex) {
            li.classList.add('active');
        }

        // Image Index
        const imgIndex = (index % totalImages) + 1;

        li.innerHTML = `
            <img src="imgs/${imgIndex}.png" alt="${song}">
            <div class="song-info">
                <span class="song-title">${song}</span>
                <span class="song-artist">周杰伦</span>
            </div>
            <div class="now-playing-icon">
                <div class="playing-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });

        playlistItems.appendChild(li);
    });
}

function updateActivePlaylistItem() {
    const items = playlistItems.querySelectorAll('li');
    items.forEach((item, index) => {
        if(index === songIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            item.classList.remove('active');
        }
    });
}

// Event listeners
playBtn.addEventListener('click', () => {
    // Check main container for play state as it's the top level wrapper
    const isPlaying = document.querySelector('.main-container').classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Playlist toggles
playlistBtn.addEventListener('click', () => {
    playlistContainer.classList.add('show');
});

closePlaylistBtn.addEventListener('click', () => {
    playlistContainer.classList.remove('show');
});
