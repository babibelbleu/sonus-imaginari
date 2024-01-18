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
        console.error("La valeur d'entrée est en dehors de la plage spécifiée : ", inputValue, " n'est pas compris entre ", minValue, " et ", maxValue, ".");
        return null;
    }
  
    const normalizedValue =
      ((inputValue - minValue) * (newMaxValue - newMinValue)) /
        (maxValue - minValue) +
      newMinValue;
  
    return normalizedValue;
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
 * Fonction qui permet de changer de page
 * 
 * @param {string} page 
 */
function changePage(page) {
  window.location.href = page;
}

/**
 * Fonction qui vérifie que la valeur est dans l'intervalle [cible - intervalle, cible + intervalle]
 * 
 * @param {int} valeur 
 * @param {int} cible 
 * @param {int} intervalle 
 */
function isInGap(valeur, cible, intervalle) {
  return Math.abs(valeur - cible) <= intervalle;
}