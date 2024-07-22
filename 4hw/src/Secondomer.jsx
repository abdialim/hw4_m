import React, { useState, useRef } from 'react';
import './App.css'

const App = () => {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setRunning(false);
    setLaps([]);
  };

  const recordLap = () => {
    if (running) {
      const newLaps = [...laps, timer];
      setLaps(newLaps);
    }
  };

  return (
    <div className="secondomer">
      <p>{(timer / 1000).toFixed(2)} seconds</p>
      <div className="buttons">
        <button onClick={startTimer} disabled={running}>
          Старт
        </button>
        <button onClick={stopTimer} disabled={!running}>
          стоп
        </button>
        <button onClick={resetTimer}>
          сброс
        </button>
        <button onClick={recordLap} disabled={!running}>
          засекать
        </button>
      </div>
      <div>
        <h2>круги:</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{(lap / 1000).toFixed(2)} сек</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
