/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables
var scores, roudScore, activePlayer; 

// assign initial values
score = [0,0];
roundScore = 0;
activePlayer = 1;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// btn-roll event listener and anonymous function
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT 1
    if (dice !== 1) {
        //Add dice value to roundScore
        roundScore += dice;
        //Update current score based on roundScore
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
        //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }

});


// target HTML elements with id #current- and change the text to reflect current dice roll
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
























