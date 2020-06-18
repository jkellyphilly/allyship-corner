const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
let main = document.getElementsByTagName('main')[0];

document.addEventListener('DOMContentLoaded', () => {

  getEvents();

  // TODO: create a show/hide section for the "create" functionality
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
  .then(resp => resp.json())
  .then(event => {
    const newEvent = new Event(event.id, event);
    newEvent.renderEventCard();
  })
}

function updateEvent(eventId, name, imagePath, location, attendees) {
  let formData = {
    name: name,
    image_url: imagePath,
    location: location,
    attendees: attendees
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    console.log(response)
  })
}

// TODO: change function type to be formatted better
function removeEvent(eventId) {
  const configObj = {
    method: 'DELETE'
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    alert("Deletion successful - event removed");
  })
}
