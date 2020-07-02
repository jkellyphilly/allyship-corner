class Event {
  constructor(id, eventAttributes) {
    this.id = id;
    this.name = eventAttributes.name;
    this.location = eventAttributes.location;
    this.attendees = eventAttributes.attendees;
    this.imagePath = eventAttributes.image_url;
    this.comments = eventAttributes.comments;
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

    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete Event";
    deleteButton.addEventListener('click', () => {
      removeEvent(this.id);
      thisDiv.remove();
    })
    thisDiv.appendChild(deleteButton);

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
      updateEvent(this.id, this.name, this.imagePath, this.location, this.attendees);
    });
    thisDiv.appendChild(attendBtn);

    // Comments
    // TODO: add a special class name for the comments div
    let commentsDiv = document.createElement('div');
    // console.log(this.comments);
    this.comments.map(comment => {
      const thisComment = new Comment(comment.id, comment);
      thisComment.renderComment(commentsDiv);
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
  fetch(EVENTS_URL)
  .then(resp => resp.json())
  .then(response => {
    // response.data.forEach(event => {
    //   const thisEvent = new Event(event.id, event.attributes);
    //   thisEvent.renderEventCard();
    // });
    console.log(response);
  })
}

function createNewEvent(name, imagePath, location, attendees=0) {
  let formData = {
    name: name,
    image_url: imagePath,
    location: location,
    attendees: attendees
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(EVENTS_URL, configObj)
  .then(resp => resp.json())
  .then(event => {
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
    method: 'DELETE'
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    alert("Deletion successful - event removed");
  })
}
