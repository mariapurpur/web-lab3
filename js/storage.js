function saveGame() {
    const gameData = {
        board: board,
        score: score,
        previousState: previousState,
        gameFinished: gameFinished
    };

    localStorage.setItem('2048-game', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = localStorage.getItem('2048-game');

    if (!savedGame) return false;

    const gameData = JSON.parse(savedGame);

    board = gameData.board;
    score = gameData.score;
    previousState = gameData.previousState;
    gameFinished = gameData.gameFinished || false;

    renderBoard();

    return true;
}