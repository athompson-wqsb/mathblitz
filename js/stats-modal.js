// JavaScript code for the stats modal
function showStats() {
  const modal = document.getElementById('stats-modal');
  if (!modal) return;
  
  const avgTime = gameState.driveStats.attempts ? 
    (gameState.driveStats.totalTime / gameState.driveStats.attempts).toFixed(1) : 0;
  const accuracy = gameState.driveStats.attempts ? 
    ((gameState.driveStats.correct / gameState.driveStats.attempts) * 100).toFixed(1) : 0;

  // Initialize level progression tracking if not exists
  if (!gameState.levelProgressAttempts) {
    gameState.levelProgressAttempts = {
      rookie: { attempts: 0, successfulAttempts: 0 },
      pro: { attempts: 0, successfulAttempts: 0 },
      allPro: { attempts: 0, successfulAttempts: 0 },
      allMadden: { attempts: 0, successfulAttempts: 0 }
    };
  }

  document.getElementById('difficulty-level').innerText = gameState.difficulty || 'N/A';
  document.getElementById('avg-time').innerText = `${avgTime}s`;
  document.getElementById('accuracy').innerText = `${accuracy}%`;
  document.getElementById('total-yards').innerText = gameState.driveStats.totalYards || 0;
  document.getElementById('first-downs').innerText = gameState.driveStats.firstDowns || 0;
  document.getElementById('total-questions').innerText = gameState.driveStats.attempts || 0;

  // Save results to CSV
  saveGameResults();

  // Clear existing buttons except print
  const buttonContainer = document.querySelector('.modal-buttons');
  if (!buttonContainer) return;
  buttonContainer.innerHTML = '<button class="modal-button print-button" onclick="printStats()">Print Stats</button>';

  // Add level selection button
  const levelSelectButton = document.createElement('button');
  levelSelectButton.className = 'modal-button';
  levelSelectButton.style.background = '#0b3d91';
  levelSelectButton.style.color = 'white';
  levelSelectButton.innerText = 'Choose Level';
  levelSelectButton.onclick = returnToLevelSelect;
  buttonContainer.appendChild(levelSelectButton);

  // Add retry button
  const retryButton = document.createElement('button');
  retryButton.className = 'modal-button';
  retryButton.style.background = '#ffb400';
  retryButton.innerText = 'Retry This Level';
  retryButton.onclick = () => {
    modal.style.display = 'none';
    startGame(gameState.difficulty);
  };
  buttonContainer.appendChild(retryButton);

  modal.style.display = 'block';
}

// Ensure script executes only after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const statsButton = document.getElementById('stats-button');
  if (statsButton) {
    statsButton.addEventListener('click', showStats);
  }
});
