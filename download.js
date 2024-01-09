/*
 Déclaration de variables pour l'enregistrement audio
*/
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

/*
 Fonction asynchrone pour basculer l'enregistrement
*/
async function toggleRecording() {
  const recordButton = document.getElementById('recordButton');
  
  if (!isRecording) {

    // Commencez l'enregistrement
    mediaRecorder = new MediaRecorder(dest.stream);
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };
    mediaRecorder.start();
    recordButton.textContent = "Terminer l'enregistrement";
    isRecording = true;
  } else {

    // Arrêtez l'enregistrement
    mediaRecorder.stop();
    mediaRecorder.onstop = () => {
      // Créer un Blob audio à partir des morceaux enregistrés
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });

      // Créer une URL pour le Blob audio
      const audioUrl = URL.createObjectURL(audioBlob);

      // Créer un élément de lien pour télécharger le fichier audio
      const a = document.createElement('a');

      a.style.display = 'none';
      a.href = audioUrl;
      a.download = 'enregistrement.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(audioUrl);

      // Réinitialiser l'interface utilisateur et l'état d'enregistrement
      recordButton.textContent = "Commencer l'enregistrement";
      audioChunks = [];
      isRecording = false;
    };
  }
}