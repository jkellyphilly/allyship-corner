const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
let main = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', () => {

  getEvents()
  // fetch(EVENTS_URL)
  // .then(function(response){
  //   return response.json();
  // })
  // .then(function(object) {
  //   for(let element of object) {
  //     let thisDiv = document.createElement('div');
  //     thisDiv.className = "card";
  //     thisDiv.setAttribute('data-id', element.id);
  //
  //     let thisName = document.createElement('p');
  //     thisName.innerHTML = element.name;
  //     thisDiv.appendChild(thisName);
  //
  //     main.appendChild(thisDiv);
  //   }
  // })
})

function getEvents() {
  fetch(EVENTS_URL)
  .then(resp => resp.json())
  .then(events => {
    events.forEach(event => {
      const thisEvent = new Event(event.id, event);
      thisEvent.renderEventCard();
    });
  })
}

// TODO: figure out if this can have a default number of attendees (zero)
function createNewEvent(name, imagePath, location, attendees=0) {

  let formData = {
    name: name,
    image_url: imagePath,
    location: location,
    attendees: attendees
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(EVENTS_URL, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  })
}

// TODO: add a "remove event" button to the event
function removeEvent(eventId) {
  const configObj = {
    method: 'DELETE'
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    console.log(response)
  })
}
