// Utility Functions for Math Blitz Football

// Show Notification
function showNotification(type, message, duration = 2000) {
  const overlay = document.createElement('div');
  overlay.className = 'notification-overlay';
  
  const content = document.createElement('div');
  content.className = `notification-content ${type}`;
  
  const title = document.createElement('h2');
  title.innerText = message;
  content.appendChild(title);
  
  const emoji = document.createElement('div');
  emoji.style.fontSize = '4em';
  emoji.innerText = type === 'success' ? '🏈' : '🛑';
  content.appendChild(emoji);
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  overlay.style.display = 'flex';
  
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  }, duration);
}

// Export Game Results to CSV
function exportToCSV(data) {
  const csvRows = [];
  const headers = Object.keys(data);
  csvRows.push(headers.join(','));

  const row = headers.map(header => {
    let value = data[header];
    if (typeof value === 'string' && value.includes(',')) {
      value = `"${value}"`;
    }
    return value;
  });
  csvRows.push(row.join(','));

  const csvString = csvRows.join('\n') + '\n';
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'MathBlitz_Results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Save Game Results
function saveGameResults() {
  const now = new Date();
  const data = {
    Name: gameState.playerName,
    DateTime: now.toISOString(),
    Difficulty: gameState.difficulty,
    QuestionsAttempted: gameState.driveStats.attempts,
    CorrectAnswers: gameState.driveStats.correct,
    Accuracy: ((gameState.driveStats.correct / gameState.driveStats.attempts) * 100).toFixed(1),
    AvgResponseTime: (gameState.driveStats.totalTime / gameState.driveStats.attempts).toFixed(1),
    TotalTime: gameState.driveStats.totalTime.toFixed(1)
  };
  exportToCSV(data);
}

// Print Stats Function
function printStats() {
  window.print();
}

// Validate Player Name
function validatePlayerName(name) {
  return /^[A-Za-z0-9]+$/.test(name.trim());
}

// Update Game Display
function updateDisplay() {
  document.getElementById('down').innerText = gameState.down;
  document.getElementById('to-go').innerText = gameState.toGo;
  document.getElementById('field-position').innerText = gameState.fieldPosition;
}

// Move Players on Field
function movePlayers() {
  const position = (gameState.fieldPosition / 100) * 100;
  document.getElementById('football').style.left = `${position}%`;
  document.getElementById('player').style.left = `${position}%`;
}