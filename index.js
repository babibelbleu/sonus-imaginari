// Quand le DOM est chargé, on lance l'application
document.addEventListener('DOMContentLoaded', function () {
  // On lance l'application en fonction de son mode
  if(ENVIRONMENT != "test") window.addEventListener("load", startup, false);
  if(ENVIRONMENT == "test") window.addEventListener("load", startupTest, false);

  // On lance la prise de photo toutes les 100ms
  // cf. takePicture() dans camera.js
  setInterval(() => {
    if(isCameraActive && ENVIRONMENT != "test") takePicture();
    if(ENVIRONMENT == "test" && isTestAuthorized){
      takePictureTest();
    }
  }, 100);
});


/**
 * Fonction de démarrage de l'application
 */
function startup() {

  // On vérifie qu'on est bien dans la fenêtre principale
  // sinon le programme ne fonctionne pas
  if (!isInTopWindow()) {
    return;
  }

  // On récupère les éléments HTML utiles
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");

  navigator.mediaDevices.enumerateDevices().then((devices) => {

    /** On demande l'autorisation d'utiliser la caméra avec les contraintes suivantes :
         - la caméra arrière (facingMode: 'environment')
          - pas de son (audio: false)
          - se lance automatiquement (autoplay: true)
          - s'affiche dans une balise video (playinline: true)
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

    // On adapte la taille du canvas à la taille de la vidéo
    // car toutes les caméras n'ont pas la même taille
    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
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

    // Dans certains cas, le canvas est déjà affiché, donc on l'efface 
    clearphoto();
  });
}

/**
 * Fonction de démarrage de l'application en mode test
 */
function startupTest(){
  let startButton = document.getElementById("startButton");

  startButton.addEventListener('click', () => {

    // On change l'état de l'application
    isTestAuthorized = !isTestAuthorized;

    // On récupère les éléments HTML utiles
    let testVisualizer = document.querySelector(".test-visualizer");
    let camera = document.querySelector(".camera");

    // On change l'affichage en fonction de l'état de l'application
    if(isTestAuthorized){
      startButton.textContent = "Arrêter";
      testVisualizer.classList.remove("invisible");
      camera.classList.add("invisible");
    } else {
      startButton.textContent = "Commencer";
      testVisualizer.classList.add("invisible");
      camera.classList.remove("invisible");
    }
  });
}
