import React, { useEffect, useState } from 'react';

const WaterBottle = ({ amountDrank, goal }) => {
  const [bubbles, setBubbles] = useState([]);

  const bottleHeight = 200;
  const bottleWidth = 80;
  const neckHeight = 40;
  const capHeight = 15;
  const fillPercentage = goal > 0 ? Math.min(amountDrank / goal, 1) : 0;
  const waterHeight = fillPercentage * (bottleHeight - neckHeight);

  // Gera bolhas sempre que amountDrank for alterado
  useEffect(() => {
    const newBubbles = Array.from({ length: 5 }, () => ({
      id: Math.random(),
      cx: 10 + Math.random() * (bottleWidth - 20),
      r: 2 + Math.random() * 3,
    }));

    setBubbles(newBubbles);

    const timer = setTimeout(() => setBubbles([]), 2000);
    return () => clearTimeout(timer);
  }, [amountDrank]);

  return (
    <svg width={bottleWidth + 20} height={bottleHeight + capHeight + 50}>
      {/* Cap */}
      <rect
        x={(bottleWidth - 50) / 2 + 10}
        y={10}
        width={50}
        height={capHeight}
        fill="#8B4513"
        rx="5" ry="5"
      />

      {/* Neck */}
      <rect
        x={(bottleWidth - 40) / 2 + 10}
        y={capHeight + 10}
        width={40}
        height={neckHeight}
        fill="#ADD8E6"
        rx="5" ry="5"
      />

      {/* Body */}
      <rect
        x={10}
        y={capHeight + neckHeight + 10}
        width={bottleWidth}
        height={bottleHeight - neckHeight}
        fill="#ADD8E6"
        rx="10" ry="10"
      />

      {/* Water */}
      {waterHeight > 0 && (
        <rect
          x={10}
          y={capHeight + neckHeight + 10 + (bottleHeight - neckHeight - waterHeight)}
          width={bottleWidth}
          height={waterHeight}
          fill="#4682B4"
          rx="10"
          ry="10"
        />
      )}

      {/* Bolhas animadas */}
      {bubbles.map(bubble => (
        <circle
          key={bubble.id}
          className="bubble"
          cx={bubble.cx}
          cy={capHeight + neckHeight + 10 + (bottleHeight - neckHeight)}
          r={bubble.r}
        />
      ))}
      <text
        x={bottleWidth / 2 + 10}
        y={bottleHeight + capHeight + 30}
        fontSize="15"
        fill="#4A90E2" // Azul moderno (inspirado em design flat)
        textAnchor="middle"
        fontWeight="600"
        style={{
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
          letterSpacing: '0.5px',
        }}
      >
        {`${(amountDrank / 1000).toFixed(2)}L / ${(goal / 1000).toFixed(2)}L`}
      </text>

    </svg>
  );
};

export default WaterBottle;
