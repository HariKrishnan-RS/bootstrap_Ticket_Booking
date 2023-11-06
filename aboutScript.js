const loc = document.querySelector('.location');
loc.options[0].innerText = JSON.parse(localStorage.getItem('location'));
