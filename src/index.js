// import './sass/main.scss';

const resultDiv = document.querySelector('.favorites-movies');

function FavoritesMovies() {
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';

  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=2`)
    .then(response => response.json())
    .then(response => {
      response.results.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
          movie.title || movie.name
        } Poster">
          <h2>${movie.title || movie.name}</h2>
          <p>${movie.overview}</p>
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

  resultDiv.style.display = 'none';

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
  )
    .then(response => response.json())
    .then(response => {
      const searchMovieDiv = document.querySelector('.search-movies');
      searchMovieDiv.innerHTML = ''; // Wyczyszczenie wyników poprzedniego wyszukiwania

      response.results.forEach(movie => {
        const movieDiv = document.createElement('div');
        const moviePoster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : '';
        movieDiv.innerHTML = `
          ${moviePoster && `<img src="${moviePoster}" alt="${movie.title} Poster">`}
          <h2>${movie.title}</h2>
          <p>${movie.overview}</p>
        `;
        searchMovieDiv.appendChild(movieDiv);
      });
    })
    .catch(err => console.error(err));
}

// Wywołanie funkcji searchMovies() po kliknięciu przycisku "Szukaj"
document.getElementById('search-button').addEventListener('click', searchMovies);
