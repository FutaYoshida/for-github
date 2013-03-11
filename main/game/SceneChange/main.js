enchant();

window.onload = function(){
	var game = new Game(480,320);
	game.fps = 15;
	game.preload("start.png");
	game.preload("chara1.png");
	game.preload("map0.png");
	game.preload("setting_icon.png");
	game.preload("start_icon.png");
	game.preload("back_icon.png");
	game.preload("setting_main.png");

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
		startImage.x = 122;
		startImage.y = 40;
		startScene.addChild(startImage);

		var goSetting = new Sprite(150,50);
		goSetting.image = game.assets["setting_icon.png"];
		goSetting.x = 165;
		goSetting.y = 100;
		startScene.addChild(goSetting);
		goSetting.addEventListener("touchstart", function (){ 
			changeSetting();
		});

		var goStart = new Sprite(150,50);
		goStart.image = game.assets["start_icon.png"];
		goStart.x = 165;
		goStart.y = 165;
		startScene.addChild(goStart);

		game.pushScene(startScene);

		function changeInit(){
			var startScene = new Scene();
			var startImage = new Sprite(236,48);
			startImage.image = game.assets["start.png"];
			startImage.x = 122;
			startImage.y = 40;
			startScene.addChild(startImage);

			var goSetting = new Sprite(150,50);
			goSetting.image = game.assets["setting_icon.png"];
			goSetting.x = 165;
			goSetting.y = 100;
			startScene.addChild(goSetting);
			goSetting.addEventListener("touchstart", function (){ 
				changeSetting();
			});

			var goStart = new Sprite(150,50);
			goStart.image = game.assets["start_icon.png"];
			goStart.x = 165;
			goStart.y = 165;
			startScene.addChild(goStart);

			game.pushScene(startScene);

		}

		function changeSetting(){
			game.popScene(startScene);
			var settingScene = new Scene();
			var settingImage = new Sprite(240,100);
			settingImage.image = game.assets["setting_main.png"];
			settingImage.x = 120;
			settingImage.y = 40;
			settingScene.addChild(settingImage);

			var backInit = new Sprite(150,50);
			backInit.image = game.assets["back_icon.png"];
			backInit.x = 165;
			backInit.y = 160;
			settingScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				game.popScene(settingScene);
				changeInit();
			});

			game.pushScene(settingScene);
		}

	};
	game.start();
};
