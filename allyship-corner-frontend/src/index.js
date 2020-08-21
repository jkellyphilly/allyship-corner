const BASE_URL = "https://allyship-corner-api.herokuapp.com";
const EVENTS_URL = `${BASE_URL}/events`;
const COMMENTS_URL = `${BASE_URL}/comments`;
const USERS_URL = `${BASE_URL}/users`;
let main = document.getElementsByTagName('main')[0];
let addEvent = false;
const addBtn = document.querySelector("#new-event-btn");
const addNewEventsDiv = document.querySelector("#add-events-div");
const eventFormContainer = document.querySelector("#new-event-container");
const eventCards = document.querySelector('#event-cards');
const welcomeUsersSection = document.querySelector('#welcome-section');

document.addEventListener('DOMContentLoaded', () => {

  // In the background, fetch all users
  getAllUsers();

  // Sign up section
  const signUpBtn = document.querySelector('#sign-up-btn');
  const usernameSignUp = document.querySelector('#username-signup');
  const passwordSignUp = document.querySelector('#password-signup');
  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logInOrSignUp(usernameSignUp, passwordSignUp, true);
  })

  // Log in section
  const loginBtn = document.querySelector('#login-btn');
  const usernameLogin = document.querySelector('#username-login');
  const passwordLogin = document.querySelector('#password-login');
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logInOrSignUp(usernameLogin, passwordLogin, false);
  })
})

// Called on succesful user sign up or log in
// First, build the hidden form where users can create a new event
// Then, fetch all event information from the database
function loadPageWithValidUser() {
  showAddEvent();
  getEvents();
}

// Show/hide the new event form
function showAddEvent() {
  addNewEventsDiv.style.display = "grid";
  addBtn.addEventListener("click", () => {
    addEvent = !addEvent;
    if (addEvent) {
      openAddEventSection();
    } else {
      resetAddEventSection();
    }
  });

  // Upon submission, create a new event
  const createNewEventForm = document.querySelector(".add-event-form");
  createNewEventForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const eventName = document.getElementsByName('name')[0];
    const eventLocation = document.getElementsByName('location')[0];
    const eventImgPath = document.getElementsByName('image')[0];

    createNewEvent(eventName, eventImgPath, eventLocation);
  });
}

// Hide the add event section and reset
// the add event button's text
function resetAddEventSection() {
  eventFormContainer.style.display = "none";
  addBtn.innerText = "Make a difference in this world. Add a new event!";
  addBtn.className = "btn btn-info";
}

// Opens the add event section and sets
// the button to be a closing button
function openAddEventSection() {
  eventFormContainer.style.display = "block";
  addBtn.innerText = "Close";
  addBtn.className = "btn btn-link";
}
