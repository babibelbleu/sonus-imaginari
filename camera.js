// camera.js

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

/**
 * Fonction qui permet de vider le canvas associé à l'image prise.
 * 
 * On l'utilise pour éviter la superposition d'images et les bugs liés à la détection de couleur.
 */
function clearphoto() {
  // on récupère le canvas
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  // On remplit le canvas avec une couleur
  context.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Fonction qui permet de "prendre une photo" dans le canvas et de
 * jouer la note associée.
 */
 function takePicture() {
  // On récupère le canvas
  const context = canvas.getContext("2d");

   // On vérifie qu'on a bien défini la largeur et la hauteur
  if (width && height) {
    canvas.width = width;
    canvas.height = height;

     // On dessine l'image prise de la vidéo dans le canvas
    context.drawImage(video, 0, 0, width, height);

    // On récupère les données de l'image (le rgb de chaque pixel)
    const colors = context.getImageData(0, 0, width, height).data;

    // On met les valeurs de rgb dans un tableau pour mieux les identifier
    const rgbValues = [];
    for (let i = 0; i < colors.length; i += 4) {
      const red = colors[i];
      const green = colors[i + 1];
      const blue = colors[i + 2];
      const alpha = colors[i + 3];
      rgbValues.push({ red, green, blue, alpha });
    }

     // On prend la valeur rgb centrale de l'image
    const couleurAnalyser = (colors.length / 4) / 2;

    console.log(rgbValues[couleurAnalyser]);

    // On affiche la catégorie de couleur et on lis la note associée
    afficherCategorieCouleur(rgbValues[couleurAnalyser]);
  } else {
    clearphoto();
  }
}