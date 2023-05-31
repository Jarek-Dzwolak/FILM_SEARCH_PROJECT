import { createModal } from './modal';
import { movieGenres } from './genres';

const movieList = document.getElementById('library');
const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
const fallbackImageURL = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';

let watchedMoviesPage = 1;
let queuedMoviesPage = 1;

function displayWatchedMovies(page) {
  const watchedMovies = localStorage.getItem('watchedMovies');
  const parsedWatchedMovies = JSON.parse(watchedMovies);
  if (watchedMovies) {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const moviesToDisplay = parsedWatchedMovies.slice(startIndex, endIndex);

    moviesToDisplay.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie, movieGenres);
      });

      const genres = Array.isArray(movie.genre_ids)
        ? movie.genre_ids
            .map(genreId => {
              const genre = movieGenres.find(g => g.id === genreId);
              return genre ? genre.name : '';
            })
            .filter(genre => genre !== '')
        : [];

      const fullDate = movie.release_date;
      const year = fullDate
        ? fullDate.slice(0, 4)
        : movie.first_air_date
        ? movie.first_air_date.slice(0, 4)
        : '';

      movieDiv.innerHTML = `
        <div class="movie-container__image-box">
          <img src="${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : fallbackImageURL
          }" alt="${movie.title || movie.name} Poster" class="movie-container__image">
        </div>
        <p class="movie-container__movie-description">
          <h2 class="movie-container__title">${movie.title || movie.name}</h2>
          <span class="movie-container__genre">${genres.join(', ')} | </span>
          <span class="movie-container__screening">${year}</span>
          <span class="movie-container__rating-display">${movie.vote_average.toFixed(1)}</span>
        </p>
      `;
      movieList.appendChild(movieDiv);
    });
    if (parsedWatchedMovies.length > endIndex) {
      const loadMoreButton = createLoadMoreButton('load-more-watched');
      movieList.appendChild(loadMoreButton);
    }
  } else {
    const noMoviesMessage = document.createElement('p');
    noMoviesMessage.textContent = 'No movies in the watched.';
    movieList.appendChild(noMoviesMessage);
  }
}

function displayQueuedMovies(page) {
  const queuedMovies = localStorage.getItem('queuedMovies');
  const parsedQueuedMovies = JSON.parse(queuedMovies);
  if (queuedMovies) {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const moviesToDisplay = parsedQueuedMovies.slice(startIndex, endIndex);

    moviesToDisplay.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie, movieGenres); // Przekazanie danych filmu jako argument do createModal
      });

      const genres = Array.isArray(movie.genre_ids)
        ? movie.genre_ids
            .map(genreId => {
              const genre = movieGenres.find(g => g.id === genreId);
              return genre ? genre.name : '';
            })
            .filter(genre => genre !== '')
        : [];

      const fullDate = movie.release_date;
      const year = fullDate
        ? fullDate.slice(0, 4)
        : movie.first_air_date
        ? movie.first_air_date.slice(0, 4)
        : '';

      movieDiv.innerHTML = `
           <div class= movie-container__image-box>
              <img src="${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : fallbackImageURL
              }" alt="${movie.title || movie.name} Poster" class="movie-container__image">
           </div>
            <p class="movie-container__movie-description">
              <h2 class="movie-container__title">${movie.title || movie.name}</h2>
              <span class="movie-container__genre">${genres.join(', ')} | </span>
              <span class="movie-container__screening">${year}</span>
              <span class="movie-container__rating-display">${movie.vote_average.toFixed(1)}</span>
            </p>
          `;

      movieList.appendChild(movieDiv);
    });
    if (parsedQueuedMovies.length > endIndex) {
      const loadMoreButton = createLoadMoreButton('load-more-queued');
      movieList.appendChild(loadMoreButton);
    }
  } else {
    const noMoviesMessage = document.createElement('p');
    noMoviesMessage.textContent = 'No movies in the queue.';
    movieList.appendChild(noMoviesMessage);
  }
}

function createLoadMoreButton(id) {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.id = id;
  loadMoreButton.textContent = 'Load More';
  loadMoreButton.addEventListener('click', function () {
    if (id === 'load-more-watched') {
      loadMoreWatchedMovies();
    } else if (id === 'load-more-queued') {
      loadMoreQueuedMovies();
    }
  });
  return loadMoreButton;
}

function loadMoreWatchedMovies() {
  const loadMoreButton = document.getElementById('load-more-watched');
  loadMoreButton.remove();
  watchedMoviesPage++;
  displayWatchedMovies(watchedMoviesPage);
}

function loadMoreQueuedMovies() {
  const loadMoreButton = document.getElementById('load-more-queued');
  loadMoreButton.remove();
  queuedMoviesPage++;
  displayQueuedMovies(queuedMoviesPage);
}

const watchedButton = document.getElementById('library-watched');
const queueButton = document.getElementById('library-queued');

watchedButton.addEventListener('click', function () {
  watchedMoviesPage = 1;
  movieList.innerHTML = '';
  displayWatchedMovies(watchedMoviesPage);
});

queueButton.addEventListener('click', function () {
  queuedMoviesPage = 1;
  movieList.innerHTML = '';
  displayQueuedMovies(queuedMoviesPage);
});
