// JavaScript code for the welcome screen
function initializeWelcomeScreen() {
  const nameInput = document.getElementById('player-name');
  const startButton = document.getElementById('start-button');
  const avatarOptions = document.querySelectorAll('.avatar-option');
  let selectedAvatar = null;

  // Check for stored name
  const storedName = sessionStorage.getItem('playerName');
  if (storedName) {
    nameInput.value = storedName;
    validateForm();
  }

  nameInput.addEventListener('input', validateForm);

  function validateForm() {
    const name = nameInput.value.trim();
    const errorElement = document.getElementById('name-error');
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

// Ensure script executes only after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWelcomeScreen);
