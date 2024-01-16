function rgbToWavelength(r, g, b) {
  // Validation des entrées
  if (![r, g, b].every(val => val >= 0 && val <= 255)) {
    throw new Error("Les valeurs RGB doivent être comprises entre 0 et 255");
  }

  // Normalisation des composants RGB entre 0 et 1
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // Détermination de la couleur dominante
  if (red >= green && red >= blue) {
    return normalizeValue(red, 0, 1, 620, 750); // Rouge
  } else if (green >= red && green >= blue) {
    return normalizeValue(green, 0, 1, 495, 570); // Vert
  } else {
    return normalizeValue(blue, 0, 1, 450, 495); // Bleu
  }
}

function normalizeValue(value, minSource, maxSource, minTarget, maxTarget) {
  return ((value - minSource) / (maxSource - minSource)) * (maxTarget - minTarget) + minTarget;
}

function afficherCategorieCouleur(couleur) {
  // Extraction des composantes RGB et calcul de la luminosité
  const { red, green, blue } = couleur;
  const luminosite = (0.299 * red) + (0.587 * green) + (0.114 * blue);

  let categorie;
  // Détection des couleurs spéciales
  if (luminosite < 30) {
    categorie = "Noir";
  } else if (luminosite > 220) {
    categorie = "Blanc";
  } else if (red < 50 && green < 50 && blue < 50) {
    categorie = "Gris";
  } else if (red > 200 && green > 200 && blue < 50) {
    categorie = "Jaune";
  } else if (red > 200 && green < 50 && blue > 200) {
    categorie = "Violet";
  } else if (red > 200 && green < 50 && blue < 50) {
    categorie = "Rouge";
  } else if (red > 150 && green < 50 && blue < 50) {
    categorie = "Marron";
  } else if (red > 200 && green < 80 && blue < 80) {
    categorie = "Rose";
  } else if (red > 150 && green > 150 && blue < 50) {
    categorie = "Doré";
  } else {
    // Calcul de la longueur d'onde pour les autres couleurs
    const wavelength = rgbToWavelength(red, green, blue);
    if (wavelength >= 620) {
      categorie = "Rouge";
    } else if (wavelength >= 495) {
      categorie = "Vert";
    } else {
      categorie = "Bleu";
    }
    playNote(wavelength);
  }

  // Utilisation de CSS dans console.log pour afficher la couleur
  console.log(
    `%cCouleur: R=${red} G=${green} B=${blue}, Catégorie: ${categorie}`, 
    `color: rgb(${red}, ${green}, ${blue});`
  );
}