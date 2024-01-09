// camera.js

let isCameraActive = false;
let videoElement = null;
let startButtonElement = null;

/*
 La fonction 'toggleCamera' gère le basculement de l'état de la caméra entre activée et désactivée : 
      - état 1 : la caméra n'est pas active -> on utilise getUserMedia pour accéder à la caméra vidéo, initialise le flux vidéo, et met à jour l'état de la caméra.
      - état 2 : la caméra est active -> on arrête tous les flux vidéo, réinitialise l'état de la caméra et appelle la fonction 'stopAllSounds()' pour arrêter tous les sons.
*/
function toggleCamera() {
  if (!isCameraActive) {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
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
    stopAllSounds();
  }
}

/*
 Fonction qui utilise la bibliothèque Tone.js pour arrêter tous les sons.
*/
function stopAllSounds() {
  Tone.Transport.stop();
}

/*
 Fonction qui initialise les contrôles de la caméra.
*/
function initCameraControls(videoId, buttonId) {
  videoElement = document.getElementById(videoId);
  startButtonElement = document.getElementById(buttonId);

  startButtonElement.addEventListener('click', toggleCamera);
}

/*
 Ecouteur d'événements qui est déclenché lorsque la page est entièrement chargée
*/
window.addEventListener("load", () => {
  initCameraControls('video', 'startButton');
}, false);
