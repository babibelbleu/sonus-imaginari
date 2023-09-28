window.addEventListener("load", () => {
  if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
});
// The width and height of the captured photo. We will set the
// width to the value defined here, but the height will be
// calculated based on the aspect ratio of the input stream.

const width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream

// |streaming| indicates whether or not we're currently streaming
// video from the camera. Obviously, we start at false.

let streaming = false;

// The various HTML elements we need to configure or control. These
// will be set by the startup() function.

let video = null;
let canvas = null;
let photo = null;
let startbutton = null;

let navbar = null;

function showViewLiveResultButton() {
  if (window.self !== window.top) {
    // Ensure that if our document is in a frame, we get the user
    // to first open it in its own tab or window. Otherwise, it
    // won't be able to request permission for camera access.
    document.querySelector(".main-page").remove();
    const button = document.createElement("button");
    button.textContent = "View live result of the example code above";
    document.body.append(button);
    button.addEventListener("click", () => window.open(location.href));
    return true;
  }
  return false;
}

function startup() {

  navbar = document.getElementById("nav-bar");

  navbar.style.display = "none";

  if (showViewLiveResultButton()) {
    return;
  }
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  startbutton = document.getElementById("startbutton");

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });

  video.addEventListener(
    "canplay",
    (ev) => {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

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
    false,
  );

  startbutton.addEventListener(
    "click",
    (ev) => {
      takepicture();
      ev.preventDefault();
    },
    false,
  );

  clearphoto();
}

function clearphoto() {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.

// Fonction pour classifier une couleur en catégorie (violet, jaune, etc.)
function classifierCouleur(red, green, blue) {
  // Seuils pour différentes couleurs
  const seuilsCouleurs = {
    Violet: {
      red: { min: 60, max: 255 }, 
      green: { min: 0, max: 100 },
      blue: { min: 130, max: 255 }
    },
    Rouge: {
      red: { min: 200, max: 255 }, 
      green: { min: 0, max: 75 },
      blue: { min: 0, max: 75 } 
    },
    Vert: {
      red: { min: 0, max: 75 },
      green: { min: 200, max: 255 },
      blue: { min: 0, max: 75 }
    },
    Bleu: {
      red: { min: 0, max: 75 }, 
      green: { min: 0, max: 75 },
      blue: { min: 200, max: 255 }
    },
    Jaune: {
      red: { min: 200, max: 255 },
      green: { min: 200, max: 255 },
      blue: { min: 0, max: 75 }
    },
    Noir: {
      red: { min: 0, max: 40 },
      green: { min: 0, max: 40 },
      blue: { min: 0, max: 40 }
    },
    Rose: {
      red: { min: 200, max: 255 },
      green: { min: 100, max: 180 },
      blue: { min: 150, max: 255 }
    },
    Marron: {
      red: { min: 100, max: 150 },
      green: { min: 50, max: 100 },
      blue: { min: 0, max: 50 }
    }
  };
  

  // Parcourez les seuils de couleur et vérifiez si les valeurs RVB sont dans l'une des plages
  for (const couleur in seuilsCouleurs) {
    const seuils = seuilsCouleurs[couleur];
    if (
      red >= seuils.red.min && red <= seuils.red.max &&
      green >= seuils.green.min && green <= seuils.green.max &&
      blue >= seuils.blue.min && blue <= seuils.blue.max
    ) {
      return couleur;
    }
  }

  return "Autre"; // Si aucune catégorie de couleur n'est trouvée
}


function afficherCategorieCouleur(couleur) {
const categorie = classifierCouleur(couleur.red, couleur.green, couleur.blue);
console.log(`Couleur : R=${couleur.red} G=${couleur.green} B=${couleur.blue}, Catégorie : ${categorie}`);
}


function takepicture() {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const colors = context.getImageData(0, 0, width, height).data;
    const rgbValues = [];
    for (let i = 0; i < colors.length; i += 4) {
        const red = colors[i];
        const green = colors[i + 1];
        const blue = colors[i + 2];
        const alpha = colors[i + 3];
        rgbValues.push({ red, green, blue, alpha });
    }
    const couleurAnalyser = (colors.length / 4) / 2;
    
    console.log(rgbValues[couleurAnalyser])

    // Classification et affichage de la catégorie de couleur
    afficherCategorieCouleur(rgbValues[couleurAnalyser]);
  } else {
    clearphoto();
  }
}

function switchMenu() {
  if (navbar.style.display === "none") {
    // make smooth transition
    navbar.style.display = "block";
    navbar.classList.remove("nav-bar-close");
    navbar.classList.add("nav-bar-open");
  }
}

function closeMenu(){
  navbar.classList.remove("nav-bar-open");
  navbar.classList.add("nav-bar-close");
  setTimeout(() => {
    navbar.style.display = "none";
  }, 500);
}

// Set up our event listener to run the startup process
// once loading is complete.
window.addEventListener("load", startup, false);

//Test browser support
// const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

// if (SUPPORTS_MEDIA_DEVICES) {
//   //Get the environment camera (usually the second one)
//   navigator.mediaDevices.enumerateDevices().then(devices => {
  
//     const cameras = devices.filter((device) => device.kind === 'videoinput');

//     if (cameras.length === 0) {
//       throw 'No camera found on this device.';
//     }
//     const camera = cameras[cameras.length - 1];

//     // Create stream and get video track
//     navigator.mediaDevices.getUserMedia({
//       video: {
//         deviceId: camera.deviceId,
//         facingMode: ['user', 'environment'],
//         height: {ideal: 1080},
//         width: {ideal: 1920}
//       }
//     }).then(stream => {
//       const track = stream.getVideoTracks()[0];

//       //Create image capture object and get camera capabilities
//       const imageCapture = new ImageCapture(track)
//       const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

//         //todo: check if camera has a torch

//         //let there be light!
//         const btn = document.querySelector('.switch');
//         btn.addEventListener('click', function(){
//           track.applyConstraints({
//             advanced: [{torch: true}]
//           });
//         });
//       });
//     });
//   });
  
//   //The light will be on as long the track exists
// }

// Prends une photo toutes les secondes
// TODO: Raccourcir le temps pour donner une illusion de temps réel
setInterval(() => {
  takepicture();
}, 1000);