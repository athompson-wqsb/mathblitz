// Team Colors
const TEAM_COLORS = {
  bengals: { primary: '#FB4F14', secondary: '#000000' },
  eagles: { primary: '#004C54', secondary: '#A5ACAF' },
  cowboys: { primary: '#003594', secondary: '#869397' },
  niners: { primary: '#AA0000', secondary: '#B3995D' },
  bills: { primary: '#00338D', secondary: '#C60C30' },
  chiefs: { primary: '#E31837', secondary: '#FFB81C' }
};

// Initial Game State
const INITIAL_GAME_STATE = {
  playerName: '',
  playerTeam: '',
  difficulty: null,
  unlockedLevels: ['rookie'],
  down: 1,
  toGo: 10,
  fieldPosition: 20,
  currentProblem: null,
  userAnswer: '0',
  questionStartTime: 0,
  usedQuestions: [],
  driveStats: {
    attempts: 0,
    correct: 0,
    totalTime: 0,
    firstDowns: 0,
    totalYards: 0
  }
};

// Create a mutable game state object
let gameState = { ...INITIAL_GAME_STATE };

// Reset game state to initial conditions
function resetGameState() {
  gameState = { ...INITIAL_GAME_STATE };
}

// Difficulty Settings
const DIFFICULTY_SETTINGS = {
  rookie: {
    minNum1: 1,
    maxNum1: 9,
    minNum2: 1,
    maxNum2: 9,
    yardRange: { min: 3, max: 6 },
    maxQuestions: 81
  },
  pro: {
    minNum1: 5,
    maxNum1: 9,
    minNum2: 5,
    maxNum2: 9,
    yardRange: { min: 4, max: 8 },
    maxQuestions: 25
  },
  allPro: {
    minNum1: 10,
    maxNum1: 99,
    minNum2: 1,
    maxNum2: 9,
    yardRange: { min: 5, max: 10 },
    maxQuestions: 890
  },
  allMadden: {
    minNum1: 100,
    maxNum1: 999,
    minNum2: 10,
    maxNum2: 99,
    yardRange: { min: 6, max: 12 },
    maxQuestions: 89100
  }
};