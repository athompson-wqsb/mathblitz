// Main Game Logic

// Initialize Welcome Screen
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
    const isValid = validatePlayerName(name);
    
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
      sessionStorage.setItem('playerName', gameState.playerName);
      document.getElementById('welcome-screen').style.display = 'none';
      document.getElementById('difficulty-screen').style.display = 'block';
      updatePlayerDisplay();
    }
  });
}

// Update Player Display
function updatePlayerDisplay() {
  const avatar = document.querySelector('.avatar-icon');
  if (avatar) {
    const colors = TEAM_COLORS[gameState.playerTeam];
    avatar.style.backgroundColor = colors.primary;
  }
}

// Generate Math Problem
function generateProblem() {
  const settings = DIFFICULTY_SETTINGS[gameState.difficulty];
  let num1, num2;
  let attempts = 0;
  let questionKey;
  
  do {
    num1 = Math.floor(Math.random() * (settings.maxNum1 - settings.minNum1 + 1)) + settings.minNum1;
    num2 = Math.floor(Math.random() * (settings.maxNum2 - settings.minNum2 + 1)) + settings.minNum2;

    questionKey = `${Math.min(num1, num2)}x${Math.max(num1, num2)}`;
    attempts++;
  } while (
    gameState.usedQuestions.includes(questionKey) && 
    attempts < 50 &&
    gameState.usedQuestions.length < settings.maxQuestions
  );
  
  gameState.usedQuestions.push(questionKey);
  
  gameState.currentProblem = {
    num1: num1,
    num2: num2,
    answer: num1 * num2
  };
  
  document.getElementById('question').innerText = `${num1} × ${num2}`;
  gameState.questionStartTime = Date.now();
}

// Start Game
function startGame(difficulty) {
  // Reset game state for new game
  resetGameState();
  
  // Set difficulty
  gameState.difficulty = difficulty;
  
  // Update UI
  document.getElementById('difficulty-screen').style.display = 'none';
  document.getElementById('game-interface').style.display = 'block';
  document.getElementById('game-screen').style.display = 'block';
  
  // Setup game elements
  renderKeypad();
  generateProblem();
  updateFieldPositionAndPlayers();
  updateDisplay();
}

// Update Field Position and Players
function updateFieldPositionAndPlayers() {
  movePlayers();
  updateDisplay();
}

// Render Keypad
function renderKeypad() {
  const keypad = document.getElementById('keypad');
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

// Add to Answer
function addToAnswer(digit) {
  gameState.userAnswer = gameState.userAnswer === '0' 
    ? digit.toString() 
    : gameState.userAnswer + digit;
  document.getElementById('answer-display').innerText = gameState.userAnswer;
}

// Clear Answer
function clearAnswer() {
  gameState.userAnswer = '0';
  document.getElementById('answer-display').innerText = '0';
}

// Submit Answer
function submitAnswer() {
  const answer = parseInt(gameState.userAnswer);
  const timeTaken = (Date.now() - gameState.questionStartTime) / 1000;
  
  // Update drive stats
  gameState.driveStats.attempts++;
  gameState.driveStats.totalTime += timeTaken;

  // Check if answer is correct
  if (answer === gameState.currentProblem.answer) {
    handleCorrectAnswer();
  } else {
    handleIncorrectAnswer();
  }
}

// Handle Correct Answer
function handleCorrectAnswer() {
  const settings = DIFFICULTY_SETTINGS[gameState.difficulty];
  const yards = Math.floor(
    Math.random() * (settings.yardRange.max - settings.yardRange.min + 1)
  ) + settings.yardRange.min;
  
  gameState.driveStats.correct++;
  gameState.driveStats.totalYards += yards;
  gameState.toGo -= yards;
  
  if (gameState.toGo <= 0) {
    gameState.driveStats.firstDowns++;
    gameState.down = 1;
    gameState.toGo = 10;
    showNotification('success', 'FIRST DOWN! 🏈', 2000);
  } else {
    gameState.down++;
  }

  updateFieldPosition(yards);

  if (gameState.down > 4) {
    showNotification('warning', 'TURNOVER ON DOWNS', 2500);
    setTimeout(showStats, 2600);
    return;
  }
}

// Handle Incorrect Answer
function handleIncorrectAnswer() {
  gameState.down++;
  showNotification('warning', 
    `Incomplete!\nCorrect Answer: ${gameState.currentProblem.answer}`, 
    2500
  );
  
  if (gameState.down > 4) {
    setTimeout(() => {
      showNotification('warning', 'TURNOVER ON DOWNS', 2500);
    }, 2600);
    setTimeout(showStats, 5200);
    return;
  }
}

// Update Field Position
function updateFieldPosition(yards) {
  gameState.fieldPosition += yards;
  if (gameState.fieldPosition >= 100) {
    scoreTouchdown();
    return;
  }
  updateFieldPositionAndPlayers();
}

// Score Touchdown
function scoreTouchdown() {
  showNotification('success', 'TOUCHDOWN!!! 🏈', 3000);
  setTimeout(showStats, 3100);
}

// Show Stats
function showStats() {
  const modal = document.getElementById('stats-modal');
  const avgTime = gameState.driveStats.attempts ? 
    (gameState.driveStats.totalTime / gameState.driveStats.attempts).toFixed(1) : 0;
  const accuracy = gameState.driveStats.attempts ? 
    ((gameState.driveStats.correct / gameState.driveStats.attempts) * 100).toFixed(1) : 0;

  // Update stats modal
  document.getElementById('difficulty-level').innerText = gameState.difficulty;
  document.getElementById('avg-time').innerText = `${avgTime}s`;
  document.getElementById('accuracy').innerText = `${accuracy}%`;
  document.getElementById('total-yards').innerText = gameState.driveStats.totalYards;
  document.getElementById('first-downs').innerText = gameState.driveStats.firstDowns;
  document.getElementById('total-questions').innerText = gameState.driveStats.attempts;

  // Save results to CSV
  saveGameResults();

  // Clear existing buttons except print
  const buttonContainer = document.querySelector('.modal-buttons');
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

  // Check if player qualifies for next level
  if (parseFloat(avgTime) < 30 && parseFloat(accuracy) >= 90) {
    let nextLevel;
    switch(gameState.difficulty) {
      case 'rookie':
        nextLevel = 'pro';
        break;
      case 'pro':
        nextLevel = 'allPro';
        break;
      case 'allPro':
        nextLevel = 'allMadden';
        break;
      case 'allMadden':
        nextLevel = null;
        break;
    }
    
    if (nextLevel && !gameState.unlockedLevels.includes(nextLevel)) {
      gameState.unlockedLevels.push(nextLevel);
      
      setTimeout(() => {
        showNotification('success', 
          `🏆 NEW LEVEL UNLOCKED! 🏆\n${nextLevel.toUpperCase()}\nAvg Time: ${avgTime}s\nAccuracy: ${accuracy}%`, 
          4000
        );
      }, 1000);

      updateDifficultyButtons();

      // Add try next level button
      const nextLevelButton = document.createElement('button');
      nextLevelButton.className = 'modal-button';
      nextLevelButton.style.background = '#4CAF50';
      nextLevelButton.style.color = 'white';
      nextLevelButton.innerText = `Try ${nextLevel} Level`;
      nextLevelButton.onclick = () => {
        modal.style.display = 'none';
        startGame(nextLevel);
      };
      buttonContainer.appendChild(nextLevelButton);
    }
  }

  modal.style.display = 'block';
}

// Return to Level Select
function returnToLevelSelect() {
  document.getElementById('stats-modal').style.display = 'none';
  document.getElementById('game-interface').style.display = 'none';
  document.getElementById('difficulty-screen').style.display = 'block';
  updateDifficultyButtons();
}

// Update Difficulty Buttons
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

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize welcome screen
  initializeWelcomeScreen();
  
  // Update difficulty buttons
  updateDifficultyButtons();
  
  // Add submit button listener
  document.getElementById('submit-button').addEventListener('click', submitAnswer);
});