const makeDeck = () => {
  return {
    deck: [],
    drawnCards: [],
    suits: ["hearts", "diamonds", "spades", "clubs"],
    values: "2,3,4,5,6,7,8,9,10,J,Q,K,A",
    initializeDeck() {
      const { suits, values, deck } = this;
      for (let value of values.split(",")) {
        for (let suit of suits) {
          deck.push({ value, suit });
        }
      }
    },
    // drawCard() {
    //   return this.deck.pop();
    // },
    drawCard() {
      const card = this.deck.pop();
      this.drawnCards.push(card);
      return card;
    },
    drawMultipleCards(numCards) {
      const cards = [];
      for (let i = 0; i < numCards; i++) {
        cards.push(this.drawCard());
      }
      return cards;
    },
    shuffle() {
      const { deck } = this;
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
  };
};

const deck1 = makeDeck();
deck1.initializeDeck();
deck1.shuffle();
const hand1 = deck1.drawMultipleCards(2);
const hand2 = deck1.drawMultipleCards(2);
const hand3 = deck1.drawMultipleCards(5);

const deck2 = makeDeck();
deck2.initializeDeck();
deck2.shuffle();
const handa = deck2.drawMultipleCards(2);
const handb = deck2.drawMultipleCards(2);
const handc = deck2.drawMultipleCards(5);
