import React, { Component } from 'react';
import Table from './Table';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlayer: 'X',
      dimension: 3,
      cells: null,
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
    this.setState(() => ({ cells }));
    return cells;
  }

  findCellById(id) {
    this.state.cells.forEach(row => row.forEach(cell => {
      if (cell.id === id)
        return cell;
    }))
  }

  checkForWin(cell) {
    const {id, x, y, mark} = cell;
    const {cells, currentPlayer, dimension} = this.state;
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    directions.forEach(direction => {
      if (checkDirection(direction)) {
        if (checkDirection(direction.map(el => (el*(-1)))))
          console.log(`${currentPlayer} WIN!`);
        else if (checkDirection(direction.map(el => (el*2))))
          console.log(`${currentPlayer} WIN!`);
      }
    })

    this.changePlayer();

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
    return (
      <div style={{fontFamily: 'Sans-Serif'}}>
        <input
          style={{width: '100px'}}
          type="number"
          placeholder="specify dimension of field"
          value={this.state.dimension}
          onChange={(event) => this.setState({ dimension: event.target.value })}
        />
        <button onClick={() => this.setDimension()}>SET</button>
        <Table table={this.state.cells} move={cell => this.makeMove(cell)} />
        <h1>{this.state.cells === null ? '3 in a row to win!' : null}</h1>
        <h3>{this.state.cells === null ? null : '3 in a row to win!'}</h3>
      </div>
    );
  }
}
