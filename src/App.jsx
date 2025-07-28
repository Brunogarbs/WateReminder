import { useEffect, useState } from 'react';
import './App.css';
import {WaterButton} from './components/WaterButton';
import WaterBottle from './components/WaterBottle';

function App() {
  const [count, setCount] = useState(0);
  const [lastDrink, setLastDrink] = useState(null);
  const [intervalMinutes, setIntervalMinutes] = useState(60);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 gap-4">
      <WaterBottle count={count} goal={8} />
      <WaterButton
        count={count}
        setCount={setCount}
        lastDrink={lastDrink}
        setLastDrink={setLastDrink}
        intervalMinutes={intervalMinutes}
        setIntervalMinutes={setIntervalMinutes}
      />
    </div>
  );
}

export default App;
