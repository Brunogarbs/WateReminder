import React from 'react';

const WaterBottle = ({ count, goal }) => {
  const bottleHeight = 200; // Total height of the bottle
  const bottleWidth = 80;  // Total width of the bottle
  const neckHeight = 40;   // Height of the bottle's neck
  const neckWidth = 40;    // Width of the bottle's neck
  const capHeight = 15;    // Height of the bottle cap
  const capWidth = 50;     // Width of the bottle cap

  // Calculate the water level as a percentage
  const fillPercentage = goal > 0 ? Math.min(count / goal, 1) : 0;
  const waterHeight = fillPercentage * (bottleHeight - neckHeight); // Height of water in the main body

  return (
    <svg width={bottleWidth + 20} height={bottleHeight + capHeight + 20} viewBox={`0 0 ${bottleWidth + 20} ${bottleHeight + capHeight + 20}`}>
      {/* Bottle Cap */}
      <rect
        x={(bottleWidth - capWidth) / 2 + 10}
        y={10}
        width={capWidth}
        height={capHeight}
        fill="#8B4513" // SaddleBrown
        rx="5" ry="5" // Rounded corners
      />

      {/* Bottle Neck */}
      <rect
        x={(bottleWidth - neckWidth) / 2 + 10}
        y={capHeight + 10}
        width={neckWidth}
        height={neckHeight}
        fill="#ADD8E6" // LightBlue - bottle color
        rx="5" ry="5"
      />

      {/* Bottle Body */}
      <rect
        x={10}
        y={capHeight + neckHeight + 10}
        width={bottleWidth}
        height={bottleHeight - neckHeight}
        fill="#ADD8E6" // LightBlue - bottle color
        rx="10" ry="10"
      />

      {/* Water Fill */}
      {waterHeight > 0 && (
        <rect
          x={10}
          y={capHeight + neckHeight + 10 + (bottleHeight - neckHeight - waterHeight)}
          width={bottleWidth}
          height={waterHeight}
          fill="#4682B4" // SteelBlue - water color
          rx="10" ry="10"
        />
      )}

      {/* Text for count and goal */}
      <text
        x={bottleWidth / 2 + 10}
        y={bottleHeight + capHeight + 10 + 15} // Position below the bottle
        fontSize="14"
        fill="#333"
        textAnchor="middle"
      >
        {`${count}/${goal}`}
      </text>
    </svg>
  );
};

export default WaterBottle