document.addEventListener('DOMContentLoaded', function () {
  startup();

  // On lance l'application lorsque la page est chargée
  if(ENVIRONMENT != "test") window.addEventListener("load", startup, false);
  if(ENVIRONMENT == "test") window.addEventListener("load", startupTest, false);

  // On lance la prise de photo toutes les 100ms
  // prise de photo = son joué
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

  if (!isInTopWindow()) {
    return;
  }

  video = document.getElementById("video");
  canvas = document.getElementById("canvas");

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

function startupTest(){
  let startButton = document.getElementById("startButton");
  startButton.addEventListener('click', () => {
    isTestAuthorized = !isTestAuthorized;
    let testVisualizer = document.querySelector(".test-visualizer");
    let camera = document.querySelector(".camera");
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
