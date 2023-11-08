// // add date array to Local storage
const DateAry = [
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];
localStorage.setItem('dates', JSON.stringify(DateAry));
// //add month array to local storage
const MonthAry = [
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
  'OCT',
];
localStorage.setItem('months', JSON.stringify(MonthAry));
//add location adn their theaters and time as 2d array
const data = {
  'kollam': {
    'theater': ['Revathy', 'Archana', 'PVR', 'Pranav', 'PVR-2'],
    'time': ['10:00 Am', '11:30 Am', '12:30 Am', '01:40 Pm', '03:00 Pm'],
  },
  'kochi': {
    'theater': ['Pranavam', 'JBL', 'PVR-5', 'Clarity', 'Crystal'],
    'time': ['10:00 Am', '11:30 Am', '12:30 Am'],
  },
  'Thiruvananthapuram': {
    'theater': [
      'Crystal',
      'Diamond',
      'MovieVilla',
      'Monopoly',
      'ShowTime',
      'Magicals',
    ],
    'time': [
      '10:00 Am',
      '11:30 Am',
      '12:30 Am',
      '10:40 Pm',
      '11:50 Pm',
      '12:00 Am',
    ],
  },
};
localStorage.setItem('data', JSON.stringify(data));
localStorage.setItem('tempDate', JSON.stringify('empty'));
localStorage.setItem('tempTheater', JSON.stringify('empty'));
localStorage.setItem('tempTime', JSON.stringify('empty'));
localStorage.setItem('tempSeats', JSON.stringify([]));
localStorage.setItem('bookBadgeCount', JSON.stringify('1'));
localStorage.setItem('SeatCount', JSON.stringify(''));
// localStorage.setItem('allTicketAry', JSON.stringify([]));
////
////
let currentSelection = 0;
let currentTheater = '';
let currentTime = '';
let currentSeats = [];
let currentDay = '';
function readFromLocal(key) {
  const ary = localStorage.getItem(key);
  return JSON.parse(ary);
}
const LocalLoc = JSON.parse(localStorage.getItem('location'));
const bookLoc = document.getElementById('selectedLocation');
bookLoc.innerText = LocalLoc;
function makeTheaterGrid(location) {
  // console.log(location);
  const dataAry = readFromLocal('data');
  currentLocationObj = dataAry[location];
  let currentTheaterAry = currentLocationObj['theater'];
  currentTheaterAry.forEach((theaterName) => {
    const divStr = `<div class="theater" id="${theaterName}">${theaterName}</div>`;
    $('.theater-div').append(divStr);
  });
}

function makeTimeGrid(location) {
  const dataAry = readFromLocal('data');
  currentLocationObj = dataAry[location];
  let currentTimeAry = currentLocationObj['time'];
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
  let week = [
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
  ];
  for (let i = 0; i < dateAry.length; i++) {
    let div = $('<div>');
    let p1 = $('<p>');
    let p3 = $('<p>');
    let p2 = $('<p>');
    div.addClass('date');
    p1.addClass('month');
    p1.text(monthAry[i]);
    p2.addClass('day');
    p2.text(dateAry[i]);
    p2.attr('id', `${loc + monthAry[i] + dateAry[i]}`);
    p3.text(week[i]);
    p3.addClass('weekName');
    p1.append(p3);
    div.append(p1);
    div.append(p2);
    $('.date-div').append(div);
  }
  makeTheaterGrid(loc);
  makeTimeGrid(loc);
  makeSeatGrid();
  giveIdToSeats();
});
/////////
document.addEventListener('DOMContentLoaded', function () {
  $('#yesNoModal3').modal('show');
});
//event handling
function dateClicked(e) {
  const target = e.currentTarget;
  let month = $($(target).children()[0]).text();
  const day = $($(target).children()[1]).text();
  month = month.slice(0, 3);

  const tempTheater = JSON.parse(localStorage.getItem('tempTheater'));
  const id = loc + month + day;
  if (true) {
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
  const tempSeat = JSON.parse(localStorage.getItem('tempSeats'));
  if (tempSeat.length) {
    localStorage.setItem('tempSeats', JSON.stringify([]));
    priceUpdate();
  }
  if (true) {
    const id = tempDate + theaterName;
    if (JSON.parse(localStorage.getItem('tempTheater')) != id) {
      $(target).css('backgroundColor', 'lightGreen');
      $(target).attr('id', id);
      currentTheater = $(target).text();
      const tempTheater = '#' + JSON.parse(localStorage.getItem('tempTheater'));
      localStorage.setItem('tempTheater', JSON.stringify(id));
      $(`${tempTheater}`).css('backgroundColor', 'rgba(255, 147, 147, 0.349)');
    } else {
      localStorage.setItem('tempTheater', JSON.stringify('empty'));
      $(target).css('backgroundColor', 'rgba(255, 147, 147, 0.349)');
    }
  }
}
function timeClicked(e) {
  const target = e.currentTarget;
  const time = $(target).attr('class').split(' ')[1];
  const tempTheater = JSON.parse(localStorage.getItem('tempTheater'));
  const tempTime = JSON.parse(localStorage.getItem('tempTime'));
  if (true) {
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
let currentSeatCount = 0;
function seatSelected(e) {
  if (
    JSON.parse(localStorage.getItem('tempTime')) != 'empty' &&
    JSON.parse(localStorage.getItem('tempTheater')) != 'empty' &&
    JSON.parse(localStorage.getItem('tempDate')) != 'empty'
  ) {
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
        if (true) {
          if (
            target.style.backgroundColor == 'rgb(163, 160, 160)' &&
            Number(JSON.parse(localStorage.getItem('SeatCount'))) >
              currentSeatCount
          ) {
            target.style.backgroundColor = 'rgb(61, 255, 93)';
            currentSeatCount++;
            write(id);
          } else if (target.style.backgroundColor == 'rgb(61, 255, 93)') {
            target.style.backgroundColor = 'rgb(163, 160, 160)';
            currentSeatCount--;
            del(id);
          }
        }
      }
    }
  }
}
let isButtonClicked = 0;
function yesOrNoSelection(e) {
  if (e.target.id == 'no-btn') {
    $('#yesNoModal').modal('hide');
  } else if (e.target.id == 'yes-btn') {
    $('#yesNoModal').modal('hide');
    const tempSeats = JSON.parse(localStorage.getItem('tempSeats')).length;
    if (tempSeats) {
      $('#success_tic').modal('show');
      localStorage.setItem('SeatCount', JSON.stringify(''));
      const ary = {};
      ary['location'] = loc;
      ary['day'] = currentDay;
      ary['theater'] = currentTheater;
      ary['time'] = currentTime;
      ary['seats'] = JSON.parse(localStorage.getItem('tempSeats'));
      ary['movieId'] = JSON.parse(sessionStorage.getItem('clickedMovieId'));
      ary['name'] = JSON.parse(localStorage.getItem('SelectedmovieName'));
      const allTicketary = JSON.parse(localStorage.getItem('allTicketAry'));
      allTicketary.push(ary);
      localStorage.setItem('allTicketAry', JSON.stringify(allTicketary));
      localStorage.setItem('tempSeats', JSON.stringify([]));
      priceUpdate();
      //update notification badge
      localStorage.setItem(
        'bookBadgeCount',
        JSON.stringify(
          String(Number(JSON.parse(localStorage.getItem('homeBadgeCount'))) + 1)
        )
      );
    } else {
      $('#yesNoModal2').modal('show');
    }
  } else if (e.target.id == 'no-btn-seats') {
    $('#yesNoModal2').modal('hide');
  }
}

function conform(e) {
  $('#yesNoModal').modal('show');
}
// else {
//   console.log('canceled.');
// }

function selectionClick(e) {
  if (e.target.id == 'selection-next-btn') {
    if (currentSelection == 0) {
      localStorage.setItem('SeatCount', JSON.stringify($('.seat-count').val()));
      currentSelection++;
      $('.date-div').css('display', 'none');
      $('.theater-div').css('display', 'flex');
      $('.selection-heading').text('Select Theater');
      $('.book-now').css('display', 'none');
    } else if (currentSelection == 1) {
      currentSelection++;
      $('.theater-div').css('display', 'none');
      $('.time-div').css('display', 'flex');
      $('.selection-heading').text('Select Time');
      $('.book-now').css('display', 'none');
    } else if (currentSelection == 2) {
      currentSelection++;
      $('.time-div').css('display', 'none');
      $('.seat-flex-box').css('display', 'flex');
      $('.selection-heading').text('Select Seats');
      $('.footer').css('display', 'flex');
      $('.screen').css('display', 'flex');
      $('.front-screen').css('display', 'flex');
      $('.selection').css('marginBottom', '30px');
      $('#selection-next-btn').css('display', 'none');
      $('.book-now').css('display', 'flex');
    }
  }
  if (e.target.id == 'selection-back-btn') {
    if (currentSelection == 2) {
      currentSelection--;
      $('.time-div').css('display', 'none');
      $('.theater-div').css('display', 'flex');
      $('.selection-heading').text('Select Theater');
      $('.book-now').css('display', 'none');
    } else if (currentSelection == 1) {
      currentSelection--;
      $('.theater-div').css('display', 'none');
      $('.date-div').css('display', 'grid');
      $('.selection-heading').text('Select Date');
      $('.book-now').css('display', 'none');
    } else if (currentSelection == 3) {
      currentSelection--;
      $('.time-div').css('display', 'flex');
      $('.seat-flex-box').css('display', 'none');
      $('.selection-heading').text('Select Time');
      $('.footer').css('display', 'none');
      $('.screen').css('display', 'none');
      $('.front-screen').css('display', 'none');
      $('.selection').css('marginBottom', '100px');
      $('#selection-next-btn').css('display', 'flex');
      $('.book-now').css('display', 'none');
    }
  }
}
$(function () {
  $('.date').on('click', dateClicked);
  $('.theater').on('click', theaterClicked);
  $('.time').on('click', timeClicked);
  $('.seat').on('click', seatSelected);
  $('.book-now').on('click', conform);
  $('.selection-button-div').on('click', selectionClick);
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
$('#yesNoModal').on('click', yesOrNoSelection);
$('#yesNoModal2').on('click', yesOrNoSelection);
