class User {
  constructor(id, userAttributes) {
    this.id = id;
    this.username = userAttributes.username;

    User.all.push(this);
  }
}

User.all = [];

function getAllUsers() {
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(response => {
    // console.log("Response returned for users", response);
    response.data.forEach(user => {
      const thisUser = new User(user.id, user.attributes)
    });
  })
}

function logInOrSignUp(divToRemove, username, password, isSignUp) {

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

  const fetchURL = isSignUp ? USERS_URL : `${BASE_URL}/login`;
  const myWording = isSignUp ? 'signed up' : 'logged in';

  fetch(fetchURL, configObj)
  .then(resp => resp.json())
  .then(response => {
    if (response.message) {
      alert(response.message);
    } else {
      window.sessionStorage.accessToken = response.jwt;
      window.sessionStorage.currentUsername = response.user.data.attributes.username;
      window.sessionStorage.currentUserId = response.user.data.id;
      alert(`Succesfully ${myWording} - welcome!`);

      divToRemove.remove();
      loadPageWithValidUser();
    }
  })
  .catch(err => console.log(err))
}
