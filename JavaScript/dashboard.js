'use strict';

gameSettings.onsubmit = function() {
    let settings = {};
    switch (difficultySelect.value) {
        case 'easy': {
            settings.walls = 10;
            settings.treasures = 2;
            settings.enemySpeed = 500;
        } break;
        case 'medium': {
            settings.walls = 15;
            settings.treasures = 3;
            settings.enemySpeed = 200;
        } break;
        case 'hard': {
            settings.walls = 20;
            settings.treasures = 5;
            settings.enemySpeed = 150;
        } break;
        case 'impossible': {
            settings.walls = 10;
            settings.treasures = 5;
            settings.enemySpeed = 50;
        } break;
        case 'custom': {
            settings.walls = +walls.value;
            settings.treasures = +treasures.value;
            settings.enemySpeed = +enemySpeed.value;
        } break;
    }

    settings.boardWidth = boardWidth.value;
    settings.boardHeight = boardHeight.value;
    settings.cellSize = cellSize.value;

    sessionStorage.setItem('settings', JSON.stringify(settings));
    window.location.href = 'http://localhost:3000/schattenjacht.php';
}

if(document.documentElement.clientWidth < 1024) {
    boardWidth.value = 10;
    boardHeight.value = 15;
    cellSize.value = Math.trunc(document.documentElement.clientWidth*0.85/boardWidth.value);
} else {
    cellSize.value = Math.trunc(document.documentElement.clientHeight*0.85/boardWidth.value);
}

difficultySelect.onchange = function() {
    if (this.value === 'custom') {
        customDifficulty.style.display = '';
    } else {
        customDifficulty.style.display = 'none';
    }
}

widthOutput.innerText = boardWidth.value;
heightOutput.innerText = boardHeight.value;

boardHeight.oninput = function() {
    heightOutput.innerText = boardHeight.value;
    if(document.documentElement.clientWidth < 1024) {
        cellSize.value = Math.trunc(document.documentElement.clientWidth*0.85/boardWidth.value);
    } else {
        cellSize.value = Math.trunc(document.documentElement.clientHeight*0.85/boardHeight.value);
    }
}
boardWidth.oninput = function() {
    widthOutput.innerText = boardWidth.value;
    if(document.documentElement.clientWidth < 1024) {
        cellSize.value = Math.trunc(document.documentElement.clientWidth*0.85/boardWidth.value);
    } else {
        cellSize.value = Math.trunc(document.documentElement.clientHeight*0.85/boardHeight.value);
    }
}