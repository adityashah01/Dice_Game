import { Color } from '../types/game';

interface SimonButtonProps {
  color: Color;
  onClick: () => void;
  disabled: boolean;
}

const colorClasses: Record<Color, string> = {
  red: 'bg-red-500 hover:bg-red-600 active:bg-red-700 shadow-red-600/50',
  blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-blue-600/50',
  green: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-emerald-600/50',
  yellow: 'bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-amber-500/50',
};

export const SimonButton = ({ color, onClick, disabled }: SimonButtonProps) => {
  return (
    <button
      id={`simon-${color}`}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colorClasses[color]}
        w-full h-full rounded-2xl
        transition-all duration-150
        shadow-lg
        cursor-pointer
        transform active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-70
        [&.active]:brightness-150
        [&.active]:scale-105
        [&.active]:shadow-2xl
      `}
      aria-label={`${color} button`}
    />
  );
};
