export { createModal, closeModal };

let main; // Zmienna globalna
let backDrop; // Zmienna globalna

function closeModal() {
  main.removeChild(backDrop);
  document.removeEventListener('keydown', closeModalOnEsc);
}

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModalOnClick(event) {
  if (event.target === backDrop) {
    closeModal();
  }
}

function createModal(movie) {
  main = document.querySelector('.movie-container'); // Przypisanie wartości do zmiennej globalnej
  backDrop = document.createElement('div'); // Przypisanie wartości do zmiennej globalnej
  backDrop.classList.add('backdrop');

  const modalData = {
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    popularity: Math.floor(movie.popularity),
    original_name: movie.original_name,
    release_date: movie.release_date,
    overview: movie.overview,
  };

  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';

  // Pobierz gatunki filmowe dla danego filmu
  fetch(
    `https://api.themoviedb.org/3/movie/${modalData.id}?api_key=${apiKey}&append_to_response=genres`,
  )
    .then(response => response.json())
    .then(movieResponse => {
      const genres = movieResponse.genres.map(genre => genre.name).join(', ');

      backDrop.innerHTML = ` 
        <div id="modal" class="modal">
          <button id="close-modal-btn" type="button" class="modal__close">&times;</button>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title || movie.name
      } Poster" class="modal__image" />
          <div class="modal__text">
            <h3 class="modal__title">${movie.title || movie.name}</h3>
            <div class="modal__info">
              <p class="modal__info__category">Vote / Votes</p>
              <p class="modal__info__details">
                <span class="modal__info__details__ranking">${modalData.vote_average.toFixed(
                  1,
                )}</span>
                <span class="modal__info__category"> / </span>
                <span>${modalData.vote_count}</span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Popularity</p>
              <p class="modal__info__details">${modalData.popularity}</p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Original Title</p>
              <p class="modal__info__details">
                <span>${modalData.original_name}<span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Genre</p>
              <p class="modal__info__details">${genres}</p>
            </div>
            <article class="modal__description">ABOUT
              
              <p class="modal__description__text">${modalData.overview}</p>
            </article>
            <div class="modal__buttons">
              <button id="watched-btn" >ADD TO WATCHED</button>
              <button id="queue-btn">ADD TO QUEUE</button>
            </div>
          </div>
        </div>`;

      main.appendChild(backDrop);

      const closeModalBtn = document.getElementById('close-modal-btn');
      closeModalBtn.addEventListener('click', closeModal);

      // const closeModal = document.getElementById('close-modal-btn');
      // closeModal.addEventListener('click', function () {
      //   main.removeChild(backDrop);
      // });

      const watchedBtn = document.getElementById('watched-btn');
      watchedBtn.addEventListener('click', function () {
        const storedData = localStorage.getItem('watchedMovies');
        let watchedMovies = storedData ? JSON.parse(storedData) : [];
        const movieExists = watchedMovies.some(m => m.id === modalData.id);

        if (!movieExists) {
          watchedMovies.push(modalData);
          localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        }
      });

      const queueBtn = document.getElementById('queue-btn');
      queueBtn.addEventListener('click', function () {
        const storedData = localStorage.getItem('queuedMovies');
        let queuedMovies = storedData ? JSON.parse(storedData) : [];
        const movieExists = queuedMovies.some(m => m.id === modalData.id);

        if (!movieExists) {
          queuedMovies.push(modalData);
          localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
        }
      });

      document.addEventListener('keydown', closeModalOnEsc);
      backDrop.addEventListener('click', closeModalOnClick);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
