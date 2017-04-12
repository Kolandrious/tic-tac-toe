import React from 'react';

export default ({ dimension, inARow, wonPlayer, currentPlayer }) => (
  <div>
    <ul>
      <li>{wonPlayer ? `PLAYER ${wonPlayer} WIN!` : `currentPlayer: ${currentPlayer}`}</li>
      <li>A game with {dimension}x{dimension}</li>
      <li>Place {inARow} in a row to win</li>
    </ul>
  </div>
);