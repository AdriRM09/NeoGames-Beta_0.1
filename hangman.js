document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.getElementById("menu-container");
    const playGameButton = document.getElementById("play-game-btn");
    const storyButton = document.getElementById("story-btn");
    const ruleButton = document.getElementById("rule-btn");
    const descriptionButton = document.getElementById("description-btn");
    const gameContainer = document.getElementById("game-container");
    const wordInput = document.getElementById("word-input");
    const hintInput = document.getElementById("hint-input");
    const startButton = document.getElementById("start-btn");
    const wordDisplay = document.getElementById("word-display");
    const hangman = document.getElementById("hangman");
    const keyboard = document.getElementById("keyboard");
    const message = document.getElementById("message");
    const returnToMenuBtn = document.getElementById("return-to-menu-btn");
    const storyContainer = document.getElementById("story-container");
    const returnFromStoryBtn = document.getElementById("return-from-story-btn");
    const ruleContainer = document.getElementById("rule-container");
    const returnFromRuleBtn = document.getElementById("return-from-rule-btn");
    const descriptionContainer = document.getElementById("description-container");
    const returnFromDescriptionBtn = document.getElementById("return-from-description-btn");
    const victoryContainer = document.getElementById("victory-container");
    const defeatContainer = document.getElementById("defeat-container");
    const victoryWordSpan = document.getElementById("victory-word");
    const defeatWordSpan = document.getElementById("defeat-word");
    const playAgainBtns = document.querySelectorAll("[id^='play-again-btn']");

    let wordToGuess = "";
    let wordWithBlanks = [];
    let hangmanParts = 0;
    let isGameOver = false;

    function resetGame() {
        wordInput.value = "";
        hintInput.value = "";
        wordToGuess = "";
        wordWithBlanks = [];
        hangmanParts = 0;
        isGameOver = false;
        wordInput.classList.remove("hidden");
        hintInput.classList.remove("hidden"); 
        startButton.classList.remove("hidden");
        startButton.disabled = false; 
        wordDisplay.textContent = "";
        wordDisplay.classList.add("hidden");
        hangman.innerHTML = ""; 
        message.textContent = "";
        returnToMenuBtn.classList.add("hidden");
        gameContainer.classList.add("hidden");
        menuContainer.classList.remove("hidden");
    }

    function hideHintInput() {
        hintInput.classList.add("hidden");
    }

    function startGame() {
        const word = wordInput.value.trim().toLowerCase();
        if (word === "") {
            return;
        }

        if (word.length > 15) {
            alert("La palabra no debe contener más de 15 letras.");
            return;
        }

        wordToGuess = word;
        wordWithBlanks = Array(word.length).fill("_");

        const hintLetter = hintInput.value.trim().toLowerCase();

        if (hintLetter.length === 1 && wordToGuess.includes(hintLetter)) {
            for (let i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === hintLetter) {
                    wordWithBlanks[i] = hintLetter;
                }
            }
        }

        wordInput.classList.add("hidden");
        hintInput.classList.add("hidden");
        startButton.classList.add("hidden");
        startButton.disabled = true; 
        keyboard.innerHTML = generateKeyboard();

        isGameOver = false;
        message.textContent = "";
        updateWordDisplay();
        hideHintInput();

        drawHangman(hangmanParts);
        hangman.style.display = "block";
    }

    function generateKeyboard() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let keyboardHTML = "";
        for (let letter of alphabet) {
            keyboardHTML += `<button>${letter}</button>`;
        }
        return keyboardHTML;
    }

    function updateWordDisplay() {
        wordDisplay.textContent = wordWithBlanks.join(" ");
    }

    function drawHangman(attempts) {
        const hangmanPartsArray = [
            `<circle cx="150" cy="140" r="40" stroke="black" stroke-width="3" fill="transparent" />`, // cabeza
            `<line x1="150" y1="180" x2="150" y2="280" stroke="black" stroke-width="3" />`, // torso
            `<line x1="150" y1="200" x2="120" y2="230" stroke="black" stroke-width="3" />`, // brazo izquierdo
            `<line x1="150" y1="200" x2="180" y2="230" stroke="black" stroke-width="3" />`, // brazo derecho
            `<line x1="150" y1="280" x2="130" y2="330" stroke="black" stroke-width="3" />`, // pierna izquierda
            `<line x1="150" y1="280" x2="170" y2="330" stroke="black" stroke-width="3" />` // pierna derecha
        ];

        hangman.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 300 400">
            <line x1="50" y1="350" x2="50" y2="50" stroke="black" stroke-width="3" /> <!-- poste vertical -->
            <line x1="50" y1="50" x2="200" y2="50" stroke="black" stroke-width="3" /> <!-- poste horizontal -->
            <line x1="150" y1="50" x2="150" y2="100" stroke="black" stroke-width="3" /> <!-- barra horizontal superior -->
            ${hangmanPartsArray.slice(0, attempts).join("")}
        </svg>`;
    }

    function toggleKeyboardVisibility() {
        if (isGameOver) {
            keyboard.classList.add("hidden");
        } else {
            keyboard.classList.remove("hidden");
        }
    }

    function checkLetter(letter) {
        let letterFound = false;
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                wordWithBlanks[i] = letter;
                letterFound = true;
            }
        }

        if (!letterFound) {
            hangmanParts++;
            drawHangman(hangmanParts);
        }

        updateWordDisplay();
        if (wordWithBlanks.join("") === wordToGuess) {
            message.textContent = "¡Felicidades! ¡Has ganado!";
            isGameOver = true;
            showVictoryMessage();
        } else if (hangmanParts === 6) {
            message.textContent = "GAME OVER. La palabra era: " + wordToGuess;
            isGameOver = true;
            showDefeatMessage();
        }

        toggleKeyboardVisibility();
    }

    function onlyLetters(event) {
        const charCode = event.which ? event.which : event.keyCode;
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            return true; 
        } else {
            event.preventDefault();
            return false; 
        }
    }

    function showVictoryMessage() {
        victoryWordSpan.textContent = wordToGuess;
        gameContainer.classList.add("hidden");
        victoryContainer.classList.remove("hidden");
    }

    function showDefeatMessage() {
        defeatWordSpan.textContent = wordToGuess;
        gameContainer.classList.add("hidden");
        defeatContainer.classList.remove("hidden");
    }

    playGameButton.addEventListener("click", function () {
        menuContainer.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        returnToMenuBtn.classList.remove("hidden");
        wordDisplay.classList.remove("hidden");
        keyboard.classList.remove("hidden");
    });

    storyButton.addEventListener("click", function () {
        menuContainer.classList.add("hidden");
        storyContainer.classList.remove("hidden");
    });

    ruleButton.addEventListener("click", function () {
        menuContainer.classList.add("hidden");
        ruleContainer.classList.remove("hidden");
    });

    descriptionButton.addEventListener("click", function () {
        menuContainer.classList.add("hidden");
        descriptionContainer.classList.remove("hidden");
    });

    startButton.addEventListener("click", startGame);

    keyboard.addEventListener("click", function (event) {
        if (event.target.nodeName === "BUTTON" && !isGameOver) {
            const letter = event.target.textContent;
            event.target.disabled = true;
            checkLetter(letter);
        }
    });

    returnToMenuBtn.addEventListener("click", resetGame);

    returnFromStoryBtn.addEventListener("click", function () {
        storyContainer.classList.add("hidden");
        menuContainer.classList.remove("hidden");
    });

    returnFromRuleBtn.addEventListener("click", function () {
        ruleContainer.classList.add("hidden");
        menuContainer.classList.remove("hidden");
    });

    returnFromDescriptionBtn.addEventListener("click", function () {
        descriptionContainer.classList.add("hidden");
        menuContainer.classList.remove("hidden");
    });

    playAgainBtns.forEach((btn) => {
btn.addEventListener("click", function () {
    victoryContainer.classList.add("hidden"); 
    defeatContainer.classList.add("hidden"); 
    resetGame();
});
});

    wordInput.addEventListener("keypress", onlyLetters);
    hintInput.addEventListener("keypress", onlyLetters);
});

function back(){
    location.href="Menu.html"
}