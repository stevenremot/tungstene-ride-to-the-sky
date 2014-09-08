/**
 * Create an event handler for sas rotation
 *
 * @param {Scene} scene
 * @param {Phaser.Sprite} link
 *
 * @return {Function}
 */
export
function createTurnEventHandler(scene, link) {
	var rotating = false;
	var lastPoint = null;
	var lastDir = null;

	return function (input) {
		var point = new Phaser.Point(
			input.x,
			input.y
		);

		var dir = null;

		if (lastPoint) {
			dir = Phaser.Point.subtract(
				point,
				lastPoint
			);
		}

		if (rotating) {
			if (lastDir && dir.getMagnitudeSq() !== 0) {
				var scal = lastDir.normalize().cross(dir.normalize());
				link.body.angularForce = ((scal > 0) ? 100 : -100) * dir.getMagnitudeSq();
			}
		} else {
			rotating = input.mousePointer.isDown;
		}

		lastPoint = point;
		lastDir = dir;
	};
}