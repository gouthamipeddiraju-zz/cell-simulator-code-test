import { FunctionComponent, useState, useRef } from 'react';
import './cells.css'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;
const ROW = HEIGHT / CELL_SIZE
const COLS = WIDTH / CELL_SIZE

type CellProps = {
    x: any,
    y: any
}

interface CellsProps {
    rows: number,
    cols: number,
    cells: any[],
    board:  any[]
}

const Cell = ({ x, y }: CellProps) => (
    <div className='cell' style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
    }} />
)

const emptyBoard = () => {
    let board: Array<any> = [];
    for (let y = 0; y < ROW; y++) {
        board[y] = [];
        for (let x = 0; x < COLS; x++) {
            board[y][x] = false;
        }
    }

    return board;
}

const Cells: FunctionComponent = () => {
    const [state, setState] = useState<CellsProps>({
        rows: ROW,
        cols: COLS,
        cells: [],
        board: emptyBoard()
    })

    const { rows, cols, cells, board } = state

    const divRef = useRef<HTMLDivElement>(null);

    const cellClick = (event: any) => {
        const elemOffset = getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);
        const newBoard = [...board]
        if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
            newBoard[y][x] = !newBoard[y][x];
        }
        setState({ ...state, board: newBoard, cells: makeCells(newBoard) });
    }

    const getElementOffset = () => {
        // @ts-ignore
        const rect = divRef.current.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    const makeCells = (newBoard: any[]) => {
        let cells = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (newBoard[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }

    const handleClear = () => {
        const newBoard = emptyBoard()
        setState({ ...state, board: newBoard, cells: makeCells(newBoard) });
    };

    const newGen = () => {
        const newBoard = [...board]
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                newBoard[y][x] = Math.random() >= 0.5;
            }
        }

        setState({ ...state, board: newBoard, cells: makeCells(newBoard) });
    }
 
    const runGame = () => {
        let newBoard = emptyBoard()

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let neighbors = calculateNeighbors(board, x, y);
                if (board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        setState({
            ...state,   board: newBoard, cells: makeCells(newBoard)
        });
    }

    const calculateNeighbors = (board: any[], x: number, y: number) => {
        let neighbors = 0;
        const dirs = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
        ];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (
                x1 >= 0 &&
                x1 < cols &&
                y1 >= 0 &&
                y1 < rows &&
                board[y1][x1]
            ) {
                neighbors++;
            }
        }
        return neighbors;
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
            <div className="controls"> 
                 
                <button className="button" onClick={runGame}>
                    Run
                </button>
                <button className="button" onClick={newGen}>
                    New generation
                </button>
                <button className="button" onClick={handleClear}>
                    Clear
                </button>
            </div>
        </div>
    );
}

export default Cells;

