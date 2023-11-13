let mediaRecorder;
let audioChunks = [];
let isRecording = false;

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
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = audioUrl;
      a.download = 'enregistrement.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(audioUrl);
      recordButton.textContent = "Commencer l'enregistrement";
      audioChunks = [];
      isRecording = false;
    };
  }
}

// Pour commencer l'enregistrement automatiquement lors du chargement de la page
// window.onload = () => {
//   document.getElementById('recordButton').click();
// };
