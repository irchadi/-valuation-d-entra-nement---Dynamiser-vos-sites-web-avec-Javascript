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
    if (gamePlaying) {
        const result = Math.floor(Math.random() * 6) + 1;
        const roundScoreElement = document.getElementById(`round-score-${currentPlayer}`);
        const diceImageElement = document.getElementById('dice');

        // Ajoutez une classe pour déclencher la transition
        diceImageElement.classList.add('rolling');

        // Mettez à jour l'attribut src de l'image en fonction du résultat après un court délai
        setTimeout(() => {
            diceImageElement.src = `assets/dice/dice-${result}.png`;

            if (result !== 1) {
                currentRoundScore += result;
                roundScoreElement.textContent = currentRoundScore;
            } else {
                switchPlayer();
            }

            // Supprimez la classe de transition
            diceImageElement.classList.remove('rolling');
        }, 500); // 500ms est le même temps que la durée de la transition dans le CSS
    }
}

function hold() {
    totalScores[currentPlayer - 1] += currentRoundScore;
    document.getElementById(`total-score-${currentPlayer}`).textContent = totalScores[currentPlayer - 1];

    if (totalScores[currentPlayer - 1] >= 100) {
        document.getElementById(`player${currentPlayer}`).classList.add('winner');
        document.getElementById(`player${currentPlayer}`).getElementsByTagName('h2')[0].textContent = 'Winner !';
        gamePlaying = false;
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentRoundScore = 0;
    document.getElementById(`round-score-${currentPlayer}`).textContent = currentRoundScore;

    // Mettez à jour le joueur actif
    currentPlayer = (currentPlayer === 1) ? 2 : 1;

    // Mettez à jour l'affichage pour indiquer le joueur actif
    document.getElementById('dot1').style.display = (currentPlayer === 1) ? 'inline-block' : 'none';
    document.getElementById('dot2').style.display = (currentPlayer === 2) ? 'inline-block' : 'none';
}

function resetGame() {
    currentPlayer = 1;
    currentRoundScore = 0;
    totalScores = [0, 0];
    gamePlaying = true;

    document.getElementById(`dice`).src = 'assets/dice/dice-1.png';

    document.getElementById(`round-score-1`).textContent = '0';
    document.getElementById(`round-score-2`).textContent = '0';

    document.getElementById(`total-score-1`).textContent = '0';
    document.getElementById(`total-score-2`).textContent = '0';

    // Retirer la classe "winner" des deux joueurs
    document.getElementById(`player1`).classList.remove('winner');
    document.getElementById(`player2`).classList.remove('winner');

    // Remettre en place le point rouge pour le premier joueur
    document.getElementById(`dot1`).style.display = 'inline-block';
    document.getElementById(`dot2`).style.display = 'none';
}

// Initialisation du jeu
resetGame();
