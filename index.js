document.addEventListener("DOMContentLoaded", function(){
    
    const dealerSlot = document.querySelector(".dealer-slot");
    const dealerDeckElement = document.querySelector(".dealer-deck");
    const userSlot = document.querySelector(".user-slot");
    const userDeckElement = document.querySelector(".user-deck");
    const text = document.querySelector(".round-outcome")


    let userDeck, dealerDeck;

    startGame()
    function startGame() {
      const deck = new Deck()
      deck.shuffle()

      const deckHalf = Math.ceil(deck.totalCards / 2)
      dealerDeck = new Deck(deck.cards.slice(0, deckHalf))
      userDeck = new Deck(deck.cards.slice(deckHalf, deck.totalCards))

      cleanBeforeStart()
    }
    
    function cleanBeforeStart() {
        dealerSlot.innerHTML = ""
        userSlot.innerHTML = ""
        text.innerHTML = ""

        updateDeckTotal()
    }

    function updateDeckTotal() {
        dealerDeckElement.innerHTML = dealerDeck.totalCards
        userDeckElement.innerHTML = userDeck.totalCards
    }

    //dealerSlot.appendChild(deck.cards[0].getHTML());
});
