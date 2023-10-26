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
    game = new BlackJack();

    dealer_new_card();
    dealer_new_card(); // mostrar voltada para baixo - X
    player_new_card();

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
    const state = game.dealer_move();
    update_dealer(state);
    
    // TODO atualizar interface
    document.getElementById("dealer").innerHTML = "Dealer: " + game.dealer_cards;
    //.getElementById('dealerCard1').attr('src', '/PCMsites/TP2/img/svg/' + game.dealer_cards[0] + '_of_spades.png');
    document.getElementById('dealerCard1').src = '/PCMsites/TP2/img/svg/2_of_spades.svg';
    document.getElementById('dealerCard1').style = 'opacity:1';

    return game.state;
}


function player_new_card() {
    game.player_move();
    update_player();
    
    document.getElementById("player").innerHTML = "Player: " + game.player_cards;

    //document.getElementById('playerCard1').attr('src', '/PCMsites/TP2/img/svg/' + game.dealer_cards[0] + '_of_spades.png');
    document.getElementById('playerCard1').src = '/PCMsites/TP2/img/svg/2_of_spades.svg';
    document.getElementById('playerCard1').style = 'opacity:1';

    return game.state; // ??
}

function dealer_finish() {
    game.get_game_state();
    game.DealerTurn = true;
    while(!game.state.gameEnded){
        game.dealer_move();
        update_dealer();
        game.get_game_state();
    }

    BlackJack.DealerTurn = true;
}

// TODO adicionar auxiliares se necessario