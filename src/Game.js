/* global Phaser */

export class Game {
    constructor() {
        this.game = null;
    }
    
    preload() {
        
    }
    
    create() {
        
    }
    
    start() {
        this.game = new Phaser.Game(
            800, 
            600,
            Phaser.AUTO,
            'tungstene-target',
            {
                preload: this.preload.bind(this),
                create: this.create.bind(this)
            }
        );
    }
}