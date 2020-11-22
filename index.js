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
    const userNameForm = document.querySelector(".login-form");
    const userNameInput = document.querySelector("#login-field");
    const rightMenu = document.querySelector(".right-menu-nav");
    const rulesDiv = document.querySelector(".rules-div");
    const gameRulesIcon = document.querySelector(".game-rules");
    const userHistory = document.querySelector(".match-history");


    let userDeck, dealerDeck, inGame, stop, userWonPile, dealerWonPile, userName;
    let loggedIn = false

    userNameInput.focus()
    rulesDiv.hidden = true
    userHistory.hidden = true
    gameRulesIcon.addEventListener("click", showRules, {once : true})
    

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

    userNameForm.addEventListener('submit', x => {
        x.preventDefault()
        let user = userNameInput.value 
        let body = {name: user}

        if(user){
            adapter.createUser(body).then(res => {
                loggedIn = true
                userName = user 
                userNameForm.hidden = true
                const matchHistory = document.createElement('div')
                matchHistory.className = "match-history"
                matchHistory.innerHTML = "Match History"
                rightMenu.appendChild(matchHistory)
                matchHistory.addEventListener("click", showHistory)
                const logout = document.createElement('a')
                logout.href = "javascript:window.location.reload(true)"
                logout.className = "item"
                logout.id = "logout"
                logout.innerHTML = 'Logout'
                rightMenu.appendChild(logout)

            })
        } else {
            alert("Enter a username to login")
        }
    }, {once : true})

    function showRules() {
        rulesDiv.hidden = false
        const gameRulesDiv = document.createElement("div")
        gameRulesDiv.className = "game-rules-div"
        gameRulesDiv.innerHTML = "Rules of War!"
        document.getElementsByClassName(".game-rules").style = "underline"
        rulesDiv.appendChild(gameRulesDiv)
        const rulesDescription = document.createElement("div")
        rulesDescription.className = "rules-description"
        rulesDescription.innerHTML = "Welcome to a verison of the classic Card game of War! The rules are simple. You play against the dealer and flip over the top card of your deck. The one with the higher value card wins the cards and addes them to the win pile. Whoever has the most in their win pile after all the cards in the deck have been flipped is the winner! Good Luck!"
        gameRulesDiv.appendChild(rulesDescription)
    }

    function showHistory() {
        const gameHistoryDiv = document.createElement("div")
        userHistory.hidden = false
        gameHistoryDiv.className = "history-div"
        gameHistoryDiv.innerHTML = "Match History goes here"
        userHistory.appendChild(gameHistoryDiv)
    }

    //dealerSlot.appendChild(deck.cards[0].getHTML());
});
