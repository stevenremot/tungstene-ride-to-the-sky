import {
	Scene
}
from "../Scene";

import {
    createBackgroundSprite,
	createCarouselBaseSprite,
	createCarouselSasSprite,
	createGroundCollisionSprite,
	createCarouselLinkSprite,
	createMetersSprite
}
from "./sprites";

import {
	SpriteTracker
}
from "./sprite-tracking";

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

    scene.addSprite(createBackgroundSprite);

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

	var sasTracker = new SpriteTracker(
		sas,
		new Phaser.Point(
			sas.x,
			sas.y
		)
	);

	scene.addSprite(
		createGroundCollisionSprite,
		{
			sas,
			w: 200,
			y: 5,
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
			scene.updater = createFlyUpdater(
				game,
				scene,
				sas,
				sasTracker,
				endCallback
			);

			scene.addSprite(
				createMetersSprite,
				new Phaser.Point(400, 50),
				sasTracker,
				300
			);
		}
	);

	game.camera.follow(sas);
	game.camera.deadzone = new Phaser.Rectangle(120, 140, 400, 200);

	return scene;
}
