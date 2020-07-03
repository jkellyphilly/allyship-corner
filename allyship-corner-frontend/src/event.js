class Event {
  constructor(id, eventAttributes) {
    this.id = id;
    this.name = eventAttributes.name;
    this.location = eventAttributes.location;
    this.attendees = eventAttributes.attendees;
    this.imagePath = eventAttributes.image_url;
    this.comments = eventAttributes.comments;
    this.userId = eventAttributes.user.id;
    this.userName = eventAttributes.user.username;

    // TODO: add in the date of creation ?
    this.liked = false; // TODO: change this name
    Event.all.push(this);
  }

  renderEventCard() {
    const main = document.getElementsByTagName('main')[0];
    let thisDiv = document.createElement('div');
    thisDiv.className = "card";
    thisDiv.setAttribute('data-id', this.id);

    let thisName = document.createElement('p');
    thisName.innerHTML = this.name;
    thisDiv.appendChild(thisName);

    let thisLocation = document.createElement('p');
    thisLocation.innerHTML = this.location;
    thisDiv.appendChild(thisLocation);

    let numAttendees = document.createElement('p');
    numAttendees.innerHTML = `${this.attendees} are attending`;
    thisDiv.appendChild(numAttendees);

    if (this.userId === parseInt(window.sessionStorage.currentUserId)) {
      renderDeleteButton(thisDiv, this.id);
    }

    let attendBtn = document.createElement('button');
    attendBtn.innerText = "I'm interested";
    attendBtn.addEventListener('click', () => {
      if (this.liked) {
        this.attendees -= 1;
        attendBtn.innerText = "I'm interested";
      } else {
        this.attendees += 1;
        attendBtn.innerText = "I can no longer attend";
      }
      this.liked = !this.liked;
      numAttendees.innerHTML = `${this.attendees} are attending`;
      // TODO: do I really need to pass all of that information in??
      updateEvent(this.id, this.name, this.imagePath, this.location, this.attendees);
    });
    thisDiv.appendChild(attendBtn);

    // COMMENTS SECTION
    // TODO: add a special class name for the comments div
    let commentsDiv = document.createElement('div');
    this.comments.map(comment => {
      console.log(comment);
      // commentAttributes = {
      //   content: comment.content,
      //   event: { id: comment.event_id },
      //   user: { username: User.getUsernameFromId(comment.user_id)}
      // }
      // const thisComment = new Comment(comment.id, {content: comment.content);
      // thisComment.renderComment(commentsDiv);
    });
    thisDiv.appendChild(commentsDiv);
    Comment.renderNewCommentForm(thisDiv, commentsDiv);

    main.appendChild(thisDiv);

  }

  static findById(id) {
    return this.all.find(event => event.id === id);
  }
}

Event.all = [];

function getEvents() {
  fetch(EVENTS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${window.sessionStorage.accessToken}`
    }
  })
  .then(resp => resp.json())
  .then(response => {
    response.data.forEach(event => {
      // console.log(event);
      const thisEvent = new Event(event.id, event.attributes);
      thisEvent.renderEventCard();
    });
  })
}

function createNewEvent(name, imagePath, location, attendees=0) {
  let formData = {
    event: {
      name: name,
      image_url: imagePath,
      location: location,
      user_id: window.sessionStorage.currentUserId,
      attendees: attendees
    }
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

  fetch(EVENTS_URL, configObj)
  .then(resp => resp.json())
  .then(event => {
    // console.log(event);
    const newEvent = new Event(event.data.id, event.data.attributes);
    newEvent.renderEventCard();
  })
}

// TODO: this needs to be updated to include comments
function updateEvent(eventId, name, imagePath, location, attendees) {
  let formData = {
    name: name,
    image_url: imagePath,
    location: location,
    attendees: attendees
  }

  let configObj = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${window.sessionStorage.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    console.log(response)
  })
}

// TODO: change function type to be formatted better
function removeEvent(eventId) {
  const configObj = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${window.sessionStorage.accessToken}`
    }
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    alert("Deletion successful - event removed");
  })
}

// Function for rendering the delete button for an event
function renderDeleteButton(parent, eventId) {
  let deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete Event";
  deleteButton.addEventListener('click', () => {
    removeEvent(eventId);
    parent.remove();
  })
  parent.appendChild(deleteButton);
}
