//Blackjack oop

let game = null;
/*
function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
} */

function buttons_initialization() {
  document.getElementById("card").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
  document.getElementById("card").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("new_game").disabled = false;

  if (game.state.playerWon) winAnimation();
}

//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS
function new_game() {
  showCard(0, 0, 0); // limpar cartas
  game = new BlackJack();

  dealer_new_card(true);
  dealer_new_card(false);
  player_new_card(true);

  buttons_initialization();

  //debug(game);
}

function update_dealer(state) {
  /*
    let string = "Dealer: " + game.dealer_cards
    
    if(game.state.gameEnded){
        string += " - " + (game.state.dealerWon ? "Won" : "Lost");
        finalize_buttons();
    }
    
    document.getElementById("dealer").innerHTML = string;
    */

  if (game.state.gameEnded) {
    finalize_buttons();
  }

  showState();
}

function update_player(state) {
  /*
    let string = "Player: " + game.player_cards;

    if(game.state.gameEnded){
        string += " - " + (game.state.playerBusted ? "Lost" : "Won");
        finalize_buttons();

        if(game.state.playerWon)
            winAnimation();
    }

    document.getElementById("player").innerHTML = string;
    */

  if (game.state.gameEnded) {
    finalize_buttons();
  }

  document.getElementById("player").innerHTML =
    "Count: " + game.get_cards_value(game.get_player_cards());

  showState();
}

function dealer_new_card(isUp) {
    const state = game.dealer_move();
    update_dealer(state);

    console.log(game.dealer_cards[game.dealer_cards.length - 1].toString());

    //document.getElementById("dealer").innerHTML = "Dealer: " + game.dealer_cards;
    showCard(game.dealer_cards[game.dealer_cards.length - 1], "d", isUp);
    return game.state;
}

function player_new_card(isUp) {
    game.player_move();
    update_player();

  //console.log(game.dealer_cards[game.dealer_cards.length - 1].toString())

  //document.getElementById("player").innerHTML = "Player: " + game.player_cards;
    showCard(game.player_cards[game.player_cards.length - 1], "p1", isUp);

    return game.state;
}

function dealer_finish() {
    game.DealerTurn = true;

    // show dealer hiden card
    card0 = game.dealer_cards[game.dealer_cards.length - 1];
    document.getElementById("hidenDealerCard").innerHTML = "";
    document.getElementById("hidenDealerCard").innerHTML +=
    '<img src="/PCMsites/TP2/img/svg/' + getValueStr(card0) + "_of_" + card0.s + '.svg" alt="card" class="card">';

    // show dealer count
    let dealerPoints = game.get_cards_value(game.get_dealer_cards());
    document.getElementById("dealer").innerHTML = "Count: " + dealerPoints;

    let playerPoints = game.get_cards_value(game.get_player_cards());

    game.get_game_state();

    if (dealerPoints > 21) {
        game.state.playerWon = true;
        game.state.gameEnded = true;

        showState();
    } else if (dealerPoints > 16) {
        game.state.gameEnded = true;

        if (playerPoints > dealerPoints) {
            game.state.playerWon = true;
            console.log("player won");
        } else if (playerPoints < dealerPoints) {
            game.state.dealerWon = true;
            console.log("dealer won");
        } else {
            game.state.gameEnded = true;
            game.state.playerWon = false;
            game.state.dealerWon = false;
            console.log("draw");
        }

        showState();
    } 
    else {
    while (dealerPoints < 17) {
        dealer_new_card(true);
        dealerPoints = game.get_cards_value(game.get_dealer_cards());
        document.getElementById("dealer").innerHTML = "Count: " + dealerPoints;
      //game.get_game_state();
    }
    game.state.gameEnded = true;
    
    if (dealerPoints > 21) {
        game.state.playerWon = true;
        
    } else if (dealerPoints > 16) {
        game.state.gameEnded = true;

        if (playerPoints > dealerPoints) {
            game.state.playerWon = true;
            console.log("player won");
        } else if (playerPoints < dealerPoints) {
            game.state.dealerWon = true;
            console.log("dealer won");
        } else {
            game.state.gameEnded = true;
            game.state.playerWon = false;
            game.state.dealerWon = false;
            console.log("draw");
        }
    }

    showState();
}

    //game.get_game_state();
    /*
    while(!game.state.gameEnded){
        console.log("dealer move");
        dealer_new_card(true);
        game.get_game_state();
    } */

    game.DealerTurn = false;
    update_dealer(game.state);
}

// TODO adicionar auxiliares se necessario

function showCard(card, player, isUp) {
  str =
    '<img src="/PCMsites/TP2/img/svg/' +
    getValueStr(card) +
    "_of_" +
    card.s +
    '.svg" alt="card" class="card">';
  switch (player) {
    case "p1":
      document.getElementById("playerCards").innerHTML +=
        '<div class="col text-center">' + str + "</div>";
      break;
    case "d":
      if (isUp) {
        document.getElementById("dealerCards").innerHTML +=
          '<div class="col text-center">' + str + "</div>";
      } else {
        document.getElementById("dealerCards").innerHTML +=
          '<div class="col text-center" id="hidenDealerCard">' +
          '<img src="/PCMsites/TP2/img/svg/card_back.svg" alt="card" class="card">' +
          "</div>";
      }
      break;
    default:
      document.getElementById("playerCards").innerHTML = "";
      document.getElementById("dealerCards").innerHTML = "";
  }
}

function getValueStr(card) {
  switch (card.v) {
    case 1:
      return "ace";
    case 11:
      return "jack";
    case 12:
      return "queen";
    case 13:
      return "king";
    default:
      return card.v;
  }
}

function showState() {
  if (game.state.gameEnded) {
    if (game.state.dealerWon)
      document.getElementById("gameStatus").innerHTML = "Dealer Won ";
    else if (game.state.playerBusted)
      document.getElementById("gameStatus").innerHTML = "Player Busted ";
    else {
      document.getElementById("gameStatus").innerHTML = "Player Won ";
      winAnimation();
    }
    document.getElementById("gameStatus").style.color = "#00ff00";
  } else {
    document.getElementById("gameStatus").innerHTML = "Game in progress";
    document.getElementById("gameStatus").style.color = "silver";
  }
}

function winAnimation() {
    game.get_dealer_cards().forEach(card => {
        document.getElementById("body").style.backgroundImage = "url('/PCMsites/TP2/img/svg/black_joker.svg')";
    });
}
