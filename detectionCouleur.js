/*
 Carte des couleurs RGB vers les chemins des fichiers audio
*/
const carteCouleurSon = {
    '255,0,0': 'chemin_vers_son_rouge.mp3',         // Rouge
    '0,255,0': 'chemin_vers_son_vert.mp3',          // Vert
    '0,0,255': 'chemin_vers_son_bleu.mp3',          // Bleu
    '0,0,0': 'chemin_vers_son_noir.mp3',            // Noir
    '255,255,255': 'chemin_vers_son_blanc.mp3',     // Blanc
    '255,165,0': 'chemin_vers_son_orange.mp3',      // Orange
    '255,255,0': 'chemin_vers_son_jaune.mp3',       // Jaune
    '128,0,128': 'chemin_vers_son_violet.mp3',      // Violet
    '255,192,203': 'chemin_vers_son_rose.mp3',      // Rose
    '128,128,128': 'chemin_vers_son_gris.mp3',      // Gris
    '165,42,42': 'chemin_vers_son_marron.mp3',      // Marron
    '255,20,147': 'chemin_vers_son_fuchsia.mp3',    // Fuchsia
    '0,255,255': 'chemin_vers_son_cyan.mp3',        // Cyan
    '75,0,130': 'chemin_vers_son_indigo.mp3',       // Indigo
    '0,128,0': 'chemin_vers_son_vert_fonce.mp3',    // Vert foncé
    '128,0,0': 'chemin_vers_son_rouge_fonce.mp3'    // Rouge foncé
};

/*
 Fonction de détection de couleur : 
  Chaque fois qu'une couleur est détectée on joue le son associer 
*/
function quandCouleurDetectee(rgb) {
    jouerSonCouleur(rgb);
}

/*
 Fonction de lecture du son associé à la couleur détectée 
*/

function jouerSonCouleur(rgb) {
    const cleCouleur = rgb.join(",");
    const cheminAudio = carteCouleurSon[cleCouleur];
    if (cheminAudio) {
        const audio = new Audio(cheminAudio);
        audio.play();
    } else {
        console.log("Pas de son associé à cette couleur.");
    }
}

let couleurDetectee = [255, 0, 0]; // Simulation d'une couleur détectée
quandCouleurDetectee(couleurDetectee);