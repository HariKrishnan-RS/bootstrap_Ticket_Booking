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
// localStorage.setItem('tempDate', "");
////
////

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
    const divStr = `<div class="time" id="${time.replace(
      ' ',
      '-'
    )}">${time}</div>`;
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
  const id = loc + month + day;
  if (JSON.parse(localStorage.getItem('tempDate')) != id) {
    $($(target).children()[1]).css('backgroundColor', 'lightGreen');
    const tempDate = '#' + JSON.parse(localStorage.getItem('tempDate'));
    localStorage.setItem('tempDate', JSON.stringify(id));
    $(`${tempDate}`).css('backgroundColor', 'white');
  } else {
    localStorage.setItem('tempDate', JSON.stringify('empty'));
    $($(target).children()[1]).css('backgroundColor', 'white');
  }

  // $($(target).children()[1]).css('backgroundColor', 'white');
}

$(function () {
  $('.date').on('click', dateClicked);
});
