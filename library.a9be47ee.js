let e,t;function a(){e.removeChild(t),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&a()}function n(e){e.target===t&&a()}function o(o,d){e=document.querySelector(".movie-container"),(t=document.createElement("div")).classList.add("backdrop");let s={id:o.id,title:o.title||o.name,poster_path:o.poster_path,vote_average:o.vote_average,vote_count:o.vote_count,popularity:Math.floor(o.popularity),original_name:o.original_name,release_date:o.release_date||o.first_air_date,overview:o.overview,genre_ids:o.genre_ids},l=Array.isArray(o.genre_ids)?o.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[],r=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg";t.innerHTML=` 
        <div id="modal" class="modal">
          <button id="close-modal-btn" type="button" class="modal__close">&times;</button>
          <img src="${r}" alt="${o.title||o.name} Poster" class="modal__image" />
          <div class="modal__text">
            <h3 class="modal__title">${o.title||o.name}</h3>
            <div class="modal__info">
              <p class="modal__info__category">Vote / Votes</p>
              <p class="modal__info__details">
                <span class="modal__info__details__ranking">${s.vote_average.toFixed(1)}</span>
                <span class="modal__info__category"> / </span>
                <span>${s.vote_count}</span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Popularity</p>
              <p class="modal__info__details">${s.popularity}</p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Original Title</p>
              <p class="modal__info__details">
                <span>${o.title||o.name}<span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Genre</p>
              <p class="modal__info__details">${l.join(", ")}</p>
            </div>
            <article class="modal__description">ABOUT
              
              <p class="modal__description__text">${s.overview}</p>
            </article>
            <div class="modal__buttons">
              <button id="watched-btn" >ADD TO WATCHED</button>
              <button id="queue-btn">ADD TO QUEUE</button>
            </div>
          </div>
        </div>`,e.appendChild(t);let c=document.getElementById("close-modal-btn");c.addEventListener("click",a);let m=document.getElementById("watched-btn");m.addEventListener("click",function(){let e=localStorage.getItem("watchedMovies"),t=e?JSON.parse(e):[],a=t.some(e=>e.id===s.id);a||(t.push(s),localStorage.setItem("watchedMovies",JSON.stringify(t)))});let _=document.getElementById("queue-btn");_.addEventListener("click",function(){let e=localStorage.getItem("queuedMovies"),t=e?JSON.parse(e):[],a=t.some(e=>e.id===s.id);a||(t.push(s),localStorage.setItem("queuedMovies",JSON.stringify(t)))}),document.addEventListener("keydown",i),t.addEventListener("click",n),e.appendChild(t)}const d=[{id:12,name:"Adventure"},{id:14,name:"Fantasy"},{id:16,name:"Animation"},{id:18,name:"Drama"},{id:27,name:"Horror"},{id:28,name:"Action"},{id:35,name:"Comedy"},{id:36,name:"History"},{id:37,name:"Western"},{id:53,name:"Thriller"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:878,name:"Science Fiction"},{id:9648,name:"Mystery"},{id:10402,name:"Music"},{id:10749,name:"Romance"},{id:10751,name:"Family"},{id:10752,name:"War"},{id:10770,name:"TV Movie"}],s=document.getElementById("library"),l="https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg";let r=1,c=1;function m(e){let t=localStorage.getItem("watchedMovies"),a=JSON.parse(t);if(t){let t=(e-1)*6,i=t+6,n=a.slice(t,i);if(n.forEach(e=>{let t=document.createElement("div");t.classList.add("movie-container__card"),t.addEventListener("click",function(){o(e,d)});let a=Array.isArray(e.genre_ids)?e.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[],i=e.release_date,n=i?i.slice(0,4):e.first_air_date?e.first_air_date.slice(0,4):"";t.innerHTML=`
        <div class="movie-container__image-box">
          <img src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:l}" alt="${e.title||e.name} Poster" class="movie-container__image">
        </div>
        <p class="movie-container__movie-description">
          <h2 class="movie-container__title">${e.title||e.name}</h2>
          <span class="movie-container__genre">${a.join(", ")} | </span>
          <span class="movie-container__screening">${n}</span>
          <span class="movie-container__rating-display">${e.vote_average.toFixed(1)}</span>
        </p>
      `,s.appendChild(t)}),a.length>i){let e=p("load-more-watched");s.appendChild(e)}}else{let e=document.createElement("p");e.textContent="No movies in the watched.",s.appendChild(e)}}function _(e){let t=localStorage.getItem("queuedMovies"),a=JSON.parse(t);if(t){let t=(e-1)*6,i=t+6,n=a.slice(t,i);if(n.forEach(e=>{let t=document.createElement("div");t.classList.add("movie-container__card"),t.addEventListener("click",function(){o(e,d)});let a=Array.isArray(e.genre_ids)?e.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[],i=e.release_date,n=i?i.slice(0,4):e.first_air_date?e.first_air_date.slice(0,4):"";t.innerHTML=`
           <div class= movie-container__image-box>
              <img src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:l}" alt="${e.title||e.name} Poster" class="movie-container__image">
           </div>
            <p class="movie-container__movie-description">
              <h2 class="movie-container__title">${e.title||e.name}</h2>
              <span class="movie-container__genre">${a.join(", ")} | </span>
              <span class="movie-container__screening">${n}</span>
              <span class="movie-container__rating-display">${e.vote_average.toFixed(1)}</span>
            </p>
          `,s.appendChild(t)}),a.length>i){let e=p("load-more-queued");s.appendChild(e)}}else{let e=document.createElement("p");e.textContent="No movies in the queue.",s.appendChild(e)}}function p(e){let t=document.createElement("button");return t.id=e,t.textContent="Load More",t.addEventListener("click",function(){"load-more-watched"===e?function(){let e=document.getElementById("load-more-watched");e.remove(),m(++r)}():"load-more-queued"===e&&function(){let e=document.getElementById("load-more-queued");e.remove(),_(++c)}()}),t}const v=document.getElementById("library-watched"),u=document.getElementById("library-queued");v.addEventListener("click",function(){r=1,s.innerHTML="",m(r)}),u.addEventListener("click",function(){c=1,s.innerHTML="",_(c)});
//# sourceMappingURL=library.a9be47ee.js.map
