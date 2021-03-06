/**
 * In charge of starting and running scenes
 *
 * Scenes are started using scene constructors. These are functions that takes
 * as arguments the Phaser game and an end callback, end that returns a Scene
 * object.
 *
 * The end callback is a function that must be called when the current scene is
 * finished, and that a new scene must start. It takes as parameter the label
 * of the scene to start (see constructor).
 */
export class Game {
    /**
     * Class constructor
     *
     * @param {Phaser.Game} game
     * @param {Object} scenes An object which keys are scene names, and values
     *                 are associated scene constructors.
     */
    constructor(game, scenes) {
        this._phaserGame = game;
        this._scenes = scenes;
        this._currentScene = null;

        this._phaserGame.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 1200;
        game.physics.p2.restitution = 0.8;
        game.world.setBounds(-9000000, -9000000, 90000000, 9000480);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        document.getElementById("go-fullscreen").addEventListener(
            "click",
            () => game.scale.startFullScreen(false)
        );
    }

    _switchScene(newScene) {
        this._currentScene.clear();
        this.startScene(newScene);
    }

    startScene(scene) {
        this._currentScene = this._scenes[scene](
            this._phaserGame,
            this._switchScene.bind(this)
        );
    }
}
