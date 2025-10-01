export type Color = 'red' | 'blue' | 'green' | 'yellow';

export interface GameState {
  sequence: Color[];
  userSequence: Color[];
  isPlaying: boolean;
  isShowingSequence: boolean;
  score: number;
  highScore: number;
  round: number;
  gameOver: boolean;
  speed: number;
}

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  score: number;
  created_at: string;
}
