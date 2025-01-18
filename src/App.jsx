import { useState } from "react";
import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2',
}

//moved from Gameboard.jsx
const INITIAL_GAME_BOARD = [
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

function deriveGameBoard(gameTurns) {
    //moved from Gameboard.jsx
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; //derive brand new array and not overiding initialGameBoard array in memory

    for (const turn of gameTurns) {
        const { square, player } = turn; //extract prop from {turns} (setGameBoard - updatedTurns)
        const { row, col } = square; //object destructuring {turns} (setGameBoard - updatedTurns)
  
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
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
        winner = players[firstSquareSymbol]; //derive name from line 27 state
      }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns); //doing it without extra state line 18
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players)
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

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
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
