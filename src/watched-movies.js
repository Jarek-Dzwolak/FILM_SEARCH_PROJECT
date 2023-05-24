import { createModal } from './modal';

const searchMovieDiv = document.getElementById('watched-movies');

function displayWatchedMovies() {
  const watchedMovies = localStorage.getItem('watchedMovies');
  if (watchedMovies) {
    const parsedWatchedMovies = JSON.parse(watchedMovies);

    parsedWatchedMovies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie, year); // Przekazanie danych filmu jako argument do createModal
      });

      const genres = Array.isArray(movie.genre_ids)
        ? movie.genre_ids.map(genreId => {
            const genre = genresResponse.genres.find(g => g.id === genreId);
            return genre ? genre.name : '';
          })
        : [];
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
          <span class="movie-container__genre">${genres.join(', ')} | </span>
          <span class="movie-container__screening">${year}</span>
          <span class="movie-container__rating"> |  ${movie.vote_average}</span>
        </p>
      `;
      searchMovieDiv.appendChild(movieDiv);
    });
  }
}
displayWatchedMovies();
