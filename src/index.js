// import './sass/main.scss';

fetch(
  'https://api.themoviedb.org/3/trending/all/day?api_key=f2bec2f8de04498ca2fd18780a529a31&page=2',
)
  .then(response => response.json())
  .then(response => {
    const resultDiv = document.getElementById('favorites-list');
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
