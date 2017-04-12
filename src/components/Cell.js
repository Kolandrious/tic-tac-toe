import React from 'react';

export default ({ cell, ...props }) => {
  const styles = {
    fontFamily: 'Century Gothic, Futura, sans-serif',
    fontSize: '20px',
    border: '1px solid',
    width: '34px',
    height: '34px',
    lineHeight: '34px',
    textAlign: 'center',
    fontWeight: 'bold',
    // padding: '1px 0 0 0',
    display: 'table-cell'
  };

  function tryToMove() {
    if (cell.mark === '0') {
      props.move(cell);
    }
  }

  return (
    <div
      className="cell"
      style={styles}
      onClick={() => tryToMove()}
    >
      {cell.mark === '0' ? ' ' : cell.mark}
    </div>
  );
}

/*
if (cell.cellId === 2 && cell.cellId === 5) {
  return (
    <div>
      <div
        className='cell'
        style={styles}
        onClick={() => move(cell)}
      >
        {cell.mark}
      </div>
      <br />
    </div>
  );
} else {
  return (
    <div
      className='cell'
      style={styles}
      onClick={() => move(cell)}
    >
      {cell.mark}
    </div>
  );
}
*/