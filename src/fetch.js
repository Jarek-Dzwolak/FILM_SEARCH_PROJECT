const fetch = require('node-fetch');

export const fetchFavorites = () => {
  const accountId = '19534877';
  const apiKey = 'f2bec2f8de04498ca2fd18780a529a31';
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&language=en-US&page=1&sort_by=created_at.asc`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
};
