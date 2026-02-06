export interface Quote {
  id: string;
  text: string;
  speaker: string;
  addedBy: string;
  timestamp: number;
}

export interface Person {
  name: string;
  quoteCount: number;
}

export interface GameState {
  isPlaying: boolean;
  currentQuote: Quote | null;
  options: string[];
  score: number;
  totalRounds: number;
  currentRound: number;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  gameHistory: { quote: Quote; correct: boolean; guessed: string }[];
}

export interface UserProfile {
  name: string;
  gamesPlayed: number;
  totalScore: number;
  bestScore: number;
}
