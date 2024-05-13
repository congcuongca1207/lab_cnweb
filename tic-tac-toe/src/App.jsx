import { useState } from 'react';
import './App.css';
import Square from './components/Square';
import UserProfile from './components/UserProfile';

const playerNames = ['Messi', 'Ronaldo']; 

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  return squares.every((square) => square !== null);
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);

  function changePlayer() {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  }

  function handleClick(index) {
    if (squares[index] === null && !winner && !isBoardFull(squares)) {
      const newSquares = squares.slice();
      newSquares[index] = currentPlayer === 0 ? 'X' : 'O';
      setSquares(newSquares);
      changePlayer();
    }
  }

  function restartGame() {
    setCurrentPlayer(0);
    setSquares(Array(9).fill(null));
  }

  return (
    <>
      <div className='game'>
        <div className='info'>
          <UserProfile
            image='https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'
            name={playerNames[0]}
            active={currentPlayer === 0}
          />
          <UserProfile
            image='https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'
            name={playerNames[1]}
            active={currentPlayer === 1}
          />
        </div>

        <div className='board'>
          <div className='row'>
            <Square value={squares[0]} onClick={() => handleClick(0)} />
            <Square value={squares[1]} onClick={() => handleClick(1)} />
            <Square value={squares[2]} onClick={() => handleClick(2)} />
          </div>

          <div className='row'>
            <Square value={squares[3]} onClick={() => handleClick(3)} />
            <Square value={squares[4]} onClick={() => handleClick(4)} />
            <Square value={squares[5]} onClick={() => handleClick(5)} />
          </div>

          <div className='row'>
            <Square value={squares[6]} onClick={() => handleClick(6)} />
            <Square value={squares[7]} onClick={() => handleClick(7)} />
            <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
        </div>

        {winner && (
          <div className='winner'>Winner: {playerNames[currentPlayer]}</div>
        )}

        {isBoardFull(squares) && !winner && (
          <div className='winner'>It's a tie!</div>
        )}
        <button onClick={restartGame}>Restart</button>
      </div>
    </>
  );
}

export default App;
