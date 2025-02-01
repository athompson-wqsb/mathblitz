// JavaScript for the Welcome Screen

document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome screen script loaded.");

    // Get elements
    const nameInput = document.getElementById("player-name");
    const startButton = document.getElementById("start-button");
    const nameError = document.getElementById("name-error");

    // Ensure elements exist before proceeding
    if (!nameInput || !startButton || !nameError) {
        console.error("Missing required elements on welcome screen.");
        return;
    }

    // Function to validate player name input
    function validateForm() {
        const name = nameInput.value.trim();
        const isValid = /^[A-Za-z0-9]+$/.test(name);
        
        if (!name) {
            nameError.textContent = "Please enter your name";
            startButton.disabled = true;
        } else if (!isValid) {
            nameError.textContent = "Only letters and numbers allowed";
            startButton.disabled = true;
        } else {
            nameError.textContent = "";
            startButton.disabled = false;
        }
    }

    // Add event listeners
    nameInput.addEventListener("input", validateForm);
    startButton.addEventListener("click", () => {
        console.log("Start button clicked.");
        const playerName = nameInput.value.trim();
        
        if (playerName) {
            sessionStorage.setItem("playerName", playerName);
            document.getElementById("welcome-screen").style.display = "none";
            document.getElementById("difficulty-screen").style.display = "block";
        }
    });

    // Preload stored player name if available
    const storedName = sessionStorage.getItem("playerName");
    if (storedName) {
        nameInput.value = storedName;
        validateForm();
    }
});
