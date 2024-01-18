/**
 * Fonction qui permet de jouer une note à partir d'une fréquence
 * 
 * @param {number} frequency La fréquence en Hz
 */
 function playNote(frequency){

    if (isNaN(frequency)) return;

    synth.triggerAttackRelease(frequency, 0.1);
}