const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
let main = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', () => {
  fetch(EVENTS_URL)
  .then(function(response){
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  })
})
