const BASE_URL = "http://localhost:3000";
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

  let newUserSection = document.createElement('div');
  let logInSection = document.createElement('div');

  // Create sign up form
  createSignUpOrLogInForm(newUserSection, true);
  // Create log in form
  createSignUpOrLogInForm(logInSection, false);

  welcomeUsersSection.appendChild(newUserSection);
  welcomeUsersSection.appendChild(logInSection);
})

// Called on succesful user sign up or log in
// First, build the hidden form where users can create a new event
// Then, fetch all event information from the database
function loadPageWithValidUser() {
  showAddEvent();
  getEvents();
}

function showAddEvent() {
  // Show/hide the new event form
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

// Function for rendering a form for either signing up or logging in
function createSignUpOrLogInForm(parent, isSignUp) {
  let form = document.createElement('form');
  form.style.maxWidth = "540px";
  let title = document.createElement('h1');
  title.innerHTML = isSignUp ? "Sign up!" : "Log in!";

  let username = document.createElement('div');
  username.className = "form-group";
  let usernameLabel = document.createElement('label');
  usernameLabel.htmlfor = "username";
  usernameLabel.innerHTML = "Username: ";
  let usernameInput = document.createElement('input');
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("id", "username");
  usernameInput.className = "form-control";

  username.appendChild(usernameLabel);
  username.appendChild(usernameInput);

  let password = document.createElement('div');
  password.className = "form-group";
  let passwordLabel = document.createElement('label');
  passwordLabel.htmlfor = "password";
  passwordLabel.innerHTML = "Password: ";
  let passwordInput = document.createElement('input');
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("type", "password");
  passwordInput.className = "form-control";

  password.appendChild(passwordLabel);
  password.appendChild(passwordInput);

  let submitUser = document.createElement('button');
  submitUser.className = "btn btn-primary";
  submitUser.innerHTML = isSignUp ? "Sign up" : "Log in";
  submitUser.addEventListener('click', (event) => {
    event.preventDefault();
    logInOrSignUp(usernameInput, passwordInput, isSignUp)
  })

  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submitUser);
  parent.setAttribute('align', 'center');
  parent.className = "col";
  parent.appendChild(form);
}

function resetAddEventSection() {
  eventFormContainer.style.display = "none";
  addBtn.innerText = "Make a difference in this world. Add a new event!";
  addBtn.className = "btn btn-info";
}

function openAddEventSection() {
  eventFormContainer.style.display = "block";
  addBtn.innerText = "Close";
  addBtn.className = "btn btn-link";
}
