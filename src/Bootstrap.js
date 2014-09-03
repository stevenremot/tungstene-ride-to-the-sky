import {Game} from "./Game";

export class Bootstrap {
    constructor() {
        this._phaserGame = null;
        this._game = null;
    }
    
    preload() {
        
    }
    
    create() {
        this._game = new Game(this._phaserGame);
    }
    
    start() {
        this._phaserGame = new Phaser.Game(
            640, 
            480,
            Phaser.AUTO,
            "tungstene-target",
            {
                preload: this.preload.bind(this),
                create: this.create.bind(this)
            }
        );
    }
}