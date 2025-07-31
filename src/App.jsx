import { useEffect, useState } from 'react';
import './App.css';
import {WaterButton} from './components/WaterButton';
import WaterBottle from './components/WaterBottle';
import GoalInput from './components/GoalInput';
import VolumeButtons from './components/VolumeButtons'

function App() {
  const [amountDrank, setAmountDrank] = useState(0);
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem('goal')
    return savedGoal ? parseInt(savedGoal) : 2000
  })
  const [lastDrink, setLastDrink] = useState(null);
  const [intervalMinutes, setIntervalMinutes] = useState(60);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 gap-4">
      <GoalInput goal={goal} onSetGoal={setGoal} />
      <WaterBottle amountDrank={amountDrank} goal={goal} />
      <VolumeButtons setAmountDrank={setAmountDrank} />
      <WaterButton
        amountDrank={amountDrank}
        goal={goal}
        setAmountDrank={setAmountDrank}
        lastDrink={lastDrink}
        setLastDrink={setLastDrink}
        intervalMinutes={intervalMinutes}
        setIntervalMinutes={setIntervalMinutes}
      />
    </div>
  );
}

export default App;
