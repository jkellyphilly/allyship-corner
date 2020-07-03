const BASE_URL = "http://localhost:3000";
const EVENTS_URL = `${BASE_URL}/events`;
const COMMENTS_URL = `${BASE_URL}/comments`;
const USERS_URL = `${BASE_URL}/users`;
let main = document.getElementsByTagName('main')[0];
let addEvent = false;

document.addEventListener('DOMContentLoaded', () => {

  // In the background, fetch all users
  getAllUsers();

  let welcomeUsers = document.createElement('div');
  let newUserSection = document.createElement('div');
  let logInSection = document.createElement('div');

  // Create sign up form
  createSignUpForm(newUserSection, welcomeUsers);
  // Create log in form
  createLogInForm(logInSection, welcomeUsers);

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

function createSignUpForm(parent, divToRemove) {
  let newUser = document.createElement('form');
  let title = document.createElement('p');
  title.innerHTML = "Sign up!";

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
    // createNewUser(divToRemove, usernameInput.value, passwordInput.value);
    logInOrSignUp(divToRemove, usernameInput.value, passwordInput.value, true);
  })

  newUser.appendChild(title);
  newUser.appendChild(username);
  newUser.appendChild(password);
  newUser.appendChild(submitUser);
  parent.appendChild(newUser);
}

function createLogInForm(parent, divToRemove) {
  let form = document.createElement('form');
  let title = document.createElement('p');
  title.innerHTML = "Log in!";

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
    logInOrSignUp(divToRemove, usernameInput.value, passwordInput.value, false)
  })

  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submitUser);
  parent.appendChild(form);
}
