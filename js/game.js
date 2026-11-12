const boardSize = 4;
let board = [];
let score = 0;
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

function createBoard() {
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board.push([0, 0, 0, 0]);
    }
    score = 0;
    addRandomTile();
    addRandomTile();
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const value = board[i][j];
            if (value !== 0) {
                cell.textContent = value;
                cell.classList.add('tile-' + value);
            }
            gameBoard.appendChild(cell);
        }
    }
    scoreElement.textContent = score;
}

function addRandomTile() {
    const emptyCells = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[
        Math.floor(Math.random() * emptyCells.length)
    ];
    board[randomCell.row][randomCell.col] =
        Math.random() < 0.9 ? 2 : 4;
}

function moveLine(line) {
    let numbers = line.filter(value => value !== 0);
    let newLine = [];
    let gainedScore = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === numbers[i + 1]) {
            let merged = numbers[i] * 2;
            newLine.push(merged);
            gainedScore += merged;
            i++;
        } else {
            newLine.push(numbers[i]);
        }
    }
    while (newLine.length < 4) {
        newLine.push(0);
    }
    score += gainedScore;
    return newLine;
}

function rotateBoard() {
    const newBoard = [];
    for (let i = 0; i < 4; i++) {
        newBoard[i] = [];
        for (let j = 0; j < 4; j++) {
            newBoard[i][j] = board[3 - j][i];
        }
    }

    board = newBoard;
}

function move(direction) {
    const oldBoard = JSON.stringify(board);
    const oldScore = score;

    if (direction === 'up') {
        rotateBoard();
        rotateBoard();
        rotateBoard();
    }

    if (direction === 'right') {
        rotateBoard();
        rotateBoard();
    }

    if (direction === 'down') {
        rotateBoard();
    }

    for (let i = 0; i < 4; i++) {
        board[i] = moveLine(board[i]);
    }

    if (direction === 'up') {
        rotateBoard();
    }

    if (direction === 'right') {
        rotateBoard();
        rotateBoard();
    }

    if (direction === 'down') {
        rotateBoard();
        rotateBoard();
        rotateBoard();
    }

    if (JSON.stringify(board) !== oldBoard) {
        addRandomTile();
        renderBoard();
        checkGameOver();
    } else {
        score = oldScore;
    }
}

document.addEventListener('keydown', function(event) {
    const keys = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
    };

    if (keys[event.key]) {
        event.preventDefault();
        move(keys[event.key]);
    }
});

createBoard();