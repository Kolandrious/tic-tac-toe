import React, { Component } from 'react';
import Table from './Table';
import Info from './Info';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlayer: 'X',
      dimension: 3,
      cells: null,
      inARow: 3,
      wonPlayer: null
    };

    this.changePlayer = this.changePlayer.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  changePlayer() {
    this.setState(state => {
      return ({ currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X' });
    })
  }

  makeMove(cell) {
    this.setState(state => {
      const newCells = state.cells.concat();
      newCells[cell.y][cell.x] = {
        id: cell.id,
        x: cell.x,
        y: cell.y,
        mark: state.currentPlayer
      };
      // console.log(newCells[cell.y][cell.x]);
      return ({ cells: newCells });
    });
    this.checkForWin(cell);
  }

  setDimension() {
    const { dimension } = this.state;
    const cells = [];
    let id = 0;
    for (let y = 0; y < dimension; y++) {
      const row = [];
      for (let x = 0; x < dimension; x++) {
        row.push({ x, y, id, mark: '0' });
        id += 1;
      }
      cells.push(row);
    }
    this.setState(() => ({
      cells,
      currentPlayer: 'X',
      wonPlayer: null
    }));
    return cells;
  }

  findCellById(id) {
    this.state.cells.forEach(row => row.forEach(cell => {
      if (cell.id === id)
        return cell;
    }))
  }

  checkForWin(cell) {
    const {x, y} = cell;
    const {cells, currentPlayer, dimension, inARow} = this.state;
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    let playerWin = false;

    directions.forEach(direction => {
    let counter = 1;

      if (checkDirection(direction)) {
        // if found neighbour at given direction, check this line
        counter ++;
        let i = 2;
        while (true) {
        // continue searching in this direction
          if (checkDirection( direction.map( el => ( el*i ) ) )) {
            // if found next further
            counter++;
            i++;
          } else {
            break;
          }
        }
      }
      const newDirection = direction.map(el => el*(-1));
      // change direction to opposing
      if (checkDirection(newDirection)) {
        // if found neighbour at opposing direction, check this line
        counter ++;
        let i = 2;
        while (true) {
        // continue searching in this direction
          if (checkDirection( newDirection.map( el => ( el*i ) ) )) {
            // if found next further
            counter++;
            i++;
          } else {
            break;
          }
        }
      }
      if (counter >= inARow) {
        playerWin = true;
      }
    })

    if (playerWin) {
      console.log (`PLAYER ${currentPlayer} WIN!`);
      this.setState(state => ({ wonPlayer: currentPlayer }));
    }
    else {
      this.changePlayer();
    }

    return (playerWin);

    function checkDirection(direction) {
      const moveX = x+direction[0];
      const moveY = y+direction[1];
      if (moveX < 0 || moveY < 0 || moveX >= dimension || moveY >= dimension)
        return false;
      if (cells[moveY][moveX].mark === currentPlayer) {
        return true;
      }
    }
  }

  render() {
    const {dimension, inARow, wonPlayer, currentPlayer} = this.state;
    return (
      <div style={{fontFamily: 'Sans-Serif'}}>
        <input
          style={{width: '100px'}}
          type="number"
          placeholder="specify dimension of field"
          value={dimension}
          onChange={(event) => this.setState({
            dimension: event.target.value,
            inARow: event.target.value
          })}
        />
        <button onClick={() => this.setDimension()}>{wonPlayer? `RESTART` : `SET`}</button>
        <Table
          table={this.state.cells}
          wonPlayer={wonPlayer}
          move={cell => this.makeMove(cell)}
        />
        <Info
          dimension={dimension}
          inARow={inARow}
          wonPlayer={wonPlayer}
          currentPlayer={currentPlayer}
        />
      </div>
    );
  }
}
