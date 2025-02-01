// JavaScript for the Difficulty Selection Screen

document.addEventListener("DOMContentLoaded", () => {
    console.log("Difficulty screen script loaded.");

    // Get difficulty buttons
    const difficultyButtons = document.querySelectorAll(".difficulty-button");
    const difficultyScreen = document.getElementById("difficulty-screen");
    const gameInterface = document.getElementById("game-interface");

    // Ensure elements exist before proceeding
    if (!difficultyScreen || !gameInterface || difficultyButtons.length === 0) {
        console.error("Missing required elements on difficulty screen.");
        return;
    }

    // Function to start the game with the selected difficulty
    function startGame(difficulty) {
        console.log("Starting game with difficulty:", difficulty);
        sessionStorage.setItem("gameDifficulty", difficulty);
        difficultyScreen.style.display = "none";
        gameInterface.style.display = "block";
        initializeGame(difficulty); // Calls the main game function
    }

    // Add event listeners to difficulty buttons
    difficultyButtons.forEach(button => {
        button.addEventListener("click", () => {
            startGame(button.dataset.difficulty);
        });
    });
});
