const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
const COMMENTS_URL = `${BASE_URL}/comments`;
let main = document.getElementsByTagName('main')[0];
let addEvent = false;

document.addEventListener('DOMContentLoaded', () => {

  // Build the hidden form where users can create a new event
  showAddEvent();

  // Fetch and render our information
  getEvents();
})

function showAddEvent() {
  // Show/hide the new event form
  const addBtn = document.querySelector("#new-event-btn");
  const eventFormContainer = document.querySelector(".new-event-container");
  addBtn.addEventListener("click", () => {
    addEvent = !addEvent;
    if (addEvent) {
      eventFormContainer.style.display = "block";
    } else {
      eventFormContainer.style.display = "none";
    }
  });

  // Upon submission, create a new event
  const createNewEventForm = document.querySelector(".add-event-form");
  createNewEventForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const eventName = document.getElementsByName('name')[0].value;
    const eventLocation = document.getElementsByName('location')[0].value;
    const eventImgPath = document.getElementsByName('image')[0].value;

    createNewEvent(eventName, eventImgPath, eventLocation);

    addEvent = !addEvent;
    eventFormContainer.style.display = "none";
  });
}

function getEvents() {
  fetch(EVENTS_URL)
  .then(resp => resp.json())
  .then(response => {
    response.data.forEach(event => {
      const thisEvent = new Event(event.id, event.attributes);
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
    const newEvent = new Event(event.data.id, event.data.attributes);
    newEvent.renderEventCard();
  })
}

// TODO: this needs to be updated to include comments
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
