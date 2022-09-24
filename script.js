var audio = document.getElementById("audio");
var playBtn = document.getElementById("playbtn");
var stopBtn = document.getElementById("stopbtn");
var progressArea = document.querySelector('.trackprogressarea');

audio.volume = 0.1;

function playMusic() {
  document.getElementById("playbtn").style.display = "none";
  document.getElementById("stopbtn").style.display = "block";
  document.getElementById("audio").play();
}

function stopMusic() {
  document.getElementById("playbtn").style.display = "block";
  document.getElementById("stopbtn").style.display = "none";
  document.getElementById("audio").pause();
}

playBtn.addEventListener("click", () => {
  playMusic();
})

stopBtn.addEventListener("click", () => {
  stopMusic();
})

progressArea.addEventListener("click", (e)=>{
  let progressWidthval = progressArea.clientWidth;
  let clickedOffSetX = e.offsetX;
  let songDuration = audio.duration;
  value = ((clickedOffSetX / progressWidthval) * songDuration)
  audio.currentTime = value;
})
