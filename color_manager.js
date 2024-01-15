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
        "Rouge": [650, 750],
        "Orange": [590, 640],
        "Jaune": [570, 590],
        "Vert": [495, 570],
        "Bleu": [450, 495],
        "Indigo": [420, 450],
        "Violet": [380, 420],
        "Rose": [500, 590]
        // Ajoutez d'autres intervalles selon vos besoins
    };

    const color = whatColor(r, g, b);
  
   // Vérifier si la couleur est dans la liste d'intervalles
   if (intervalles.hasOwnProperty(color)) {
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
    var seuilDominance = 200;
    var seuilOrange = 150;
    var seuilRose = 200;
    var seuilBlanc = 230;

    // Conditions pour détecter les couleurs
    if (r < seuilDominance && g < seuilDominance && b < seuilDominance) {
        return "Noir";
    } else if (r > seuilOrange && g > 0.5 * r && b < 0.5 * r) {
        return "Orange";
    } else if (r > seuilRose && g < 0.7 * r && b < 0.7 * r) {
        return "Rose";
    } else if (r > seuilBlanc && g > seuilBlanc && b > seuilBlanc) {
        return "Blanc";
    } else if (r > seuilDominance && r > g && r > b) {
        return "Rouge";
    } else if (g > seuilDominance && g > r && g > b) {
        return "Vert";
    } else if (b > seuilDominance && b > r && b > g) {
        return "Bleu";
    } else if (r > g && r > b) {
        return "Jaune";
    } else if (r > g && b > g) {
        return "Magenta";
    } else if (g > r && b > r) {
        return "Cyan";
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


    //normaliser nanometer pour être compris dans l'intervalle audible par l'humain
    const normalizedNanometer = normalizeValue(nanometer, 380, 750, 20, 20000);

    playNote(normalizedNanometer);
}