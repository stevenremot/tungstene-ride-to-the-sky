/**
 * Class in charge of keeping track of current groups and sprites.
 *
 * Scene groups and sprites creation is done via constructor functions.
 * These functions take Phaser's game class as first parameter, and then their
 * own parameters.
 *
 * To create a group or a sprite, the constructor is passed to Scene's
 * construction methods, which pass games and specialized arguments to the
 * constructor functions.
 *
 * Constructors return created groups and sprites, soso that scene can register
 * them.
 */
export class Scene {
    /**
     * Class constructor.
     *
     * @param {Phaser.Game} game
     */
    constructor(game) {
        this._phaserGame = game;
        this._sprites = [];
        this._groups = [];
    }

    /**
     * Group construction function
     *
     * Call groupConstructor with Phaser game and args, and registers the
     * created group.
     *
     * groupConstructor is a function that takes as parameters Phaser game and
     * an arbitrary number of arguments, and returns a Phaser group.
     *
     * @param {Function} groupConstructor
     *
     * @return {Phaser.Group}
     */
    addGroup(groupConstructor, ...args) {
        var group = groupConstructor(this._phaserGame, ...args);
        this._groups.push(group);
        return group;
    }

    /**
     * Sprite construction function
     *
     * Call spriteConstructor with Phaser game and args, and registers the
     * created sprite.
     *
     * spriteConstructor is a function that takes a sparameters Phaser game and
     * and arbitrary number of arguments, and returns a Phaser sprite.
     *
     * @param {Function} spriteConstructor
     * @param {Phaser.Group} [group]
     *
     * @return {Phaser.Sprite}
     */
    addSprite(spriteConstructor, group, ...args) {
        var target = this._phaserGame;
        if (group instanceof Phaser.Group) {
            target = group;
        } else {
            args = [group].concat(args);
        }
        var sprite = spriteConstructor(target, ...args);
        this._sprites.push(sprite);
        return sprite;
    }
    
    /**
     * Remove all the groups and sprites
     * 
     * Also remove them from the game
     */
    clear() {
        for (var sprite of this._sprites) {
            this._removeSprite(sprite);
        }
        
        for (var group of this._groups) {
            this._removeGroup(group);
        }
    }
    
    /**
     * Remove a group from the groups list
     * 
     * @param {Phaser.Group} group
     */
    _removeGroup(group) {
        group.destroy();
        this._group.splice(this._groups.indexOf(group), 1);
        
    }
    
    /**
     * Remove a sprite from the srites list
     * 
     * @param {Phaser.Sprite} sprite
     */
    _removeSprite(sprite) {
        sprite.destroy();
        this._sprites.splice(this._sprites.indexOf(sprite), 1);
    }
}