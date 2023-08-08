let playerScore = 0;
let computerScore = 0;
let roundsToWin = 3; // Número de rondas por defecto
let gameMode = 'pvc'; // Modo de juego por defecto
let roundsPlayed = 0;
let secondPlayerSelection = null;

function computerPlay() {
    const options = ['piedra', 'papel', 'tijeras'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function play(playerSelection) {
    const computerSelection = gameMode === 'pvc' ? computerPlay() : secondPlayerSelection;
    const resultText = document.getElementById('resultText');

    if (gameMode === 'pvp' && secondPlayerSelection === null) {
        resultText.textContent = "¡Esperando la selección del segundo jugador...";
        return;
    }

    if (playerSelection === computerSelection) {
        resultText.textContent = "¡Empate! Ambos eligieron " + playerSelection + ".";
    } else if (
        (playerSelection === 'piedra' && computerSelection === 'tijeras') ||
        (playerSelection === 'papel' && computerSelection === 'piedra') ||
        (playerSelection === 'tijeras' && computerSelection === 'papel')
    ) {
        playerScore++;
        resultText.textContent = "¡Ganaste! " + playerSelection + " vence a " + computerSelection + ".";
    } else {
        computerScore++;
        resultText.textContent = "¡Perdiste! " + computerSelection + " vence a " + playerSelection + ".";
    }

    roundsPlayed++;
    updateScore();
    checkGameEnd();
}

function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

function checkGameEnd() {
    if (playerScore >= Math.ceil(roundsToWin / 2)) {
        showGameOver("¡Ganaste el juego!");
    } else if (computerScore >= Math.ceil(roundsToWin / 2)) {
        showGameOver("Perdiste el juego. ¡Inténtalo de nuevo!");
    } else if (roundsPlayed >= roundsToWin) {
        showGameOver("El juego ha terminado. ¡Ha sido un empate!");
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    updateScore();
    document.getElementById('gameOver').style.display = "none";
}

function showGameOver(message) {
    document.getElementById('gameOver').textContent = message;
    document.getElementById('gameOver').style.display = "block";
    document.getElementById('options').style.display = "none";
}

function startGame() {
    resetGame();
    roundsToWin = parseInt(document.getElementById('rounds').value);
    gameMode = document.querySelector('input[name="gameMode"]:checked').value;
    secondPlayerSelection = null; // Reiniciamos la selección del segundo jugador
    document.getElementById('options').style.display = "flex";
    document.getElementById('gameOver').style.display = "none";
    const resultText = document.getElementById('resultText');
    resultText.textContent = "¡Inicia el juego!";
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rounds').addEventListener('change', function() {
        roundsToWin = parseInt(this.value);
        resetGame();
    });

    document.getElementsByName('gameMode').forEach(function(radio) {
        radio.addEventListener('change', function() {
            gameMode = this.value;
            resetGame();
        });
    });

    document.getElementById('startButton').addEventListener('click', function() {
        startGame();
    });

    updateScore();
});

function back(){
    location.href="index.html"
}
