import { Play, Info } from 'lucide-react';
import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { Instructions } from './components/Instructions';
import { GameOverModal } from './components/GameOverModal';
import { Leaderboard } from './components/Leaderboard';
import { useSimonGame } from './hooks/useSimonGame';
import { useLeaderboard } from './hooks/useLeaderboard';

function App() {
  const { gameState, startGame, handleColorClick, resetGame } = useSimonGame();
  const { entries, loading, saveScore } = useLeaderboard();
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSaveScore = (name: string) => {
    saveScore(name, gameState.score);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SIMON
            </span>
          </h1>
          <p className="text-white/80 text-lg">Test Your Memory, Challenge Your Mind</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex flex-col gap-8 items-center">
            {gameState.isPlaying && (
              <ScoreBoard
                score={gameState.score}
                highScore={gameState.highScore}
                round={gameState.round}
              />
            )}

            <GameBoard
              onColorClick={handleColorClick}
              disabled={!gameState.isPlaying || gameState.isShowingSequence}
            />

            <div className="flex gap-4">
              {!gameState.isPlaying && !gameState.gameOver && (
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center gap-2 shadow-xl transform hover:scale-105"
                >
                  <Play className="w-6 h-6" />
                  Start Game
                </button>
              )}

              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20"
              >
                <Info className="w-5 h-5" />
                {showInstructions ? 'Hide' : 'How to Play'}
              </button>
            </div>

            {gameState.isShowingSequence && (
              <div className="text-center">
                <div className="inline-block bg-blue-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold border border-blue-400/30">
                  Watch the pattern...
                </div>
              </div>
            )}

            {gameState.isPlaying && !gameState.isShowingSequence && !gameState.gameOver && (
              <div className="text-center">
                <div className="inline-block bg-emerald-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold border border-emerald-400/30">
                  Your turn! Repeat the pattern
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-auto lg:min-w-[400px]">
            <Leaderboard entries={entries} loading={loading} />
          </div>
        </div>

        {showInstructions && (
          <div className="mt-8">
            <Instructions />
          </div>
        )}

        {gameState.gameOver && (
          <GameOverModal
            score={gameState.score}
            highScore={gameState.highScore}
            onRestart={resetGame}
            onSaveScore={handleSaveScore}
          />
        )}
      </div>
    </div>
  );
}

export default App;
