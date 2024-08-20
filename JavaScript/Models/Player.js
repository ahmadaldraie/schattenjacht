"use strict";

export class Player {
    _nextBlockIndex;
    _currentBlockIndex;
    constructor(plaatsX, plaatsY, elem) {
        this.plaatsX = plaatsX;
        this.plaatsY = plaatsY;
        this.elem = elem;
    }

    moveLeft(blocks, hitPlayer) {
        this._currentBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        this.plaatsX--;
        this._nextBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        if (this.plaatsX > 0 && this.isNextBlockFree(blocks)) {
            this.elem.style.gridArea = ` ${this.plaatsY} / ${this.plaatsX} `;
            if (this.isNextBlockPlayer(blocks)) {
                hitPlayer();
            } else {
                blocks[this._nextBlockIndex].hasPlayer = true;
            }
            blocks[this._currentBlockIndex].hasPlayer = false;
            return true;
        } else {
            this.plaatsX++;
            return false;
        }
    }

    moveRight(blocks, hitPlayer) {
        this._currentBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        this.plaatsX++;
        this._nextBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        if (this.plaatsX <= blocks[blocks.length-1].plaatsX && this.isNextBlockFree(blocks)) {
            this.elem.style.gridArea = ` ${this.plaatsY} / ${this.plaatsX} `;
            if (this.isNextBlockPlayer(blocks)) {
                hitPlayer();
            } else {
                blocks[this._nextBlockIndex].hasPlayer = true;
            }
            blocks[this._currentBlockIndex].hasPlayer = false;
            return true;
        } else {
            this.plaatsX--;
            return false;
        }
    }

    moveUp(blocks, hitPlayer) {
        this._currentBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        this.plaatsY--;
        this._nextBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        if (this.plaatsY > 0 && this.isNextBlockFree(blocks)) {
            this.elem.style.gridArea = ` ${this.plaatsY} / ${this.plaatsX} `;
            if (this.isNextBlockPlayer(blocks)) {
                hitPlayer();
            } else {
                blocks[this._nextBlockIndex].hasPlayer = true;
            }
            blocks[this._currentBlockIndex].hasPlayer = false;
            return true;
        } else {
            this.plaatsY++;
            return false;
        }
    }

    moveDown(blocks, hitPlayer) {
        this._currentBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        this.plaatsY++;
        this._nextBlockIndex = (this.plaatsY-1) * blocks[blocks.length-1].plaatsX + (this.plaatsX-1);
        if (this.plaatsY <= blocks[blocks.length-1].plaatsY && this.isNextBlockFree(blocks)) {
            this.elem.style.gridArea = ` ${this.plaatsY} / ${this.plaatsX} `;
            if (this.isNextBlockPlayer(blocks)) {
                hitPlayer();
            } else {
                blocks[this._nextBlockIndex].hasPlayer = true;
            }
            blocks[this._currentBlockIndex].hasPlayer = false;
            return true;
        } else {
            this.plaatsY--;
            return false;
        }
    }

    isNextBlockFree(blocks) {
        if (blocks[this._nextBlockIndex]?.bewandelbaar) {
            return true;
        }
        return false;
    }

    isNextBlockPlayer(blocks) {
        if (blocks[this._nextBlockIndex]?.hasPlayer) {
            console.log(blocks[this._nextBlockIndex]);
            return true;
        }
        return false;
    }
}