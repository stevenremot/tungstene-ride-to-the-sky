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
	sas, w, y, group, carouselGroup
}) {
	var h = 1000;
	var bitmap = game.add.bitmapData(w, h);
	bitmap.fill(255, 0, 0, 0);

	var ground = game.add.sprite(sas.position.x, game.height - y + h / 2, bitmap);
	game.physics.p2.enable(ground, true);
	ground.body.setRectangle(w, h);
	ground.body.static = true;
	ground.body.fixedRotation = true;
	ground.body.setCollisionGroup(group);
	ground.body.collides(carouselGroup);

	ground.update = function () {
		this.x = sas.position.x;
		this.body.x = sas.position.x;
		this.body.data.updateAABB();
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
	sas.body.collideWorldBounds = false;
	sas.body.setCollisionGroup(group);
	sas.body.collides(groundGroup);

	return sas;
}

/**
 * Create the link between carousel base and sas
 *
 * Return the sprite with a supplementary attribute tungstene.sasConstraint
 * that contains the constraint between link and sas.
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

	link.tungstene = {};

	link.tungstene.sasConstraint = game.physics.p2.createRevoluteConstraint(
		link,
		[0, -distance / 2],
		sas,
		[0, 0],
		maxForce
	);

	return link;
}

function getTextPos(camera, posOnScreen) {
	return [
		camera.x + posOnScreen.x,
		camera.y + posOnScreen.y
	];
}

/**
 * Creates the
 */
export
function createMetersSprite(game, posOnScreen, sas, baseX) {
	var [x, y] = getTextPos(game.camera, posOnScreen);
	var text = game.add.text(x, y, "", {
		font: "30px Arial",
		fill: "white",
		align: "center"
	});

	text.update = function () {
		text.setText("Meters: " + Math.round((sas.x - baseX) / 10));
		var [x, y] = getTextPos(game.camera, posOnScreen);
		text.x = x;
		text.y = y;
	};

	return text;
}