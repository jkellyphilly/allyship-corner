class User {
  // Upon instantiation of a User object, set
  // the id & username attributes and push into
  // the "all" array
  constructor(id, userAttributes) {
    this.id = id;
    this.username = userAttributes.username;

    User.all.push(this);
  }

  // Return a user's username given their ID
  static getUsernameFromId(id) {
    const thisUser = this.all.find(user => parseInt(user.id) === id);
    return thisUser.username;
  }
}

User.all = [];

// Fetch all users from the database and
// build a JS object for each one
function getAllUsers() {
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(response => {
    response.data.forEach(user => {
      const thisUser = new User(user.id, user.attributes)
    });
  })
}

// Called when a user attempts to log in or sign up.
// Makes POST request to location based on if the
// request isSignUp or not
function logInOrSignUp(username, password, isSignUp) {

  let formData = {
    user: {
      username: username.value,
      password: password.value
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

  // Use isSignUp boolean to determine server endpoint and
  // flash message  wording upon successful login/signup
  const fetchURL = isSignUp ? USERS_URL : `${BASE_URL}/login`;
  const myWording = isSignUp ? 'signed up' : 'logged in';

  fetch(fetchURL, configObj)
  .then(resp => resp.json())
  .then(response => {
    if (response.message) {
      username.value = '';
      password.value = '';
      alert(response.message);
    } else {
      // Store JWT, username, and user ID in sessionStorage
      window.sessionStorage.accessToken = response.jwt;
      window.sessionStorage.currentUsername = response.user.data.attributes.username;
      window.sessionStorage.currentUserId = response.user.data.id;
      alert(`Succesfully ${myWording} - welcome!`);

      // Hide the welcomeUsersSection and load the main
      // items to be displayed (events, comments, etc)
      welcomeUsersSection.remove();
      loadPageWithValidUser();
    }
  })
  .catch(err => console.log(err))
}
