/**
 * Create an event handler for sas rotation
 *
 * @param {Scene} scene
 * @param {Phaser.Sprite} link
 *
 * @return {Function}
 */
export
function createTurnEventHandler(scene, link, sas, endCallback) {
	var lastPoint = null;
	var lastDir = null;
	var clicking = false;
	var force = 200;

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

		if (lastDir) {
			var scal = lastDir.normalize().cross(dir.normalize());
			var direction = ((scal > 0) ? 1 : -1);
			link.body.angularForce = direction *	force *	dir.getMagnitudeSq();
			sas.body.angularForce = link.body.angularForce / 100;
		}

		if (!clicking) {
			clicking = input.mousePointer.isDown;
		} else if(input.mousePointer.isUp) {
			endCallback();
		}

		lastPoint = point;
		lastDir = dir;
	};
}

/**
 * Updater for the moment the sas is flying
 *
 * @param {Phaser.Game} game
 * @param {Phaser.Sprite} sas
 *
 * @return {Function}
 */
export
function createFlyUpdater(game, scene, sas, sasTracker, endCallback) {
	var sasStopped = false;
	var downed = false;

	sasTracker.onStop(() => {
		scene.addSprite(
			// TODO: Put in sprites.js
			(game) => {
				var text = game.add.text(
					game.camera.x + game.camera.width / 2,
					game.camera.y + game.camera.height / 2,
					"Nice job ! Click to restart.",
					{
						font: "40px Arial",
						fill: "white",
						align: "center"
					}
				);

				text.anchor.setTo(0.5, 0.5);
				return text;
			}
		);

		sasStopped = true;
	});

	return function (input) {
		sasTracker.checkStopped();
		game.world.x = sas.x - game.world.width / 2;
		game.world.y = sas.y - game.world.height / 2;

		if (downed && input.mousePointer.isUp && sasStopped) {
			endCallback("throw-ground");
		}
		downed = input.mousePointer.isDown;
	};
}
