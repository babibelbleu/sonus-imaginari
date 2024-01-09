/**
 * Fonction qui permet de jouer une note en fonction de la longueur d'onde
 * et qui convertit la longueur d'onde en fréquence.
 * 
 * @param {number} nanometer La longueur d'onde de la couleur en nanomètres
 */
 function playNote(nanometer){

    const synth = new Tone.Synth().toDestination();
  
    /**
     * Vitesse de la lumière en m/s
     */
    const SPEED_OF_LIGHT = 299792458;
  
    // On convertit la longueur d'onde en mètres
    const wavelength = convertToMeter(nanometer);
  
    // On calcule la fréquence de la note
    const frequency = SPEED_OF_LIGHT / wavelength;
  
    // On normalise la fréquence pour qu'elle soit dans la plage audible
    // car la formule scientifique précédente donne une fréquence en THz
    const frequencyNormalized = normalizeValue(frequency, 405000000000000, 700000000000000, 20, 20000);
  
    console.error("FREQUENCY :", frequencyNormalized);
  
    // On joue la note pour une durée de 0.1s
    synth.triggerAttackRelease(frequencyNormalized, 0.1);
}