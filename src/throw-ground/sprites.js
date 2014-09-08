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
 * @param {Phaser.Physics.P2.CollisionGroup} group
 *
 * @return {Phaser.Sprite}
 */
export
function createGroundCollisionSprite(game, {
	sas, w, y, group
}) {
	var bitmap = game.add.bitmapData(w, 100);
	bitmap.fill(0, 0, 0, 0);

	var ground = game.add.sprite(sas.position.x, game.height - y + 100);
	game.physics.p2.enable(ground, true);
	ground.body.setRectangle(w, 100);
	ground.body.static = true;
	ground.body.setCollisionGroup(group);

	ground.update = function () {
		this.body.x = sas.position.x;
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
 * @param {Phaser.Physics.P2.CollisionGroup} group
 *
 * @return {Phaser.Sprite}
 */
export
function createCarouselBaseSprite(game, {
	x, y, w, h, group
}) {
	var bitmap = game.add.bitmapData(w, h);
	bitmap.fill(255, 0, 0, 1);

	var base = game.add.sprite(x, game.height - y - h * 0.9, bitmap);
	game.physics.p2.enable(base, true);
	base.anchor.setTo(0.5, 0.1);
	base.body.static = true;
	base.body.setRectangle(1, 1, 0, 0.5);
	base.body.setCollisionGroup(group);

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
 * @param {Phaser.Physics.P2.CollisionGroup} group
 *
 * @return {Phaser.Sprite}
 */
export
function createCarouselSasSprite(
	game,
	{ x, y, w, h, group, groundGroup }
) {
	var bitmap = game.add.bitmapData(w, h);
	bitmap.fill(0, 255, 0, 1);

	var sas = game.add.sprite(x, game.height - y, bitmap);
	game.physics.p2.enable(sas);
	sas.body.setRectangle(w, h);
	sas.body.mass = 1;
	sas.anchor.setTo(0.5, 0.5);
	sas.body.setCollisionGroup(group);
	sas.body.collidesWith = [groundGroup];

	return sas;
}

/**
 * Create the link between carousel base and sas
 *
 * @param {Phaser.Game} game
 * @param {Phaser.Sprite} base
 * @param {Phaser.Sprite} sas
 * @param {Phaser.Point} posInBase
 * @param {Phaser.Point} posInSas
 * @param {Number} w
 * @param {Number} offset
 * @param {Phaser.Physics.P2.CollisionGroup} group
 *
 * @return {Phaser.Sprite}
 */
export
function createCarouselLinkSprite(
	game,
	{ base, sas, posInBase, posInSas, w, offset, group }
) {
	var p1 = Phaser.Point.add(
		base.position,
		posInBase
	);

	var p2 = Phaser.Point.add(
		sas.position,
		posInSas
	);

	var diff = Phaser.Point.subtract(p2, p1);
	var distance = Phaser.Point.distance(p1, p2);
	var h = distance + 2 * offset;

	var bitmap = game.add.bitmapData(w, h);
	bitmap.fill(0, 0, 255, 1);

	var linkPosition = Phaser.Point.add(
		p1,
		Phaser.Point.divide(
			diff,
			new Phaser.Point(2, 2)
		)
	);

	var link = game.add.sprite(
		linkPosition.x,
		linkPosition.y,
		bitmap
	);
	game.physics.p2.enable(link);
	var angle = Phaser.Point.angle(diff, new Phaser.Point(0, 0)) + Math.PI / 2;
	link.body.setRectangle(w, h);
	link.body.angle = angle * 180 / Math.PI;
	link.body.mass = 0.1;
	link.body.setCollisionGroup(group);

	var maxForce = 20000000;
	game.physics.p2.createRevoluteConstraint(
		base,
		[0, 0],
		link,
		[0, distance / 2],
		maxForce
	);

	game.physics.p2.createRevoluteConstraint(
		link,
		[0, -distance / 2],
		sas,
		[0, 0],
		maxForce
	);

	return link;
}