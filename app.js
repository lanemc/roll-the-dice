/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables
var scores, roundScore, activePlayer, gamePlaying, previousRoll1, previousRoll2, winningScore;

init();

// btn-roll event listener and anonymous function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //console.log(dice + ' , ' + previousRoll);
        if (dice1 === 6 && dice2 === 6) {
            // Next player
            nextPlayer();
        }

        if (dice1 === 6 && previousRoll1 === 6) {
            // Next player
            nextPlayer();
        }
        else if (dice1 === 6 && previousRoll2 === 6) {
            // Next player
            nextPlayer();
        }
        else if (dice2 === 6 && previousRoll1 === 6) {
            // Next player
            nextPlayer();
        }
        else if (dice2 === 6 && previousRoll2 === 6) {
            // Next player
            nextPlayer();
        }

        //1.5. Save the value of the previous roll
        previousRoll1 = dice1;
        previousRoll2 = dice2;

        //2. Display result
        var diceDOM1 = document.querySelector('.dice-0');
        var diceDOM2 = document.querySelector('.dice-1');
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add dice value to roundScore
            roundScore += dice1 + dice2;
            //Update current score based on roundScore
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            // activePlayer wins
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById("winning-score").disabled = true;
            gamePlaying = false;
        }
        else {
            // Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    winningScore = 100;
    gamePlaying = true;

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}


function setWinningScore() {
    if(gamePlaying) {
        winningScore = document.getElementById('winning-score').value;
        console.log(winningScore);

        document.getElementById('score').textContent = winningScore;
        document.getElementById('winning-score').value = '';
    }
}

document.getElementById('set-score').addEventListener('click', setWinningScore);

// target HTML elements with id #current- and change the text to reflect current dice roll
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
























