import { Trophy, Target, Zap } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  round: number;
}

export const ScoreBoard = ({ score, highScore, round }: ScoreBoardProps) => {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl px-6 py-4 shadow-lg min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5 text-white" />
          <span className="text-white/90 text-sm font-medium">Round</span>
        </div>
        <div className="text-3xl font-bold text-white">{round}</div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl px-6 py-4 shadow-lg min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-white" />
          <span className="text-white/90 text-sm font-medium">Score</span>
        </div>
        <div className="text-3xl font-bold text-white">{score}</div>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl px-6 py-4 shadow-lg min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-white" />
          <span className="text-white/90 text-sm font-medium">Best</span>
        </div>
        <div className="text-3xl font-bold text-white">{highScore}</div>
      </div>
    </div>
  );
};
