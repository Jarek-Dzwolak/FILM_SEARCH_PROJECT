// import './sass/main.scss';

const resultDiv = document.querySelector('.movie-container__favorites');
let currentPage = 1;
function FavoritesMovies() {
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';

  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${currentPage}`)
    .then(response => response.json())
    .then(response => {
      console.log(response);

      // Pobierz listę gatunków filmowych
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then(genresResponse => genresResponse.json())
        .then(genresResponse => {
          console.log(genresResponse);

          response.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-container__card');

            // Pobierz nazwy gatunków na podstawie identyfikatorów
            const genres = movie.genre_ids.map(genreId => {
              const genre = genresResponse.genres.find(g => g.id === genreId);
              return genre ? genre.name : '';
            });

            const fullDate = movie.release_date;
            const year = fullDate ? fullDate.slice(0, 4) : 'Brak danych';

            movieDiv.innerHTML = `
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
              movie.title || movie.name
            } Poster" class="movie-container__image">
              <p class="movie-container__movie-description">
              <h2 class="movie-container__title">${movie.title || movie.name}</h2>
              <span class="movie-container__genre">${genres.join(', ')} | </span>
              <span class="movie-container__screening">${year}</span>
              <span class="movie-container__rating"> |  ${movie.vote_average}</span>
              </p>
            `;

            resultDiv.appendChild(movieDiv);
          });
        })
        .catch(err => console.error(err));
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
      const searchMovieDiv = document.querySelector('.movie-container__search-movies');
      searchMovieDiv.innerHTML = ''; // Wyczyszczenie wyników poprzedniego wyszukiwania

      // Pobierz listę gatunków filmowych
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then(genresResponse => genresResponse.json())
        .then(genresResponse => {
          response.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-container__card');

            const genres = movie.genre_ids.map(genreId => {
              const genre = genresResponse.genres.find(g => g.id === genreId);
              return genre ? genre.name : '';
            });
            fallbackImageURL =
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
              <span class="movie-container__screening">${movie.release_date}</span>
              <span class="movie-container__rating"> |  ${movie.vote_average}</span>
              </p>
            `;
            searchMovieDiv.appendChild(movieDiv);
          });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

// Wywołanie funkcji searchMovies() po kliknięciu przycisku "Szukaj"
document.getElementById('search-button').addEventListener('click', searchMovies);
