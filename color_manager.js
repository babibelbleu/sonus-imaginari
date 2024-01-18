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

    const intervalles = {
        "Orange": [590, 640],
        "Rose": [500, 590],
        "Blanc": [400, 750],
        "Rouge": [650, 750],
        "Bleu": [450, 495],
        "Vert": [495, 570],
        "Jaune": [570, 590],
        "Magenta": [380, 500],
        "Cyan": [490, 520]
    };

    const color = whatColor(r, g, b);


   // On vérifie que la couleur est dans l'objet intervalles
   if (intervalles.hasOwnProperty(color)) {
        console.log(color);
        
        // On récupère l'intervalle de longueur d'onde associé à la couleur
        var intervalle = intervalles[color];

        // On génère une longueur d'onde aléatoire dans l'intervalle
        // car on ne peut pas déterminer la longueur d'onde exacte
        var longueurDonde = Math.floor(Math.random() * (intervalle[1] - intervalle[0] + 1)) + intervalle[0];
        return longueurDonde;
    } else {
        return "Longueur d'onde non déterminée";
    }
}

/**
 * Détermine la couleur à partir des composantes RGB
 * 
 * @param {*} r - La composante rouge
 * @param {*} g - La composante verte
 * @param {*} b - La composante bleue
 */
function whatColor(r, g, b){
    // Seuil pour considérer la composante rouge comme dominante
    var seuilDominance = 200;

    // Seuils pour considérer la composante comme dominante
    var seuilDominance = 100;
    var seuilOrange = 150;
    var seuilRose = 200;
    var seuilBlanc = 230;


    // conditions spécifiques pour les couleurs primaires
    if(estDansIntervalle(r, 10, 255) && estDansIntervalle(g, 0, 10) && estDansIntervalle(b, 0, 10)){
        return "Rouge";
    } else if(estDansIntervalle(r, 0, 10) && estDansIntervalle(g, 10, 255) && estDansIntervalle(b, 0, 10)){
        return "Vert";
    } else if(estDansIntervalle(r, 0, 10) && estDansIntervalle(g, 0, 10) && estDansIntervalle(b, 10, 255)){
        return "Bleu";
    }


    // Conditions pour détecter les couleurs
    if (r > seuilOrange && g > 0.5 * r && b < 0.5 * r) {
        return "Orange";
    } else if (r > seuilRose && g < 0.7 * r && b < 0.7 * r && g > 0.3 * r && b > 0.3 * r) {
        return "Rose";
    } else if (r > seuilBlanc && g > seuilBlanc && b > seuilBlanc) {
        return "Blanc";
    }  else if ((r > g && r > b) || (r == g && r > b)) {
        return "Jaune";
    } else if (r > g && b > g) {
        return "Magenta";
    } else if (g > r && b > r) {
        return "Cyan";
    } else if (r > seuilDominance && r > g+b - 10) {
        return "Rouge";
    } else if (g > seuilDominance && g > r+b - 10) {
        return "Vert";
    } else if (b > seuilDominance && b > r+g - 10) {
        return "Bleu";
    } else if (r == g && g == b && r > 0 && g > 0 && b > 0) {
        return "Gris";
    }

    // Si aucune correspondance n'est trouvée
    return "Couleur non reconnue";
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
    const r = couleur.red;
    const g = couleur.green;
    const b = couleur.blue;
    
    const categorie = whatColor(r, g, b);
    const nanometer = rgbToWavelength(r, g, b);

    // On affiche en console la catégorie de couleur
    console.log(categorie);

    // On affiche dans la console "texte" avec la couleur rgb(r, g, b)
    console.log(`%c texte`, `color: rgb(${r}, ${g}, ${b})`);

    // on normalise la valeur de la longueur d'onde pour qu'elle soit dans la plage audible
    const nanometerNormalized = normalizeValue(nanometer, 380, 750, 20, 20000);

    console.error("FREQUENCY :", nanometerNormalized, "nm");

    playNote(nanometerNormalized);
}