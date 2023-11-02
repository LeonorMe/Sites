//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;

class Card{
    constructor(value, suit) {
        if(value >= 1 && value <= 13){
            this.v = value;
        }
            
        if( suit >= 0 && suit <= 3){

            var ss = '';
            switch(suit){
                case 0:
                    ss = 'spades';
                    break;
                case 1:
                    ss = 'clubs';
                    break;
                case 2:
                    ss = 'hearts';
                    break;
                case 3:
                    ss = 'diamonds';
                    break;
            }
            this.s = ss;
        }
    }

    toString(){
        let value = this.v;
        let suit = this.s;

        switch(suit){
            case 'spades':
                suit = "♠";
                break;
            case 'clubs':
                suit = "♣";
                break;
            case 'hearts':
                suit = "♥";
                break;
            case 'diamonds':
                suit = "♦";
                break;
        }

        return value + suit + " ";
    }

}

class BlackJack{

    constructor() {
        this.deck = [];
        this.dealer_cards = [];
        this.player_cards = [];
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        this.new_deck = function () {
            const deck = [];
            
            for(let j=0; j<4; j++){
                for(let i=1; i<=13; i++){
                    deck.push(new Card(i, j));
                    //console.log(card0.toString());
                }
            }
            
            return deck;
        };

        this.shuffle = function (deck) {
            let m = deck.length, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                [deck[m], deck[i]] = [deck[i], deck[m]];
            }
            return deck;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    
    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let sum = 0;
        let aces = 0;

        cards.forEach(
            function (card) {
                var c = card.v;
                if(c == 1){
                    aces++;
                }
                else if(c > 10){
                    sum += 10;
                }
                else{
                    sum += c;
                }
            }
        )

        // aces
        if(aces > 0){
            sum += aces - 1
            sum = sum > 10 ? sum += 1 : sum += 11;
        }
        
        return sum;
    }

    dealer_move() {
        this.dealer_cards.push(this.deck.pop());
        return this.get_game_state();
    }

    player_move() {
        this.player_cards.push(this.deck.pop());
        return this.get_game_state();
    }

    get_game_state() {
        const playerPoints = this.get_cards_value(this.get_player_cards());
        const dealerPoints = this.get_cards_value(this.get_dealer_cards());

        var playerWon = playerPoints === MAX_POINTS;
        this.state.playerBusted = playerPoints > MAX_POINTS;
        var dealerBusted = dealerPoints > MAX_POINTS && this.dealerTurn;
        this.state.dealerWon = dealerPoints > playerPoints && this.dealerTurn && !dealerBusted;

        this.state.gameEnded = this.state.dealerWon || this.state.playerBusted || playerWon || dealerBusted;

        return this.state;
    }
}
