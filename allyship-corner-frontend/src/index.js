const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
const COMMENTS_URL = `${BASE_URL}/comments`;
const USERS_URL = `${BASE_URL}/users`;
let main = document.getElementsByTagName('main')[0];
let addEvent = false;
const addBtn = document.querySelector("#new-event-btn");
const addNewEventsDiv = document.querySelector("#add-events-div");
const eventFormContainer = document.querySelector(".new-event-container");

document.addEventListener('DOMContentLoaded', () => {

  // In the background, fetch all users
  getAllUsers();

  let welcomeUsers = document.createElement('div');
  let newUserSection = document.createElement('div');
  let logInSection = document.createElement('div');

  // Create sign up form
  createSignUpOrLogInForm(newUserSection, welcomeUsers, true);
  // Create log in form
  createSignUpOrLogInForm(logInSection, welcomeUsers, false);

  welcomeUsers.appendChild(newUserSection);
  welcomeUsers.appendChild(logInSection);

  main.appendChild(welcomeUsers);

})

function loadPageWithValidUser() {
  // Build the hidden form where users can create a new event
  showAddEvent();

  // Fetch and render our information
  getEvents();
}

function showAddEvent() {
  // Show/hide the new event form
  addNewEventsDiv.style.display = "grid";
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
    const eventName = document.getElementsByName('name')[0];
    const eventLocation = document.getElementsByName('location')[0];
    const eventImgPath = document.getElementsByName('image')[0];

    createNewEvent(eventName, eventImgPath, eventLocation);
  });
}

function createSignUpOrLogInForm(parent, divToRemove, isSignUp) {
  let form = document.createElement('form');
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
  submitUser.innerHTML = "Submit";
  submitUser.addEventListener('click', (event) => {
    event.preventDefault();
    logInOrSignUp(divToRemove, usernameInput, passwordInput, isSignUp)
  })

  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submitUser);
  parent.appendChild(form);
}
