class Comment {
  // Upon instantiation of a Comment object, set
  // all attributes and push into the class array
  constructor(id, commentAttributes) {
    this.id = id;
    this.content = commentAttributes.content;
    this.eventId = commentAttributes.event.id;
    this.username = commentAttributes.user.username;
    this.lastUpdated = commentAttributes.updated_at;
    Comment.all.push(this);
  }

  // Render comment given the div it occupies
  renderComment(myDiv) {
    let a = document.createElement('a');
    a.style.backgroundColor = '#F8F8F8';
    a.className = "list-group-item";
    let comment = document.createElement('div');
    comment.className = "d-flex w-100 justify-content-between";
    let text = document.createElement('h5');
    text.className = "mb-1";
    text.innerHTML = `${this.username}`;
    comment.appendChild(text);

    // Only show the delete comment button if the comment 
    // belongs to the current user
    if (this.username === window.sessionStorage.currentUsername) {
      let deleteButton = document.createElement('button');
      deleteButton.className = "btn btn-link btn-sm";
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener('click', () => {
        removeComment(this.id);
        a.remove();
      });
      comment.appendChild(deleteButton);
    }

    let content = document.createElement('p');
    content.className = "mb-1";
    content.innerHTML = `${this.content}`;

    let timeStamp = document.createElement('small');
    timeStamp.innerHTML = `${this.lastUpdated}`;

    // This is where I can add the "time the comment was left"
    a.appendChild(comment);
    a.appendChild(content);
    a.appendChild(timeStamp);

    myDiv.appendChild(a);
  }

  // Render the new comment form beneath current comments
  static renderNewCommentForm(myDiv, commentDiv) {
    let newCommentForm = document.createElement('form');
    newCommentForm.className = "form-inline";

    let commentInput = document.createElement('div');
    commentInput.className = "form-group mx-sm-3 mb-2";

    let commentLabel = document.createElement('label');
    commentLabel.className = "sr-only";
    commentLabel.htmlFor = "commentContent";
    commentLabel.innerHTML = "New comment";

    let commentContent = document.createElement('input');
    commentContent.setAttribute("type", "text");
    commentContent.setAttribute("id", "commentContent");
    commentContent.className = "form-control";

    commentInput.appendChild(commentLabel);
    commentInput.appendChild(commentContent);

    let submitComment = document.createElement('button');
    submitComment.setAttribute('type', 'submit');
    submitComment.className = "btn btn-outline-primary mb-2";
    submitComment.innerHTML = "Post comment";
    submitComment.addEventListener('click', (event) => {
      event.preventDefault();
      createComment(commentDiv, commentContent.value, myDiv.getAttribute('data-id'));
      commentContent.value = "";
    })

    newCommentForm.appendChild(commentInput);
    newCommentForm.appendChild(submitComment);
    myDiv.appendChild(newCommentForm);
  }

  // Find a comment by its ID
  static findById(id) {
    return this.all.find(comment => comment.id === id);
  }
}

Comment.all = [];

// Send POST request for creating new comment in database
function createComment(myDiv, content, eventId) {

  let formData = {
    content: content,
    event_id: eventId,
    user_id: window.sessionStorage.currentUserId
  }

  let configObj = {
    method: "POST",
    headers: {
      // Include the encrypted token for back-end authorization
      Authorization: `Bearer ${window.sessionStorage.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(COMMENTS_URL, configObj)
  .then(resp => resp.json())
  .then(response => {
    if (response.message) {
      // If we've reached here, then we have an error
      // coming from the backend, so display it to the user
      alert(response.message);
    } else {
      // If we've reached here, no error has been found.
      // Create the new comment and render it
      const newComment = new Comment(response.data.id, response.data.attributes);
      newComment.renderComment(myDiv);
    }
  })
  .catch(err => alert(err));
}

// Delete a comment from the database
function removeComment(commentId) {
  const configObj = {
    method: 'DELETE',
    headers: {
      // Include the encrypted token for back-end authorization
      Authorization: `Bearer ${window.sessionStorage.accessToken}`
    }
  }

  fetch(`${COMMENTS_URL}/${commentId}`, configObj)
  .then(function(response) {
    alert("Deletion successful - comment removed");
  })
  .catch(err => alert(err));
}
