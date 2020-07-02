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
