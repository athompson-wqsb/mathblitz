// JavaScript for the Difficulty Selection Screen

document.addEventListener("DOMContentLoaded", () => {
    console.log("Difficulty screen script loaded.");

    // Get difficulty buttons
    const difficultyScreen = document.getElementById("difficulty-screen");
    const gameInterface = document.getElementById("game-interface");
    
    if (!difficultyScreen || !gameInterface) {
        console.error("Missing required elements on difficulty screen.");
        return;
    }

    // Define difficulty levels
    const difficulties = [
        { name: "Rookie", value: "rookie" },
        { name: "Pro", value: "pro" },
        { name: "All-Pro", value: "allpro" },
        { name: "All-Madden", value: "allmadden" }
    ];
    
    // Clear existing content and add new buttons
    difficultyScreen.innerHTML = "<h2>Select Difficulty</h2>";
    difficulties.forEach(difficulty => {
        const button = document.createElement("button");
        button.classList.add("difficulty-button");
        button.dataset.difficulty = difficulty.value;
        button.textContent = difficulty.name;
        button.addEventListener("click", () => startGame(difficulty.value));
        difficultyScreen.appendChild(button);
    });
    
    // Function to start the game with the selected difficulty
    function startGame(difficulty) {
        console.log("Starting game with difficulty:", difficulty);
        sessionStorage.setItem("gameDifficulty", difficulty);
        difficultyScreen.style.display = "none";
        gameInterface.style.display = "block";
        initializeGame(difficulty); // Calls the main game function
    }
});
