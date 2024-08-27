import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update every 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startHandler = () => {
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsRunning(false);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="outer-container">
      <div className="circle-container">
        <h1 className="time-display">{formatTime(time)}</h1>
        <div className="button-container">
          <button onClick={startHandler} className="button start" disabled={isRunning}>
            Start
          </button>
          <button onClick={stopHandler} className="button stop" disabled={!isRunning}>
            Stop
          </button>
          <button onClick={resetHandler} className="button reset" disabled={isRunning || time === 0}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
