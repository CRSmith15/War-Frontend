const SUITS = ["♠", "♣", "♦", "♥"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get totalCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    shuffle() {
        for (let i = this.totalCards -1; i > 0; i--){
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldIndex = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldIndex
        }
    }
}


class Card {
    constructor(suit, value) {
        this.suit = suit 
        this.value = value
    }

    get color() {
        return this.suit === "♠" || this.suit === "♣" ? "black" : "red"
    }

    getHTML() {
        const cardSlot = document.createElement("div")
        cardSlot.innerText = this.suit
        cardSlot.classList.add("card", this.color)
        cardSlot.dataset.value = `${this.value} ${this.suit}`
        return cardSlot
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}