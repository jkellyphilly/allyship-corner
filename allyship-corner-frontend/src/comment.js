class Comment {
  constructor(id, commentAttributes) {
    this.id = id;
    this.content = commentAttributes.content;
    this.eventId = commentAttributes.event_id;
    this.username = commentAttributes.username;
    Comment.all.push(this);
  }

  renderComment() {
    // console.log(this);
    // let parentCard = getElementByDataId(this.eventId);
    // console.log("Parent card", parentCard);

    // Get parent's card
    // const cards = document.getElementsByClassName('card');
    // console.log("without spread", cards);
    // // const parentCard = cards.find(card => card.getAttribute('data-id') == dataId);
    // const cards2 = Array.from(cards);
    // console.log("Cards", cards2);

    // let cards = [].map.call(cardsElements, l => l);
    // console.log("this way", cards);

    // Find parent's card
    let cardsElements = document.getElementsByClassName('card');
    console.log("without spread", cardsElements);
    console.log("with spread", [...cardsElements]);


    // let parentCard;
    // for(let i=0; i<cardsElements.length; i++) {
    //   console.log(cardsElements[i]);
    // }

    /*
    let thisComment = document.createElement('p');
    thisComment.innerHTML = this.username + ' says: ' + this.content;
    parentCard.appendChild(thisComment);
    */
  }

  static findById(id) {
    return this.all.find(comment => comment.id === id);
  }
}

function getElementByDataId(dataId) {
  // let cardElements = document.getElementsByClassName('card')
  // // .then()
  // console.log("Card elements", cardElements);
  // let cards = [...cardElements];
  // console.log("Cards", cards);
  // let cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
  const cards = document.getElementsByClassName('card');
  console.log("without spread", cards);
  // const parentCard = cards.find(card => card.getAttribute('data-id') == dataId);
  console.log("Cards", [...cards]);


  const paragraphs = document.querySelectorAll('p'); // NodeList
  console.log(paragraphs);
  const paragraphsArray = [...paragraphs];
  console.log(paragraphsArray);
  return cards;
}

Comment.all = [];
