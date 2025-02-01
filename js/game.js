// JavaScript for the Game Logic

document.addEventListener("DOMContentLoaded", () => {
    console.log("Game script loaded.");

    // Get game elements
    const gameInterface = document.getElementById("game-interface");
    const gameContent = document.getElementById("game-content");
    const keypad = document.createElement("div");
    keypad.id = "keypad";

    // Ensure elements exist before proceeding
    if (!gameInterface || !gameContent) {
        console.error("Missing required elements for the game interface.");
        return;
    }

    gameContent.appendChild(keypad);

    // Function to generate a random multiplication problem
    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 * num2;
        
        gameContent.innerHTML = `<h3>${num1} × ${num2} = ?</h3>`;
        gameContent.appendChild(keypad);

        return correctAnswer;
    }

    // Function to set up the keypad
    function setupKeypad(correctAnswer) {
        keypad.innerHTML = "";
        let answerInput = "";
        
        for (let i = 1; i <= 9; i++) {
            const button = document.createElement("button");
            button.innerText = i;
            button.addEventListener("click", () => addToAnswer(i));
            keypad.appendChild(button);
        }
        
        const zeroButton = document.createElement("button");
        zeroButton.innerText = "0";
        zeroButton.addEventListener("click", () => addToAnswer(0));
        
        const clearButton = document.createElement("button");
        clearButton.innerText = "C";
        clearButton.addEventListener("click", () => {
            answerInput = "";
            console.log("Answer cleared");
        });
        
        keypad.appendChild(zeroButton);
        keypad.appendChild(clearButton);
        
        function addToAnswer(num) {
            answerInput += num;
            console.log("Current answer:", answerInput);
            if (parseInt(answerInput) === correctAnswer) {
                console.log("Correct answer!");
                setTimeout(() => startNewRound(), 1000);
            }
        }
    }

    // Function to start a new round
    function startNewRound() {
        console.log("Starting new round...");
        const correctAnswer = generateProblem();
        setupKeypad(correctAnswer);
    }

    // Start the game when the difficulty screen is exited
    const difficulty = sessionStorage.getItem("gameDifficulty") || "easy";
    console.log("Game started at difficulty:", difficulty);
    startNewRound();
});
