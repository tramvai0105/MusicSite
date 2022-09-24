var audio = document.getElementById("audio");
var playBtn = document.getElementById("playbtn");
var stopBtn = document.getElementById("stopbtn");
var trackPlayBtns = document.querySelectorAll("#trackplaybtn");
var trackStopBtns = document.querySelectorAll("#trackstopbtn");
var songsrcs = document.querySelectorAll('#songsrc');
var progressBar = document.querySelector('.trackprogressbar');
var progressArea = document.querySelector('.trackprogressarea');
var volumeBar = document.querySelector('.volume');
var volumeArea = document.querySelector('.volumebar');
var tracks = document.querySelectorAll('.track');
var mp3Src = document.querySelector('#mp3src');
var prevTrack = document.querySelector('#prevtrack');
var nextTrack = document.querySelector('#nexttrack');
var soundOn = document.querySelector("#soundon");
var mute = document.querySelector("#mute");
var songNames = document.querySelectorAll(".songname");
var volumekoef = 0.4;
const songs = {};

var songPrevVolume = 0.15;
var songIndex = 0;

// Устанавливаем изначальный уровень громкости для треков.
audio.volume = 0.15;
document.querySelector(".fulltime").style.display = "none";

// Получаем Json из БД, формируем из него объект.
const xhr = new XMLHttpRequest();
xhr.open("GET", window.location.href + "json");
xhr.responseType = 'json';
xhr.onload = () => {
  for (key in Object.keys(xhr.response)) {
      songs[key] = "/media/" + xhr.response[key]['songfile'];

  changeFile(songs[songIndex])
  }
}
xhr.send()

//Раставляем индексы трекам.
for (let i = 0; i < trackPlayBtns.length; i++) {
    let item = trackPlayBtns[i];
    item.dataset.index = i;
}
for (let i = 0; i < trackStopBtns.length; i++) {
    let item = trackStopBtns[i];
    item.dataset.index = i;
}

function playMusic() {
  document.getElementById("playbtn").style.display = "none";
  document.getElementById("stopbtn").style.display = "block";
  document.getElementById("audio").play();
  document.querySelector(".fulltime").style.display = "block";
  document.querySelector("#trackname").innerHTML = songNames[songIndex].innerHTML;
}

function stopMusic() {
  document.getElementById("playbtn").style.display = "block";
  document.getElementById("stopbtn").style.display = "none";
  trackStopBtns.forEach(function(btn){
      btn.style.display = "none";
      btn.previousElementSibling.style.display = "block";
  })
  document.getElementById("audio").pause();
}

function changeFile(file){
  audio.pause();
  mp3Src.src = file;
  audio.load();
}

function changeFileByIndex(ix){
  songIndex += ix;
  if (songIndex < 0) {
    songIndex += 1;
  }
  if (songIndex > Object.keys(songs).length - 1){
    songIndex += -1;
  }
  audio.pause();
  mp3Src.src = songs[songIndex];
  audio.load();
  trackPlayBtns.forEach(function(btn){
    if (btn.dataset.index == songIndex){
      btn.style.display = "none";
      btn.nextElementSibling.style.display = "block";
    }
  })
  trackStopBtns.forEach(function(btn){
    if (btn.dataset.index != songIndex){
      btn.style.display = "none";
      btn.previousElementSibling.style.display = "block";
    }
  })
  playMusic();
}

soundOn.addEventListener("click", () => {
  songPrevVolume = audio.volume;
  audio.volume = 0;
  volumeBar.style.display = "none";
  soundOn.style.display = "none";
  mute.style.display = "block";
})

mute.addEventListener("click", () => {
  audio.volume = songPrevVolume;
  volumeBar.style.display = "block";
  soundOn.style.display = "block";
  mute.style.display = "none";
})

playBtn.addEventListener("click", () => {
  trackPlayBtns.forEach(function(btn){
    if (btn.dataset.index == songIndex){
      btn.style.display = "none";
      btn.nextElementSibling.style.display = "block";
    }
  })
  playMusic();
})

stopBtn.addEventListener("click", () => {
  trackStopBtns.forEach(function(btn){
    if (btn.dataset.index != songIndex){
      btn.style.display = "none";
      btn.previousElementSibling.style.display = "block";
    }
  })
  stopMusic();
})

prevTrack.addEventListener("click", () => {
  changeFileByIndex(-1);
})

nextTrack.addEventListener("click", () => {
  changeFileByIndex(1);
})

trackPlayBtns.forEach(function(btn){
  btn.addEventListener("click", () => {
    if (btn.dataset.index != songIndex){
      songIndex = Number(btn.dataset.index);
      changeFile(songs[btn.dataset.index]);
      trackStopBtns.forEach(function(btn){
        if (btn.dataset.index != songIndex){
          btn.style.display = "none";
          btn.previousElementSibling.style.display = "block";
        }
      })
    }
    playMusic();
    btn.style.display = "none";
    btn.nextElementSibling.style.display = "block";
  })
})

trackStopBtns.forEach(function(btn){
  btn.addEventListener("click", () => {
    stopMusic();
    btn.style.display = "none";
    btn.previousElementSibling.style.display = "block";
  })
})


// Обновляем текущее и полное время трека
audio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 535;
  progressBar.style.width = `${progressWidth}px`;

  const currentVolume = e.target.volume;
  let volumeWidth = (currentVolume / volumekoef) * 67;
  volumeBar.style.width = `${volumeWidth}px`;

  let musicDuration = document.querySelector(".fulltime");
  let audioDuration = audio.duration;
  let timemin = Math.floor(audioDuration / 60);
  let timesec = Math.floor(audioDuration % 60);
  if (timesec<10) {
    timesec = `0${timesec}`
  }
  musicDuration.innerHTML = `${timemin}:${timesec}`;

  let audioCurrentTime = audio.currentTime;
  let currenttimemin = Math.floor(audioCurrentTime / 60);
  let currenttimesec = Math.floor(audioCurrentTime % 60);
  if (currenttimesec<10) {
    currenttimesec = `0${currenttimesec}`
  }
  let musicCurrent = document.querySelector(".currenttime");
  musicCurrent.innerHTML = `${currenttimemin}:${currenttimesec}`;
})

audio.addEventListener("timeupdate", (e)=>{
  if (audio.duration == audio.currentTime){
    if (songIndex != Object.keys(songs).length-1){
      changeFileByIndex(1);
    } else {
      stopMusic();
    }
  };
})

// Изменяем прогресс песни при нажатии на дорожку трека
progressArea.addEventListener("click", (e)=>{
  let progressWidthval = progressArea.clientWidth;
  let clickedOffSetX = e.offsetX;
  let songDuration = audio.duration;
  value = ((clickedOffSetX / progressWidthval) * songDuration)
  audio.currentTime = value;
})
// Изменяем громкость нажатием на полоску громкости
volumeArea.addEventListener("click", (e)=>{
  let volumeWidthval = volumeArea.clientWidth;
  let clickedOffSetX = e.offsetX;
  value = ((clickedOffSetX / volumeWidthval)*volumekoef)
  audio.volume = value;
})
