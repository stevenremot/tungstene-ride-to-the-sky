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

import {
	createTurnEventHandler,
	createFlyUpdater
}
from "./controls";

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
			x: 300,
			y: 50,
			w: 50,
			h: 20,
			group: carouselGroup,
			groundGroup: groundGroup
		}
	);

	scene.addSprite(
		createGroundCollisionSprite,
		{
			sas,
			w: 200,
			y: 10,
			group: groundGroup,
			carouselGroup: carouselGroup
		}
	);

	var link = scene.addSprite(
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

	scene.updater = createTurnEventHandler(
		scene,
		link,
		sas,
		() => {
			game.physics.p2.removeConstraint(link.tungstene.sasConstraint);
			scene.updater = createFlyUpdater(game, sas);
		}
	);

	game.camera.follow(sas);
	game.camera.deadzone = new Phaser.Rectangle(120, 140, 400, 200);

	return scene;
}