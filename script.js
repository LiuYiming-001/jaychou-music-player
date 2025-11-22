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
const searchInput = document.getElementById('search-input');

const lyricsBox = document.getElementById('lyrics-box');
const lyricsContainer = document.getElementById('lyrics-container');

// Song titles
const songs = [
    "Mine Mine",
    "Vani有约会",
    "一路上有你",
    "一路向北",
    "七里香",
    "三年二班",
    "上海一九四三",
    "不能说的秘密",
    "不该",
    "世界未末日",
    "世界末日",
    "东风破",
    "乌克丽丽",
    "乔克叔叔",
    "乱舞春秋",
    "二手烟",
    "以父之名",
    "伊斯坦堡",
    "你听得到",
    "你好吗",
    "你怎么连话都说不清楚",
    "你比从前快乐",
    "倒带",
    "借口",
    "傻笑",
    "免费教学录影带",
    "公主病",
    "公公偏头痛",
    "兰亭序",
    "最后的战役",
    "最长的电影",
    "刀马旦",
    "分裂",
    "千山万水",
    "千里之外",
    "半兽人",
    "半岛铁盒",
    "印第安老斑鸠",
    "双刀",
    "反方向的钟",
    "发如雪",
    "可爱女人",
    "同一种调调",
    "听妈妈的话",
    "告白气球",
    "周大侠",
    "哪里都是你",
    "嘻哈空姐",
    "四季列车",
    "四面楚歌",
    "回到过去",
    "园游会",
    "困兽之斗",
    "城里的月光",
    "外婆",
    "多谢了",
    "夜曲",
    "夜的第七章",
    "大头贴",
    "大笨钟",
    "天地一斗",
    "太委屈",
    "她的睫毛",
    "好久不见",
    "威廉古堡",
    "娘子",
    "安静",
    "完美主义",
    "对不起(统一茶饮料广告曲)",
    "将军",
    "屋顶",
    "开不了口",
    "彩虹",
    "心雨",
    "惊叹号",
    "懦夫",
    "我不配",
    "我愿意",
    "我是如此相信",
    "我的伦理",
    "我的地盘",
    "我落泪情绪零碎",
    "手写的从前",
    "手语",
    "扯",
    "找自己",
    "抱一抱",
    "搁浅",
    "斗牛",
    "断了的弦",
    "新不了情",
    "无双",
    "时光机",
    "明明就",
    "星晴",
    "晴天",
    "暗号",
    "月光",
    "枫",
    "梦想启动",
    "梯田",
    "止战之殇",
    "比较大的大提琴",
    "水手怕水",
    "流浪诗人",
    "浪漫手机",
    "淘汰",
    "漂移",
    "火车叨位去",
    "烟花易冷",
    "爱你没差",
    "爱在西元前",
    "爱情悬崖",
    "爱我别走",
    "爱的飞行日记",
    "爷爷泡的茶",
    "爸,我回来了",
    "牛仔很忙",
    "献世",
    "珊瑚海",
    "琴伤",
    "瓦解",
    "甜甜的",
    "画沙",
    "疗伤烧肉粽",
    "白色风车",
    "皮影戏",
    "祝我生日快乐",
    "秘密花园",
    "稻香",
    "等你下课",
    "简单爱",
    "米兰的小铁匠",
    "红尘客栈",
    "红模仿",
    "给我一首歌的时间",
    "自导自演",
    "花海",
    "菊花台",
    "蒲公英的约定",
    "蓝色风暴",
    "蛇舞",
    "蜗牛",
    "说了再见",
    "说好的幸福呢",
    "豆花台",
    "超人不会飞",
    "超跑女神",
    "跨时代",
    "轨迹",
    "迷迭香",
    "迷魂曲",
    "退后",
    "逆鳞",
    "阳光宅男",
    "雨下一整晚",
    "青花瓷",
    "魔术先生",
    "麦烝玮",
    "麦芽糖",
    "黄金甲EP",
    "黑色幽默",
    "黑色毛衣",
    "龙卷风",
    "龙战骑士",
    "你是我的ok绷"
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
    
    let srcPath = `music/周杰伦-${song}.mp3`;
    if(song === "你我的ok绷") {
       srcPath = `music/周杰伦${song}.mp3`;
    }

    audio.src = srcPath;
    
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
    // Split by newline or literal \n string to be robust
    const lines = text.split(/\\n|\n/);
    const lyrics = [];
    
    lines.forEach(line => {
        // Find all timestamps in the line
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
        const matches = [...line.matchAll(timeRegex)];
        
        if (matches.length > 0) {
            // Clean content: remove all timestamps
            const content = line.replace(timeRegex, '').trim();
            
            if (content) {
                matches.forEach(match => {
                    const minutes = parseInt(match[1]);
                    const seconds = parseInt(match[2]);
                    
                    // Handle milliseconds (2 or 3 digits)
                    let milliseconds = parseFloat(match[3]);
                    if (match[3].length === 2) {
                        milliseconds = milliseconds / 100;
                    } else {
                        milliseconds = milliseconds / 1000;
                    }
                    
                    const time = minutes * 60 + seconds + milliseconds;
                    lyrics.push({ time, content });
                });
            }
        }
    });

    // Sort lyrics by time because multiple timestamps might scramble order
    lyrics.sort((a, b) => a.time - b.time);

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

// Filter Playlist
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const items = playlistItems.querySelectorAll('li');
    
    items.forEach(item => {
        const title = item.querySelector('.song-title').innerText.toLowerCase();
        if(title.indexOf(term) > -1) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

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
    // Auto focus search when playlist opens
    setTimeout(() => searchInput.focus(), 300);
});

closePlaylistBtn.addEventListener('click', () => {
    playlistContainer.classList.remove('show');
});
