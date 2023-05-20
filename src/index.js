// import './sass/main.scss';

const resultDiv = document.querySelector('.movie-container__favorites');

function FavoritesMovies() {
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';

  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=2`)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      response.results.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-container__card');
        // genres = [genre['name'] for genre in data['genres']];
        movieDiv.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
          movie.title || movie.name
        } Poster" class="movie-container__img">
          <p class="movie-container__movie-description">
          <h2 class="movie-container__title">${movie.title || movie.name}</h2>
          <span class="movie-container__genre">${movie.genres_ids} || </span>
          <span class="movie-container__screening">${movie.release_date}</span>
          </p>

        `;
        resultDiv.appendChild(movieDiv);
      });
    })
    .catch(err => console.error(err));
}

FavoritesMovies();

const searchInput = document.getElementById('Movie-search');

function searchMovies(event) {
  event.preventDefault();
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
  const searchQuery = searchInput.value;
  const page = 1; // Numer strony, którą chcesz pobrać

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
  )
    .then(response => response.json())
    .then(response => {
      const searchMovieDiv = document.querySelector('search-movies');

      resultDiv.style.display = 'none';
      response.results.forEach(movie => {
        const movieDiv2 = document.createElement('div');
        movieDiv2.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
          <h2>${movie.title}</h2>
          <p>${movie.overview}</p>
        `;
        searchMovieDiv.appendChild(movieDiv2);
      });
    })
    .catch(err => console.error(err));
}

// Wywołanie funkcji searchMovies() po kliknięciu przycisku "Szukaj"
document.getElementById('search-button').addEventListener('click', searchMovies);
