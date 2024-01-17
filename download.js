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
    // Démarre l'enregistrement
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
      mediaRecorder.start();
      recordButton.textContent = "Terminer l'enregistrement";
      isRecording = true;
    } catch (error) {
      console.error('Erreur lors de l’accès au microphone :', error);
    }
  } else {
    // Arrête l'enregistrement
    mediaRecorder.stop();
    recordButton.textContent = "Enregistrer";
    isRecording = false;

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'enregistrement.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(audioUrl);
    };
  }
}
