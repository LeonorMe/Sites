//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;

// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            const deck = [];

            for(let i=0; i<52; i++){
                console.log('Value', i);
                deck.push(i%13 + 1);

            }

            console.log('Deck:', deck)
            return deck
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
                if(card === 1){
                    aces++;
                }
                else if(card > 10){
                    sum += 10;
                }
                else{
                    sum += card;
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
        // (0) o jogo não terminou
        // (1) jogador fazer 21 pontos
        // (2) jogador fazer > 21 pontos
        // (3) dealer fazer mais pontos que o jogador
        // (4) dealer fazer > 21 pontos

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