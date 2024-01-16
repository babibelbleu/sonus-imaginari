/**
 * Fonction de démarrage de l'application
 */
function startup() {
   // On récupère la navbar
  navbar = document.getElementById("nav-bar");

   // On ne l'affiche pas par défaut
  navbar.style.display = "none";

  // Si le site est chargé dans un iframe, on ne fait rien
  if (!isInTopWindow()) {
    return;
  }

  // On charge les éléments HTML
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");

  // On demande l'autorisation d'utiliser la caméra en parcourant les différents périphériques
  navigator.mediaDevices.enumerateDevices().then((devices) => {

     /** On demande l'autorisation d'utiliser la caméra avec les contraintes suivantes :
          - la caméra arrière
          - une résolution de 1920x1080
          - on ne demande pas l'audio
          - on lance la vidéo automatiquement
          - on joue la vidéo dans la page et pas dans un nouvel onglet 
    */
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment'
        },
        audio: false,
        autoplay: true,
        playinline: true,
      })
      // Si on a l'autorisation, on lance la vidéo
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`Il y a eu une erreur: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          // On fait en sorte que la caméra prenne tout l'écran
          height = video.videoHeight / (video.videoWidth / width);

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    // Dans certains cas le canvas est déjà affiché, donc on l'efface 
    clearphoto();
  });
}


// On lance l'application lorsque la page est chargée
if(ENVIRONMENT != "test") window.addEventListener("load", startup, false);
if(ENVIRONMENT == "test") window.addEventListener("load", () => {
  let startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    if(Tone.context.state !== 'running') Tone.start();
    console.log("Tone context state :", Tone.context.state);
  });
});

// Prends une photo toutes les demi secondes
// TODO: Raccourcir le temps pour donner une illusion de temps réel
setInterval(() => {
  if(isCameraActive && ENVIRONMENT != "test") takePicture()
  if(ENVIRONMENT == "test") takePictureTest()
}, 100);

