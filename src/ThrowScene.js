import {
    Scene
}
from "./Scene";

export
function createScene(game, endCallback) {
    var scene = new Scene(game);

    scene.addSprite(() => {
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(2, 0xff0000, 1);
        graphics.drawRect(10, 10, 100, 100);
    });

    return scene;
}