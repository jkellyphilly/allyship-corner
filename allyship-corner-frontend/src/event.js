class Event {
  constructor(id, eventAttributes) {
    this.id = id;
    this.name = eventAttributes.name;
    this.location = eventAttributes.location;
    this.attendees = eventAttributes.attendees;
    this.imagePath = eventAttributes.image_url;
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
        attendBtn.innerText = "I can't go";
      }
      this.liked = !this.liked;
      numAttendees.innerHTML = `${this.attendees} are attending`;
      updateEvent(this.id, this.name, this.imagePath, this.location, this.attendees);
    });
    thisDiv.appendChild(attendBtn);

    main.appendChild(thisDiv);
  }

  static findById(id) {
    return this.all.find(event => event.id === id);
  }
}

Event.all = [];
