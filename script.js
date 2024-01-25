let currentPlayer = 1;
let currentRoundScore = 0;
let totalScores = [0, 0];
let gamePlaying = true;

function playerAction(action) {
    if (gamePlaying) {
        if (action === 'roll') {
            rollDice();
        } else if (action === 'hold') {
            hold();
        }
    }
}

function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;

    const roundScoreElement = document.getElementById(`round-score-${currentPlayer}`);
    const diceImageElement = document.getElementById('dice');

    // Mettez à jour l'attribut src de l'image en fonction du résultat
    diceImageElement.src = `assets/dice/dice-${result}.png`;

    if (result !== 1) {
        currentRoundScore += result;
        roundScoreElement.textContent = currentRoundScore;
    } else {
        switchPlayer();
    }
}

function hold() {
    totalScores[currentPlayer - 1] += currentRoundScore;
    document.getElementById(`total-score-${currentPlayer}`).textContent = totalScores[currentPlayer - 1];

    if (totalScores[currentPlayer - 1] >= 100) {
        document.getElementById(`player${currentPlayer}`).classList.add('winner');
        gamePlaying = false;
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentRoundScore = 0;
    document.getElementById(`round-score-${currentPlayer}`).textContent = currentRoundScore;

    currentPlayer = (currentPlayer === 1) ? 2 : 1;

    document.getElementById(`player1`).classList.toggle('active');
    document.getElementById(`player2`).classList.toggle('active');
}

function resetGame() {
    currentPlayer = 1;
    currentRoundScore = 0;
    totalScores = [0, 0];
    gamePlaying = true;

    document.getElementById(`dice`).src = 'assets/dice-1.png';

    document.getElementById(`round-score-1`).textContent = '0';
    document.getElementById(`round-score-2`).textContent = '0';

    document.getElementById(`total-score-1`).textContent = '0';
    document.getElementById(`total-score-2`).textContent = '0';

    document.getElementById(`player1`).classList.remove('winner');
    document.getElementById(`player2`).classList.remove('winner');
    document.getElementById(`player1`).classList.add('active');
    document.getElementById(`player2`).classList.remove('active');
}