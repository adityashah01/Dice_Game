import { useState, useCallback, useEffect, useRef } from 'react';
import { Color, GameState } from '../types/game';

const COLORS: Color[] = ['red', 'blue', 'green', 'yellow'];

const INITIAL_SPEED = 800;
const MIN_SPEED = 300;
const SPEED_DECREASE = 50;

export const useSimonGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    sequence: [],
    userSequence: [],
    isPlaying: false,
    isShowingSequence: false,
    score: 0,
    highScore: 0,
    round: 0,
    gameOver: false,
    speed: INITIAL_SPEED,
  });

  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const playSound = useCallback((color: Color) => {
    if (!audioContext.current) return;

    const frequencies: Record<Color, number> = {
      red: 329.63,
      blue: 261.63,
      green: 392.00,
      yellow: 493.88,
    };

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.frequency.value = frequencies[color];
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.3);

    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.3);
  }, []);

  const showSequence = useCallback(async (sequence: Color[], speed: number) => {
    setGameState(prev => ({ ...prev, isShowingSequence: true }));

    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));

      const color = sequence[i];
      playSound(color);

      const element = document.getElementById(`simon-${color}`);
      if (element) {
        element.classList.add('active');
        await new Promise(resolve => setTimeout(resolve, speed));
        element.classList.remove('active');
      }
    }

    setGameState(prev => ({ ...prev, isShowingSequence: false }));
  }, [playSound]);

  const startGame = useCallback(() => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newSequence = [newColor];

    setGameState({
      sequence: newSequence,
      userSequence: [],
      isPlaying: true,
      isShowingSequence: false,
      score: 0,
      highScore: gameState.highScore,
      round: 1,
      gameOver: false,
      speed: INITIAL_SPEED,
    });

    setTimeout(() => showSequence(newSequence, INITIAL_SPEED), 500);
  }, [gameState.highScore, showSequence]);

  const handleColorClick = useCallback((color: Color) => {
    if (!gameState.isPlaying || gameState.isShowingSequence || gameState.gameOver) return;

    playSound(color);
    const newUserSequence = [...gameState.userSequence, color];

    const currentIndex = newUserSequence.length - 1;
    const isCorrect = newUserSequence[currentIndex] === gameState.sequence[currentIndex];

    if (!isCorrect) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        isPlaying: false,
        highScore: Math.max(prev.score, prev.highScore),
      }));
      return;
    }

    if (newUserSequence.length === gameState.sequence.length) {
      const newScore = gameState.score + 1;
      const newRound = gameState.round + 1;
      const newSpeed = Math.max(MIN_SPEED, gameState.speed - SPEED_DECREASE);
      const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const newSequence = [...gameState.sequence, newColor];

      setGameState(prev => ({
        ...prev,
        sequence: newSequence,
        userSequence: [],
        score: newScore,
        round: newRound,
        speed: newSpeed,
      }));

      setTimeout(() => showSequence(newSequence, newSpeed), 1000);
    } else {
      setGameState(prev => ({
        ...prev,
        userSequence: newUserSequence,
      }));
    }
  }, [gameState, playSound, showSequence]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      sequence: [],
      userSequence: [],
      isPlaying: false,
      isShowingSequence: false,
      score: 0,
      highScore: prev.highScore,
      round: 0,
      gameOver: false,
      speed: INITIAL_SPEED,
    }));
  }, []);

  return {
    gameState,
    startGame,
    handleColorClick,
    resetGame,
  };
};
