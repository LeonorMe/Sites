//Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
    document.getElementById("card").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
    document.getElementById("card").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS
function new_game() {
    // TODO mostrar cartas no ecra
    game = new BlackJack();

    game.dealer_move();
    game.dealer_move(); // mostrar voltada para baixo - X
    game.player_move();

    buttons_initialization();

    debug(game);
}

function update_dealer(state) {
    let string = "Dealer: " + game.dealer_cards
    
    if(game.state.gameEnded){

        string += " - " + (game.state.dealerWon ? "Won" : "Lost");

        document.getElementById("dealer").innerHTML = string;

        finalize_buttons();
    }
}

function update_player(state) {
    let string = "Player: " + game.player_cards

    if(game.state.gameEnded){

        string += " - " + (game.state.playerWon ? "Won" : "Lost");

        document.getElementById("player").innerHTML = string;

        finalize_buttons();
    }
}

function dealer_new_card() {
    game.dealer_move();
    update_dealer();
    return game.state;
}

// TODO atualizar interface
function player_new_card() {
    game.player_move();
    update_player();
    return game.state;
}

function dealer_finish() {
    /*
    Esta função chama o método get_game_state() da classe “blackJack” e
    coloca a “true” a variável “DealerTurn da classe “BlackJack”. Depois é criado
    um ciclo até que o jogo termine (state.gameEnded). Nesse ciclo, é atualizado
    o dealer, realizada uma jogada do dealer e atualizado o estado do jogo em cada
    iteração.
    */

    BlackJack.DealerTurn = true;
}

// TODO adicionar auxiliares se necessario