// JavaScript code for the welcome screen
function initializeWelcomeScreen() {
  console.log("Initializing welcome screen...");
  
  function findElementsWithRetry(attemptsLeft) {
    const nameInput = document.getElementById('player-name');
    const startButton = document.getElementById('start-button');
    const avatarOptions = document.querySelectorAll('.avatar-option');

    if (!nameInput || !startButton) {
      if (attemptsLeft > 0) {
        console.warn("Elements not found. Retrying...");
        setTimeout(() => findElementsWithRetry(attemptsLeft - 1), 200);
        return;
      }
      console.error("Missing required elements: #player-name or #start-button");
      return;
    }
    
    console.log("Found player name input and start button");
    let selectedAvatar = null;
    
    const storedName = sessionStorage.getItem('playerName');
    if (storedName) {
      nameInput.value = storedName;
      validateForm();
    }

    nameInput.addEventListener('input', validateForm);

    function validateForm() {
      const name = nameInput.value.trim();
      const errorElement = document.getElementById('name-error');
      if (!errorElement) return;
      const isValid = /^[A-Za-z0-9]+$/.test(name);
      
      if (!name) {
        errorElement.textContent = 'Please enter your name';
        startButton.disabled = true;
      } else if (!isValid) {
        errorElement.textContent = 'Only letters and numbers allowed';
        startButton.disabled = true;
      } else {
        errorElement.textContent = '';
        startButton.disabled = !selectedAvatar;
      }
    }

    avatarOptions.forEach(option => {
      option.addEventListener('click', () => {
        avatarOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedAvatar = option.dataset.team;
        validateForm();
      });
    });

    startButton.addEventListener('click', () => {
      console.log("Start button clicked");
      if (nameInput.value.trim() && selectedAvatar) {
        gameState.playerName = nameInput.value.trim();
        gameState.playerTeam = selectedAvatar;
        sessionStorage.setItem('playerName', nameInput.value.trim());
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('difficulty-screen').style.display = 'block';
        updatePlayerDisplay();
      }
    });
  }

  // Attempt to find elements with a retry mechanism (5 attempts)
  findElementsWithRetry(5);
}

// Ensure script executes only after DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeWelcomeScreen);
