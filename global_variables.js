
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