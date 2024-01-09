const NOTES_FOLDER_NAME = "notes";
const NOTE_EXTENSION = ".wav";

const GENRES = ["PIANO", "LOFI"];

let genre_index = 0;

let notes = {
  DO: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/DO${NOTE_EXTENSION}`,
  RE: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/RE${NOTE_EXTENSION}`,
  MI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/MI${NOTE_EXTENSION}`,
  FA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/FA${NOTE_EXTENSION}`,
  SOL: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SOL${NOTE_EXTENSION}`,
  LA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/LA${NOTE_EXTENSION}`,
  SI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SI${NOTE_EXTENSION}`,
};


/**
 * Fonction qui permet de changer le genre de musique
 * lorsque l'on clique sur un bouton du menu déroulant
 * 
 * @param {"PIANO" | "LOFI" | "RANDOM"} name Le nom du genre de musique
 */
function changeGenre(name) {
  // On récupère l'index du genre de musique ou on le génère aléatoirement
  if (name === "RANDOM") {
    genre_index = Math.floor(Math.random() * GENRES.length);
  } else {
    genre_index = GENRES.indexOf(name);
  }

  notes = {
    DO: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/DO${NOTE_EXTENSION}`,
    RE: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/RE${NOTE_EXTENSION}`,
    MI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/MI${NOTE_EXTENSION}`,
    FA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/FA${NOTE_EXTENSION}`,
    SOL: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SOL${NOTE_EXTENSION}`,
    LA: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/LA${NOTE_EXTENSION}`,
    SI: `./${NOTES_FOLDER_NAME}/${GENRES[genre_index]}/SI${NOTE_EXTENSION}`,
  };

  // On ferme le menu déroulant
  closeMenu();
}