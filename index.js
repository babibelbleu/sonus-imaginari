const NOTES_FOLDER_NAME = "notes";
const NOTE_EXTENSION = ".wav";

const GENRES = ["PIANO", "LOFI"];

let genre_index = 0;

let notes = {
  DO: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/DO${NOTE_EXTENSION}`,
  RE: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/RE${NOTE_EXTENSION}`,
  MI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/MI${NOTE_EXTENSION}`,
  FA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/FA${NOTE_EXTENSION}`,
  SOL: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SOL${NOTE_EXTENSION}`,
  LA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/LA${NOTE_EXTENSION}`,
  SI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SI${NOTE_EXTENSION}`,
};

/**
 * Largeur de la vidéo
 */
const width = 320;

/**
 * Hauteur de la vidéo
*/
let height = 0;// This will be computed based on the input stream

/**
 * Booléen qui permet de savoir si le flux vidéo est en cours de lecture
 */
let streaming = false;

// Éléments HTML de la page utiles pour le code
let video = null;
let canvas = null;
let navbar = null;


/**
 * Fonction qui permet de savoir si le site est chargé dans un iframe ou non
 * 
 * @returns {boolean} false si le site est chargé dans un iframe, true sinon
 */

function isInTopWindow() {
  // si le site est chargé dans un iframe, on affiche un bouton pour ouvrir le site dans un nouvel onglet
  // pour éviter les problèmes de permission
  if (window.self !== window.top) {
    document.querySelector(".main-page").remove();
    const button = document.createElement("button");
    const text = document.createElement("span");
    text.textContent = "Vous devez ouvrir le site dans un nouvel onglet pour pouvoir l'utiliser.";
    button.textContent = "Ouvrir le site dans un nouvel onglet";
    document.body.append(text);
    document.body.append(button);
    button.addEventListener("click", () => window.open(location.href));
    return false;
  }
  return true;
}


/**
 * Fonction qui permet de changer le genre de musique
 * lorsque l'on clique sur un bouton du menu déroulant
 * 
 * @param {"PIANO" | "LOFI" | "RANDOM"} name Le nom du genre de musique
 */
function changeGenre(name) {
  // On récupère l'index du genre de musique
  // ou on le génère aléatoirement
  if (name === "RANDOM") {
    genre_index = Math.floor(Math.random() * GENRES.length);
  } else {
    genre_index = GENRES.indexOf(name);
  }

   // On charge la nouvelle liste de notes
  notes = {
    DO: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/DO${NOTE_EXTENSION}`,
    RE: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/RE${NOTE_EXTENSION}`,
    MI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/MI${NOTE_EXTENSION}`,
    FA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/FA${NOTE_EXTENSION}`,
    SOL: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SOL${NOTE_EXTENSION}`,
    LA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/LA${NOTE_EXTENSION}`,
    SI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SI${NOTE_EXTENSION}`,
  };

  // On ferme le menu déroulant
  closeMenu();
}


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

  // On demande l'autorisation d'utiliser la caméra
  // en parcourant les différents périphériques
  navigator.mediaDevices.enumerateDevices().then((devices) => {

    // On retire de la liste les caméras qui ne sont pas fonctionnelles
    // (si on a téléchargé des logiciels qui créent des sources vidéo tels que OBS et DroidCam)
    const CAM_NAME_BLACKLIST = ["Droid", "OBS"];

    // On récupère les caméras en filtrant les périphériques qui ne sont pas des caméras et en retirant les caméras qui ne sont pas fonctionnelles
    const cameras = devices
      .filter((device) => device.kind === "videoinput")
      .filter(
        (camera) =>
          camera.label &&
          !CAM_NAME_BLACKLIST.some((name) => camera.label.includes(name))
      );

    // Si il n'y a pas de caméra, on affiche un message d'erreur
    if (cameras.length === 0) {
      console.error("No camera found on this device.");
    }

    // On récupère la dernière caméra de la liste
    // qui est la caméra arrière du téléphone
    const camera = cameras[cameras.length - 1];

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
          deviceId: camera.deviceId,
          height: { ideal: 1080 },
          width: { ideal: 1920 },
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

          // Firefox a des problèmes pour lire les données de la hauteur de la caméra
          // On utilise donc une valeur par défaut
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

    // Dans certains cas le canvas est déjà affiché
    // donc on l'efface 
    clearphoto();
  });
}

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
 * Fonction qui permet de convertir une couleur RGB en longueur d'onde
 * 
 * @param {number} r La valeur de la composante rouge
 * @param {number} g La valeur de la composante verte
 * @param {number} b La valeur de la composante bleue
 * 
 * @returns {number} La longueur d'onde de la couleur
 */
function rgbToWavelength(r, g, b) {
  // On normalise les composants RGB entre 0 et 1
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // On utilise l'intensité de la couleur dominante pour estimer la longueur d'onde
  if (green + blue < red) {
    return normalizeValue(green, 0, 1, 520, 565); // Rouge
  } else if (red + blue < green) {
    return normalizeValue(blue, 0, 1, 450, 500); // Vert
  } else if (red + green < blue) {
    return normalizeValue(red, 0, 1, 625, 740); // Bleu
  } else if (
    (red - green < 10 || green - red < 10) &&
    (red - blue > 20 || green - blue > 20)
  ) {
    if (red > 200 && green > 200 && blue < 100) {
      return normalizeValue(green, 0, 1, 570, 590); // Jaune
    }
  } else if (
    (blue - green < 10 || green - blue < 10) &&
    (blue - red > 20 || green - red > 20)
  ) {
    return normalizeValue(blue, 0, 1, 490, 520); // Cyan
  } else {
    return -1; // Pour les autres coleurs (noir, blanc, gris et monochromatique)
  }
}

/**
 * Fonction qui permet de normaliser une valeur entre deux plages
 * 
 * @param {number} inputValue La valeur à normaliser
 * @param {number} minValue La valeur minimale de la plage d'entrée
 * @param {number} maxValue La valeur maximale de la plage d'entrée
 * @param {number} newMinValue La valeur minimale de la plage de sortie
 * @param {number} newMaxValue La valeur maximale de la plage de sortie
 */

function normalizeValue(
  inputValue,
  minValue,
  maxValue,
  newMinValue,
  newMaxValue
) {
  if (inputValue < minValue || inputValue > maxValue) {
    console.error("La valeur d'entrée est en dehors de la plage spécifiée.");
    return null;
  }

  const normalizedValue =
    ((inputValue - minValue) * (newMaxValue - newMinValue)) /
      (maxValue - minValue) +
    newMinValue;

  return normalizedValue;
}

/**
 * Fonction qui permet de jouer une note en fonction de la longueur d'onde
 * et qui convertit la longueur d'onde en fréquence.
 * 
 * @param {number} nanometer La longueur d'onde de la couleur en nanomètres
 */
function playNote(nanometer){

  // Création du synthétiseur
  const synth = new Tone.Synth().toDestination();

  /**
   * Vitesse de la lumière en m/s
   */
  const SPEED_OF_LIGHT = 299792458;

  // On convertit la longueur d'onde en mètres
  const wavelength = convertToMeter(nanometer);

  // On calcule la fréquence de la note
  const frequency = SPEED_OF_LIGHT / wavelength;

  // On normalise la fréquence pour qu'elle soit dans la plage audible
  // car la formule scientifique précédente donne une fréquence en THz
  const frequencyNormalized = normalizeValue(frequency, 405000000000000, 700000000000000, 20, 20000);

  console.error("FREQUENCY :", frequencyNormalized);

  // On joue la note pour une durée de 0.1s
  synth.triggerAttackRelease(frequencyNormalized, 0.1);
}


/**
 * Fonction qui permet de convertir une longueur d'onde en mètres
 * 
 * @param {number} nanometer La longueur d'onde en nanomètres
 * 
 * @returns {number} La longueur d'onde en mètres
 */
function convertToMeter(nanometer) {
  return nanometer / 1e9;
}

/**
 * Fonction qui permet d'afficher la catégorie de couleur d'une couleur
 * et qui joue sa fréquence associée.
 * 
 * @param {{red: number, green: number, blue: number}} couleur La couleur à analyser
 * 
 * @returns {void}
 */
function afficherCategorieCouleur(couleur) {
  const categorie = rgbToWavelength(couleur.red, couleur.green, couleur.blue);
  console.log(
    `Couleur : R=${couleur.red} G=${couleur.green} B=${couleur.blue}, Catégorie : ${categorie}`
  );
  playNote(categorie);
}



/**
 * Fonction qui permet de faire apparaître le menu déroulant
 */
function switchMenu() {
  console.log("switch menu");
  if (navbar.style.display === "none") {
    navbar.style.display = "block";
    navbar.classList.remove("nav-bar-close");
    navbar.classList.add("nav-bar-open");
  }
}

/**
 * Fonction qui permet de fermer le menu déroulant
 */
function closeMenu() {
  navbar.classList.remove("nav-bar-open");
  navbar.classList.add("nav-bar-close");
  setTimeout(() => {
    navbar.style.display = "none";
  }, 500);
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

    // Affichage de la catégorie de couleur et lecture de la note associée
    afficherCategorieCouleur(rgbValues[couleurAnalyser]);
  } else {
    clearphoto();
  }
}


// On lance l'application lorsque la page est chargée
window.addEventListener("load", startup, false);

// Prends une photo toutes les demi secondes
// TODO: Raccourcir le temps pour donner une illusion de temps réel
setInterval(() => {
  takePicture();
}, 500);
