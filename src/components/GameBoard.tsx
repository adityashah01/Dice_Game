import { SimonButton } from './SimonButton';
import { Color } from '../types/game';

interface GameBoardProps {
  onColorClick: (color: Color) => void;
  disabled: boolean;
}

export const GameBoard = ({ onColorClick, disabled }: GameBoardProps) => {
  return (
    <div className="relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]">
      <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 bg-gray-900 rounded-3xl shadow-2xl">
        <SimonButton color="red" onClick={() => onColorClick('red')} disabled={disabled} />
        <SimonButton color="blue" onClick={() => onColorClick('blue')} disabled={disabled} />
        <SimonButton color="green" onClick={() => onColorClick('green')} disabled={disabled} />
        <SimonButton color="yellow" onClick={() => onColorClick('yellow')} disabled={disabled} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-28 h-28 bg-gray-900 rounded-full border-8 border-gray-800 shadow-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white tracking-wider">SIMON</div>
          </div>
        </div>
      </div>
    </div>
  );
};
