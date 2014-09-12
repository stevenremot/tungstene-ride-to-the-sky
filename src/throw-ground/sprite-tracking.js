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
		this._spriteStopCallback = () => null;
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

	checkStopped() {
		var absSpeed = Math.abs(this._sprite.body.velocity.x);
		if (!this._spriteStopped &&  absSpeed <= 1e-3) {
			this._spriteStopped = true;
			this._spriteStopCallback();
		}
	}
}