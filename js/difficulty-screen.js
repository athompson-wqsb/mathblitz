import '../css/styles.css';
import '../css/team-avatars.css';

// JavaScript code for the difficulty selection screen
function updateDifficultyButtons() {
  document.querySelectorAll('.difficulty-button').forEach(button => {
    const difficulty = button.dataset.difficulty;
    button.classList.remove('unlocked', 'locked');
    button.disabled = !gameState.unlockedLevels.includes(difficulty);
    
    if (gameState.unlockedLevels.includes(difficulty)) {
      button.classList.add('unlocked');
      button.style.cursor = 'pointer';
      button.onclick = () => startGame(difficulty);
    } else {
      button.classList.add('locked');
      button.style.cursor = 'not-allowed';
      button.onclick = null;
    }
  });
}