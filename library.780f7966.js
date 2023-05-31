let e,t;function a(){e.removeChild(t),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&a()}function i(e){e.target===t&&a()}function o(o,d){e=document.querySelector(".movie-container"),(t=document.createElement("div")).classList.add("backdrop");let l={id:o.id,title:o.title||o.name,poster_path:o.poster_path,vote_average:o.vote_average,vote_count:o.vote_count,popularity:Math.floor(o.popularity),original_name:o.original_name,release_date:o.release_date||o.first_air_date,overview:o.overview,genre_ids:o.genre_ids},s=Array.isArray(o.genre_ids)?o.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[];t.innerHTML=` 
        <div id="modal" class="modal">
          <button id="close-modal-btn" type="button" class="modal__close">&times;</button>
          <img src="https://image.tmdb.org/t/p/w500${o.poster_path}" alt="${o.title||o.name} Poster" class="modal__image" />
          <div class="modal__text">
            <h3 class="modal__title">${o.title||o.name}</h3>
            <div class="modal__info">
              <p class="modal__info__category">Vote / Votes</p>
              <p class="modal__info__details">
                <span class="modal__info__details__ranking">${l.vote_average.toFixed(1)}</span>
                <span class="modal__info__category"> / </span>
                <span>${l.vote_count}</span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Popularity</p>
              <p class="modal__info__details">${l.popularity}</p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Original Title</p>
              <p class="modal__info__details">
                <span>${o.title||o.name}<span>
              </p>
            </div>
            <div class="modal__info">
              <p class="modal__info__category">Genre</p>
              <p class="modal__info__details">${s.join(", ")}</p>
            </div>
            <article class="modal__description">ABOUT
              
              <p class="modal__description__text">${l.overview}</p>
            </article>
            <div class="modal__buttons">
              <button id="watched-btn" >ADD TO WATCHED</button>
              <button id="queue-btn">ADD TO QUEUE</button>
            </div>
          </div>
        </div>`,e.appendChild(t);let r=document.getElementById("close-modal-btn");r.addEventListener("click",a);let c=document.getElementById("watched-btn");c.addEventListener("click",function(){let e=localStorage.getItem("watchedMovies"),t=e?JSON.parse(e):[],a=t.some(e=>e.id===l.id);a||(t.push(l),localStorage.setItem("watchedMovies",JSON.stringify(t)))});let m=document.getElementById("queue-btn");m.addEventListener("click",function(){let e=localStorage.getItem("queuedMovies"),t=e?JSON.parse(e):[],a=t.some(e=>e.id===l.id);a||(t.push(l),localStorage.setItem("queuedMovies",JSON.stringify(t)))}),document.addEventListener("keydown",n),t.addEventListener("click",i),e.appendChild(t)}const d=[{id:12,name:"Adventure"},{id:14,name:"Fantasy"},{id:16,name:"Animation"},{id:18,name:"Drama"},{id:27,name:"Horror"},{id:28,name:"Action"},{id:35,name:"Comedy"},{id:36,name:"History"},{id:37,name:"Western"},{id:53,name:"Thriller"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:878,name:"Science Fiction"},{id:9648,name:"Mystery"},{id:10402,name:"Music"},{id:10749,name:"Romance"},{id:10751,name:"Family"},{id:10752,name:"War"},{id:10770,name:"TV Movie"}],l=document.getElementById("library"),s="https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg";let r=1,c=1;function m(e){let t=localStorage.getItem("watchedMovies"),a=JSON.parse(t);if(t){let t=(e-1)*6,n=t+6,i=a.slice(t,n);if(i.forEach(e=>{let t=document.createElement("div");t.classList.add("movie-container__card"),t.addEventListener("click",function(){o(e,d)});let a=Array.isArray(e.genre_ids)?e.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[],n=e.release_date,i=n.length>0?n.slice(0,4):"";t.innerHTML=`
        <div class="movie-container__image-box">
          <img src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:s}" alt="${e.title||e.name} Poster" class="movie-container__image">
        </div>
        <p class="movie-container__movie-description">
          <h2 class="movie-container__title">${e.title||e.name}</h2>
          <span class="movie-container__genre">${a.join(", ")} | </span>
          <span class="movie-container__screening">${i}</span>
          <span class="movie-container__rating-display">${e.vote_average.toFixed(1)}</span>
        </p>
      `,l.appendChild(t)}),a.length>n){let e=p("load-more-watched");l.appendChild(e)}}else{let e=document.createElement("p");e.textContent="No movies in the watched.",l.appendChild(e)}}function _(e){let t=localStorage.getItem("queuedMovies"),a=JSON.parse(t);if(t){let t=(e-1)*6,n=t+6,i=a.slice(t,n);if(i.forEach(e=>{let t=document.createElement("div");t.classList.add("movie-container__card"),t.addEventListener("click",function(){o(e,d)});let a=Array.isArray(e.genre_ids)?e.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[],n=e.release_date,i=n.length>0?n.slice(0,4):"";t.innerHTML=`
           <div class= movie-container__image-box>
              <img src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:s}" alt="${e.title||e.name} Poster" class="movie-container__image">
           </div>
            <p class="movie-container__movie-description">
              <h2 class="movie-container__title">${e.title||e.name}</h2>
              <span class="movie-container__genre">${a.join(", ")} | </span>
              <span class="movie-container__screening">${i}</span>
              <span class="movie-container__rating-display">${e.vote_average.toFixed(1)}</span>
            </p>
          `,l.appendChild(t)}),a.length>n){let e=p("load-more-queued");l.appendChild(e)}}else{let e=document.createElement("p");e.textContent="No movies in the queue.",l.appendChild(e)}}function p(e){let t=document.createElement("button");return t.id=e,t.textContent="Load More",t.addEventListener("click",function(){"load-more-watched"===e?function(){let e=document.getElementById("load-more-watched");e.remove(),m(++r)}():"load-more-queued"===e&&function(){let e=document.getElementById("load-more-queued");e.remove(),_(++c)}()}),t}const v=document.getElementById("library-watched"),u=document.getElementById("library-queued");v.addEventListener("click",function(){r=1,l.innerHTML="",m(r)}),u.addEventListener("click",function(){c=1,l.innerHTML="",_(c)});
//# sourceMappingURL=library.780f7966.js.map
