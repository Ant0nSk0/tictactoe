document.addEventListener('DOMContentLoaded', function () {
    window.onload = function () {
        let modal = document.getElementById('modal-window');
        let modalBackground = document.getElementById('modal-bg');
        modalBackground.className += 'active';
        modal.className += 'active';
        let buttons = document.getElementsByClassName('game-mode');
        for (let button of buttons) {
            button.addEventListener('click', function () {
                onclick = modal.className -= 'active', modalBackground.className -= 'active';
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            })
        }
    }
})

const tiles = document.querySelectorAll('.tile');
const playerX = 'X';
const playerO = 'O';
let turn = playerX;
const computerO = 'O';
const boardState = Array(tiles.length);
boardState.fill(null);

//elements

const strike = document.getElementById('strike');
const gameOverArea = document.getElementById('game-over-area');
const gameOverText = document.getElementById('game-over-text');
const playAgain = document.getElementById('restart');
playAgain.addEventListener('click', startNewGame);
const changeMode = document.getElementById('change-mode');
changeMode.addEventListener('click', refresh);

function refresh() {
    onclick = location.reload()
}

function setHoverText() {
    tiles.forEach((tile) => {
        tile.classList.remove('x-hover');
        tile.classList.remove('o-hover');
    })

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if (tile.innerText == '') {
            tile.classList.add(hoverClass);
        }
    })
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

        if (tile.innerText != '') {
            return;
        }

        if (turn === playerX && gameType === 'vsComputer') {
            tile.innerText = playerX;
            boardState[tileNumber - 1] = playerX;

            computerTurn();
            checkWinner();

            //computer decision
            function computerTurn() {
                switch (tiles.textContent === '' != 'X') {
                    case tiles[0].textContent === '':
                        tiles[0].textContent = computerO;
                        boardState[0] = computerO;
                        break;
                    case tiles[1].textContent === '':
                        tiles[1].textContent = computerO;
                        boardState[1] = computerO;
                        break;
                    case tiles[2].textContent === '':
                        tiles[2].textContent = computerO;
                        boardState[2] = computerO;
                        break;
                    case tiles[3].textContent === '':
                        tiles[3].textContent = computerO;
                        boardState[3] = computerO;
                        break;
                    case tiles[4].textContent === '':
                        tiles[4].textContent = computerO;
                        boardState[4] = computerO;
                        break;
                    case tiles[5].textContent === '':
                        tiles[5].textContent = computerO;
                        boardState[5] = computerO;
                        break;
                    case tiles[6].textContent === '':
                        tiles[6].textContent = computerO;
                        boardState[6] = computerO;
                        break;
                    case tiles[7].textContent === '':
                        tiles[7].textContent = computerO;
                        boardState[7] = computerO;
                        break;
                    case tiles[8].textContent === '':
                        tiles[8].textContent = computerO;
                        boardState[8] = computerO;
                        break;
                }
            }
        } else if (turn === playerX && gameType === 'vsPlayer'){
            tile.innerText = playerX;
            boardState[tileNumber -1] = playerX;
            turn = playerO;

        } else if (turn === playerO && gameType === 'vsPlayer'){
            tile.innerText = playerO;
            boardState[tileNumber -1] = playerO;
            turn = playerX;
        }
        checkWinner();
        setHoverText();
    }
}

function checkWinner(){
    //check for winner
    for (const winningCombination of winningCombinations){
        const {combo, strikeClass} = winningCombination;
        const tileValue1 = boardState[combo[0] -1];
        const tileValue2 = boardState[combo[1] -1];
        const tileValue3 = boardState[combo[2] -1];

        if (tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }
    //check draw
    const allTileFilledIn = boardState.every((tile) => tile != null);
    if (allTileFilledIn){
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText){
    let text = 'Draw!';
    if(winnerText != null){
        text = `Winner is ${winnerText}`;
    }
    gameOverArea.className = 'visible';
    gameOverText.innerText = text;
}

//play again
function startNewGame(){
    strike.className = 'strike';
    gameOverArea.className = 'hidden';
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ''));
    turn = playerX;
    setHoverText();
    runGame();
}

//win conditions
const winningCombinations = [
    //rows
    {combo: [1, 2, 3], strikeClass: 'strike-row-1'},
    {combo: [4, 5, 6], strikeClass: 'strike-row-2'},
    {combo: [7, 8, 9], strikeClass: 'strike-row-3'},
    //columns
    {combo: [1, 4, 7], strikeClass: 'strike-column-1'},
    {combo: [2, 5, 8], strikeClass: 'strike-column-2'},
    {combo: [3, 6, 9], strikeClass: 'strike-column-3'},
    //diagonals
    {combo: [1, 5, 9], strikeClass: 'strike-diagonal-1'},
    {combo: [3, 5, 7], strikeClass: 'strike-diagonal-2'},
];