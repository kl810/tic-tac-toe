import { useState } from "react";
import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

//moved from Gameboard.jsx
const initialGameBoard = [
  [null, null ,null],
  [null, null ,null],
  [null, null ,null],
];


function deriveActivePlayer(gameTurns) { //prop derived from line 20
  let currentPlayer = 'X' 

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns); //doing it without extra state line 18

  //moved from Gameboard.jsx
  let gameBoard = [...initialGameBoard.map(array => [...array])]; //derive brand new array and not overiding initialGameBoard array in memory

  for (const turn of gameTurns) {
      const { square, player } = turn; //extract prop from {turns} (setGameBoard - updatedTurns)
      const { row, col } = square; //object destructuring {turns} (setGameBoard - updatedTurns)

      gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) { //iterate through each combination, checking eg index[0] of each combination etc
    const firstSquareSymbol = 
      gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = 
      gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = 
      gameBoard[combination[2].row][combination[2].column]

      if (
        firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = firstSquareSymbol;
      }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row:rowIndex, col:colIndex }, player: currentPlayer },
        ...prevTurns
      ]; //always create shallow copy so it is immutable

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <Gameboard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
