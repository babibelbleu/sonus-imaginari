// camera.js
let isCameraActive = false;
let videoElement = null;
let startButtonElement = null;

function toggleCamera() {
  if (!isCameraActive) {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        aspectRatio: {
          ideal: 16 / 9
        }
      },
      audio: false,
      autoplay: true,
      playinline: true,
    })
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play();
      isCameraActive = true;
      startButtonElement.textContent = "Terminer";
    }).catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
  } else {
    let tracks = videoElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
    isCameraActive = false;
    startButtonElement.textContent = "Commencer";
    stopAllSounds(); // Appel à la fonction pour arrêter tous les sons
  }
}

function stopAllSounds() {
  Tone.Transport.stop();
}

function initCameraControls(videoId, buttonId) {
  videoElement = document.getElementById(videoId);
  startButtonElement = document.getElementById(buttonId);

  startButtonElement.addEventListener('click', toggleCamera);
}

window.addEventListener("load", () => {
  initCameraControls('video', 'startButton');
}, false);
