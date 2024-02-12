// Définition des variables
let currentPlayer = 1; // Joueur actuel
let currentRoundScore = 0; // Score du tour actuel
let totalScores = [0, 0]; // Scores totaux des joueurs
let gamePlaying = true; // État du jeu (en cours ou terminé)

// Fonction pour gérer les actions des joueurs (lancer ou retenir)
function playerAction(action) {
    if (gamePlaying) {
        if (action === 'roll') {
            rollDice(); // Lancer le dé
        } else if (action === 'hold') {
            hold(); // Garder le score actuel
        }
    }
}

// Fonction pour lancer le dé
function rollDice() {
    if (gamePlaying) {
        const result = Math.floor(Math.random() * 6) + 1; // Générer un nombre aléatoire entre 1 et 6
        const roundScoreElement = document.getElementById(`round-score-${currentPlayer}`); // Élément du score du tour
        const diceImageElement = document.getElementById('dice'); // Élément de l'image du dé

        // Ajouter une classe pour déclencher l'animation de rotation du dé
        diceImageElement.classList.add('rolling');

        // Mettre à jour l'image du dé après un court délai
        setTimeout(() => {
            diceImageElement.src = `assets/dice/dice-${result}.png`;

            if (result !== 1) {
                currentRoundScore += result; // Ajouter le résultat au score du tour actuel
                roundScoreElement.textContent = currentRoundScore; // Mettre à jour l'affichage du score du tour
            } else {
                switchPlayer(); // Passer au joueur suivant si le dé affiche 1
            }

            // Supprimer la classe d'animation de rotation du dé
            diceImageElement.classList.remove('rolling');
        }, 500); // Durée de l'animation (500 ms)
    }
}

// Fonction pour retenir le score du tour actuel
function hold() {
    totalScores[currentPlayer - 1] += currentRoundScore; // Ajouter le score du tour actuel au score total du joueur
    document.getElementById(`total-score-${currentPlayer}`).textContent = totalScores[currentPlayer - 1]; // Mettre à jour l'affichage du score total

    if (totalScores[currentPlayer - 1] >= 100) {
        // Vérifier si le joueur a atteint ou dépassé 100 points
        document.getElementById(`player${currentPlayer}`).classList.add('winner'); // Ajouter la classe "winner" au joueur gagnant
        gamePlaying = false; // Mettre fin au jeu
    } else {
        switchPlayer(); // Passer au joueur suivant
    }
}

// Fonction pour passer au joueur suivant
function switchPlayer() {
    currentRoundScore = 0; // Réinitialiser le score du tour actuel à 0
    document.getElementById(`round-score-${currentPlayer}`).textContent = currentRoundScore; // Mettre à jour l'affichage du score du tour

    // Changer de joueur
    currentPlayer = (currentPlayer === 1) ? 2 : 1;

    // Mettre à jour l'affichage pour indiquer le joueur actif
    document.getElementById('dot1').style.display = (currentPlayer === 1) ? 'inline-block' : 'none';
    document.getElementById('dot2').style.display = (currentPlayer === 2) ? 'inline-block' : 'none';
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    // Réinitialiser toutes les variables et l'affichage
    currentPlayer = 1;
    currentRoundScore = 0;
    totalScores = [0, 0];
    gamePlaying = true;

    document.getElementById(`dice`).src = 'assets/dice/dice-1.png';
    document.getElementById(`round-score-1`).textContent = '0';
    document.getElementById(`round-score-2`).textContent = '0';
    document.getElementById(`total-score-1`).textContent = '0';
    document.getElementById(`total-score-2`).textContent = '0';
    document.getElementById(`player1`).classList.remove('winner');
    document.getElementById(`player2`).classList.remove('winner');
    document.getElementById(`dot1`).style.display = 'inline-block';
    document.getElementById(`dot2`).style.display = 'none';
}

// Initialisation du jeu
resetGame();
