"use strict";

import {Player} from './Player.js';

export class Schattenjagger extends Player {

    constructor(plaatsX, plaatsY, elem) {
        super(plaatsX, plaatsY, elem);
        this.lives = 3;
        this.score = 0;
        this.isAlive = true;
    }

    moveLeft(blocks, hitPlayer) {
        super.moveLeft(blocks, hitPlayer);
        return this.heeftDeVolgendeBlockSchat(blocks);
    }

    moveRight(blocks, hitPlayer) {
        super.moveRight(blocks, hitPlayer);
        return this.heeftDeVolgendeBlockSchat(blocks);
    }

    moveUp(blocks, hitPlayer) {
        super.moveUp(blocks, hitPlayer);
        return this.heeftDeVolgendeBlockSchat(blocks);
    }

    moveDown(blocks, hitPlayer) {
        super.moveDown(blocks, hitPlayer);
        return this.heeftDeVolgendeBlockSchat(blocks);
    }

    takeLife() {
        if (this.lives > 1) {
            this.lives--;
        } else {
            this.isAlive = false;   
        }
    }

    heeftDeVolgendeBlockSchat(blocks) {
        if (blocks[this._nextBlockIndex]?.verzamelbaar) {
            return this._nextBlockIndex;
        }
        return null;
    }
}