function createNewUser(divToRemove, username, password) {

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
    if (response.error) {
      alert(response.error);
    } else {
      console.log("User creation response", response);
      currentUsername = response.user.data.attributes.username;
      currentUserId = response.user.data.id;

      window.sessionStorage.accessToken = response.jwt;
      alert('Succesfully created profile - welcome!');

      divToRemove.remove();
      loadPageWithValidUser();
    }
  })
  .catch(err => console.log(err))

}
