function locationSelect(e) {
  localStorage.setItem('location', JSON.stringify(e.target.value));
}
const loc = document.querySelector('.location');
loc.addEventListener('click', locationSelect);
localStorage.setItem('location', JSON.stringify(loc.value)); //setting default location
let movieAry = JSON.parse(localStorage.getItem('movies'));
if (movieAry == null) {
  movieAry = [];
}
let movie_count = movieAry.length;
let movieId = 0;
let nameary = JSON.parse(localStorage.getItem('names'));
let i = 0;
document.addEventListener('DOMContentLoaded', function () {
  if (
    !localStorage.getItem('T1') &&
    !localStorage.getItem('T2') &&
    !localStorage.getItem('T3')
  ) {
    localStorage.setItem('T1', JSON.stringify([]));
    localStorage.setItem('T2', JSON.stringify([]));
    localStorage.setItem('T3', JSON.stringify([]));

    let ary = [
      'm1',
      'm2',
      'm3',
      'm4',
      'm5',
      'm6',
      'm7',
      'm8',
      'm9',
      'm10',
      'm11',
      'm12',
      'm13',
      'm14',
      'm15',
    ];
    localStorage.setItem('movies', JSON.stringify(ary));
    ary = [
      'Winter Wind',
      'Dream Big',
      'Be Optimistic',
      'Lonely Time',
      'This Is Who I Am',
      'Hurricane Winds',
      'Creation Power',
      'Wall-E',
      'Speed of Time',
      'Emptyness',
      'Thank You',
      'Wall Streat Magic',
      'Letters & Words',
      'Fog Man',
      'Annabella 4',
    ];
    localStorage.setItem('names', JSON.stringify(ary));
    sessionStorage.setItem('clickedMovieId', JSON.stringify(''));
  }
});
function notification() {
  window.location.href = 'notification.html';
}
function chengeBannerImage(e) {
  // transform: translateX(-50%);

  if (e.target.id == 'prev-button') {
    const banner = document.querySelector('.advertisement-banner');
    const style = getComputedStyle(banner);
    let matricStr = style['transform'];

    matricStr = matricStr.split(',');
    let newValue = String(Number(matricStr[4]) - 250);
    if (newValue < -1750) {
      newValue = -1750;
    }
    banner.style['transform'] = `matrix(1, 0, 0, 1, ${newValue}, 0)`;
  }
  if (e.target.id == 'next-button') {
    const banner = document.querySelector('.advertisement-banner');
    const style = getComputedStyle(banner);
    let matricStr = style['transform'];

    matricStr = matricStr.split(',');
    let newValue = String(Number(matricStr[4]) + 250);
    if (newValue > -250) {
      newValue = -280;
    }
    banner.style['transform'] = `matrix(1, 0, 0, 1, ${newValue}, 0)`;
  }
}
movieAry.forEach((element) => {
  const mainBar = document.querySelector('.main-bar');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const a = document.createElement('a');
  const h1 = document.createElement('H1');
  const p = document.createElement('P');
  div.className = 'movie-cell';
  img.className = 'movie-img';
  img.src = `movies-img/${element}.jpg`;
  h1.className = 'movie-name';
  h1.innerText = nameary[i];
  i++;
  p.innerHTML = '<b>N</b>';
  p.append(
    'ost rum dolk orum, l abo re mini ma sim ilique sapienteitaque soluta consectetur!'
  );
  a.className = 'book-tic-lnk';
  a.href = 'bookPage.html';
  a.innerText = 'Book Ticket';
  a.id = String(movieId);
  movieId = movieId + 1;
  div.appendChild(img);
  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(a);
  mainBar.appendChild(div);
});
///////////////////////////////////
function clicked(e) {
  const clickedMovieId = e.target.id;
  const i = JSON.stringify(clickedMovieId);
  sessionStorage.setItem('clickedMovieId', i);
  console.log(e.target.className);
  if (e.target.className == 'search-form') {
    e.target.preventDefault();
  }
}
const bookTicket = document.querySelector('.main-bar');
bookTicket.addEventListener('click', clicked);
///////////////////
function keypressed(e) {
  if (e.target.className == 'search-box') {
    let value = e.target.value;
    let movieNamelst = document.querySelectorAll('.movie-name');
    movieNamelst.forEach((item) => {
      let txt = item.innerText;
      txt = txt.toLowerCase();
      value = value.toLowerCase();
      if (!txt.includes(value)) {
        item.parentElement.style.display = 'none';
      } else {
        item.parentElement.style.display = 'flex';
      }
    });
  }
}
const search = document.querySelector('.search-box');
search.addEventListener('input', keypressed);
function hide() {
  const side = document.querySelector('.side-bar');
  side.classList.toggle('hide');
}
const reset = document.querySelector('body');
function resetfun(e) {
  if (e.key == 'Enter' && e.shiftKey == true) {
    localStorage.setItem('T1', JSON.stringify([]));
    localStorage.setItem('T2', JSON.stringify([]));
    localStorage.setItem('T3', JSON.stringify([]));
    localStorage.removeItem('T1');
    localStorage.removeItem('T2');
    localStorage.removeItem('T3');
    localStorage.removeItem('n');
    localStorage.removeItem('names');
    localStorage.removeItem('movies');
  }
}

reset.addEventListener('keypress', resetfun);
const nextPrev1 = document.querySelector('#prev-button');
nextPrev1.addEventListener('click', chengeBannerImage);
const nextPrev2 = document.querySelector('#next-button');
nextPrev2.addEventListener('click', chengeBannerImage);
