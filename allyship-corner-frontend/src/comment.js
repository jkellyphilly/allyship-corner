class Comment {
  constructor(id, commentAttributes) {
    this.id = id;
    this.content = commentAttributes.content;
    this.eventId = commentAttributes.event.id;
    this.username = commentAttributes.user.username;
    Comment.all.push(this);
  }

  renderComment(myDiv) {
    let comment = document.createElement('li');
    comment.innerHTML = `${this.username} says: ${this.content}`;
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "X";
    deleteButton.addEventListener('click', () => {
      removeComment(this.id);
      comment.remove();
    });
    comment.appendChild(deleteButton);
    myDiv.appendChild(comment);
  }

  static renderNewCommentForm(myDiv, commentDiv) {
    let newComment = document.createElement('form');

    let commentLabel = document.createElement('label');
    commentLabel.innerHTML = "New comment: ";

    let commentContent = document.createElement('input');
    commentContent.setAttribute("type", "text");

    let submitComment = document.createElement('button');
    submitComment.innerHTML = ">";
    submitComment.addEventListener('click', (event) => {
      event.preventDefault();
      createComment(commentDiv, commentContent.value, myDiv.getAttribute('data-id'));
      commentContent.value = "";
    })

    newComment.appendChild(commentLabel);
    newComment.appendChild(commentContent);
    newComment.appendChild(submitComment);

    myDiv.appendChild(newComment);
  }

  static findById(id) {
    return this.all.find(comment => comment.id === id);
  }
}

Comment.all = [];

function createComment(myDiv, content, eventId) {

  let formData = {
    content: content,
    event_id: eventId,
    user_id: window.sessionStorage.currentUserId
  }

  let configObj = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.sessionStorage.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(COMMENTS_URL, configObj)
  .then(resp => resp.json())
  .then(comment => {
    const newComment = new Comment(comment.data.id, comment.data.attributes);
    newComment.renderComment(myDiv);
  })
}

// TODO: change function type to be formatted better
function removeComment(commentId) {
  const configObj = {
    method: 'DELETE'
  }

  fetch(`${COMMENTS_URL}/${commentId}`, configObj)
  .then(function(response) {
    console.log(response);
    alert("Comment deleted successfully");
  })
}
