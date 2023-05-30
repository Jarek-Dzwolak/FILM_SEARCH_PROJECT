// import './sass/main.scss';
import { createModal } from './modal';
import { movieGenres } from './genres.js';
import { createPagination } from './pagination';
import { searchMovies } from './search-movies';
export { FavoritesMovies };

const resultDiv = document.querySelector('.movie-container');
const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';

// const resultDiv = document.querySelector('.movie-container__favorites');
let currentPage = 1;
let totalPages = 0;

async function FavoritesMovies() {
  const spinnerDIV = document.createElement('div');
  spinnerDIV.classList.add('backdrop');
  resultDiv.appendChild(spinnerDIV);
  spinnerDIV.innerHTML = `<span class="loader-dot loader-dot--one"></span>
	<span class="loader-dot loader-dot--two"></span>
	<span class="loader-dot loader-dot--three"></span>`;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${currentPage}`,
    );
    const data = await response.json();
    console.log(data);

    data.results.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-container__card');
      movieDiv.addEventListener('click', function () {
        createModal(movie, movieGenres, genresNames);
      });

      const genresNames = movie.genre_ids
        .map(genreId => {
          const genre = movieGenres.find(g => g.id === genreId);
          return genre ? genre.name : '';
        })
        .filter(genre => genre !== '');

      const fullDate = movie.release_date;
      const year = fullDate ? fullDate.slice(0, 4) : movie.first_air_date.slice(0, 4);

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
          <span class="movie-container__genre">${genresNames.join(', ')} | </span>
          <span class="movie-container__screening">${year}</span>
        </p>
      `;

      resultDiv.appendChild(movieDiv);
    });

    totalPages = data.total_pages;
    createPagination();
  } catch (err) {
    console.error(err);
  } finally {
    resultDiv.removeChild(spinnerDIV);
  }
}

FavoritesMovies();

// createPagination();
// Wywołanie funkcji searchMovies() po kliknięciu przycisku "Szukaj"
document.getElementById('search-button').addEventListener('click', searchMovies);
