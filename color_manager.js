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

    // On affiche en console la catégorie de couleur
    console.log(categorie);

    // On affiche dans la console "texte" avec la couleur rgb(r, g, b)
    console.log(`%c texte`, `color: rgb(${r}, ${g}, ${b})`);

    playNote(categorie);
}