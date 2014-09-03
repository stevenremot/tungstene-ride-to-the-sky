import {Scene} from "./Scene";

/**
 * Runs the "game" part of the game
 */
export class Game {
    /**
     * Class constructor
     * 
     * @param {Phaser.Game} game
     */
    constructor(game) {
        this._phaserGame = game;
        this._scene = new Scene(game);
        this._init();
    }
    
    _init() {
        this._scene.addSprite((game) => {
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(1, 0x0000ff, 1);
            graphics.drawRect(50, 250, 100, 100);
            return graphics;
        });
    }
    
}