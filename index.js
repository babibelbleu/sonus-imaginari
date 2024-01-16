document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.querySelector('.icon');
  const navigationMenu = document.querySelector('.navigation-menu');

  menuIcon.addEventListener('click', function () {
    navigationMenu.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.navigation-links li');
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const genre = this.textContent.trim().toUpperCase();
      changeGenre(genre);
    });
  });

  const aboutLink = document.getElementById('aboutLink');
  aboutLink.addEventListener('click', function () {
    window.location.href = 'about.html';
  });

  const homeLink = document.getElementById('homeLink');
  homeLink.addEventListener('click', function (event) {
    event.preventDefault(); 
    window.location.href = 'index.html';
  });

  startup();

  setInterval(() => {
    if (isCameraActive) takePicture();
  }, 500);
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
