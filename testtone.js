// Création d'un synthétiseur
const synth = new Tone.Synth().toDestination();

// Fonction pour jouer une note de piano
function playPianoNote() {
    // Ici, nous jouons la note C4 pendant une durée de '8n'
    console.log("htfhtrhf");
    synth.triggerAttackRelease('C4', '8n');
}
