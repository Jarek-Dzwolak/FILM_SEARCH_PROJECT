// import './sass/main.scss';
import { createModal } from './modal';
const resultDiv = document.querySelector('.movie-container');
// const resultDiv = document.querySelector('.movie-container__favorites');
let currentPage = 1;
function FavoritesMovies() {
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';

  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=1`)
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
            movieDiv.addEventListener('click', function () {
              createModal(movie); // Przekazanie danych filmu jako argument do createModal
            });
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

  // resultDiv.style.display = 'none';
  resultDiv.innerHTML = '';

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
            movieDiv.addEventListener('click', function () {
              createModal(movie); // Przekazanie danych filmu jako argument do createModal
            });
            const genres = movie.genre_ids.map(genreId => {
              const genre = genresResponse.genres.find(g => g.id === genreId);
              return genre ? genre.name : '';
            });

            const fullDate = movie.release_date;
            const year = fullDate ? fullDate.slice(0, 4) : 'Brak danych';

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
              <span class="movie-container__screening">${year}</span>
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

// const paginationContainer = document.querySelector(".pagination");
// const itemsPerPage = 20;
// let items = [];

// fetch(?)
//   .then(response => response.json())
//   .then(data => {
//     items = data.items;

//     if (items.length === 0) {
//       console.error("Brak elementów do paginacji.");
//     }

// dzielenie card na strony
// const numPages = Math.ceil(items.length / itemsPerPage);
// przycisk wsteczny
//     const prevButton = document.createElement("li");
//     prevButton.className = "pagination__item pagination__item-button";
//     prevButton.innerHTML = `
//       <svg class="pagination__icon-arrow pagination__icon-arrow--left" width="16" height="16">
//         <use href="images/arrows.svg#icon-arrow-left2"></use>
//       </svg>
//     `;
//     paginationContainer.appendChild(prevButton);
// przycisk przód
//     const nextButton = document.createElement("li");
//     nextButton.className = "pagination__item pagination__item-button";
//     nextButton.innerHTML = `
//       <svg class="pagination__icon-arrow pagination__icon-arrow--right" width="16" height="16">
//         <use href="images/arrows.svg#icon-arrow-right2"></use>
//       </svg>
//     `;
//     paginationContainer.appendChild(nextButton);

// ilość stron, przypisanie miejsca odpowiedniej strony
//     for (let i = 1; i <= numPages; i++) {
//       const pageButton = document.createElement("li");
//       pageButton.className = "pagination__item";
//       pageButton.innerHTML = `<span>${i}</span>`;
//       paginationContainer.insertBefore(
//         pageButton,
//         paginationContainer.lastElementChild
//       );
//     }

// wywoływanie odpowiednich stron dla 1 strony
//     function goToPage(page) {
//       const startIndex = (page - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;

// to samo dla przycisków, zeby znikały, gdy liczba kard nie jest większa od limitu na jednej stronie
//       items.forEach((item, index) => {
//         if (index >= startIndex && index < endIndex) {
//           item.style.display = "block";
//         } else {
//           item.style.display = "none";
//         }
//       });
//     }

//     goToPage(1);

// klikniecie na odpowiednia strone - przekierowanie
//     const pageButtons = Array.from(document.querySelectorAll(".pagination__item:not(.pagination__item-button)"));
//     if (pageButtons.length > 0) {
//       pageButtons.forEach((button, index) => {
//         button.addEventListener("click", () => {
//           const currentPage = index + 1;
//           goToPage(currentPage);
//         });
//       });
//     }
// klik na przycisk - poprzedni
//     if (prevButton) {
//       prevButton.addEventListener("click", () => {
//         const activePage = document.querySelector(".pagination__item.active");
//         if (!activePage) {
//           console.error(error);
//           return;
//         }
//         const currentPage = parseInt(activePage.textContent);

//         if (currentPage > 1) {
//           const prevPage = activePage.previousElementSibling;
//           if (!prevPage) {
//             console.error("error");
//             return;
//           }
//           activePage.classList.remove("active");
//           prevPage.classList.add("active");
//           goToPage(currentPage - 1);
//         }
//       });
//     }
// klik na przycisk - next
//     if (nextButton) {
//       nextButton.addEventListener("click", () => {
//         const activePage = document.querySelector(".pagination__item.active");
//         if (!activePage) {
//           console.error("error");
//           return;
//         }
//         const currentPage = parseInt(activePage.textContent);

//         if (currentPage < numPages) {
//           const nextPage = activePage.nextElementSibling;
//           if (!nextPage) {
//             console.error("error");
//           return;
//         }
//         activePage.classList.remove("active");
//         nextPage.classList.add("active");
//         goToPage(currentPage + 1);
//       }
//     });
//   })
//   .catch(error => {
//     console.error("error");
//   });
