// Pobranie referencji do elementów modala
const modalBackdrop = document.getElementById('modal-backdrop');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalRanking = document.querySelector('.modal__info__details__ranking');
const modalPopularity = document.querySelector('.modal__info__details');
const modalOriginalTitle = document.querySelector('.modal__info__details');
const modalGenre = document.querySelector('.modal__info__details');
const modalDescription = document.getElementById('modal-description');
const watchedBtn = document.getElementById('watched-btn');
const queueBtn = document.getElementById('queue-btn');

// Funkcja wyświetlająca modal
function showModal() {
  modalBackdrop.style.display = 'block';
}

// Funkcja zamykająca modal
function closeModal() {
  modalBackdrop.style.display = 'none';
}

// Funkcja pobierająca informacje o filmie z API i aktualizująca zawartość modala
async function fetchMovieDetails(movieId) {
  try {
    // Wykonaj zapytanie do API, używając movieId
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=f2bec2f8de04498ca2fd18780a529a31`,
    );
    const data = await response.json();

    // Aktualizuj zawartość modala na podstawie danych z API
    modalImage.src = data.poster_path;
    modalTitle.textContent = data.title;
    modalRanking.textContent = `${data.vote_average} / ${data.vote_count}`;
    modalPopularity.textContent = data.popularity;
    modalOriginalTitle.textContent = data.original_title;
    modalGenre.textContent = data.genre;
    modalDescription.textContent = data.overview;

    // Przypisz funkcję do przycisków w modalu
    watchedBtn.addEventListener('click', addToWatched);
    queueBtn.addEventListener('click', addToQueue);

    // Wyświetl modal
    showModal();
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych z API:', error);
  }
}

// // Funkcja obsługująca kliknięcie w przycisk "ADD TO WATCHED"
// function addToWatched() {
//   // Dodaj kod obsługujący dodanie filmu do listy obejrzanych
// }

// // Funkcja obsługująca kliknięcie w przycisk "ADD TO QUEUE"
// function addToQueue() {
//   // Dodaj kod obsługujący dodanie filmu do kolejki
// }

// Funkcja obsługująca kliknięcie w przycisk zamykający modal
document.getElementById('close-modal-btn').addEventListener('click', closeModal);

// // Przykładowe użycie - wywołaj funkcję fetchMovieDetails z odpowiednim id filmu
// fetchMovieDetails(12345);
