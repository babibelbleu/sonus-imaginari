
/**
 * Largeur de la vidéo
 */
 const width = 320;

 /**
  * Hauteur de la vidéo
 */
 let height = 0;
 
 /**
  * Booléen qui permet de savoir si le flux vidéo est en cours de lecture
  */
 let streaming = false;

 /**
  * Synthetizer
  */
 const synth = new Tone.Synth().toDestination();
 
 // Éléments HTML de la page utiles pour le code
 let video = null;
 let canvas = null;
 let navbar = null;

 /**
  * Variable globale qui spécifie si la caméra est
  * active ou non. Cela permet d'éviter de jouer un son
  * injouable lorsque la caméra est désactivée
  * 
  * @see index.js
  * @see camera.js
  */
 let isCameraActive = false;

 /**
  * Spécifie l'environement dans lequel on se trouve
  * 
  * - dev
  * - prod
  * - test
  */
const ENVIRONMENT = "test";

/**
 * Couleurs de test
 */
const TEST_COLORS = [
    {red: 255, green: 0, blue: 0},
    {red: 0, green: 255, blue: 0},
    {red: 0, green: 0, blue: 255},
    {red: 255, green: 255, blue: 0},
    {red: 255, green: 0, blue: 255},
    {red: 0, green: 255, blue: 255},
    {red: 255, green: 255, blue: 255},
    {red: 0, green: 0, blue: 0},
    {red: 128, green: 128, blue: 128},
    {red: 128, green: 0, blue: 0},
    {red: 128, green: 128, blue: 0},
    {red: 0, green: 128, blue: 0},
    {red: 128, green: 0, blue: 128},
    {red: 0, green: 128, blue: 128},
    {red: 0, green: 0, blue: 128}
];