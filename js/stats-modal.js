// JavaScript for the Stats Modal

document.addEventListener("DOMContentLoaded", () => {
    console.log("Stats modal script loaded.");

    // Get stats modal elements
    const statsModal = document.getElementById("stats-modal");
    const difficultyLevel = document.getElementById("difficulty-level");
    const accuracyDisplay = document.getElementById("accuracy");
    const statsButton = document.getElementById("stats-button");

    // Ensure elements exist before proceeding
    if (!statsModal || !difficultyLevel || !accuracyDisplay || !statsButton) {
        console.error("Missing required elements for stats modal.");
        return;
    }

    // Function to update and show stats
    function showStats() {
        console.log("Displaying stats...");
        
        const difficulty = sessionStorage.getItem("gameDifficulty") || "Unknown";
        const totalQuestions = sessionStorage.getItem("totalQuestions") || 0;
        const correctAnswers = sessionStorage.getItem("correctAnswers") || 0;
        
        const accuracy = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(1) + "%" : "N/A";
        
        difficultyLevel.textContent = difficulty;
        accuracyDisplay.textContent = accuracy;

        statsModal.style.display = "block";
    }

    // Add event listener to stats button
    statsButton.addEventListener("click", () => {
        statsModal.style.display = "none";
        console.log("Stats modal closed.");
    });

    // Automatically show stats when the game ends
    window.addEventListener("gameEnded", showStats);
});
