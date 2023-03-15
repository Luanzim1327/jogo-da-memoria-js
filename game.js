let game = {

    lockMode : false,
    firstCard : null,
    secondCard : null,
    
    moves : 0,

    setCard : function (id) {

        let card = this.cards.filter((card) => card.id === id)[0];

        if(card.flipped || this.lockMode) {
            return false;
        }

        if(!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

        

    },

    checkMatch : function () {
        if(!this.firstCard || !this.secondCard) {
            return false;
        }

        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards : function () {
        this.lockMode = false;
        this.firstCard = null;
        this.secondCard = null;
    },

    unflipCards : function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkRank : function () {

        if(this.moves <= 13) {
            return "Perfect";
        } 

        if(this.moves <= 16) {
            return "Very Good";
        }

        if(this.moves <= 20) {
            return "Good";
        }

        if(this.moves > 20) {
            return "Bad";
        }

    },

    checkMoves : function () {
        return this.moves++
    },
    
    clearMoves: function () {
        this.moves = 0;
    },

    gameOverCheck : function () {
        return this.cards.filter(card => !card.flipped).length === 0;
    },

    techs : [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"
    ],

    cards : null,

    shuffleCards : function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
    
            [this.cards[randomIndex] , this.cards[currentIndex]] = [this.cards[currentIndex] , this.cards[randomIndex]]
        }
    },
    
    createCardsFromTechs : function () {
        this.cards = []
    
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },
    
    createPairFromTech : function  (tech) {
        return [
            {
                id : this.createIdWithTech(tech),
                icon : tech,
                flipped:false,
            },
            {
                id : this.createIdWithTech(tech),
                icon : tech,
                flipped:false,
            },
        ]
    },

    createIdWithTech : function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },


}