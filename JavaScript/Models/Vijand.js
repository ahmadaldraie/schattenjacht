"use strict";

import {Player} from './Player.js';

export class Vijand extends Player {

    constructor(plaatsX, plaatsY, elem, speed) {
        super(plaatsX, plaatsY, elem);
        this.speed = speed;
    }

    moveRandomDirection(blocks) {
        if (this.moveDown(blocks) || this.moveUp(blocks) || this.moveLeft(blocks) || this.moveRight(blocks)) {
            return;
        }
    }

    isNextBlockFree(blocks) {
        if (blocks[this._nextBlockIndex]?.bewandelbaar && !blocks[this._nextBlockIndex]?.verzamelbaar) {
            return true;
        }
        return false;
    }

}