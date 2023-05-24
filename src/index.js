// import './sass/main.scss';
import { createModal } from './modal';
const resultDiv = document.querySelector('.movie-container__favorites');
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
    paginationContainer.innerHTML = ''; // Wyczyszczenie paginacji przed utworzeniem nowej

    const paginationList = document.createElement('ul');
    paginationList.classList.add('pagination__list');

    // Dodanie przycisku "Poprzednia strona"
    const prevButton = document.createElement('li');
    prevButton.classList.add('pagination__item', 'pagination__item-button');
    const prevButtonIcon = document.createElement('img');
    prevButtonIcon.classList.add('pagination__icon-arrow', 'pagination__icon-arrow--left');
    prevButtonIcon.setAttribute('src', 'images/arrows.svg#icon-arrow-left2');
    prevButtonIcon.setAttribute('width', '16');
    prevButtonIcon.setAttribute('height', '16');
    prevButton.appendChild(prevButtonIcon);
    paginationList.appendChild(prevButton);

    // Dodanie numerów stron
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);
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

    // Dodanie przycisku "Następna strona"
    const nextButton = document.createElement('li');
    nextButton.classList.add('pagination__item', 'pagination__item-button');
    const nextButtonIcon = document.createElement('img');
    nextButtonIcon.classList.add('pagination__icon-arrow', 'pagination__icon-arrow--right');
    nextButtonIcon.setAttribute('src', '/images/icon-arrow-right2');
    nextButtonIcon.setAttribute('width', '16');
    nextButtonIcon.setAttribute('height', '16');
    nextButton.appendChild(nextButtonIcon);
    paginationList.appendChild(nextButton);

    paginationContainer.appendChild(paginationList);

    // Obsługa kliknięcia na numer strony lub przyciski "Poprzednia/Następna strona"
    paginationList.addEventListener('click', event => {
      const target = event.target;
      if (target.tagName === 'SPAN') {
        const pageIndex = parseInt(target.textContent);
        if (pageIndex >= 1 && pageIndex <= totalPages) {
          currentPage = pageIndex;
          resultDiv.innerHTML = ''; // Wyczyszczenie wyników poprzedniej strony
          FavoritesMovies();
        }
      } else if (target === prevButton) {
        if (currentPage > 1) {
          currentPage--;
          resultDiv.innerHTML = ''; // Wyczyszczenie wyników poprzedniej strony
          FavoritesMovies();
        }
      } else if (target === nextButton) {
        if (currentPage < totalPages) {
          currentPage++;
          resultDiv.innerHTML = ''; // Wyczyszczenie wyników poprzedniej strony
          FavoritesMovies();
        }
      }
    });
  }
}

// Inicjalizacja paginacji
createPagination();

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

// //         if (currentPage < numPages) {
// //           const nextPage = activePage.nextElementSibling;
// //           if (!nextPage) {
// //             console.error("error");
// //           return;
// //         }
// //         activePage.classList.remove("active");
// //         nextPage.classList.add("active");
// //         goToPage(currentPage + 1);
// //       }
// //     });
// //   })
// //   .catch(error => {
// //     console.error("error");
// //   });

// function generatePagination(items) {
//   const paginationContainer = document.querySelector('.pagination__list');
//   const itemsPerPage = 20;
//   let currentPage = 1;

//   if (items.length === 0) {
//     console.error('Brak elementów do paginacji.');
//     return;
//   }

//   const numPages = Math.ceil(items.length / itemsPerPage);
//   const prevButton = createPaginationButton(
//     'pagination__item-button',
//     'pagination__icon-arrow pagination__icon-arrow--left',
//     'images/arrows.svg#icon-arrow-left2',
//   );
//   const nextButton = createPaginationButton(
//     'pagination__item-button',
//     'pagination__icon-arrow pagination__icon-arrow--right',
//     'images/arrows.svg#icon-arrow-right2',
//   );

//   paginationContainer.appendChild(prevButton);
//   paginationContainer.appendChild(nextButton);

//   for (let i = 1; i <= numPages; i++) {
//     const pageButton = document.createElement('li');
//     pageButton.className = 'pagination__item';
//     pageButton.innerHTML = `<span>${i}</span>`;
//     paginationContainer.insertBefore(pageButton, paginationContainer.lastElementChild);
//   }

//   function goToPage(page) {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;

//     response.results.forEach((movie, index) => {
//       const movieDiv = document.querySelector(`.movie-container__card:nth-child(${index + 1})`);
//       if (index >= startIndex && index < endIndex) {
//         movieDiv.style.display = 'block';
//       } else {
//         movieDiv.style.display = 'none';
//       }
//     });
//   }

//   goToPage(currentPage);

//   const pageButtons = Array.from(
//     document.querySelectorAll('.pagination__item:not(.pagination__item-button)'),
//   );
//   if (pageButtons.length > 0) {
//     pageButtons.forEach((button, index) => {
//       button.addEventListener('click', () => {
//         currentPage = index + 1;
//         goToPage(currentPage);
//       });
//     });
//   }

//   if (prevButton) {
//     prevButton.addEventListener('click', () => {
//       if (currentPage > 1) {
//         currentPage--;
//         goToPage(currentPage);
//       }
//     });
//   }

//   if (nextButton) {
//     nextButton.addEventListener('click', () => {
//       if (currentPage < numPages) {
//         currentPage++;
//         goToPage(currentPage);
//       }
//     });
//   }
// }

// // Funkcja do tworzenia przycisków paginacji
// function createPaginationButton(className, iconClass, iconHref) {
//   const button = document.createElement('li');
//   button.className = `pagination__item ${className}`;
//   button.innerHTML = `<svg class="${iconClass}" width="16" height="16"><use href="${iconHref}"></use></svg>`;
//   return button;
// }
