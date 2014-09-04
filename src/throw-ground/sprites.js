/**
 * Create the part of the ground on which the sas collides
 *
 * This is a tiny rectangle that follows sas movements horizontaly, so that
 * sas bounces on it.
 *
 * This is how infinite ground is implemented.
 *
 * @param {Phaser.Game} game
 * @param {Phaser.Sprite} sas
 * @param {Number} w
 * @param {Number} y
 *
 * @return {Phaser.Sprite}
 */
export
function createGroundCollisionSprite(game, {sas, w, y}) {
	var bitmap = game.add.bitmapData(w, 1);
	bitmap.fill(0, 0, 0, 0);

	var ground = game.add.sprite(sas.position.x, game.height - y);
	game.physics.p2.enable(ground);
	ground.body.setRectangle(w, 1);
	ground.body.static = true;

	ground.update = function () {
		this.position.x = sas.position.x;
	};

	return ground;
}

/**
 * Create the base of the carousel
 *
 * x is the horizontal center, and y is the bottom.
 *
 * @param {Phaser.Game} game
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 *
 * @return {Phaser.Sprite}
 */
export
function createCarouselBaseSprite(game, { x, y, w, h }) {
	var bitmap = game.add.bitmapData(w, h);
	bitmap.fill(255, 0, 0, 1);

	var base = game.add.sprite(x - w / 2, game.height - y - h, bitmap);

	return base;
}

/**
 * Create the SAS of the carousel
 *
 * @param {Phaser.Game} game
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 *
 * @return {Phaser.Sprite}
 */
export
function createCarouselSasSprite(game, { x, y, w, h }) {
	var bitmap = game.add.bitmapData(w, h);
	bitmap.fill(0, 255, 0, 1);

	var sas = game.add.sprite(x - w / 2, game.height - y + h / 2, bitmap);
	game.physics.p2.enable(sas);
	sas.body.setRectangle(w, h);
	sas.body.mass = 5;
	sas.body.velocity.x = 20;
	sas.body.velocity.y = -20;

	return sas;
}