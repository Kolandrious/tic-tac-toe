import React from 'react';
import Row from './Row';

export default props => {
  if (props.table === null)
    return <div>please set dimension</div>
  else {
    const styles = {
      border: '1px solid',
      display: 'table',
      margin: '10px'
    }
    return (
      <div className="table" style={styles}>
        {props.table.map((row, index) => {
          return (
            <Row wonPlayer={props.wonPlayer} key={index} cells={row} move={props.move} />
          );
        })}
      </div>
    );
  }
};