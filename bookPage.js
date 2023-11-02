// // add date array to Local storage
// const dateAry = ['20', '21', '22', '23', '24', '25', '26', '27', '28'];
// localStorage.setItem('dates', JSON.stringify(dateAry));
// //add month array to local storage
// const monthAry = [
//   'OCT',
//   'OCT',
//   'OCT',
//   'OCT',
//   'OCT',
//   'OCT',
//   'OCT',
//   'OCT',
//   'OCT',
// ];
// localStorage.setItem('months', JSON.stringify(monthAry));
// //add location adn their theaters and time as 2d array
// const data = {
//   'kollam': {
//     'theater': ['Revathy', 'Archana', 'PVR', 'Pranav', 'PVR-2'],
//     'time': ['10:00 Am', '11:30 Am', '12:30 Am', '01:40 Pm', '03:00 Pm'],
//   },
//   'trivandrum': {
//     'theater': [
//       'Wonder',
//       'PVR-3',
//       'Pranavam',
//       'PVR-4',
//       'Revathy-2',
//       'Aradhana',
//     ],
//     'time': [
//       '10:00 Am',
//       '11:30 Am',
//       '12:30 Am',
//       '01:40 Pm',
//       '03:00 Pm',
//       '01:40 Pm',
//       '03:00 Pm',
//     ],
//   },
//   'kochi': {
//     'theater': ['Pranavam', 'JBL', 'PVR-5', 'Clarity', 'Crystal'],
//     'time': ['10:00 Am', '11:30 Am', '12:30 Am'],
//   },
// };
// localStorage.setItem('data', JSON.stringify(data));
localStorage.setItem('tempDate', JSON.stringify('empty'));
localStorage.setItem('tempTheater', JSON.stringify('empty'));
localStorage.setItem('tempTime', JSON.stringify('empty'));
localStorage.setItem('tempSeats', JSON.stringify([]));
// localStorage.setItem('allTicketAry', JSON.stringify([]));
////
////
let currentTheater = '';
let currentTime = '';
let currentSeats = [];
let currentDay = '';
function readFromLocal(key) {
  const ary = localStorage.getItem(key);
  return JSON.parse(ary);
}

function makeTheaterGrid(location) {
  const dataAry = readFromLocal('data');
  currentLocationObj = dataAry[location];
  currentTheaterAry = currentLocationObj['theater'];
  currentTheaterAry.forEach((theaterName) => {
    const divStr = `<div class="theater" id="${theaterName}">${theaterName}</div>`;
    $('.theater-div').append(divStr);
  });
}

function makeTimeGrid(location) {
  const dataAry = readFromLocal('data');
  currentLocationObj = dataAry[location];
  currentTimeAry = currentLocationObj['time'];
  currentTimeAry.forEach((time) => {
    let t = time.replace(' ', '-');
    t = t.replace(':', '-');
    // console.log(t);
    const divStr = `<div class="time ${t}" >${time}</div>`;
    $('.time-div').append(divStr);
  });
}

function makeRowNumberGrid() {
  let m = 10;
  for (let i = 0; i < 14; i++) {
    $('.row').append(`<div class="row-number">${m}</div>`);
    m++;
  }
}

function makeSeatGridColumn(index, m) {
  for (let i = 0; i < 84; i++) {
    $(`.seat-grid:eq(${index})`).append(`<div class="seat"></div>`);
  }
  for (let i = 0; i < 6; i++) {
    m++;
    $(`.seat-grid:eq(${index})`).append(`<div class="seat-num">${m}</div>`);
  }
  return m;
}

function makeSeatGrid() {
  makeRowNumberGrid();
  let m = 10;
  m = makeSeatGridColumn(0, m);
  m = makeSeatGridColumn(1, m);
  m = makeSeatGridColumn(2, m);
}

function giveIdToSeats() {
  const allSeats = $('.seat ,.seat-num');
  const length = allSeats.length;
  let index = 0;
  for (let i = 10; i <= 23; i++) {
    for (let j = 11; j <= 28; j++) {
      allSeats.eq(index).prop('id', `${String(i) + String(j)}`);
      index++;
    }
  }
}

//read dates array from local storage
const dateAry = readFromLocal('dates');
//read month from local storage
const monthAry = readFromLocal('months');
//read location from local storage
const loc = readFromLocal('location');

$(function () {
  //make date grid
  for (let i = 0; i < dateAry.length; i++) {
    let div = $('<div>');
    let p1 = $('<p>');
    let p2 = $('<p>');
    div.addClass('date');
    p1.addClass('month');
    p1.text(monthAry[i]);
    p2.addClass('day');
    p2.text(dateAry[i]);
    p2.attr('id', `${loc + monthAry[i] + dateAry[i]}`);
    div.append(p1);
    div.append(p2);
    $('.date-div').append(div);
  }
  makeTheaterGrid(loc);
  makeTimeGrid(loc);
  makeSeatGrid();
  giveIdToSeats();
});
//event handling
function dateClicked(e) {
  const target = e.currentTarget;
  const month = $($(target).children()[0]).text();
  const day = $($(target).children()[1]).text();
  const tempTheater = JSON.parse(localStorage.getItem('tempTheater'));
  const id = loc + month + day;
  if (tempTheater == 'empty') {
    if (JSON.parse(localStorage.getItem('tempDate')) != id) {
      $($(target).children()[1]).css('backgroundColor', 'lightGreen');
      currentDay = $($(target).children()[1]).text();
      const tempDate = '#' + JSON.parse(localStorage.getItem('tempDate'));
      localStorage.setItem('tempDate', JSON.stringify(id));
      $(`${tempDate}`).css('backgroundColor', 'white');
    } else {
      localStorage.setItem('tempDate', JSON.stringify('empty'));
      $($(target).children()[1]).css('backgroundColor', 'white');
    }
  }
}

function theaterClicked(e) {
  const target = e.currentTarget;
  const theaterName = $(target).text();
  const tempTime = JSON.parse(localStorage.getItem('tempTime'));
  const tempDate = JSON.parse(localStorage.getItem('tempDate'));
  if (tempDate != 'empty' && tempTime == 'empty') {
    const id = tempDate + theaterName;
    if (JSON.parse(localStorage.getItem('tempTheater')) != id) {
      $(target).css('backgroundColor', 'lightGreen');
      $(target).attr('id', id);
      currentTheater = $(target).text();
      const tempTheater = '#' + JSON.parse(localStorage.getItem('tempTheater'));
      localStorage.setItem('tempTheater', JSON.stringify(id));
      $(`${tempTheater}`).css('backgroundColor', 'white');
    } else {
      localStorage.setItem('tempTheater', JSON.stringify('empty'));
      $(target).css('backgroundColor', 'white');
    }
  }
}
function timeClicked(e) {
  const target = e.currentTarget;
  const time = $(target).attr('class').split(' ')[1];
  const tempTheater = JSON.parse(localStorage.getItem('tempTheater'));
  const tempTime = JSON.parse(localStorage.getItem('tempTime'));
  if (tempTheater != 'empty') {
    const id = tempTheater + time;
    if (JSON.parse(localStorage.getItem('tempTime')) != id) {
      // console.log(JSON.parse(localStorage.getItem('tempTime')), id);
      $(target).css('backgroundColor', 'lightGreen');
      $(target).attr('id', id);
      currentTime = $(target).text();
      const tempLocalTime = '#' + JSON.parse(localStorage.getItem('tempTime'));
      $(`${tempLocalTime}`).css('backgroundColor', 'White');
      // console.log($(target).prev().attr('id'));
      // console.log($('.time-div').find('#kollamOCT22Revathy1000-Am'));
      localStorage.setItem('tempTime', JSON.stringify(id));
    } else {
      localStorage.setItem('tempTime', JSON.stringify('empty'));
      $(target).css('backgroundColor', 'white');
    }
  }
}
// function hover1(e) {
//   $(e.target).css('backgroundColor', 'rgb(0, 156, 0)');
//   $(e.target).css('color', 'white');
// }
// function hover2(e) {
//   $(e.target).css('backgroundColor', 'white');
//   $(e.target).css('color', 'black');
// }
// let tempSelectedSeats = [];
function priceUpdate() {
  const tempSeats = JSON.parse(localStorage.getItem('tempSeats'));
  const count = tempSeats.length;
  const price = 270 * count;
  $('.price').text(`Total Price :${price} /-`);
}
function seatSelected(e) {
  if (JSON.parse(localStorage.getItem('tempTime')) != 'empty') {
    function write(id) {
      let tempSeats = JSON.parse(localStorage.getItem('tempSeats'));
      tempSeats.push(id);
      localStorage.setItem('tempSeats', JSON.stringify(tempSeats));
      priceUpdate();
    }
    function del(id) {
      let tempSeats = JSON.parse(localStorage.getItem('tempSeats'));
      tempSeats.splice(tempSeats.indexOf(id), 1);
      localStorage.setItem('tempSeats', JSON.stringify(tempSeats));
      priceUpdate();
    }
    const target = e.target;
    const id = $(target).attr('id');
    const tempTime = JSON.parse(localStorage.getItem('tempTime'));
    const tempSelectedSeats = JSON.parse(localStorage.getItem('tempSeats'));
    if (tempTime != 'empty') {
      if (tempSelectedSeats.indexOf[id] != -1) {
        if (target.style.backgroundColor != 'rgb(61, 255, 93)') {
          target.style.backgroundColor = 'rgb(61, 255, 93)';
          write(id);
        } else {
          target.style.backgroundColor = 'rgb(163, 160, 160)';
          del(id);
        }
      }
    }
  }
}
function conform(e) {
  if (window.confirm('Are you sure you want to continue?')) {
    const tempSeats = JSON.parse(localStorage.getItem('tempSeats')).length;
    if (tempSeats) {
      const ary = {};
      ary['location'] = loc;
      ary['day'] = currentDay;
      ary['theater'] = currentTheater;
      ary['time'] = currentTime;
      ary['seats'] = JSON.parse(localStorage.getItem('tempSeats'));
      ary['movieId'] = JSON.parse(sessionStorage.getItem('clickedMovieId'));
      const allTicketary = JSON.parse(localStorage.getItem('allTicketAry'));
      allTicketary.push(ary);
      localStorage.setItem('allTicketAry', JSON.stringify(allTicketary));
      localStorage.setItem('tempSeats', JSON.stringify([]));
      priceUpdate();
    } else {
      alert('select seats first');
    }
  } else {
    console.log('canceled.');
  }
}
$(function () {
  $('.date').on('click', dateClicked);
  $('.theater').on('click', theaterClicked);
  $('.time').on('click', timeClicked);
  $('.seat').on('click', seatSelected);
  $('.book-now').on('click', conform);
});

function update(e) {
  const tempDate = JSON.parse(localStorage.getItem('tempDate'));
  const tempTime = JSON.parse(localStorage.getItem('tempTime'));
  const tempTheater = JSON.parse(localStorage.getItem('tempTheater'));
  if (tempDate != 'empty' && tempTheater != 'empty' && tempTime != 'empty') {
    const ticketAry = JSON.parse(localStorage.getItem('allTicketAry'));
    ticketAry.forEach((ticketObj) => {
      const Loc = ticketObj['location'];
      const Day = ticketObj['day'];
      const Theater = ticketObj['theater'];
      const Time = ticketObj['time'];
      const curLoc = loc;
      const curDay = currentDay;
      const curTheater = currentTheater;
      const curTime = currentTime;
      const seats = ticketObj['seats'];
      if (
        Loc == curLoc &&
        Day == curDay &&
        Theater == curTheater &&
        Time == curTime
      ) {
        seats.forEach((seat) => {
          $(`#${seat}`).css('backgroundColor', 'red');
        });
      }
    });
  } else {
    for (let i = 10; i <= 23; i++) {
      for (let j = 11; j <= 28; j++) {
        $(`#${String(i) + String(j)}`).css(
          'backgroundColor',
          'rgb(163, 160, 160)'
        );
      }
    }
  }
  //
  $('.seat-num').css('background', 'none');
}
$(function () {
  $('body').on('click', update);
});
