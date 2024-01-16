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
        "Blanc": [400, 750],     // Blanc a une plage de longueurs d'onde étendue
        "Rouge": [650, 750],
        "Bleu": [450, 495],
        "Vert": [495, 570],
        "Jaune": [570, 590],
        "Magenta": [380, 500],
        "Cyan": [490, 520]
        // Ajoutez d'autres intervalles selon vos besoins
    };

    const color = whatColor(r, g, b);


   // Vérifier si la couleur est dans la liste d'intervalles
   if (intervalles.hasOwnProperty(color)) {
        console.log(color);
        // Choisissez une valeur aléatoire dans l'intervalle
        var intervalle = intervalles[color];
        var longueurDonde = Math.floor(Math.random() * (intervalle[1] - intervalle[0] + 1)) + intervalle[0];
        return longueurDonde;
    } else {
        return "Longueur d'onde non déterminée";
    }
}

function estDansIntervalle(valeur, cible, intervalle) {
    return Math.abs(valeur - cible) <= intervalle;
}

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
    // const categorie = rgbToWavelength(couleur.red, couleur.green, couleur.blue);
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
    const nanometerNormalized = normalizeValue(nanometer, 380, 700, 20, 20000);

    console.error("FREQUENCY :", nanometerNormalized, "nm");

    playNote(nanometerNormalized);
}