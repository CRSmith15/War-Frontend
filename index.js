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
    };
    
    const dealerSlot = document.querySelector(".dealer-slot");
    const dealerDeckElement = document.querySelector(".dealer-deck");
    const userSlot = document.querySelector(".user-slot");
    const userDeckElement = document.querySelector(".user-deck");
    const text = document.querySelector(".round-outcome");
    const gameContainer = document.querySelector(".game-container");
    const userPairs = document.querySelector(".user-pairs");
    const dealerPairs = document.querySelector(".dealer-pairs");


    let userDeck, dealerDeck, inGame, stop, userWonPile, dealerWonPile;

    gameContainer.addEventListener("click", () => {
        if (stop) {
            startGame()
            return
        }


        if (inGame) {
            cleanBeforeStart()
        } else {
            flipCards()
        }
    });

    startGame()
    function startGame() {
      const deck = new Deck()
      deck.shuffle()

      const deckHalf = Math.ceil(deck.totalCards / 2)
      dealerDeck = new Deck(deck.cards.slice(0, deckHalf))
      userDeck = new Deck(deck.cards.slice(deckHalf, deck.totalCards))
      inGame = false 
      stop = false
      userWonPile = []
      userPairs.innerHTML = `Your Win Pile: ${userWonPile.length}`
      dealerWonPile = []
      dealerPairs.innerHTML = `Dealer's Win Pile: ${dealerWonPile.length}`

      cleanBeforeStart()
    };
    
    function cleanBeforeStart() {
        inGame = false
        dealerSlot.innerHTML = ""
        userSlot.innerHTML = ""
        text.innerHTML = ""

        updateDeckTotal()
    };

    function flipCards() {
        inGame = true 
        const dealerCard = dealerDeck.pop()
        const userCard = userDeck.pop()

        dealerSlot.appendChild(dealerCard.getHTML())
        userSlot.appendChild(userCard.getHTML())

        updateDeckTotal()

        if (roundWinner(userCard, dealerCard)) {
            text.innerHTML = "Round Won!"
            userWonPile.push(userCard, dealerCard)
            userPairs.innerHTML = `Your Win Pile: ${userWonPile.length}`
        } else if (roundWinner(dealerCard, userCard)){
            text.innerHTML = "Round Lost"
            dealerWonPile.push(dealerCard, userCard)
            dealerPairs.innerHTML = `Dealer's Win Pile: ${dealerWonPile.length}`
        } else {
            text.innerHTML = "Tie"
        }

        if (gameOver(userDeck)){
            gameWinner(userWonPile, dealerWonPile)
            stop = true
        }
    };

    function updateDeckTotal() {
        dealerDeckElement.innerHTML = dealerDeck.totalCards
        userDeckElement.innerHTML = userDeck.totalCards
    };

    function roundWinner(cardOne, cardTwo) {
        return CARD_VALUES[cardOne.value] > CARD_VALUES[cardTwo.value]
    };

    function gameOver(deck) {
        return deck.totalCards === 0
    };

    function gameWinner(pileOne, pileTwo) {
        if (pileOne.length > pileTwo.length) {
            text.innerHTML = "Game Over, You Win!"
        } else if (pileTwo.length > pileOne.length) {
            text.innerHTML = "Game Over, Dealer Won."
        } else {
            text.innerHTML = "It's a Draw."
        }
    }

    //dealerSlot.appendChild(deck.cards[0].getHTML());
});
