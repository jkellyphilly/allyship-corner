class Comment {
  constructor(id, commentAttributes) {
    this.id = id;
    this.content = commentAttributes.content;
    this.eventId = commentAttributes.event_id;
    this.username = commentAttributes.username;
    Comment.all.push(this);
  }

  renderComment(myDiv) {
    let comment = document.createElement('p');
    comment.innerHTML = `${this.username} says: ${this.content}`;
    myDiv.appendChild(comment);
  }

  static renderNewCommentForm(myDiv) {
    let newComment = document.createElement('form');

    let commentLabel = document.createElement('label');
    commentLabel.innerHTML = "New comment: ";

    let commentContent = document.createElement('input');
    commentContent.setAttribute("type", "text");

    let submitComment = document.createElement('button');
    submitComment.innerHTML = ">";
    submitComment.addEventListener('click', (event) => {
      event.preventDefault();
      createComment(commentContent.value, myDiv.getAttribute('data-id'));
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

function createComment(content, eventId, username="Anonymous") {
  console.log("content", content);
  console.log("Event ID", eventId);
  console.log("Username", username);
  console.log(COMMENTS_URL);

  let formData = {
    content: content,
    event_id: eventId,
    username: username
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(COMMENTS_URL, configObj)
  .then(resp => resp.json())
  .then(comment => {
    const newComment = new Comment(comment.id, comment);
    console.log(newComment);
  })

}
