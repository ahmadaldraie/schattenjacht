"use strict";

import { Block } from "./Models/Block.js";
import { Board } from "./Models/Board.js";
import { Schattenjagger } from "./Models/Schattenjager.js";
import { Vijand } from "./Models/Vijand.js";

const gameSettings = JSON.parse(sessionStorage.getItem("settings"));

let startTouchX = 0;
let startTouchY = 0;
let startTime = 0;
const infoContainer = document.getElementById('infoContainer');
const scoreElem = document.getElementById('score');
let enemyInterval;
let collectedTreasures = 0;
let isErSchat = false;
const board = new Board(gameSettings.boardWidth, gameSettings.boardHeight, document.getElementById('speelbord'));
const schattenjagger = new Schattenjagger(0, 0, null);
const vijand = new Vijand(0, 0, null, gameSettings.enemySpeed);
const blocks = [];
let blockSize = gameSettings.cellSize;
setBoardSize();
setBoardBlocks();
infoContainer.style.width = board.elem.offsetWidth + 'px';

spawnMuren();
spawnSchatten();
spawnSchattenjagger();
spawnVijand();
showLives();

document.addEventListener('keydown', handleMovement);

document.addEventListener("touchstart", function(event) {
    let touchobj = event.changedTouches[0];
    startTouchX = touchobj.pageX;
    startTouchY = touchobj.pageY;
});

document.addEventListener("touchend", handleMovementGSM);


function setBoardSize() {
    board.elem.style.gridTemplateColumns = `repeat(${board.width}, ${blockSize}px)`;
    board.elem.style.gridTemplateRows = `repeat(${board.height}, ${blockSize}px)`;
}

function setBoardBlocks() {
    for (let y = 1; y <= board.height; y++) {
        for (let x = 1; x <= board.width; x++) {
            blocks.push(new Block(blockSize, true, false, false, x, y));
        }
    }
}

function spawnMuren() {
    let block;
    let i = 0;
    while (i < gameSettings.walls) {
        block = getRandomBlock(blocks.length);
        if (blocks[block].bewandelbaar) {
            blocks[block].bewandelbaar = false;
            let muur = document.createElement('div');
            muur.className = 'muur';
            muur.style.gridArea = ` ${blocks[block].plaatsY} / ${blocks[block].plaatsX}`;
            board.elem.append(muur);
            i++;
        }
    }
}

function spawnSchatten() {
    let block;
    let i = 0;
    while (i < gameSettings.treasures) {
        block = getRandomBlock(blocks.length);
        if (blocks[block].bewandelbaar && !blocks[block].verzamelbaar) {
            blocks[block].verzamelbaar = true;
            let schat = document.createElement('div');
            schat.className = 'schat';
            schat.id = `schat${block}`;
            schat.style.gridArea = ` ${blocks[block].plaatsY} / ${blocks[block].plaatsX}`;
            board.elem.append(schat);
            i++;
        }
    }
}

function spawnSchattenjagger() {
    let block;
    while (true) {
        block = getRandomBlock(blocks.length);
        if (blocks[block].bewandelbaar && !blocks[block].verzamelbaar) {
            blocks[block].hasPlayer = true;
            schattenjagger.plaatsX = blocks[block].plaatsX;
            schattenjagger.plaatsY = blocks[block].plaatsY;
            schattenjagger.elem = document.createElement('div');
            schattenjagger.elem.className = 'schattenjagger';
            schattenjagger.elem.style.gridArea = ` ${blocks[block].plaatsY} / ${blocks[block].plaatsX} `;
            board.elem.append(schattenjagger.elem);
            break;
        }
    } 
}

function respawnSchattenjagger() {
    let block;
    while (true) {
        block = getRandomBlock(blocks.length);
        if (blocks[block].bewandelbaar && !blocks[block].verzamelbaar && !blocks[block].hasPlayer) {
            blocks[block].hasPlayer = true;
            schattenjagger.plaatsX = blocks[block].plaatsX;
            schattenjagger.plaatsY = blocks[block].plaatsY;
            schattenjagger.elem = document.querySelector('.schattenjagger');
            schattenjagger.elem.style.gridArea = ` ${blocks[block].plaatsY} / ${blocks[block].plaatsX} `;
            break;
        }
    } 
}

function spawnVijand() {
    let block;
    while (true) {
        block = getRandomBlock(blocks.length);
        if (blocks[block].bewandelbaar && !blocks[block].verzamelbaar) {
            vijand.plaatsX = blocks[block].plaatsX;
            vijand.plaatsY = blocks[block].plaatsY;
            vijand.elem = document.createElement('div');
            vijand.elem.className = 'vijand';
            vijand.elem.style.gridArea = ` ${blocks[block].plaatsY} / ${blocks[block].plaatsX} `;
            board.elem.append(vijand.elem);
            break;
        }
    } 
}

function moveEnemy() {
    let xBlocked = false;
    let yBlocked = false;
    move();
    function move(moveX = true, moveY = false) {
        if (moveX) {
            if (vijand.plaatsX < schattenjagger.plaatsX) {
                if (!vijand.moveRight(blocks, hitPlayer)) {
                    xBlocked = true;
                    move(false, true);
                }
            } else if (vijand.plaatsX > schattenjagger.plaatsX) {
                if(!vijand.moveLeft(blocks, hitPlayer)) {
                    xBlocked = true;
                    move(false, true);
                }
            } else if (yBlocked) {
                (vijand.moveRight(blocks, hitPlayer) || vijand.moveLeft(blocks, hitPlayer));
                yBlocked = false;
                setTimeout(move(false, true), vijand.speed/2);
            } else {
                move(false, true);
            }
        } else if (moveY) {
            if (vijand.plaatsY < schattenjagger.plaatsY) {
                if(!vijand.moveDown(blocks, hitPlayer)) {
                    yBlocked = true;
                    move(true, false);
                }
            } else if (vijand.plaatsY > schattenjagger.plaatsY) {
                if(!vijand.moveUp(blocks, hitPlayer)) {
                    yBlocked = true;
                    move(true, false);
                }
            } else if (xBlocked) {
                (vijand.moveDown(blocks, hitPlayer) || vijand.moveUp(blocks, hitPlayer));
                xBlocked = false;
                setTimeout(move(true, false), vijand.speed/2);
            } else {
                move(true, false);
            }
        }
    }
}

function handleMovement(event) {
    if (!enemyInterval) {
        startTime = Date.now();
        enemyInterval = setInterval(() => moveEnemy(), vijand.speed);
    }
    switch (event.code) {
        case 'ArrowDown':
        case 'KeyS'     : 
            isErSchat = schattenjagger.moveDown(blocks, hitPlayer); 
        break;
        case 'ArrowUp':
        case 'KeyW'   : 
            isErSchat =  schattenjagger.moveUp(blocks, hitPlayer); 
        break;
        case 'ArrowRight':
        case 'KeyD'      : 
            isErSchat = schattenjagger.moveRight(blocks, hitPlayer); 
        break;
        case 'ArrowLeft':
        case 'KeyA'     : 
            isErSchat = schattenjagger.moveLeft(blocks, hitPlayer); 
        break;
    } 
    if (isErSchat) {
        blocks[isErSchat].verzamelbaar = false;
        document.getElementById(`schat${isErSchat}`).remove();
        console.log(startTime)
        schattenjagger.score += Math.round((1000 * (500 / vijand.speed)) /*- ((Date.now() - startTime) * 5)*/);
        scoreElem.innerText = schattenjagger.score;
        collectedTreasures++;
        isErSchat = null;
        if (collectedTreasures === +gameSettings.treasures) {
            winTheGame();
        }
    }
}

function handleMovementGSM(event) {
    if (!enemyInterval) {
        enemyInterval = setInterval(() => moveEnemy(), vijand.speed);
    }
    let touchobj = event.changedTouches[0];
    let diffX = startTouchX - touchobj.pageX;
    let diffY = startTouchY - touchobj.pageY;
    let deltaX = Math.abs(diffX);
    let deltaY = Math.abs(diffY);
    if (deltaX > deltaY) {
        if (diffX > 0) {
            isErSchat = schattenjagger.moveLeft(blocks, hitPlayer); 
        } else {
            isErSchat = schattenjagger.moveRight(blocks, hitPlayer); 
        }
    } else {
        if (diffY > 0) {
            isErSchat =  schattenjagger.moveUp(blocks, hitPlayer);
        } else {
            isErSchat = schattenjagger.moveDown(blocks, hitPlayer); 
        }
    }
    if (isErSchat) {
        blocks[isErSchat].verzamelbaar = false;
        document.getElementById(`schat${isErSchat}`).remove();
        schattenjagger.score += 1000 * (500 / vijand.speed);
        scoreElem.innerText = schattenjagger.score;
        collectedTreasures++;
        isErSchat = null;
        if (collectedTreasures === +gameSettings.treasures) {
            winTheGame();
        }
    }
}

function showLives() {
    infoContainer.lastElementChild.innerHTML = '';
    for (let i = 0; i < schattenjagger.lives; i++) {
        let heart = document.createElement('img');
        heart.src = 'Assets/heart.png';
        heart.alt = '❤';
        heart.className = 'heart';
        infoContainer.lastElementChild.append(heart);
    }
}

function winTheGame() {
    document.removeEventListener('keydown', handleMovement);
    document.removeEventListener("touchend", handleMovementGSM);
    clearInterval(enemyInterval);
    document.querySelector('#endgamePopup h1').innerText = 'You won!';
    document.querySelector('#endgamePopup #popup_score').innerText = schattenjagger.score;
    document.getElementById('endgamePopup').style.display = 'flex';
}

function loseTheGame() {
    document.removeEventListener('keydown', handleMovement);
    document.removeEventListener("touchend", handleMovementGSM);
    clearInterval(enemyInterval);
    document.querySelector('#endgamePopup h1').innerText = 'Game over!';
    document.querySelector('#endgamePopup #popup_score').innerText = schattenjagger.score;
    document.getElementById('endgamePopup').style.display = 'flex';
}

function hitPlayer() {
    schattenjagger.takeLife();
    showLives();
    if (!schattenjagger.isAlive) {
        loseTheGame();
    } else {
        respawnSchattenjagger();
    }
}

function getRandomBlock(max) {
    return Math.floor(Math.random() * max);
}