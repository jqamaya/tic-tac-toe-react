import React, { useEffect, useState } from 'react';
import './App.css';

const rowStyle: React.CSSProperties = {
  display: 'flex'
}

const squareStyle: React.CSSProperties = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle: React.CSSProperties = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle: React.CSSProperties = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle: React.CSSProperties = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle: React.CSSProperties = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({ value, onClick }: { value: string, onClick: () => void}) {
  return (
    <button
      className="square"
      style={squareStyle}
      onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const onSquareClick = (i: number) => {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const onClickReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const calculateWinner = (squaresArr: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squaresArr[a] && squaresArr[a] === squaresArr[b] && squaresArr[a] === squaresArr[c]) {
        setWinner(squaresArr[a]);
        return squaresArr[a];
      }
    }
    return null;
  }

  useEffect(() => {
    calculateWinner(squares);
  }, [squares]);


  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{xIsNext ? 'X' : 'O'}</span></div>
      {
        winner && (
          <div id="winnerArea" className="winner" style={instructionsStyle}>
            Winner: <span>{winner}</span>
          </div>
        )
      }
      <button style={buttonStyle} onClick={onClickReset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[0]} onClick={() => onSquareClick(0)} />
          <Square value={squares[1]} onClick={() => onSquareClick(1)} />
          <Square value={squares[2]} onClick={() => onSquareClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[3]} onClick={() => onSquareClick(3)} />
          <Square value={squares[4]} onClick={() => onSquareClick(4)} />
          <Square value={squares[5]} onClick={() => onSquareClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[6]} onClick={() => onSquareClick(6)} />
          <Square value={squares[7]} onClick={() => onSquareClick(7)} />
          <Square value={squares[8]} onClick={() => onSquareClick(8)} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;
