import { GameState, UserProfile } from '../types';

interface GameTabProps {
  gameState: GameState;
  canPlay: boolean;
  user: UserProfile | null;
  onStartGame: () => void;
  onSubmitAnswer: (answer: string) => void;
  onNextRound: () => void;
  onEndGame: () => void;
  onRecordScore: (score: number) => void;
}

export function GameTab({
  gameState,
  canPlay,
  user,
  onStartGame,
  onSubmitAnswer,
  onNextRound,
  onEndGame,
  onRecordScore,
}: GameTabProps) {
  const isGameOver = !gameState.isPlaying && gameState.gameHistory.length > 0;

  if (!gameState.isPlaying && !isGameOver) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">🎮</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Who Said It?</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Test your knowledge of your friends! We'll show you quotes and you have to guess who said them.
          </p>
          
          {user && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 inline-flex gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{user.gamesPlayed}</p>
                <p className="text-xs text-gray-500">Games Played</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{user.bestScore}</p>
                <p className="text-xs text-gray-500">Best Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {user.gamesPlayed > 0 ? Math.round(user.totalScore / user.gamesPlayed) : 0}
                </p>
                <p className="text-xs text-gray-500">Avg Score</p>
              </div>
            </div>
          )}
          
          {canPlay ? (
            <button
              onClick={onStartGame}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Game! 🚀
            </button>
          ) : (
            <div className="bg-amber-50 text-amber-800 rounded-xl p-4">
              <p className="font-medium">Not enough quotes to play!</p>
              <p className="text-sm mt-1">Add at least 3 quotes from 2 different people to start the game.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isGameOver) {
    const percentage = Math.round((gameState.score / gameState.gameHistory.length) * 100);
    
    const handlePlayAgain = () => {
      onRecordScore(gameState.score);
      onEndGame();
      onStartGame();
    };

    const handleExit = () => {
      onRecordScore(gameState.score);
      onEndGame();
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">🏆</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Game Over!</h2>
          <p className="text-5xl font-black text-indigo-600 mb-2">
            {gameState.score}/{gameState.gameHistory.length}
          </p>
          <p className="text-gray-500 mb-6">{percentage}% correct</p>
          
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={handlePlayAgain}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition"
            >
              Play Again 🎮
            </button>
            <button
              onClick={handleExit}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
            >
              Exit
            </button>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Round Summary</h3>
            <div className="space-y-2 max-h-64 overflow-auto">
              {gameState.gameHistory.map((round, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-left flex items-start gap-3 ${
                    round.correct ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <span className="text-lg">{round.correct ? '✅' : '❌'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 italic truncate">"{round.quote.text}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Said by <span className="font-semibold">{round.quote.speaker}</span>
                      {!round.correct && <span> — You guessed: {round.guessed}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Progress header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Round {gameState.currentRound} of {gameState.totalRounds}</span>
            <span className="font-bold">Score: {gameState.score}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${(gameState.currentRound / gameState.totalRounds) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="p-8">
          {/* Quote display */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8">
            <div className="text-5xl text-center mb-4">"</div>
            <p className="text-xl text-gray-800 text-center italic leading-relaxed">
              {gameState.currentQuote?.text}
            </p>
          </div>
          
          <h3 className="text-center font-medium text-gray-600 mb-4">Who said this?</h3>
          
          {/* Answer options */}
          <div className="grid grid-cols-2 gap-3">
            {gameState.options.map((option) => {
              let buttonClass = 'p-4 rounded-xl font-medium transition text-left border-2 ';
              
              if (gameState.answered) {
                if (option === gameState.currentQuote?.speaker) {
                  buttonClass += 'border-green-500 bg-green-50 text-green-700';
                } else if (option === gameState.selectedAnswer && !gameState.isCorrect) {
                  buttonClass += 'border-red-500 bg-red-50 text-red-700';
                } else {
                  buttonClass += 'border-gray-200 bg-gray-50 text-gray-400';
                }
              } else {
                buttonClass += 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 bg-white';
              }
              
              return (
                <button
                  key={option}
                  onClick={() => onSubmitAnswer(option)}
                  disabled={gameState.answered}
                  className={buttonClass}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                      {option.charAt(0).toUpperCase()}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Feedback and next button */}
          {gameState.answered && (
            <div className="mt-6 text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                gameState.isCorrect 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {gameState.isCorrect ? '🎉 Correct!' : `😅 It was ${gameState.currentQuote?.speaker}`}
              </div>
              
              <button
                onClick={onNextRound}
                className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition"
              >
                {gameState.currentRound >= gameState.totalRounds ? 'See Results' : 'Next Question →'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={onEndGame}
        className="mt-4 text-gray-500 hover:text-gray-700 text-sm mx-auto block"
      >
        Quit Game
      </button>
    </div>
  );
}
