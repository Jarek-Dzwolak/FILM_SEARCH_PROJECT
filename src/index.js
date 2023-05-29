// import './sass/main.scss';
import { createModal } from './modal';

const resultDiv = document.querySelector('.movie-container');
// const resultDiv = document.querySelector('.movie-container__favorites');
let currentPage = 1;
let totalPages = 0;

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
          //pokaż obiekt gatunków filmowych;

          response.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-container__card');
            movieDiv.addEventListener('click', function () {
              createModal(movie); // Przekazanie danych filmu jako argument do createModal
            });
            // Pobierz nazwy gatunków na podstawie identyfikatorów
            const genres = movie.genre_ids
              .map(genreId => {
                const genre = genresResponse.genres.find(g => g.id === genreId);
                return genre ? genre.name : '';
              })
              .filter(genre => genre !== ''); // Dodajemy filtr, który usuwa puste gatunki- takie które nie znalazły odpowiednika Id z odpowiedzi w obiekcie genresResponse z API

            const fullDate = movie.release_date;
            const year = fullDate ? fullDate.slice(0, 4) : movie.first_air_date.slice(0, 4);
            //jeśli fullDate rrrr-mm-dd  zwraca prawdę to wytnij pierwsze 4 znaki, w innym wypadku wyświetl wartość daty "pierwszej emisji" skróconą do 'rrrr'

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
            
              </p>
            `;

            resultDiv.appendChild(movieDiv);
          });
          totalPages = response.total_pages;
          createPagination();
        });
    })
    .catch(err => console.error(err));
}

FavoritesMovies();

function createPagination() {
  const paginationContainer = document.querySelector('.pagination');
  if (paginationContainer) {
    paginationContainer.innerHTML = '';

    const paginationList = document.createElement('ul');
    paginationList.classList.add('pagination__list');
    const prevButton = document.createElement('li');
    prevButton.classList.add('pagination__item', 'pagination__item-button');
    const prevButtonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    prevButtonIcon.classList.add('pagination__icon-arrow', 'pagination__icon-arrow--left');
    prevButtonIcon.setAttribute('width', '16px');
    prevButtonIcon.setAttribute('height', '16px');
    prevButtonIcon.setAttribute('viewBox', '0 0 16 16');
    prevButtonIcon.innerHTML = `<path d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z"></path>`;
    prevButton.appendChild(prevButtonIcon);
    paginationList.appendChild(prevButton);

    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);
    const isFirstPageVisible = startPage > 1;
    const isLastPageVisible = endPage < totalPages;

    if (window.innerWidth > 768 && isFirstPageVisible) {
      const firstPage = document.createElement('li');
      firstPage.classList.add('pagination__item');
      const firstPageSpan = document.createElement('span');
      firstPageSpan.textContent = '1';
      firstPage.appendChild(firstPageSpan);
      paginationList.appendChild(firstPage);
      if (startPage > 2) {
        const dots = document.createElement('li');
        dots.classList.add('pagination__item', 'pagination__item-dots');
        dots.textContent = '...';
        paginationList.appendChild(dots);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('li');
      pageButton.classList.add('pagination__item');
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      const pageSpan = document.createElement('span');
      pageSpan.textContent = i.toString();
      pageButton.appendChild(pageSpan);
      paginationList.appendChild(pageButton);
    }

    if (window.innerWidth > 768 && isLastPageVisible) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement('li');
        dots.classList.add('pagination__item', 'pagination__item-dots');
        dots.textContent = '...';
        paginationList.appendChild(dots);
      }
      const lastPage = document.createElement('li');
      lastPage.classList.add('pagination__item');
      const lastPageSpan = document.createElement('span');
      lastPageSpan.textContent = totalPages.toString();
      lastPage.appendChild(lastPageSpan);
      paginationList.appendChild(lastPage);
    }

    const nextButton = document.createElement('li');
    nextButton.classList.add('pagination__item', 'pagination__item-button');
    const nextButtonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    nextButtonIcon.classList.add('pagination__icon-arrow', 'pagination__icon-arrow--right');
    nextButtonIcon.setAttribute('width', '16px');
    nextButtonIcon.setAttribute('height', '16px');
    nextButtonIcon.setAttribute('viewBox', '0 0 16 16');
    nextButtonIcon.innerHTML = `<path d="M9.707 13.707l5-5c0.391-0.39 0.391-1.024 0-1.414l-5-5c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3.293 3.293h-9.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h9.586l-3.293 3.293c-0.195 0.195-0.293 0.451-0.293 0.707s0.098 0.512 0.293 0.707c0.391 0.391 1.024 0.391 1.414 0z"></path>`;
    nextButton.appendChild(nextButtonIcon);
    paginationList.appendChild(nextButton);

    paginationContainer.appendChild(paginationList);

    paginationList.addEventListener('click', event => {
      const target = event.target;
      if (target.tagName === 'SPAN') {
        const pageIndex = parseInt(target.textContent);
        if (pageIndex >= 1 && pageIndex <= totalPages) {
          currentPage = pageIndex;
          resultDiv.innerHTML = '';
          FavoritesMovies();
        }
      } else if (target === prevButton || target === prevButtonIcon) {
        if (currentPage > 1) {
          currentPage--;
          resultDiv.innerHTML = '';
          FavoritesMovies();
        }
      } else if (target === nextButton || target === nextButtonIcon) {
        if (currentPage < totalPages) {
          currentPage++;
          resultDiv.innerHTML = '';
          FavoritesMovies();
        }
      }
    });
  }
}

createPagination();

const searchInput = document.getElementById('Movie-search');
let failMessage;

function searchMovies(event) {
  event.preventDefault();
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
  const searchQuery = searchInput.value;
  const page = 1; // Numer strony, którą chcesz pobrać
  const header = document.querySelector('.header-wrapper');
  resultDiv.innerHTML = ''; //czyścimy stronę z poprzednich wyszukań
  fallbackImageURL = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg';

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      return response.json();
    })
    .then(response => {
      if (response.results.length === 0) {
        FavoritesMovies(); //jeśli odpowiedź z serwera nie znajduje wynikow wyświetl stronę z trending-filmami
        if (failMessage) {
          //jeśli na stronie istnieje Failmessage z poprzedniego wyszukania to ją usuń;
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
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then(genresResponse => genresResponse.json())
        .then(genresResponse => {
          if (failMessage) {
            failMessage.remove();
            failMessage = null;
          }
          response.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-container__card');
            movieDiv.addEventListener('click', function () {
              createModal(movie); // Przekazanie danych filmu jako argument do createModal
            });
            const genres = movie.genre_ids
              .map(genreId => {
                const genre = genresResponse.genres.find(g => g.id === genreId);
                return genre ? genre.name : '';
              })
              .filter(genre => genre !== ''); // Dodajemy filtr, który usuwa puste gatunki

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
          <span class="movie-container__genre">${genres.join(', ')} | </span>
          <span class="movie-container__screening">${year}</span>
          </p>
        `;
            resultDiv.appendChild(movieDiv);
          });
          totalPages = response.total_pages;
          createPagination();
        });
    })
    .catch(err => {
      console.error(err);
      const failMessage = document.createElement('h3');
      failMessage.id = 'fail';
      failMessage.style.color = 'red';
      failMessage.style.fontSize = '14px';
      failMessage.style.lineHeight = '1.3';
      failMessage.style.textAlign = 'center';
      failMessage.innerHTML = 'An error occurred while fetching movie data.';
      header.appendChild(failMessage);
    });
}

// Wywołanie funkcji searchMovies() po kliknięciu przycisku "Szukaj"
document.getElementById('search-button').addEventListener('click', searchMovies);
