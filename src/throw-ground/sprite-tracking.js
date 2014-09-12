/**
 * Class in charge of tracking sprite movement
 *
 * It provides metrics on sprite position, and can call functions on sprite stopping.
 */
export class SpriteTracker {
	constructor(sprite, basePos) {
		this._sprite = sprite;
		this._basePos = basePos;
		this._spriteStopped = false;
		this._spriteStopCallback = null;
	}

	reset() {
		this._spriteStopped = false;
	}

	get position() {
		return Phaser.Point.subtract(
			this._sprite.position,
			this._basePos
		);
	}

	onStop(callback) {
		this._spriteStopCallback = callback;
	}

	_checkStopped() {
		if (!this._spriteStopped && this.sprite.velocity.x === 0) {
			this._spriteStopped = true;
			this._spriteStopCallback();
		}
	}
}