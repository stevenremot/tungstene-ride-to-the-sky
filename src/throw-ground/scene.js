import {
	Scene
}
from "../Scene";

import {
	createCarouselBaseSprite,
	createCarouselSasSprite,
	createGroundCollisionSprite
}
from "./sprites";

export
function createScene(game, endCallback) {
	var scene = new Scene(game);

	scene.addSprite(
		createCarouselBaseSprite,
		{
			x: 300,
			y: 0,
			w: 20,
			h: 200
		}
	);

	var sas = scene.addSprite(
		createCarouselSasSprite,
		{
			x: 200,
			y: 150,
			w: 50,
			h: 20
		}
	);

	var ground = scene.addSprite(
		createGroundCollisionSprite,
		{
			sas,
			w: 500,
			y: 0
		}
	);

	return scene;
}