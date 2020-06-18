const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
let main = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', () => {
  fetch(EVENTS_URL)
  .then(function(response){
    return response.json();
  })
  .then(function(object) {
    for(let element of object) {
      let thisDiv = document.createElement('div');
      thisDiv.className = "card";
      thisDiv.setAttribute('data-id', element.id);

      let thisName = document.createElement('p');
      thisName.innerHTML = element.name;
      thisDiv.appendChild(thisName);

      main.appendChild(thisDiv);
    }
  })
})

function removeEvent(eventId) {
  const configObj = {
    method: 'DELETE'
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    console.log(response)
  })
}
