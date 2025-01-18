// import { useState } from "react";

// const initialGameBoard = [
//     [null, null ,null],
//     [null, null ,null],
//     [null, null ,null],
// ];

export default function Gameboard({onSelectSquare, board}) {

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
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button 
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null} //if playerSymbol has been placed/clicked (true) then disable this button/square
                                >
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