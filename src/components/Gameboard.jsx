// import { useState } from "react";

const initialGameBoard = [
    [null, null ,null],
    [null, null ,null],
    [null, null ,null],
];

export default function Gameboard({onSelectSquare, turns}) {
    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        const { square, player } = turn; //extract prop from {turns} (setGameBoard - updatedTurns)
        const { row, col } = square; //object destructuring {turns} (setGameBoard - updatedTurns)

        gameBoard[row][col] = player;
    }

    //no longer managing gameboard state here, instead lift state up to App.jsx
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>)
            }
        </ol>
    );
}