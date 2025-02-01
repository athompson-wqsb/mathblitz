// Restored Full Game Logic in game.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Game script loaded.");

    let gameState = {
        playerName: sessionStorage.getItem("playerName") || "",
        playerTeam: sessionStorage.getItem("playerTeam") || "bengals",
        difficulty: sessionStorage.getItem("gameDifficulty") || "rookie",
        down: 1,
        toGo: 10,
        fieldPosition: 20,
        userAnswer: "",
        usedQuestions: [],
        driveStats: { attempts: 0, correct: 0, totalYards: 0 }
    };

    const gameScreen = document.getElementById("game-screen");
    const gameContent = document.getElementById("game-content");
    const keypad = document.getElementById("keypad");
    const answerDisplay = document.getElementById("answer-display");
    const submitButton = document.getElementById("submit-button");
    
    function generateProblem() {
        let num1, num2;
        switch (gameState.difficulty) {
            case 'rookie':
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
                break;
            case 'pro':
                num1 = Math.floor(Math.random() * 5) + 5;
                num2 = Math.floor(Math.random() * 5) + 5;
                break;
            case 'allPro':
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 9) + 1;
                break;
            case 'allMadden':
                num1 = Math.floor(Math.random() * 900) + 100;
                num2 = Math.floor(Math.random() * 90) + 10;
                break;
        }
        gameState.correctAnswer = num1 * num2;
        gameContent.innerHTML = `<h3>${num1} × ${num2} = ?</h3>`;
    }

    function setupKeypad() {
        keypad.innerHTML = "";
        let keys = [1,2,3,4,5,6,7,8,9,0,"C"];
        keys.forEach(key => {
            const button = document.createElement("button");
            button.innerText = key;
            button.addEventListener("click", () => handleKeyPress(key));
            keypad.appendChild(button);
        });
    }

    function handleKeyPress(key) {
        if (key === "C") {
            gameState.userAnswer = "";
        } else {
            gameState.userAnswer += key;
        }
        answerDisplay.textContent = gameState.userAnswer;
    }

    function movePlayers() {
        const position = (gameState.fieldPosition / 100) * 100;
        document.getElementById('football').style.left = `${position}%`;
        document.getElementById('player').style.left = `${position}%`;
    }

    function updateDisplay() {
        document.getElementById('down').innerText = gameState.down;
        document.getElementById('to-go').innerText = gameState.toGo;
        document.getElementById('field-position').innerText = gameState.fieldPosition;
    }

    function submitAnswer() {
        const answer = parseInt(gameState.userAnswer);
        if (answer === gameState.correctAnswer) {
            const yards = Math.floor(Math.random() * 10) + 5;
            gameState.driveStats.correct++;
            gameState.driveStats.totalYards += yards;
            gameState.toGo -= yards;
            gameState.fieldPosition += yards;
            if (gameState.toGo <= 0) {
                gameState.down = 1;
                gameState.toGo = 10;
            }
        } else {
            gameState.down++;
            if (gameState.down > 4) {
                gameState.down = 1;
                gameState.toGo = 10;
            }
        }
        updateDisplay();
        movePlayers();
        gameState.userAnswer = "";
        answerDisplay.textContent = "";
        generateProblem();
    }

    submitButton.addEventListener("click", submitAnswer);
    generateProblem();
    setupKeypad();
    updateDisplay();
    movePlayers();
});
