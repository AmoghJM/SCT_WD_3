import Tile from './Tile';

function Board({tiles, onTileClick, playerTurn}) {
    return (
        <div className="board">
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(0)} value={tiles[0]} className="left-border right-border top-border bottom-border" />
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(1)} value={tiles[1]} className="bottom-border right-border top-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(2)} value={tiles[2]} className="bottom-border right-border top-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(3)} value={tiles[3]} className="bottom-border left-border right-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(4)} value={tiles[4]} className="bottom-border right-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(5)} value={tiles[5]} className="bottom-border right-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(6)} value={tiles[6]} className="left-border right-border bottom-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(7)} value={tiles[7]} className="bottom-border right-border"/>
            <Tile playerTurn={playerTurn} onClick={() => onTileClick(8)} value={tiles[8]} className="bottom-border right-border"/>
        </div>
    );
}

export default Board;