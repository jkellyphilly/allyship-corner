class User {
  constructor(id, userAttributes) {
    this.id = id;
    this.username = userAttributes.username;

    User.all.push(this);
  }

  static getUsernameFromId(id) {
    const thisUser = this.all.find(user => parseInt(user.id) === id);
    return thisUser.username;
  }
}

User.all = [];

function getAllUsers() {
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(response => {
    response.data.forEach(user => {
      const thisUser = new User(user.id, user.attributes)
    });
  })
}

function logInOrSignUp(divToRemove, username, password, isSignUp) {

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
