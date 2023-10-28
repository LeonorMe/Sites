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
    showCard(0, 0, 0); // limpar cartas
    game = new BlackJack();
    
    dealer_new_card(true);
    dealer_new_card(false);
    player_new_card(true);

    buttons_initialization();

    debug(game);
}

function update_dealer(state) {
    let string = "Dealer: " + game.dealer_cards
    document.getElementById("gameStatus").innerHTML = game.get_game_state();
    
    if(game.state.gameEnded){

        string += " - " + (game.state.dealerWon ? "Won" : "Lost");
        finalize_buttons();
    }
    
    document.getElementById("dealer").innerHTML += string;
}

function update_player(state) {
    let string = "Player: " + game.player_cards;
    document.getElementById("gameStatus").innerHTML = game.get_game_state();

    if(game.state.gameEnded){
        string += " - " + (game.state.playerWon ? "Won" : "Lost");
        finalize_buttons();

        if(game.state.playerWon)
            winAnimation();
    }

    document.getElementById("player").innerHTML += string;
}

function dealer_new_card(isUp) {
    const state = game.dealer_move();
    update_dealer(state);
    
    document.getElementById("dealer").innerHTML = "Dealer: " + game.dealer_cards;
    showCard(game.dealer_cards[game.dealer_cards.length - 1], d, isUp);
    
    return game.state;
}


function player_new_card(isUp) {
    game.player_move();
    update_player();
    
    document.getElementById("player").innerHTML = "Player: " + game.player_cards;
    showCard(game.player_cards[game.player_cards.length - 1], p1, isUp);

    return game.state;
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

function showCard(card, player, isUp){
    switch(player){
        case p1:
            document.getElementById('playerCards').innerHTML += '<div class="row w-5">';
            if(isUp)
                document.getElementById('playerCards').innerHTML += '<img src="/PCMsites/TP2/img/svg/' + card.v + '_of_' + card.s + '.svg" alt="card" class="card">';
            else
                document.getElementById('playerCards').innerHTML += '<img src="/PCMsites/TP2/img/svg/back.svg" alt="card" class="card">';
            document.getElementById('playerCards').innerHTML += '</div>';
            break;
        case d:
            document.getElementById('dealerCards').innerHTML += '<div class="row w-5">';
            if(isUp)
                document.getElementById('dealerCards').innerHTML += '<img src="/PCMsites/TP2/img/svg/' + card.v + '_of_' + card.s + '.svg" alt="card" class="card">';
            else
                document.getElementById('dealerCards').innerHTML += '<img src="/PCMsites/TP2/img/svg/back.svg" alt="card" class="card">';
            document.getElementById('dealerCards').innerHTML += '</div>';
            break;
        default:
            document.getElementById('playerCards').innerHTML = "";
            document.getElementById('dealerCards').innerHTML = "";

    }
}

function winAnimation() {
    let playerCards = document.getElementById('playerCards');
    let dealerCards = document.getElementById('dealerCards');

    let playerCardsLeft = playerCards.offsetLeft;
    let playerCardsTop = playerCards.offsetTop;

    let dealerCardsLeft = dealerCards.offsetLeft;
    let dealerCardsTop = dealerCards.offsetTop;

    let playerCardsWidth = playerCards.offsetWidth;
    let playerCardsHeight = playerCards.offsetHeight;

    let dealerCardsWidth = dealerCards.offsetWidth;
    let dealerCardsHeight = dealerCards.offsetHeight;

    let playerCard1 = document.getElementById('playerCard1');
    let playerCard2 = document.getElementById('playerCard2');
    let playerCard3 = document.getElementById('playerCard3');
    let playerCard4 = document.getElementById('playerCard4');
    let playerCard5 = document.getElementById('playerCard5');
    let playerCard6 = document.getElementById('playerCard6');
    let playerCard7 = document.getElementById('playerCard7');
    let playerCard8 = document.getElementById('playerCard8');
    let playerCard9 = document.getElementById('playerCard9');
    let playerCard10 = document.getElementById('playerCard10');

    let dealerCard1 = document.getElementById('dealerCard1');
    let dealerCard2 = document.getElementById('dealerCard2');
    let dealerCard3 = document.getElementById('dealerCard3');
    let dealerCard4 = document.getElementById('dealerCard4');
    let dealerCard5 = document.getElementById('dealerCard5');
    let dealerCard6 = document.getElementById('dealerCard6');
    let dealerCard7 = document.getElementById('dealerCard7');
    let dealerCard8 = document.getElementById('dealerCard8');
    let dealerCard9 = document.getElementById('dealerCard9');
    let dealerCard10 = document.getElementById('dealerCard10');

    let playerCardsLeftFinal = dealerCardsLeft + dealerCardsWidth/2 - playerCardsWidth/2;
    let playerCardsTopFinal = dealerCardsTop + dealerCardsHeight/2 - playerCardsHeight/2;

    let dealerCardsLeftFinal = playerCardsLeft + playerCardsWidth/2 - dealerCardsWidth/2;
    let dealerCardsTopFinal = playerCardsTop + playerCardsHeight/2 - dealerCardsHeight/2;
}