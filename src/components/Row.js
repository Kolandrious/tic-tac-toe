import React from 'react';
import Cell from './Cell';

export default props => {
  const styles = {
    display: 'table-row',
    // width: '400px',
  }
  return (
    <div className="row" style={styles}>
      {props.cells.map(cell => {
        return (
          <Cell
            wonPlayer={props.wonPlayer}
            key={cell.id}
            cell={cell}
            move={props.move}
          />
        );
      })}
    </div>
  );
}