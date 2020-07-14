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
    this.attending = false;
    Event.all.push(this);
  }

  renderEventCard() {
    let thisEventDiv = document.createElement('div');
    thisEventDiv.className = "col";

    let thisDiv = document.createElement('div');
    thisDiv.className = "card mb-3";
    thisDiv.style.maxWidth = "540px";
    thisDiv.setAttribute('data-id', this.id);

    let row = document.createElement('div');
    row.className = "row no-gutters";
    row.style.backgroundColor = '#E5E5E5';

    // Image div
    let imgDiv = document.createElement('div');
    imgDiv.className = 'col-md-4';
    let thisImage = document.createElement('img');
    thisImage.src = this.imagePath;
    thisImage.className = "card-img";
    imgDiv.appendChild(thisImage);

    // Content div
    let contentDiv = document.createElement('div');
    contentDiv.className = "col-md-8";
    let cardBody = document.createElement('div');
    cardBody.className = "card-body";

    // Title
    let thisName = document.createElement('h5');
    thisName.className = "card-title";
    thisName.innerHTML = this.name;
    cardBody.appendChild(thisName);

    // Location
    let thisLocation = document.createElement('p');
    thisLocation.className = "card-text";
    thisLocation.innerHTML = this.location;
    cardBody.appendChild(thisLocation);

    // Number of attendees
    let numAttendees = document.createElement('p');
    numAttendees.className = "card-text";
    numAttendees.innerHTML = `${this.attendees} attending`;
    cardBody.appendChild(numAttendees);

    // Attend button
    let interestedSection = document.createElement('p');
    interestedSection.className = "card-text";
    let smallClass = document.createElement('small');
    smallClass.className = "text-muted";
    let attendBtn = document.createElement('button');
    attendBtn.className = "btn btn-success";
    attendBtn.innerText = "I'm interested";
    attendBtn.addEventListener('click', () => {
      if (this.attending) {
        this.attendees -= 1;
        attendBtn.innerText = "I'm interested";
        attendBtn.className = "btn btn-success";
      } else {
        this.attendees += 1;
        attendBtn.innerText = "I can no longer attend";
        attendBtn.className = "btn btn-danger";
      }
      this.attending = !this.attending;
      numAttendees.innerHTML = `${this.attendees} attending`;
      updateEvent(this.id, this.attendees);
    });
    smallClass.appendChild(attendBtn);
    interestedSection.appendChild(smallClass);
    cardBody.appendChild(interestedSection);

    row.appendChild(imgDiv);
    contentDiv.appendChild(cardBody);
    row.appendChild(contentDiv);
    thisDiv.appendChild(row);

    // Render the delete button if the event belongs to the current user
    if (this.userId === parseInt(window.sessionStorage.currentUserId)) {
      renderDeleteButton(thisEventDiv, smallClass, this.id);
    }

    // COMMENTS SECTION
    let commentsDiv = document.createElement('div');
    commentsDiv.className = "list-group";
    this.comments.map(comment => {
      const commentAttributes = {
        content: comment.content,
        event: { id: comment.event_id },
        user: { username: User.getUsernameFromId(comment.user_id)},
        updated_at: comment.updated_at
      }
      const thisComment = new Comment(comment.id, commentAttributes);
      thisComment.renderComment(commentsDiv);
    });
    thisDiv.appendChild(commentsDiv);
    Comment.renderNewCommentForm(thisDiv, commentsDiv);
    thisEventDiv.appendChild(thisDiv);
    eventCards.appendChild(thisEventDiv);
  }

  static findById(id) {
    return this.all.find(event => event.id === id);
  }
}

Event.all = [];

// Data retrieval of all events
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
      const thisEvent = new Event(event.id, event.attributes);
      thisEvent.renderEventCard();
    });
  })
  .catch(err => alert(err));
}

// Create a new event given the event's name, image URL, and location
function createNewEvent(name, imagePath, location) {
  // Note: the user_id attribute is taken from the sessionStorage, which is
  // where we've stored the current user's ID (currentUserId). Additionally,
  // a new event will initialize with 0 attendees
  let formData = {
    event: {
      name: name.value,
      image_url: imagePath.value,
      location: location.value,
      user_id: window.sessionStorage.currentUserId,
      attendees: 0
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
  .then(response => {
    if (response.message) {
      alert(response.message);
    } else {
      const newEvent = new Event(response.data.id, response.data.attributes);
      newEvent.renderEventCard();

      addEvent = !addEvent;
      name.value = '';
      imagePath.value = '';
      location.value = '';
      resetAddEventSection();
    }
  })
  .catch(err => alert(err));
}

// Update an event's number of attendees
function updateEvent(eventId, attendees) {
  let configObj = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${window.sessionStorage.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ attendees: attendees })
  }

  fetch(`${EVENTS_URL}/${eventId}`, configObj)
  .then(function(response) {
    console.log(response)
  })
  .catch(err => alert(err));
}

// Remove an event from the database and then from the DOM
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
  .catch(err => alert(err));
}

// Render the delete button for an event
function renderDeleteButton(divToRemove, parent, eventId) {
  let deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete Event";
  deleteButton.className = "btn btn-outline-danger";
  deleteButton.addEventListener('click', () => {
    removeEvent(eventId);
    divToRemove.remove();
  })
  parent.appendChild(deleteButton);
}
