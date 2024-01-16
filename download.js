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
  
  // Vérifie si l'enregistrement a déjà commencé
  if (!isRecording) {
    // Obtient le flux audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    mediaRecorder = new MediaRecorder(stream);

    // Ajoute les données audio aux morceaux lorsque disponibles
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    // Commence l'enregistrement
    mediaRecorder.start();
    recordButton.textContent = "Terminer l'enregistrement";
    isRecording = true;
  } else {
    // Arrête l'enregistrement
    mediaRecorder.stop();

    // À la fin de l'enregistrement, traite et télécharge l'audio
    mediaRecorder.onstop = () => {
      // Crée un Blob audio à partir des morceaux enregistrés
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });

      // Crée une URL pour le Blob audio
      const audioUrl = URL.createObjectURL(audioBlob);

      // Crée un élément de lien pour télécharger le fichier audio
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'enregistrement.mp3';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      // Nettoie et réinitialise l'état
      window.URL.revokeObjectURL(audioUrl);
      document.body.removeChild(a);
      audioChunks = [];
      isRecording = false;
      recordButton.textContent = "Commencer l'enregistrement";
    };
  }
}
