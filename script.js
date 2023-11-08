localStorage.setItem('tempDate', JSON.stringify('empty'));
localStorage.setItem('tempTheater', JSON.stringify('empty'));
localStorage.setItem('tempTime', JSON.stringify('empty'));
localStorage.setItem('tempSeats', JSON.stringify([]));
if (!localStorage.getItem('allTicketAry')) {
  localStorage.setItem('allTicketAry', JSON.stringify([]));
}
localStorage.setItem('SelectedmovieName', JSON.stringify(''));
localStorage.setItem('homeBadgeCount', JSON.stringify('1'));
let flag = 0;
function locationSelect(e) {
  if (e.target.value == 'auto') {
    findLocation();
  } else {
    localStorage.setItem('location', JSON.stringify(e.target.value));
  }
}

$('.carousel .carousel-item').each(function () {
  var minPerSlide = 4;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});

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
  $('.icon-badge').css('display', 'none');

  const locc = document.querySelector('.location');
  locc.selectedIndex = 0;
  if (true) {
    localStorage.setItem('T1', JSON.stringify([]));
    localStorage.setItem('T2', JSON.stringify([]));
    localStorage.setItem('T3', JSON.stringify([]));

    let ary = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10'];
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
    ];
    localStorage.setItem('names', JSON.stringify(ary));
    sessionStorage.setItem('clickedMovieId', JSON.stringify(''));
  }
  const homeBadge = Number(JSON.parse(localStorage.getItem('homeBadgeCount')));
  const localBadge = Number(JSON.parse(localStorage.getItem('bookBadgeCount')));
  console.log(homeBadge, localBadge);
  if (homeBadge != localBadge) {
    $('.icon-badge').text('');
    $('.icon-badge').css('display', 'block');
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
function updateNotifTickets() {
  const notifDiv = document.getElementById('notif-div');
  const localTicketAry = JSON.parse(localStorage.getItem('allTicketAry'));
  for (let i = 0; i < localTicketAry.length; i++) {
    notifDiv.innerHTML += `<div class="tic" id="ticket${i}" onClick="notification();" style="cursor: pointer;">movie: ${localTicketAry[i]['name']}</div>`;
  }
  //update badge
  $(function () {
    // $('.icon-badge').text(localTicketAry.length);
  });
}
updateNotifTickets();
movieAry.forEach((element) => {
  const mainBar = document.querySelector('.main-bar');
  const div = document.createElement('div');
  const div2 = document.createElement('div');
  const img = document.createElement('img');
  const a = document.createElement('a');
  const h1 = document.createElement('H1');
  const p = document.createElement('P');
  div.className = 'card';
  div2.className = 'card-body';
  img.className = 'img-fluid movie-img';
  img.src = `movies-img/${element}.jpg`;
  h1.className = 'card-title movie-name';
  h1.innerText = nameary[i];
  i++;
  p.className = 'card-text';
  p.innerHTML = '<b>L</b>';
  p.append(
    ' orem ipsumf do lor sit siius amet, codd d nsects etur adipisicing elit. Harum .'
  );
  a.className = 'book-tic-lnk';
  a.href = 'bookPage.html';
  a.innerText = 'Book Ticket';
  a.id = String(movieId);
  movieId = movieId + 1;
  div.appendChild(img);
  div2.appendChild(h1);
  div2.appendChild(p);
  div2.appendChild(a);
  div.appendChild(div2);
  mainBar.appendChild(div);
});
////////////////////////////////
function closed(e) {
  if (!(e.target.className == 'fa-regular fa-bell n2')) {
    const elm = document.getElementById('notif-div');
    $(elm).slideUp(150);
    flag = 0;
  }
}
document.addEventListener('click', closed);
///////////////////////////////////
function clicked(e) {
  const clickedMovieId = e.target.id;
  const i = JSON.stringify(clickedMovieId);
  const x = e.target.id;
  sessionStorage.setItem('clickedMovieId', i);
  localStorage.setItem(
    'SelectedmovieName',
    JSON.stringify(e.target.parentElement.firstElementChild.innerText)
  );
  localStorage.setItem('homeBadgeCount', JSON.stringify('1'));
  // console.log(e.target.className);
  if (e.target.className == 'search-form') {
    e.target.preventDefault();
  }
}
const bookTicket = document.querySelector('.main-bar');
bookTicket.addEventListener('click', clicked);
///////////////////
function keypressed(e) {
  if (e.target.id == 'search-box') {
    let value = e.target.value;
    let movieNamelst = document.querySelectorAll('.movie-name');
    movieNamelst.forEach((item) => {
      let txt = item.innerText;
      txt = txt.toLowerCase();
      value = value.toLowerCase();
      if (!txt.includes(value)) {
        item.parentElement.parentElement.style.display = 'none';
      } else {
        item.parentElement.parentElement.style.display = 'flex';
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

function move() {
  $(function () {
    const navButtons = document.querySelector('#prev-button');
    console.log($(navButtons));
    if (navButtons.style.top == '240px') {
      avButtons.style.top = '300px';
    }
  });
}
reset.addEventListener('keypress', resetfun);

const notif = document.getElementById('notif-icon');

function notiff(e) {
  $('.icon-badge').css('display', 'none');
  localStorage.setItem('bookBadgeCount', JSON.stringify('1'));
  if (flag == 0) {
    const elm = document.getElementById('notif-div');
    $(elm).slideDown(150);
    flag++;
  } else {
    const elm = document.getElementById('notif-div');
    $(elm).slideUp(150);
    flag--;
  }
}
notif.addEventListener('click', notiff);
$(document).ready(function () {
  $('#myCarousel').carousel({
    interval: 2800, // Set the interval to 5000 milliseconds (5 seconds)
  });
});

function findLocation() {
  let latitude = 0;
  let longitude = 0;

  navigator.geolocation.getCurrentPosition(
    function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.display_name) {
            data.display_name.split(',').forEach((item) => {
              if (item.toLowerCase().includes('istrict')) {
                localStorage.setItem(
                  'location',
                  JSON.stringify(item.trim().split(' ')[0])
                );
                // $(function () {
                //   $('.location').delay(3000);
                // });
                const s = document.querySelector('.location');
                s.options[0].innerText = item.trim().split(' ')[0];
                // console.log(s.options[0].innerText);
                const loccc = document.querySelector('.location');
                loccc.selectedIndex = 0;
              }
            });
          } else {
            console.log('Location not found');
          }
        })
        .catch((error) => console.error('Error:', error));
    },
    function (error) {
      console.error('Error getting geolocation: ' + error.message);
    }
  );
}
