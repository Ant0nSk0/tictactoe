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
                runGame(gameType)
                console.log(gameType)
            })
        }
    }
})