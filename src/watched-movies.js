import { createModal } from './modal';

const movieList = document.getElementById('library');
const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
const fallbackImageURL = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';

function displayWatchedMovies() {
  const watchedMovies = localStorage.getItem('watchedMovies');
  const parsedWatchedMovies = JSON.parse(watchedMovies);
  if (watchedMovies) {
    parsedWatchedMovies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie); // Przekazanie danych filmu jako argument do createModal
      });

      const genresUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=genres`;

      fetch(genresUrl)
        .then(response => response.json())
        .then(movieResponse => {
          const genres = movieResponse.genres.map(genre => genre.name).join(', ');

          const fullDate = movie.release_date;
          const year = fullDate ? fullDate.slice(0, 4) : movie.first_air_date.slice(0, 4);

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
          <span class="movie-container__genre">${genres} | </span>
          <span class="movie-container__screening">${year}</span>
          <span class="movie-container__rating-display">${movie.vote_average.toFixed(1)}</span>
          </p>
          `;
          movieList.appendChild(movieDiv);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    });
  }
}

function displayQueuedMovies() {
  const queuedMovies = localStorage.getItem('queuedMovies');
  const parsedQueuedMovies = JSON.parse(queuedMovies);
  if (queuedMovies) {
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
          const year = fullDate ? fullDate.slice(0, 4) : movie.first_air_date.slice(0, 4);
          // const fallbackImageURL =
          //   'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';
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
              <span class="movie-container__genre">${genres} | </span>
              <span class="movie-container__screening">${year}</span>
              <span class="movie-container__rating-display">${movie.vote_average.toFixed(1)}</span>
            </p>
          `;

          movieList.appendChild(movieDiv);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    });
  }
}

const watchedButton = document.getElementById('library-watched');
const queueButton = document.getElementById('library-queued');

watchedButton.addEventListener('click', function () {
  movieList.innerHTML = '';
  displayWatchedMovies();
});

queueButton.addEventListener('click', function () {
  movieList.innerHTML = '';
  displayQueuedMovies();
});
