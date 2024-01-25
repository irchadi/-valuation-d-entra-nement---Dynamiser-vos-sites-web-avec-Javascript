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

    // Supprimez le point rouge pour tous les joueurs
    document.getElementById('dot1').style.display = 'none';
    document.getElementById('dot2').style.display = 'none';

    // Mettez à jour le joueur actif et affichez le point rouge
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
    document.getElementById(`dot${currentPlayer}`).style.display = 'inline-block';

    // Basculez les classes actives pour les joueurs
    document.getElementById(`player1`).classList.toggle('active');
    document.getElementById(`player2`).classList.toggle('active');
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

    // Réinitialiser les noms des joueurs
    document.getElementById(`player1`).getElementsByTagName('h2')[0].textContent = 'Joueur 1';
    document.getElementById(`player2`).getElementsByTagName('h2')[0].textContent = 'Joueur 2';

    // Remettre en place le point rouge pour le premier joueur
    document.getElementById('dot1').style.display = 'inline-block';
    document.getElementById('dot2').style.display = 'none';

    // Ajouter la classe "active" au premier joueur
    document.getElementById(`player1`).classList.add('active');
    document.getElementById(`player2`).classList.remove('active');
}

