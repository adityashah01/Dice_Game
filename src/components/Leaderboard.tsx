import { Trophy, Medal, Award } from 'lucide-react';
import { LeaderboardEntry } from '../types/game';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  loading: boolean;
}

export const Leaderboard = ({ entries, loading }: LeaderboardProps) => {
  const getIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-amber-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-orange-600" />;
    return <span className="text-gray-400 font-semibold">{index + 1}</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
        <Trophy className="w-6 h-6 text-amber-500" />
        Leaderboard
      </h2>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No scores yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`
                flex items-center justify-between p-4 rounded-xl
                ${index < 3 ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' : 'bg-gray-50'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {getIcon(index)}
                </div>
                <span className="font-semibold text-gray-800">{entry.player_name}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{entry.score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
