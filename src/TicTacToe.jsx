import { useState, useEffect } from "react";
import Board from "./Board"; 
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
    { combo: [0, 1, 2] },
    { combo: [3, 4, 5] },
    { combo: [6, 7, 8] },
    { combo: [0, 3, 6] },
    { combo: [1, 4, 7] },
    { combo: [2, 5, 8] },
    { combo: [0, 4, 8] },
    { combo: [2, 4, 6] }
];

function checkWinner(tiles, setGameState) {
    for (const winningCombination of winningCombinations) {
        const { combo } = winningCombination;
        const [a, b, c] = combo;
        const tileValue1 = tiles[a];
        const tileValue2 = tiles[b];
        const tileValue3 = tiles[c];

        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            if (tileValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    if (tiles.every((tile) => tile !== null)) {
        setGameState(GameState.draw);
    }
}

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [gameMode, setGameMode] = useState(null);

    const handleClick = (index) => {
        if (gameState !== GameState.inProgress || tiles[index] !== null) {
            return;
        }

        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);

        if (gameMode === "two-player") {
            setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
        } else if (gameMode === "computer" && playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        }
    };

    const makeComputerMove = () => {
        const availableTiles = tiles
            .map((tile, index) => (tile === null ? index : null))
            .filter((val) => val !== null);

        if (availableTiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            const newTiles = [...tiles];
            newTiles[availableTiles[randomIndex]] = PLAYER_O;
            setTiles(newTiles);
            setPlayerTurn(PLAYER_X);
        }
    };

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setGameMode(null);
    };

    useEffect(() => {
        checkWinner(tiles, setGameState);

        if (gameMode === "computer" && playerTurn === PLAYER_O && gameState === GameState.inProgress) {
            const timer = setTimeout(() => {
                makeComputerMove();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [tiles, playerTurn, gameState, gameMode, makeComputerMove]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            {gameMode === null ? (
                <div className="buttons">
                    <button className="player-button" onClick={() => setGameMode("two-player")}>Play with Player</button>
                    <button className="computer-button" onClick={() => setGameMode("computer")}>Play with Computer</button>
                </div>
            ) : (
                <>
                    <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleClick} />
                    <GameOver gameState={gameState} />
                    <Reset gameState={gameState} onReset={handleReset} />
                </>
            )}
        </div>
    );
}

export default TicTacToe;
