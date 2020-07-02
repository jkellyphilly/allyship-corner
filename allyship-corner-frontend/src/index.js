const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
const COMMENTS_URL = `${BASE_URL}/comments`;
const USERS_URL = `${BASE_URL}/users`;
let main = document.getElementsByTagName('main')[0];
let addEvent = false;
let currentUsername;
let currentUserId;

document.addEventListener('DOMContentLoaded', () => {

  // Show sign up and log in options
  makeSignUpAndLogin();

})

function makeSignUpAndLogin() {
  let welcomeUsers = document.createElement('div');
  let newUserSection = document.createElement('div');
  let loginSection = document.createElement('div');

  let newUser = document.createElement('form');

  let username = document.createElement('li');
  let usernameLabel = document.createElement('label');
  usernameLabel.innerHTML = "Username: ";
  let usernameInput = document.createElement('input');
  usernameInput.setAttribute("type", "text");

  username.appendChild(usernameLabel);
  username.appendChild(usernameInput);

  let password = document.createElement('li');

  let passwordLabel = document.createElement('label');
  passwordLabel.innerHTML = "Password: ";

  let passwordInput = document.createElement('input');
  passwordInput.setAttribute("type", "password");

  password.appendChild(passwordLabel);
  password.appendChild(passwordInput);

  let submitUser = document.createElement('button');
  submitUser.innerHTML = ">";
  submitUser.addEventListener('click', (event) => {
    event.preventDefault();
    createNewUser(usernameInput.value, passwordInput.value);
    welcomeUsers.remove();
  })

  newUser.appendChild(username);
  newUser.appendChild(password);
  newUser.appendChild(submitUser);
  newUserSection.appendChild(newUser);

  welcomeUsers.appendChild(newUserSection);

  main.appendChild(welcomeUsers);
}

function createNewUser(username, password) {

  let formData = {
    user: {
      username: username,
      password: password
    }
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(USERS_URL, configObj)
  .then(resp => resp.json())
  .then(response => {
    currentUsername = response.username;
    currentUserId = response.id;
    alert('Succesfully created profile - welcome!');
    loadPageWithValidUser();
  })
  .catch(err => console.log(err))

}

function loadPageWithValidUser() {
  // Build the hidden form where users can create a new event
  showAddEvent();

  // Fetch and render our information
  getEvents();
}

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
