const ticketAry = JSON.parse(localStorage.getItem('allTicketAry'));
ticketAry.forEach((obj) => {
  const theater = obj['theater'];
  const name = obj['name'];
  const location = obj['location'];
  const time = obj['time'];
  const date = 'OCT ' + obj['day'];
  const seats = obj['seats'].length;
  const Total = String(seats * 270) + ' /-';
  let id = obj['movieId'];
  id = String(Number(id) + 1);
  const imgName = `movies-img/m${id}.jpg`;
  console.log(imgName);
  const body = document.querySelector('.main');
  const ticketBody = document.querySelector('.ticket-body');
  ticketBody.innerHTML =
    ticketBody.innerHTML +
    `<div class="ticket"><img class="ticketImg" src="${imgName}" /><h1></h1><div class="info"><p>Name</p><p>:</p><p class=".theater">${name}</p></div><div class="info"><p>Theater</p><p>:</p><p class=".theater">${theater}</p></div><div class="info"><p>Location</p><p>:</p><p class="location">${location}</p></div><div class="info"><p>Time</p><p>:</p><p class="time">${time}</p></div><div class="info"><p>Date</p><p>:</p><p class="date">${date}</p></div><div class="info"><p>Seats</p><p>:</p><p class="seats">${seats}</p></div><div class="info"><p>Total</p><p>:</p><p class="total">${Total}</p></div></div>`;
});
