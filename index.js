document.addEventListener("DOMContentLoaded", function(){

    const CARD_VALUES = {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14
    }
    
    const dealerSlot = document.querySelector(".dealer-slot");
    const dealerDeckElement = document.querySelector(".dealer-deck");
    const userSlot = document.querySelector(".user-slot");
    const userDeckElement = document.querySelector(".user-deck");
    const text = document.querySelector(".round-outcome")
    const gameContainer = document.querySelector(".game-container")


    let userDeck, dealerDeck, inGame;

    gameContainer.addEventListener("click", () => {
        if (inGame) {
            cleanBeforeStart()
        } else {
            flipCards()
        }
    })

    startGame()
    function startGame() {
      const deck = new Deck()
      deck.shuffle()

      const deckHalf = Math.ceil(deck.totalCards / 2)
      dealerDeck = new Deck(deck.cards.slice(0, deckHalf))
      userDeck = new Deck(deck.cards.slice(deckHalf, deck.totalCards))
      inGame = false 

      cleanBeforeStart()
    }
    
    function cleanBeforeStart() {
        inGame = false
        dealerSlot.innerHTML = ""
        userSlot.innerHTML = ""
        text.innerHTML = ""

        updateDeckTotal()
    }

    function flipCards() {
        inGame = true 
        const dealerCard = dealerDeck.pop()
        const userCard = userDeck.pop()

        dealerSlot.appendChild(dealerCard.getHTML())
        userSlot.appendChild(userCard.getHTML())

        updateDeckTotal()

    }

    function updateDeckTotal() {
        dealerDeckElement.innerHTML = dealerDeck.totalCards
        userDeckElement.innerHTML = userDeck.totalCards
    }

    function roundWinner(cardOne, cardTwo) {
        
    }

    //dealerSlot.appendChild(deck.cards[0].getHTML());
});
