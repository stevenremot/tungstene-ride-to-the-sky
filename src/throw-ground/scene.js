import {
	Scene
}
from "../Scene";

import {
	createCarouselBaseSprite,
	createCarouselSasSprite,
	createGroundCollisionSprite,
	createCarouselLinkSprite
}
from "./sprites";

export
function createScene(game, endCallback) {
	var scene = new Scene(game);

	var groundGroup = game.physics.p2.createCollisionGroup();
	var carouselGroup = game.physics.p2.createCollisionGroup();

	var base = scene.addSprite(
		createCarouselBaseSprite,
		{
			x: 300,
			y: 0,
			w: 20,
			h: 200,
			group: carouselGroup
		}
	);

	var sas = scene.addSprite(
		createCarouselSasSprite,
		{
			x: 200,
			y: 150,
			w: 50,
			h: 20,
			group: carouselGroup
		}
	);

	scene.addSprite(
		createGroundCollisionSprite,
		{
			sas,
			w: 200,
			y: 0,
			group: groundGroup
		}
	);

	scene.addSprite(
		createCarouselLinkSprite,
		{
			base,
			sas,
			posInBase: new Phaser.Point(0, 0),
			posInSas: new Phaser.Point(0, 0),
			offset: 5,
			w: 10,
			group: carouselGroup
		}
	);

	return scene;
}