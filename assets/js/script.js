const tiles = document.querySelectorAll('.tile');
const playerX = 'X';
const playerO = 'O';
let turn = playerX;
const computerO = 'O';
let xScore = 0;
let oScore = 0;
let displayXScore = document.getElementById('x-score');
let displayOScore = document.getElementById('o-score');
const boardState = Array(tiles.length);
boardState.fill(null);

//elements
const modal = document.getElementById('modal-window');
const modalBackground = document.getElementById('modal-bg');
const gameOverArea = document.getElementById('game-over-area');
const gameOverText = document.getElementById('game-over-text');
const playAgain = document.getElementById('restart');
playAgain.addEventListener('click', startNewGame);
const changeMode = document.getElementById('change-mode');
changeMode.addEventListener('click', refresh);

function refresh() {
    location.reload();
}
// set hover - credit Adam (see README)
function setHoverText() {
    tiles.forEach((tile) => {
        tile.classList.remove('x-hover');
        tile.classList.remove('o-hover');
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if (tile.innerText == '') {
            tile.classList.add(hoverClass);
        }
    });
}
setHoverText();

function runGame(gameType) {
    tiles.forEach(tile => tile.addEventListener('click', tileClick));

    function tileClick(event) {
        if (gameOverArea.classList.contains('visible')) {
            return;
        }
        const tile = event.target;
        const tileNumber = tile.dataset.index;

        if (turn == playerX && tile.textContent == '') {
            tile.classList.add('x-color');
        } else {
            tile.classList.remove('x-color');
        }

        if (tile.innerText != '') {
            return;
        }

        if (turn === playerX && gameType === 'vsEasy') {
            tile.innerText = playerX;
            boardState[tileNumber - 1] = playerX;
            checkWinner();
            if (modalBackground.className != 'active') {
                computerTurn();
                checkWinner();
            }
        } else if (turn === playerX && gameType === 'vsPlayer') {
            tile.innerText = playerX;
            boardState[tileNumber - 1] = playerX;
            checkWinner();
            turn = playerO;
        } else if (turn === playerO && gameType === 'vsPlayer') {
            tile.innerText = playerO;
            boardState[tileNumber - 1] = playerO;
            checkWinner();
            turn = playerX;
        } else if (turn === playerX && gameType === 'vsMedium') {
            tile.innerText = playerX;
            boardState[tileNumber - 1] = playerX;
            checkWinner();
            if (modalBackground.className != 'active') {
                mediumMode();
                checkWinner();
            }
        } else if (turn === playerX && gameType === 'vsHard') {
            tile.innerText = playerX;
            boardState[tileNumber - 1] = playerX;
            checkWinner();
            if (modalBackground.className != 'active') {
                hardMode();
                checkWinner();
            }
        }
        setHoverText();
    }
}

// Easy difficulty - Goes through tiles in a set order.
function computerTurn() {
    switch (tiles.textContent === '' != 'X') {
        case tiles[4].textContent === '':
            tiles[4].textContent = computerO;
            boardState[4] = computerO;
            break;
        case tiles[8].textContent === '':
            tiles[8].textContent = computerO;
            boardState[8] = computerO;
            break;
        case tiles[0].textContent === '':
            tiles[0].textContent = computerO;
            boardState[0] = computerO;
            break;
        case tiles[2].textContent === '':
            tiles[2].textContent = computerO;
            boardState[2] = computerO;
            break;
        case tiles[6].textContent === '':
            tiles[6].textContent = computerO;
            boardState[6] = computerO;
            break;
        case tiles[1].textContent === '':
            tiles[1].textContent = computerO;
            boardState[1] = computerO;
            break;
        case tiles[7].textContent === '':
            tiles[7].textContent = computerO;
            boardState[7] = computerO;
            break;
        case tiles[5].textContent === '':
            tiles[5].textContent = computerO;
            boardState[5] = computerO;
            break;
        case tiles[3].textContent === '':
            tiles[3].textContent = computerO;
            boardState[3] = computerO;
            break;
    }
}

// Medium difficulty - Random moveset
function mediumMode() {
    let random = Math.floor(Math.random() * tiles.length);
    while (tiles[random].textContent !== '') {
        random = Math.floor(Math.random() * tiles.length);
    }
    tiles[random].textContent = computerO;
    boardState[random] = computerO;
    turn = playerX;
}

// Hard difficulty - Tries to play the next spot where there's two of the same. Else random.
function hardMode() {
    if (tiles[4].textContent == '') {
        tiles[4].textContent = computerO;
        boardState[4] = computerO;
    } // check diagonally and outer rows/columns:
    else if (tiles[0].textContent != '' && tiles[0].textContent === tiles[1].textContent && tiles[2].textContent == '' ||
        tiles[5].textContent != '' && tiles[5].textContent === tiles[8].textContent && tiles[2].textContent == '' ||
        tiles[4].textContent != '' && tiles[4].textContent === tiles[6].textContent && tiles[2].textContent == '') {
        tiles[2].textContent = computerO;
        boardState[2] = computerO;
        turn = playerX;
    } else if (tiles[1].textContent != '' && tiles[1].textContent === tiles[2].textContent && tiles[0].textContent == '' ||
        tiles[3].textContent != '' && tiles[3].textContent === tiles[6].textContent && tiles[0].textContent == '' ||
        tiles[4].textContent != '' && tiles[4].textContent === tiles[8].textContent && tiles[0].textContent == '') {
        tiles[0].textContent = computerO;
        boardState[0] = computerO;
        turn = playerX;
    } else if (tiles[2].textContent != '' && tiles[2].textContent === tiles[5].textContent && tiles[8].textContent == '' ||
        tiles[0].textContent != '' && tiles[0].textContent === tiles[4].textContent && tiles[8].textContent == '' ||
        tiles[6].textContent != '' && tiles[6].textContent === tiles[7].textContent && tiles[8].textContent == '') {
        tiles[8].textContent = computerO;
        boardState[8] = computerO;
        turn = playerX;
    } else if (tiles[0].textContent != '' && tiles[0].textContent === tiles[3].textContent && tiles[6].textContent == '' ||
        tiles[2].textContent != '' && tiles[2].textContent === tiles[4].textContent && tiles[6].textContent == '' ||
        tiles[7].textContent != '' && tiles[7].textContent === tiles[8].textContent && tiles[6].textContent == '') {
        tiles[6].textContent = computerO;
        boardState[6] = computerO;
        turn = playerX;
    } // check inner rows/columns:
    else if (tiles[4].textContent != '' && tiles[4].textContent === tiles[5].textContent && tiles[3].textContent == '' ||
        tiles[0].textContent != '' && tiles[0].textContent === tiles[6].textContent && tiles[3].textContent == '') {
        tiles[3].textContent = computerO;
        boardState[3] = computerO;
        turn = playerX;
    } else if (tiles[3].textContent != '' && tiles[3].textContent === tiles[4].textContent && tiles[5].textContent == '' ||
        tiles[2].textContent != '' && tiles[2].textContent === tiles[8].textContent && tiles[5].textContent == '') {
        tiles[5].textContent = computerO;
        boardState[5] = computerO;
        turn = playerX;
    } else if (tiles[1].textContent != '' && tiles[1].textContent === tiles[4].textContent && tiles[7].textContent == '' ||
        tiles[6].textContent != '' && tiles[6].textContent === tiles[8].textContent && tiles[7].textContent == '') {
        tiles[7].textContent = computerO;
        boardState[7] = computerO;
        turn = playerX;
    } else if (tiles[0].textContent != '' && tiles[0].textContent === tiles[2].textContent && tiles[1].textContent == '' ||
        tiles[4].textContent != '' && tiles[4].textContent === tiles[7].textContent && tiles[1].textContent == '') {
        tiles[1].textContent = computerO;
        boardState[1] = computerO;
        turn = playerX;
    } else {
        mediumMode();
    }
}

function checkWinner() {
    //check for winner - credit to Adam (see README)
    for (const winningCombination of winningCombinations) {
        const {
            combo
        } = winningCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if (tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            tiles[combo[0] - 1].classList.add('win-highlight');
            tiles[combo[1] - 1].classList.add('win-highlight');
            tiles[combo[2] - 1].classList.add('win-highlight');
            gameOverScreen(tileValue1);
            return;
        }
    }
    //check draw
    const allTileFilledIn = boardState.every((tile) => tile != null);
    if (allTileFilledIn) {
        gameOverScreen(null);
    }
}
//winnerText = tileValue1
function gameOverScreen(winnerText) {
    if (winnerText == 'X') {
        xScore += 1;
    } else if (winnerText == 'O') {
        oScore += 1;
    }
    let text = 'Draw!';
    if (winnerText != null) {
        text = `Winner is ${winnerText}`;
    }
    displayXScore.innerText = ` ${xScore}`;
    displayOScore.innerText = ` ${oScore}`;
    gameOverArea.className = 'visible';
    modalBackground.className = 'active';
    gameOverText.innerText = text;
}

//play again
function startNewGame() {
    gameOverArea.classList.add('fall-out');
    setTimeout(() => {
        gameOverArea.className = 'hidden';
        modalBackground.className -= 'active';
    }, 300);
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = '', tile.classList.remove('win-highlight', 'x-color')));
    turn = playerX;
    setHoverText();
}

//win conditions - credit to Adam (see README)
const winningCombinations = [
    //rows
    {
        combo: [1, 2, 3]
    },
    {
        combo: [4, 5, 6]
    },
    {
        combo: [7, 8, 9]
    },
    //columns
    {
        combo: [1, 4, 7]
    },
    {
        combo: [2, 5, 8]
    },
    {
        combo: [3, 6, 9]
    },
    //diagonals
    {
        combo: [1, 5, 9]
    },
    {
        combo: [3, 5, 7]
    },
];

document.addEventListener('DOMContentLoaded', function () {
    window.onload = function () {
        modalBackground.className += 'active';
        modal.className += 'active';
        let buttons = document.getElementsByClassName('game-mode');
        for (let button of buttons) {
            button.addEventListener('click', modalClick);
        }
    };
});

function modalClick() {
    modal.classList.add('fall-out');
    setTimeout(() => {
        modal.className -= 'active';
        modalBackground.className -= 'active';
    }, 300);
    let gameType = this.getAttribute('data-type');
    let currentMode = document.getElementById('current-mode');
    currentMode.innerText += ` ${gameType}`;
    runGame(gameType);
}