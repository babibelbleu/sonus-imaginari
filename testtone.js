// Création d'un synthétiseur avec Tone.js
const synth = new Tone.Synth().toDestination();

// Récupération du contexte audio
const audioContext = Tone.getContext();

// Connexion du synthétiseur à la destination de flux de médias
const dest = audioContext.createMediaStreamDestination();
synth.connect(dest);


// Fonction pour jouer une note de piano
function playPianoNote() {
    if(ENVIRONMENT == "test") console.log("Note de piano jouée");
    synth.triggerAttackRelease('C4', '8n');
}

document.querySelector('li[onclick="playPianoNote()"]').addEventListener('click', playPianoNote);