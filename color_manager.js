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
      console.log("Rouge");
      return normalizeValue(green, 0, 1, 520, 565); // Rouge
  } else if (red + blue < green) {
      console.log("Vert");
      return normalizeValue(blue, 0, 1, 450, 500); // Vert
  } else if (red + green < blue) {
      console.log("Bleu");
      return normalizeValue(red, 0, 1, 625, 740); // Bleu
  } else if (red > 200 && green > 200 && blue < 100) {
      console.log("Jaune");
      return normalizeValue(green, 0, 1, 570, 590); // Jaune
  } else if (red > 200 && green < 100 && blue > 200) {
      console.log("Magenta");
      return normalizeValue(red, 0, 1, 380, 450); // Magenta
  } else if (red > 200 && green < 100 && blue < 100) {
      console.log("Orange");
      return normalizeValue(red, 0, 1, 590, 620); // Orange
  } else if (red < 100 && green < 100 && blue > 200) {
      console.log("Violet");
      return normalizeValue(blue, 0, 1, 380, 450); // Violet
  } else if (blue - green < 10 && green - blue < 10 && red - blue > 20 && red - green > 20) {
      console.log("Cyan");
      return normalizeValue(blue, 0, 1, 490, 520); // Cyan
  } else {
      console.log("Autre couleur (noir, blanc, gris, etc.)");
      return -1; // Pour les autres couleurs
  }
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