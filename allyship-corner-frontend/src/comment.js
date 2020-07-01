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

  static findById(id) {
    return this.all.find(comment => comment.id === id);
  }
}


Comment.all = [];
