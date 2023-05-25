import { createModal } from './modal';

const watchedmoviesDiv = document.getElementById('watched-movies');

function displayWatchedMovies() {
  const watchedMovies = localStorage.getItem('watchedMovies');
  if (watchedMovies) {
    const parsedWatchedMovies = JSON.parse(watchedMovies);

    parsedWatchedMovies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie); // Przekazanie danych filmu jako argument do createModal
      });

      const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
      const genresUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=genres`;

      fetch(genresUrl)
        .then(response => response.json())
        .then(movieResponse => {
          const genres = movieResponse.genres.map(genre => genre.name).join(', ');

          const fullDate = movie.release_date;
          const year = fullDate ? fullDate.slice(0, 4) : 'Brak danych';

          const fallbackImageURL =
            'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';
          movieDiv.innerHTML = `
            <img src="${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : fallbackImageURL
            }" alt="${movie.title || movie.name} Poster" class="movie-container__image">
            <p class="movie-container__movie-description">
              <h2 class="movie-container__title">${movie.title || movie.name}</h2>
              <span class="movie-container__genre">${genres} | </span>
              <span class="movie-container__screening">${year}</span>
              <span class="movie-container__rating-display"> |  ${movie.vote_average}</span>
            </p>
          `;
          watchedmoviesDiv.appendChild(movieDiv);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    });
  }
}

const queuedmoviesDiv = document.getElementById('queued-movies');

function displayQueuedMovies() {
  const queuedMovies = localStorage.getItem('queuedMovies');
  if (queuedMovies) {
    const parsedQueuedMovies = JSON.parse(queuedMovies);

    parsedQueuedMovies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie); // Przekazanie danych filmu jako argument do createModal
      });

      const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
      const genresUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=genres`;

      fetch(genresUrl)
        .then(response => response.json())
        .then(movieResponse => {
          const genres = movieResponse.genres.map(genre => genre.name).join(', ');

          const fullDate = movie.release_date;
          const year = fullDate ? fullDate.slice(0, 4) : 'Brak danych';

          const fallbackImageURL =
            'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';
          movieDiv.innerHTML = `
            <img src="${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : fallbackImageURL
            }" alt="${movie.title || movie.name} Poster" class="movie-container__image">
            <p class="movie-container__movie-description">
              <h2 class="movie-container__title">${movie.title || movie.name}</h2>
              <span class="movie-container__genre">${genres} | </span>
              <span class="movie-container__screening">${year}</span>
              <span class="movie-container__rating-display"> |  ${movie.vote_average}</span>
            </p>
          `;
          queuedmoviesDiv.appendChild(movieDiv);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    });
  }
}

const watchedButton = document.getElementById('header-Watched');
const queueButton = document.getElementById('header-Queue');

watchedButton.addEventListener('click', function () {
  watchedmoviesDiv.style.display = 'block';
  queuedmoviesDiv.style.display = 'none';
  displayWatchedMovies();
});

queueButton.addEventListener('click', function () {
  watchedmoviesDiv.style.display = 'none';
  queuedmoviesDiv.style.display = 'block';
  displayQueuedMovies();
});
