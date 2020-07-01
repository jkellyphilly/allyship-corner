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
      console.log(commentContent.value);
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
