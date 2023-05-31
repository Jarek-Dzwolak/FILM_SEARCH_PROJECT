let e,t,a;function i(){e.removeChild(t),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&i()}function o(e){e.target===t&&i()}function d(a,d){e=document.querySelector(".movie-container"),(t=document.createElement("div")).classList.add("backdrop");let l={id:a.id,title:a.title||a.name,poster_path:a.poster_path,vote_average:a.vote_average,vote_count:a.vote_count,popularity:Math.floor(a.popularity),original_name:a.original_name,release_date:a.release_date||a.first_air_date,overview:a.overview,genre_ids:a.genre_ids},s=Array.isArray(a.genre_ids)?a.genre_ids.map(e=>{let t=d.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[];t.innerHTML=` 
        <div id="modal" class="modal">
          <button id="close-modal-btn" type="button" class="modal__close">&times;</button>
          <img src="https://image.tmdb.org/t/p/w500${a.poster_path}" alt="${a.title||a.name} Poster" class="modal__image" />
          <div class="modal__text">
            <h3 class="modal__title">${a.title||a.name}</h3>
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
                <span>${a.title||a.name}<span>
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
        </div>`,e.appendChild(t);let r=document.getElementById("close-modal-btn");r.addEventListener("click",i);let c=document.getElementById("watched-btn");c.addEventListener("click",function(){let e=localStorage.getItem("watchedMovies"),t=e?JSON.parse(e):[],a=t.some(e=>e.id===l.id);a||(t.push(l),localStorage.setItem("watchedMovies",JSON.stringify(t)))});let m=document.getElementById("queue-btn");m.addEventListener("click",function(){let e=localStorage.getItem("queuedMovies"),t=e?JSON.parse(e):[],a=t.some(e=>e.id===l.id);a||(t.push(l),localStorage.setItem("queuedMovies",JSON.stringify(t)))}),document.addEventListener("keydown",n),t.addEventListener("click",o),e.appendChild(t)}const l=[{id:12,name:"Adventure"},{id:14,name:"Fantasy"},{id:16,name:"Animation"},{id:18,name:"Drama"},{id:27,name:"Horror"},{id:28,name:"Action"},{id:35,name:"Comedy"},{id:36,name:"History"},{id:37,name:"Western"},{id:53,name:"Thriller"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:878,name:"Science Fiction"},{id:9648,name:"Mystery"},{id:10402,name:"Music"},{id:10749,name:"Romance"},{id:10751,name:"Family"},{id:10752,name:"War"},{id:10770,name:"TV Movie"}],s=document.querySelector(".movie-container");document.createElement("div");const r=document.getElementById("Movie-search");async function c(e){e.preventDefault();let t=r.value;isSearching=!0;let i=document.querySelector(".header-wrapper");s.innerHTML="",fallbackImageURL="https://upload.wikimedia.org/wikipedia/commons/5/55/Brak_obrazka.svg";try{let e=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f2bec2f8de04498ca2fd18780a529a31&query=${t}&page=1`);if(!e.ok)throw Error("Search request failed");let n=await e.json();if(0===n.results.length){u(),a&&a.remove(),(a=document.createElement("h3")).id="fail",a.style.color="red",a.style.fontSize="14px",a.style.lineHeight="1.3",a.style.textAlign="center",a.innerHTML="No movies found. Enter the correct movie name.",i.appendChild(a);return}a&&a.remove(),n.results.forEach(e=>{let t=document.createElement("div");t.classList.add("movie-container__card"),t.addEventListener("click",function(){d(e,l)});let a=Array.isArray(e.genre_ids)?e.genre_ids.map(e=>{let t=l.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e):[],i=e.release_date,n=i?i.slice(0,4):e.first_air_date.slice(0,4);t.innerHTML=`
        <div class="movie-container__image-box">
          <img src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:fallbackImageURL}" alt="${e.title||e.name} Poster" class="movie-container__image">
        </div>
        <p class="movie-container__movie-description">
          <h2 class="movie-container__title">${e.title||e.name}</h2>
          <span class="movie-container__genre">${a.join(", ")} | </span>
          <span class="movie-container__screening">${n}</span>
        </p>
      `,s.appendChild(t)})}catch(e){console.error(e)}}const m=document.querySelector(".movie-container");let p=1,_=0;async function u(){let e=document.createElement("div");e.classList.add("backdrop"),m.appendChild(e),e.innerHTML=`<span class="loader-dot loader-dot--one"></span>
	<span class="loader-dot loader-dot--two"></span>
	<span class="loader-dot loader-dot--three"></span>`;try{let e=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=f2bec2f8de04498ca2fd18780a529a31&page=${p}`),t=await e.json();console.log(t),t.results.forEach(e=>{let t=document.createElement("div");t.classList.add("movie-container__card"),t.addEventListener("click",function(){d(e,l,a)});let a=e.genre_ids.map(e=>{let t=l.find(t=>t.id===e);return t?t.name:""}).filter(e=>""!==e),i=e.release_date,n=i?i.slice(0,4):e.first_air_date.slice(0,4);t.innerHTML=`
        <div class="movie-container__image-box">
          <img src="${e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:fallbackImageURL}" alt="${e.title||e.name} Poster" class="movie-container__image">
        </div>
        <p class="movie-container__movie-description">
          <h2 class="movie-container__title">${e.title||e.name}</h2>
          <span class="movie-container__genre">${a.join(", ")} | </span>
          <span class="movie-container__screening">${n}</span>
        </p>
      `,m.appendChild(t)}),_=t.total_pages,function(){let e=document.querySelector(".pagination");if(e){e.innerHTML="";let t=document.createElement("ul");t.classList.add("pagination__list");let a=document.createElement("li");a.classList.add("pagination__item","pagination__item-button");let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.classList.add("pagination__icon-arrow","pagination__icon-arrow--left"),i.setAttribute("width","16px"),i.setAttribute("height","16px"),i.setAttribute("viewBox","0 0 16 16"),i.innerHTML='<path d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z"></path>',a.appendChild(i),t.appendChild(a);let n=Math.max(p-2,1),o=Math.min(n+4,_),d=o<_;if(window.innerWidth>768&&n>1){let e=document.createElement("li");e.classList.add("pagination__item");let a=document.createElement("span");if(a.textContent="1",e.appendChild(a),t.appendChild(e),n>2){let e=document.createElement("li");e.classList.add("pagination__item","pagination__item-dots"),e.textContent="...",t.appendChild(e)}}for(let e=n;e<=o;e++){let a=document.createElement("li");a.classList.add("pagination__item"),e===p&&a.classList.add("active");let i=document.createElement("span");i.textContent=e.toString(),a.appendChild(i),t.appendChild(a)}if(window.innerWidth>768&&d){if(o<_-1){let e=document.createElement("li");e.classList.add("pagination__item","pagination__item-dots"),e.textContent="...",t.appendChild(e)}let e=document.createElement("li");e.classList.add("pagination__item");let a=document.createElement("span");a.textContent=_.toString(),e.appendChild(a),t.appendChild(e)}let l=document.createElement("li");l.classList.add("pagination__item","pagination__item-button");let s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.classList.add("pagination__icon-arrow","pagination__icon-arrow--right"),s.setAttribute("width","16px"),s.setAttribute("height","16px"),s.setAttribute("viewBox","0 0 16 16"),s.innerHTML='<path d="M9.707 13.707l5-5c0.391-0.39 0.391-1.024 0-1.414l-5-5c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3.293 3.293h-9.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h9.586l-3.293 3.293c-0.195 0.195-0.293 0.451-0.293 0.707s0.098 0.512 0.293 0.707c0.391 0.391 1.024 0.391 1.414 0z"></path>',l.appendChild(s),t.appendChild(l),e.appendChild(t),t.addEventListener("click",e=>{let t=e.target;if("SPAN"===t.tagName){let e=parseInt(t.textContent);e>=1&&e<=_&&(p=e,m.innerHTML="",u())}else t===a||t===i?p>1&&(p--,m.innerHTML="",u()):(t===l||t===s)&&p<_&&(p++,m.innerHTML="",u())})}}()}catch(e){console.error(e)}finally{m.removeChild(e)}}u(),document.getElementById("search-button").addEventListener("click",c);
//# sourceMappingURL=index.4c3a9e76.js.map
