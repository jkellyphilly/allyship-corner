class Comment {
  constructor(id, commentAttributes) {
    this.id = id;
    this.content = commentAttributes.content;
    this.event_id = commentAttributes.event_id;
    this.username = commentAttributes.username;
    Comment.all.push(this);
  }

  renderComment() {
    console.log(this);
  }

  static findById(id) {
    return this.all.find(comment => comment.id === id);
  }
}

Comment.all = [];
