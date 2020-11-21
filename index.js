document.addEventListener("DOMContentLoaded", function(){
    
    const dealerSlot = document.querySelector(".dealer-slot")
    
    const deck = new Deck()
    deck.shuffle()
    console.log(deck)
    
    

    dealerSlot.appendChild(deck.cards[0].getHTML())
})
