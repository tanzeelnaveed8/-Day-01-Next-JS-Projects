"use client";
import { useEffect, useState, useRef } from 'react';
import styles from './CountdownTimer.module.css';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });
  const [isPaused, setIsPaused] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [inputTime, setInputTime] = useState(60); // Default to 1 minute
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTimeLeft = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  };

  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      clearInterval(timerRef.current!);
    }

    return () => clearInterval(timerRef.current!);
  }, [isPaused, timeRemaining]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(timeRemaining));
  }, [timeRemaining]);

  const startTimer = () => {
    setTimeRemaining(inputTime);
    setIsPaused(false);
  };

  const pauseTimer = () => setIsPaused(true);
  const resetTimer = () => {
    setIsPaused(true);
    setTimeRemaining(0);
    setInputTime(60);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value)); // Ensure at least 1 second
    setInputTime(value);
    if (isPaused) {
      setTimeRemaining(value);
    }
  };

  return (
    <div className={styles.countdown}>
      <h1 className={styles.title}>Countdown Timer</h1>
      <input
        type="number"
        value={inputTime}
        onChange={handleInputChange}
        min="1"
        className={styles.input}
      />
      <div className={styles.timeDisplay}>
        <span className={styles.time}>{timeLeft.minutes}</span>
        <span className={styles.separator}>:</span>
        <span className={styles.time}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
      </div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={startTimer} disabled={!isPaused}>
          Start
        </button>
        <button className={styles.button} onClick={pauseTimer} disabled={isPaused}>
          Pause
        </button>
        <button className={styles.button} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;


