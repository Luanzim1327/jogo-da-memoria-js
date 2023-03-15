const CARD = "card";
const FRONT = "card_front";
const BACK = "card_back";

const gameOverLayout = document.getElementById("gameOver");
const movesContainer = document.getElementById("moves");
const rankContainer = document.getElementById("rank");

let timerGame;

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards () {

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card , cardElement);

        cardElement.addEventListener("click" , flipCard);
        gameBoard.appendChild(cardElement);
    })
};

function createCardContent(card , cardElement) {
    
    createCardFace(FRONT , card , cardElement);
    createCardFace(BACK , card , cardElement);

}

function createCardFace (face , card , element) {
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);
    if(face === FRONT) {
        cardElementFace.innerHTML = `<img src="./assets/${card.icon}.png">`
    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace);
}

function flipCard() {

    if(game.setCard(this.id)) {
        this.classList.add("flip");
        
        if(game.secondCard) {
            if(game.checkMatch()) {
                if(game.gameOverCheck()) {
                    gameOverLayout.style.display = "flex";
                    movesContainer.innerHTML = `Moves : ${game.moves}`;
                    rankContainer.innerHTML = `Rank : ${game.checkRank()}`;
                }
                game.clearCards();
    
            }else {
                setTimeout(() => {
                    game.checkMoves();

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
        
                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");     
                    game.unflipCards();
                }, 1000);
            }     
        }

    }

}

function restartGame() {
    startGame();
    game.clearCards();
    game.clearMoves();
    gameOverLayout.style.display = "none";
}
