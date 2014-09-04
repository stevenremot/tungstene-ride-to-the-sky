import {
    Game
}
from "./Game";

import {
    createScene as createThrowScene
}
from "./throw-ground/scene";

/**
 * Class in charge of starting the game
 */
export class Bootstrap {
    constructor() {
        this._phaserGame = null;
        this._game = null;
    }

    preload() {

    }

    create() {
        this._game = new Game(
            this._phaserGame, {
                "throw-ground": createThrowScene
            }
        );
        this._game.startScene("throw-ground");
    }

    start() {
        this._phaserGame = new Phaser.Game(
            640,
            480,
            Phaser.AUTO,
            "tungstene-target", {
                preload: this.preload.bind(this),
                create: this.create.bind(this)
            }
        );
    }
}