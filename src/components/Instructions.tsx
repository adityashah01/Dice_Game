import { Eye, Hand, Brain, TrendingUp } from 'lucide-react';

export const Instructions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">How to Play</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Watch</h3>
            <p className="text-sm text-gray-600">Pay attention to the color sequence that lights up</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Remember</h3>
            <p className="text-sm text-gray-600">Memorize the pattern as it gets longer</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Hand className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Repeat</h3>
            <p className="text-sm text-gray-600">Click the colors in the exact same order</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Level Up</h3>
            <p className="text-sm text-gray-600">Each round adds one more color to remember</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-700 text-center">
          <strong>Pro Tip:</strong> The game speeds up as you progress. Stay focused and challenge your memory!
        </p>
      </div>
    </div>
  );
};
