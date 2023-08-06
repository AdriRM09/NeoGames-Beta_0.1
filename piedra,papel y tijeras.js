let playerScore = 0;
let computerScore = 0;
let roundsToWin = 3; 
let gameMode = 'pvc'; 
let roundsPlayed = 0;

function computerPlay() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function play(playerSelection) {
    const computerSelection = gameMode === 'pvc' ? computerPlay() : prompt("Ingresa la opción de tu oponente (piedra, papel o tijeras):").toLowerCase();
    const resultText = document.getElementById('resultText');

    if (playerSelection === computerSelection) {
        resultText.textContent = "¡Empate! Ambos eligieron " + playerSelection + ".";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
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
    gameMode = document.getElementById('gameMode').value;
    document.getElementById('options').style.display = "flex";
    document.getElementById('gameOver').style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rounds').addEventListener('change', function() {
        roundsToWin = parseInt(this.value);
    });

    document.getElementById('gameMode').addEventListener('change', function() {
        gameMode = this.value;
        resetGame();
    });

    updateScore();
});

function back(){
    location.href="Menu.html"
}