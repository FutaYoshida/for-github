enchant();

window.onload = function(){
	var game = new Game(480,320);
	game.fps = 16;
	game.preload("./img/start.png");
	game.preload("./img/chara1.png");
	game.preload("./img/map0.png");
	game.preload("./img/setting_icon.png");
	game.preload("./img/ohanashi_icon.png");
	game.preload("./img/sakutto_icon.png");
	game.preload("./img/back_icon.png");
	game.preload("./img/hajimekara_icon.png");
	game.preload("./img/tsudukikara_icon.png");
	game.preload("./img/init_icon.png");
	game.preload("./img/setting_main.png");
	game.preload("./img/sakutto_main.png");
	game.preload("./img/ohanashi_main.png");
	game.preload("./img/hajimekara_main.png");
	game.preload("./img/ending_main.png");


	var greenField = [];

	game.onload = function(){
		map = new Map(16,16);
		map.image = game.assets["./img/map0.png"];
		for(i=0; i<20; i++){
				greenField[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
						0,0,0,0,0,0,0,0,0,0];
		}
		map.loadData(greenField);
		game.rootScene.addChild(map);

//////////////////////////////////////////////////
//初期シーン
//////////////////////////////////////////////////
		var startScene = new Scene();
		var startImage = new Sprite(236,48);
		startImage.image = game.assets["./img/start.png"];
		startImage.x = 122;
		startImage.y = 40;
		startScene.addChild(startImage);

		var goOhanashi = new Sprite(151,51);
		goOhanashi.image = game.assets["./img/ohanashi_icon.png"];
		goOhanashi.x = 165;
		goOhanashi.y = 100;
		startScene.addChild(goOhanashi);
		goOhanashi.addEventListener("touchstart", function (){ 
			changeOhanashi();
		});

		var goSakutto = new Sprite(151,51);
		goSakutto.image = game.assets["./img/sakutto_icon.png"];
		goSakutto.x = 165;
		goSakutto.y = 165;
		startScene.addChild(goSakutto);
		goSakutto.addEventListener("touchstart", function (){ 
			changeSakutto();
		});

		var goSetting = new Sprite(150,50);
		goSetting.image = game.assets["./img/setting_icon.png"];
		goSetting.x = 165;
		goSetting.y = 240;
		startScene.addChild(goSetting);
		goSetting.addEventListener("touchstart", function (){ 
			changeSetting();
		});

		game.pushScene(startScene);

//////////////////////////////////////////////////
//設定シーン
//////////////////////////////////////////////////
		function changeSetting(){
			game.popScene(startScene);
			var settingScene = new Scene();
			var settingImage = new Sprite(240,100);
			settingImage.image = game.assets["./img/setting_main.png"];
			settingImage.x = 120;
			settingImage.y = 40;
			settingScene.addChild(settingImage);

			var backInit = new Sprite(150,50);
			backInit.image = game.assets["./img/back_icon.png"];
			backInit.x = 165;
			backInit.y = 160;
			settingScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				game.popScene(settingScene);
				game.pushScene(startScene);
			});

			game.pushScene(settingScene);
		}

//////////////////////////////////////////////////
//さくっとシーン
//////////////////////////////////////////////////
		function changeSakutto(){
			game.popScene(startScene);
			var sakuttoScene = new Scene();
			var sakuttoImage = new Sprite(240,100);
			sakuttoImage.image = game.assets["./img/sakutto_main.png"];
			sakuttoImage.x = 120;
			sakuttoImage.y = 40;
			sakuttoScene.addChild(sakuttoImage);

			var backInit = new Sprite(150,50);
			backInit.image = game.assets["./img/back_icon.png"];
			backInit.x = 165;
			backInit.y = 160;
			sakuttoScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				game.popScene(sakuttoScene);
				game.pushScene(startScene);
			});

			game.pushScene(sakuttoScene);
		}

//////////////////////////////////////////////////
//おはなしシーン
//////////////////////////////////////////////////
		function changeOhanashi(){
			game.popScene(startScene);
			var ohanashiScene = new Scene();
			var ohanashiImage = new Sprite(240,100);
			ohanashiImage.image = game.assets["./img/ohanashi_main.png"];
			ohanashiImage.x = 120;
			ohanashiImage.y = 40;
			ohanashiScene.addChild(ohanashiImage);

			var goHajimekara = new Sprite(149,50);
			goHajimekara.image = game.assets["./img/hajimekara_icon.png"];
			goHajimekara.x = 45;
			goHajimekara.y = 160;
			ohanashiScene.addChild(goHajimekara);
			goHajimekara.addEventListener("touchstart", function(){
				game.popScene(ohanashiScene);
				changeMainFirst();
			});

			var goTsudukikara = new Sprite(145,50);
			goTsudukikara.image = game.assets["./img/tsudukikara_icon.png"];
			goTsudukikara.x = 285;
			goTsudukikara.y = 160;
			ohanashiScene.addChild(goTsudukikara);

			var backInit = new Sprite(150,50);
			backInit.image = game.assets["./img/back_icon.png"];
			backInit.x = 165;
			backInit.y = 225;
			ohanashiScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				game.popScene(ohanashiScene);
				game.pushScene(startScene);
			});
			game.pushScene(ohanashiScene);
		}

//////////////////////////////////////////////////
//メインシーン（はじめから）
//////////////////////////////////////////////////
		function changeMainFirst(){
			var mainSceneFirst = new Scene();
			var hajimekaraImage = new Sprite(240,100);
			hajimekaraImage.image = game.assets["./img/hajimekara_main.png"];
			mainSceneFirst.addChild(hajimekaraImage);
			var bear = new Sprite(32,32);
			bear.image = game.assets["./img/chara1.png"];
			bear.x = 0;
			bear.y = 144;
			bear.frame = 10;
			mainSceneFirst.addChild(bear);
			bear.addEventListener("enterframe", function(){
				if(this.x + 32 > 480){
					game.popScene(mainSceneFirst);
					changeEnding();
				}
				else{
					this.x += 5;
					this.frame = this.age % 2 + 11;
				}
			});
			game.pushScene(mainSceneFirst);
		}

//////////////////////////////////////////////////
//メインシーン（つづきから）
//2013/03/14時点では、まだ実装せず。
//////////////////////////////////////////////////




//////////////////////////////////////////////////
//終了シーン
//////////////////////////////////////////////////
		function changeEnding(){
			var endingScene = new Scene();
			var endingImage = new Sprite(240,100);
			endingImage.image = game.assets["./img/ending_main.png"];
			endingImage.x = 120;
			endingImage.y = 40;
			endingScene.addChild(endingImage);

			var goInit = new Sprite(150,51);
			goInit.image = game.assets["./img/init_icon.png"];
			goInit.x = 165;
			goInit.y = 165;
			endingScene.addChild(goInit);
			endingScene.addEventListener("touchstart", function(){
				game.popScene(endingScene);
				game.pushScene(startScene);
			});

			game.pushScene(endingScene);
		}

	};
	game.start();
};
