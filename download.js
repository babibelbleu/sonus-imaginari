/**
 * Objet MediaRecorder pour enregistrer l'audio
 */
let mediaRecorder;

/**
 * Tableau qui contient les morceaux audio enregistrés,
 * une fois que celui-ci est terminé
 */
let audioChunks = [];

/**
 * Booléen qui indique si l'enregistrement est en cours
 */
let isRecording = false;

/**
 * Fonction qui démarre ou arrête l'enregistrement audio
 * Elle est déclenchée lorsqu'on clique sur le bouton d'enregistrement (recordButton)
 * 
 * **TODO :** *implémenter une version mobile, car l'API MediaRecorder n'est pas supportée et AudioContext non plus*
 */
async function toggleRecording() {
  if(window.innerWidth < 768){
    const commingSoon = document.getElementById('comming-soon');
    commingSoon.classList.remove('comming-soon-disabled');
    commingSoon.classList.add('comming-soon-active');
    setTimeout(() => {
      commingSoon.classList.remove('comming-soon-active');
      commingSoon.classList.add('comming-soon-disabled');
    }, 3000);
    return;
  }

  const recordButton = document.getElementById('recordButton');

  // Si l'enregistrement n'est pas en cours, on le démarre
  if (!isRecording) {
    try {
      /* 
      * Permet d'obtenir le son interne de l'ordinateur
      * On doit enregistrer l'écran pour obtenir l'audio interne (cf. MDN)
      * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
      * 
      * Puisque nous n'avons pas besoin de récupérer les données vidéo,
      * on peut spécifier une largeur et une hauteur de 1 pixel, ce qui
      * permet d'économiser des ressources et de respecter le RGPD.
      */
      const desktopStream = await navigator.mediaDevices.getDisplayMedia({
        audio: { 
          mediaSource: 'audioCapture' // Permet d'obtenir le son interne de l'ordinateur
        }, 
        video: { 
          mediaSource: 'screen', width: 1, height: 1 // Préciser que l'on veut enregistrer l'écran et non la caméra
        }
      });

      // Permet l'utilisation de l'API Web Audio
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
      // Selon les versions de navigateur, il faut utiliser AudioContext ou webkitAudioContext
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // crée la piste audio
      const audioStream = audioContext.createMediaStreamDestination();

      // Source du flux audio du système (pour récupérer les données audio)
      const source = audioContext.createMediaStreamSource(desktopStream);

      // Connecte la piste audio à la source audio
      source.connect(audioStream);

      // Crée une instance de MediaRecorder à partir du flux audio
      mediaRecorder = new MediaRecorder(audioStream.stream);

      // Événement qui se déclenche à chaque fois qu'un morceau audio est disponible
      // i.e. quand l'enregistrement est terminé
      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      // Commence l'enregistrement,
      // change le texte du bouton,
      // et met à jour le booléen
      mediaRecorder.start();
      recordButton.textContent = "Terminer l'enregistrement";
      isRecording = true;
    } catch (error) {
      console.error("Erreur lors de l'obtention du flux audio du système:", error);
    }
  
  // Si l'enregistrement est en cours, on l'arrête
  } else {
    mediaRecorder.stop();

    // À la fin de l'enregistrement, on crée un fichier audio à télécharger
    mediaRecorder.onstop = () => {
      // Crée un Blob à partir de l'audio récupéré dans le mediaRecorder
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });

      // Crée une URL pour le Blob audio,
      // afin de pouvoir le télécharger
      const audioUrl = URL.createObjectURL(audioBlob);

      // On crée un lien invisble et on simule le clic pour télécharger le fichier
      // Le lien redirige vers l'URL précédemment créé.
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'enregistrement.mp3';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      // On réinitialise les variables
      // Pour éviter que les pistes audio s'accumulent
      window.URL.revokeObjectURL(audioUrl);
      document.body.removeChild(a);
      audioChunks = [];
      isRecording = false;
      recordButton.textContent = "Enregistrer";
    };
  }
}
