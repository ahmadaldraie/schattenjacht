"use strict";

export class Block {
    constructor(width, bewandelbaar, verzamelbaar, hasPlayer, plaatsX, plaatsY) {
        this.width = width;
        this.bewandelbaar = bewandelbaar;
        this.verzamelbaar = verzamelbaar;
        this.hasPlayer = hasPlayer;
        this.plaatsX = plaatsX;
        this.plaatsY = plaatsY;
    }
}