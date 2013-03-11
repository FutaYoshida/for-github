enchant();

window.onload = function(){
	var game = new Game(480,320);
	game.fps = 15;
	game.preload("start.png");
	game.preload("chara1.png");
	game.preload("map0.png");
	var greenField = [];

	game.onload = function(){
		map = new Map(16,16);
		map.image = game.assets["map0.png"];
		for(i=0; i<20; i++){
				greenField[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
						0,0,0,0,0,0,0,0,0,0];
		}
		map.loadData(greenField);
		game.rootScene.addChild(map);

		var startScene = new Scene();
		var startImage = new Sprite(236,48);
		startImage.image = game.assets["start.png"];
		startScene.addChild(startImage);
		game.pushScene(startScene);

	};
	game.start();
};
