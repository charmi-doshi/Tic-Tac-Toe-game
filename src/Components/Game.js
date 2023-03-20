import React from "react";
import "./game.css";
import Square from "./Square";
import { useState } from "react";

function Game() {
  //initially the array is null
  const [squares, setSquares] = useState(Array(9).fill(null));
  //to check whose move it will be
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);

  
const nextSymbol = isXNext ? "X" : "O";

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          //changes the turn
          setIsXNext(!isXNext);
        }}
      />
    );
  }
  //CALCULATE WINNER

  function calculateWinner(squares) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  //incase the board is full and its a draw

  function isBoardfull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return null;
      }
    }
    return true;
  }

  function getStatus() {
    if (winner) {
      return "WINNER:" + winner;
    } else if (isBoardfull(squares)) {
      return "Draw!";
    } else {
      return "Next player:" + (nextSymbol);
    }
  }

  //restart function
  function Restart({ onClick }) {

    return (
      <button className="restart" onClick={onClick}>
        Play again
      </button>
    );
  }
  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }
  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

export default Game;
