export { createModal, closeModal };

function createModal(movie) {
  const main = document.querySelector('.movie-container');
  const backDrop = document.createElement('div');
  backDrop.classList.add('backdrop');

  const modalData = {
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    popularity: Math.floor(movie.popularity),
    original_title: movie.original_title,
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
          <div id="modal-text" class="modal__text">
            <h3 id="modal-title" class="modal__title"></h3>
            <div class="modal__info">
              <p class="modal__info__category">Vote / Votes</p>
              <p class="modal__info__details">
                <span class="modal__info__details__ranking">${modalData.vote_average}</span>
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
                <span>${modalData.original_title}<span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Genre</p>
              <p class="modal__info__details">${genres}</p>
            </div>
            <article class="modal__description">
              <p id="modal-description__modal">ABOUT</p>
              <p id="modal-decription">${modalData.overview}</p>
            </article>
            <div class="modal__buttons">
              <button id="watched-btn" class="button button--modal">ADD TO WATCHED</button>
              <button id="queue-btn" class="button button--modal">ADD TO QUEUE</button>
            </div>
          </div>
        </div>`;

      main.appendChild(backDrop);

      const closeModal = document.getElementById('close-modal-btn');
      closeModal.addEventListener('click', function () {
        main.removeChild(backDrop);
      });

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
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
