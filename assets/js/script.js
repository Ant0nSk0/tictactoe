document.addEventListener('DOMContentLoaded', function(){
    window.onload = function(){
        let modal = document.getElementById('modal-window');
        let modalBackground = document.getElementById('modal-bg');
        modalBackground.className += 'active';
        modal.className += 'active';
        let buttons = document.getElementsByClassName('game-mode');
        for(let button of buttons){
            button.addEventListener('click', function(){
                onclick = modal.className -= 'active', modalBackground.clasName -= 'active';
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
                console.log(gameType);
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

function refresh(){
    onclick = location.reload()
}
