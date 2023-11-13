// Création d'un synthétiseur
const synth = new Tone.Synth().toDestination();

// Création d'une destination de flux de médias à partir du contexte audio de Tone.js
const audioContext = Tone.getContext();
const dest = audioContext.createMediaStreamDestination();
synth.connect(dest); // Connectez le synthétiseur à la destination de flux

// Fonction pour jouer une note de piano
function playPianoNote() {
    console.log("Note de piano jouée");
    synth.triggerAttackRelease('C4', '8n');
}

// Lier la fonction au clic sur l'élément "PIANO"
document.querySelector('li[onclick="playPianoNote()"]').addEventListener('click', playPianoNote);