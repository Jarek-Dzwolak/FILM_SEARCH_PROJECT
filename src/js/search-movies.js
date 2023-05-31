export { searchMovies };
// import { createPagination } from './pagination';
import { FavoritesMovies } from './index';
import { movieGenres } from './genres';
import { createModal } from './modal';

const resultDiv = document.querySelector('.movie-container');
const spinnerDIV = document.createElement('div');
const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
const searchInput = document.getElementById('Movie-search');
let failMessage;

async function searchMovies(event) {
  event.preventDefault();
  const searchQuery = searchInput.value;

  const page = 1;
  const header = document.querySelector('.header-wrapper');
  resultDiv.innerHTML = '';
  let fallbackImageURL = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error('Search request failed');
    }

    const data = await response.json();

    if (data.results.length === 0) {
      FavoritesMovies();
      if (failMessage) {
        failMessage.remove();
      }
      failMessage = document.createElement('h3');
      failMessage.id = 'fail';
      failMessage.style.color = 'red';
      failMessage.style.fontSize = '14px';
      failMessage.style.lineHeight = '1.3';
      failMessage.style.textAlign = 'center';
      failMessage.innerHTML = 'No movies found. Enter the correct movie name.';
      header.appendChild(failMessage);
      return;
    }

    if (failMessage) {
      failMessage.remove();
    }

    data.results.forEach(movie => {
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
        </p>
      `;

      resultDiv.appendChild(movieDiv);
    });
  } catch (err) {
    console.error(err);
  }
}
