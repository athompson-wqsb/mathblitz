// JavaScript code for the game logic
function startGame(difficulty) {
  gameState.difficulty = difficulty;
  gameState.down = 1;
  gameState.toGo = 10;
  gameState.fieldPosition = 20;
  gameState.usedQuestions = [];
  
  // Update the player styling with team colors
  const playerElement = document.getElementById('player');
  if (playerElement && gameState.playerTeam) {
    const colors = teamColors[gameState.playerTeam];
    playerElement.style.backgroundColor = colors.primary;
  }
  
  document.getElementById('difficulty-screen').style.display = 'none';
  document.getElementById('game-interface').style.display = 'block';
  document.getElementById('game-screen').style.display = 'block';
  
  renderKeypad();
  generateProblem();
  movePlayers();
  updateDisplay();
}

function renderKeypad() {
  const keypad = document.getElementById('keypad');
  if (!keypad) return;
  
  keypad.innerHTML = '';
  for (let i = 1; i <= 9; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.onclick = () => addToAnswer(i);
    keypad.appendChild(button);
  }
  
  const zeroButton = document.createElement('button');
  zeroButton.innerText = '0';
  zeroButton.onclick = () => addToAnswer(0);
  
  const clearButton = document.createElement('button');
  clearButton.innerText = 'C';
  clearButton.onclick = clearAnswer;
  
  keypad.appendChild(zeroButton);
  keypad.appendChild(clearButton);
}

// Ensure script executes only after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', () => startGame('default'));
  }
});
