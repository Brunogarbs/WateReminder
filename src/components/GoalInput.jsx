// src/components/GoalInput.jsx
import React, { useState, useEffect } from 'react';

const GoalInput = ({ goal, onSetGoal }) => {
  const [inputGoal, setInputGoal] = useState(goal);

  useEffect(() => {
    setInputGoal(goal); // Atualiza quando prop muda
  }, [goal]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputGoal(value);
      onSetGoal(value);
      localStorage.setItem('goal', value); // Persistência
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <label className="mb-1 text-sm font-medium text-gray-600">
        Meta diária (em litros):
      </label>
      <input
        type="number"
        min="0.1"
        value={goal/1000}
        onChange={
          (e) => {
            const valueInLiters = parseFloat(e.target.value)
            onSetGoal(Math.round(valueInLiters * 1000));
          }
        }
        className="w-32 px-3 py-1 border border-gray-300 rounded-lg shadow-sm text-center text-blue-600 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default GoalInput;
