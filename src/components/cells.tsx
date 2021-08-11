import { useState, useRef } from 'react';
import './cells.css'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

type CellProps = {
    x: any,
    y: any
}
const Cell = ({ x, y }: CellProps) => (
    <div className='cell' style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
    }} />
)
const Cells = () => {
    const [state, setState] = useState({
        rows: HEIGHT / CELL_SIZE,
        cols: WIDTH / CELL_SIZE,
        cells: [],
        isRunning: false,
        interval: 100,
        board: [],
        emptyBoard: () => {
            let board: Array<any> = [];
            for (let y = 0; y < rows; y++) {
                board[y] = [];
                for (let x = 0; x < cols; x++) {
                    board[y][x] = false;
                }
            }

            return board;
        }
    })

    const { rows, cols, cells, isRunning, interval, board, emptyBoard } = state

    const divRef = useRef<HTMLDivElement>(null);

    const cellClick = () => {
        console.log(divRef)
    }
    return (
        <div className="cells">
            <div className="board"
                style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
                ref={divRef}
                onClick={cellClick}
            >
                {cells.map((cell: CellProps) => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
                ))}
            </div>
        </div>
    );
}

export default Cells;

