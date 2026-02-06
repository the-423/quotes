import { useState, useCallback } from 'react';
import { Quote, GameState } from '../types';

const ROUNDS_PER_GAME = 10;

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function useGame(quotes: Quote[]) {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    currentQuote: null,
    options: [],
    score: 0,
    totalRounds: ROUNDS_PER_GAME,
    currentRound: 0,
    answered: false,
    selectedAnswer: null,
    isCorrect: null,
    gameHistory: [],
  });

  const getUniqueSpeakers = useCallback((): string[] => {
    return [...new Set(quotes.map(q => q.speaker))];
  }, [quotes]);

  const generateOptions = useCallback((correctAnswer: string, allSpeakers: string[]): string[] => {
    const otherSpeakers = allSpeakers.filter(s => s !== correctAnswer);
    const shuffled = shuffleArray(otherSpeakers);
    const options = [correctAnswer, ...shuffled.slice(0, 3)];
    return shuffleArray(options);
  }, []);

  const startGame = useCallback(() => {
    const speakers = getUniqueSpeakers();
    if (speakers.length < 2 || quotes.length < 3) {
      alert('Need at least 3 quotes from 2 different people to play!');
      return;
    }

    const shuffledQuotes = shuffleArray(quotes);
    const firstQuote = shuffledQuotes[0];
    const options = generateOptions(firstQuote.speaker, speakers);

    setGameState({
      isPlaying: true,
      currentQuote: firstQuote,
      options,
      score: 0,
      totalRounds: Math.min(ROUNDS_PER_GAME, quotes.length),
      currentRound: 1,
      answered: false,
      selectedAnswer: null,
      isCorrect: null,
      gameHistory: [],
    });
  }, [quotes, getUniqueSpeakers, generateOptions]);

  const submitAnswer = useCallback((answer: string) => {
    if (!gameState.currentQuote || gameState.answered) return;

    const isCorrect = answer === gameState.currentQuote.speaker;
    setGameState(prev => ({
      ...prev,
      answered: true,
      selectedAnswer: answer,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      gameHistory: [
        ...prev.gameHistory,
        { quote: prev.currentQuote!, correct: isCorrect, guessed: answer }
      ],
    }));
  }, [gameState.currentQuote, gameState.answered]);

  const nextRound = useCallback(() => {
    if (gameState.currentRound >= gameState.totalRounds) {
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        currentQuote: null,
      }));
      return;
    }

    const usedQuoteIds = gameState.gameHistory.map(h => h.quote.id);
    usedQuoteIds.push(gameState.currentQuote?.id || '');
    
    const remainingQuotes = quotes.filter(q => !usedQuoteIds.includes(q.id));
    if (remainingQuotes.length === 0) {
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        currentQuote: null,
      }));
      return;
    }

    const shuffled = shuffleArray(remainingQuotes);
    const nextQuote = shuffled[0];
    const speakers = getUniqueSpeakers();
    const options = generateOptions(nextQuote.speaker, speakers);

    setGameState(prev => ({
      ...prev,
      currentQuote: nextQuote,
      options,
      currentRound: prev.currentRound + 1,
      answered: false,
      selectedAnswer: null,
      isCorrect: null,
    }));
  }, [quotes, gameState, getUniqueSpeakers, generateOptions]);

  const endGame = useCallback(() => {
    setGameState({
      isPlaying: false,
      currentQuote: null,
      options: [],
      score: 0,
      totalRounds: ROUNDS_PER_GAME,
      currentRound: 0,
      answered: false,
      selectedAnswer: null,
      isCorrect: null,
      gameHistory: [],
    });
  }, []);

  return {
    gameState,
    startGame,
    submitAnswer,
    nextRound,
    endGame,
    canPlay: getUniqueSpeakers().length >= 2 && quotes.length >= 3,
  };
}
