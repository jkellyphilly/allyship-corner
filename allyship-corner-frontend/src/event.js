class Event {
  constructor(id, eventAttributes) {
    this.id = id;
    this.name = eventAttributes.name;
    this.location = eventAttributes.location;
    this.attendees = eventAttributes.attendees;
    this.imagePath = eventAttributes.image_url;
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

    main.appendChild(thisDiv);
  }
}

Event.all = [];
