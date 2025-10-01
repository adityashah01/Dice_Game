import { Trophy, RotateCcw, TrendingUp } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  onSaveScore: (name: string) => void;
}

export const GameOverModal = ({ score, highScore, onRestart, onSaveScore }: GameOverModalProps) => {
  const isNewHighScore = score === highScore && score > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('playerName') as string;
    if (name.trim()) {
      onSaveScore(name.trim());
      onRestart();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full transform animate-bounce-in">
        <div className="text-center">
          {isNewHighScore ? (
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              😅
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isNewHighScore ? 'New High Score!' : 'Game Over'}
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 font-medium">Your Score</span>
            </div>
            <div className="text-5xl font-bold text-gray-800">{score}</div>
          </div>

          {score >= 5 && (
            <form onSubmit={handleSubmit} className="mb-6">
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Save your score to the leaderboard:
              </label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                placeholder="Enter your name"
                maxLength={20}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none mb-3"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
              >
                Save & Play Again
              </button>
            </form>
          )}

          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            {score >= 5 ? 'Play Again' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
};
