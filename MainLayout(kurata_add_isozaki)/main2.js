enchant();


window.onload = function(){
	var core = new Core(640,480);
core.preload('chara1.png');
core.preload('layout.png');
core.preload('skill1.png','skill2.png');

//磯崎追加アイコン
	core.preload("./img/start.png");
	core.preload("./img/setting_icon.png");
	core.preload("./img/ohanashi_icon.png");
	core.preload("./img/sakutto_icon.png");
	core.preload("./img/back_icon.png");
	core.preload("./img/hajimekara_icon.png");
	core.preload("./img/tsudukikara_icon.png");
	core.preload("./img/init_icon.png");
	core.preload("./img/setting_main.png");
	core.preload("./img/sakutto_main.png");
	core.preload("./img/ohanashi_main.png");
	core.preload("./img/hajimekara_main.png");
	core.preload("./img/ending_main.png");

core.fps =5;
var LIMIT_TIME = 60;
	core.onload = function(){ 
//とりあえずの背景
		var Background=new Sprite(640,640);
				Background.x  = 0;
				Background.y  = 0;
				Background.image = core.assets['layout.png'];
				core.rootScene.addChild(Background);
		var friendSet=0;
		//味方のセット数の管理
		var friendCount=0;
		//味方のキャラ数を管理
		var friendCharaNumber=0;
		//キャラの出撃状態を管理
		var friendCharaStatus =[];
		//味方キャラの状態を管理する配列
		var friendScore=0;
		//味方の獲得した旗の数
		var enemySet=0;
		//敵のセット数の管理
		var enemyCount=0;
		//敵のキャラ数を管理
		var enemyCharaNumber=0;
		//敵キャラの出撃状態を管理
		var enemyCharaStatus =[];
		//敵キャラの状態を管理する配列
		var enemyScore=0;
		//敵キャラの獲得した旗の数
		var a=32;
		var b=32;
  		//アイコンサイズ変える用
		var photo="";
		//イメージ変える用
		var flag = 0;
		//0=待機 1=出撃準備 2=戦闘中

var charaHp=[30,20,60,40,10,20];
var charaAtk=[20,20,20,30,30,20];
var charaDef=[10,20,20,30,30,20];
var charaSpd=[10,20,5,10,10,5];
var charaRet=[10,15,15,20,15,10];
//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];

//コースのクラス---------------------------------------------------
		var Coursu =Class.create(Sprite,{
			initialize:function(x,y,a,b,color){
				Sprite.call(this,a,b);
				this.x     = x;
				this.y     = y;
			//	this.image = core.assets[photo];
				this.backgroundColor=color;
				core.rootScene.addChild(this);
			 }
		});
//壁クラス---------------------------------------------------------
		var Wall = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,10,270)
				this.x  = x;
				this.y  = y;
				this.backgroundColor = "2F8";
				core.rootScene.addChild(this)
			}
		});
		var enemywall= new Wall(560,120);
		var friendwall= new Wall(80,120);
//試作クマ味方ー------------------------------------------------------

			var Bear =Class.create(Sprite,{
			initialize:function(x,y,a,b,photo){
				Sprite.call(this,a,b);
				this.x     = x;
				this.y     = y;
				this.flag  = 0;
				this.frame =1;
				this.image = core.assets[photo];
				this.scaleX=1
				this.on("enterframe",function(){
					if (this.flag == 2){
						this.x +=10;
						this.frame=this.age % 3;
					}
					if(this.intersect(enemywall)){
						friendScore++;
						console.log("friendScore");
				}

				});
				this.on("touchmove",function(e){
					this.x = e.x;
					this.y = e.y;
				});
				this.on("touchend",function(e){
					this.flag = 2;
				//スナップ処理
					if(this.y >=120 && this.y <=210 && this.x >= 90){
						this.x = 90;
						this.y = 130;
					}else if (this.y >=210 && this.y <=300 && this.x >= 90){
						this.x = 90;
						this.y = 220;
					}else if (this.y >=300 && this.y <=390 && this.x >= 90){
						this.x = 90;
						this.y = 310;
					}else{
						this.remove();
					}
				});
				//core.rootScene.addChild(this);　←（磯崎により削除 2013/03/20）
			 }
		});
	//試作クマ敵ー------------------------------------------------------
		var Enemy =Class.create(Sprite,{
			initialize:function(x,y,a,b,photo){
				Sprite.call(this,a,b);
				this.x     = x;
				this.y     = y;
				this.flag    = 0;
				this.frame =1;
				this.image = core.assets[photo];
				this.scaleX=-1;
				this.on("enterframe",function(){
					if (this.flag == 2){
						this.x -=10;
						this.frame=this.age % 3;
					}
				});
				this.on("touchmove",function(e){
					this.x = e.x;
					this.y = e.y;
				});
				this.on("touchend",function(e){
					this.flag = 2;
				//スナップ処理
					if(this.y >=120 && this.y <=210 && this.x <= 560){
						this.x = 496;
						this.y = 130;
					}else if (this.y >=210 && this.y <=300 && this.x <= 560){
						this.x = 496;
						this.y = 220;
					}else if (this.y >=300 && this.y <=390 && this.x <= 560){
						this.x = 496;
						this.y = 310;
					}else{
						this.remove();
						flag = 0;
					}
				
				});


				//core.rootScene.addChild(this);　←（磯崎により削除 2013/03/20）
			 }
		});
//label--------------------------------------------
//ラウンドクラス
		var Round = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,30,30);
				this.x = x;
				this.y = y;
				this.backgroundColor = "red";
				core.rootScene.addChild(this)
			}
		});

//時間ラベル
/*
		var timelabel       = new Label();
			timelabel.x     = 290; 
			timelabel.y     = 10;
			timelabel.font  = "40px 'Arial'";
			timelabel.addEventListener("enterframe",function(){
				time = LIMIT_TIME - parseInt(core.frame/core.fps)+"";
				this.text =time;
			});
	core.rootScene.addChild(timelabel);
*/
//↑ゲーム実施中のときにのみ出力させるためコメントアウト
//　磯崎（2013/03/20）

//旗関係ラベル
		var Hata = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,20,20);
				this.x = x;
				this.y = y;
				this.image=core.assets["chara1.png"];
				core.rootScene.addChild(this)
		}
		});
				var round = new Round(20,70);
				var hata = new Hata(120,70);	

//iconクラス---------------------------------------------
		var Icon =Class.create(Sprite,{
	 		initialize:function(x,y,a,b,photo){
		 		Sprite.call(this,a,b);
		 		this.x     = x;
		 		this.y     = y;
		 		this.image = core.assets[photo];
				this.backgroundColor="red";
				//core.rootScene.addChild(this);　←（磯崎により削除 2013/03/20）
			 }
		});
//ゲージ用クラス----------------------------------------------------
		var friendGenerater=Class.create(Sprite,{
			initialize: function(x,y,a,b){
				Sprite.call(this,a,b);
				this.x=x;
				this.y=y;
				this.backgroundColor="#FF0";
				//core.rootScene.addChild(this);　←（磯崎により削除 2013/03/20）
				this.on('touchstart',function(){
				});
			}
		});

		var enemyGenerater=Class.create(Sprite,{
			initialize: function(x,y,a,b){
				Sprite.call(this,a,b);
				this.x=x;
				this.y=y;
				this.backgroundColor="#F0F";
				//core.rootScene.addChild(this);　←（磯崎により削除 2013/03/20）
				this.on('enterframe',function(){
					if(this.height>0)this.height -=1;
				});
			}
		});
//コース
		var coursu = new Coursu(90,120,470,90,"red")
		var coursu = new Coursu(90,210,470,90,"yellow")
		var coursu = new Coursu(90,300,470,90,"blue")



//////////////////////////////////////////////////
//初期シーン
//////////////////////////////////////////////////
		var startScene = new Scene();
		var startImage = new Sprite(236,48);
		startImage.image = core.assets["./img/start.png"];
		startImage.x = 122;
		startImage.y = 40;
		startScene.addChild(startImage);

		var goOhanashi = new Sprite(151,51);
		goOhanashi.image = core.assets["./img/ohanashi_icon.png"];
		goOhanashi.x = 165;
		goOhanashi.y = 100;
		startScene.addChild(goOhanashi);
		goOhanashi.addEventListener("touchstart", function (){ 
			changeOhanashi();
		});

		var goSakutto = new Sprite(151,51);
		goSakutto.image = core.assets["./img/sakutto_icon.png"];
		goSakutto.x = 165;
		goSakutto.y = 165;
		startScene.addChild(goSakutto);
		goSakutto.addEventListener("touchstart", function (){ 
			changeSakutto();
		});

		var goSetting = new Sprite(150,50);
		goSetting.image = core.assets["./img/setting_icon.png"];
		goSetting.x = 165;
		goSetting.y = 240;
		startScene.addChild(goSetting);
		goSetting.addEventListener("touchstart", function (){ 
			changeSetting();
		});

		core.pushScene(startScene);

//////////////////////////////////////////////////
//設定シーン
//////////////////////////////////////////////////
		function changeSetting(){
			core.popScene(startScene);
			var settingScene = new Scene();
			var settingImage = new Sprite(240,100);
			settingImage.image = core.assets["./img/setting_main.png"];
			settingImage.x = 120;
			settingImage.y = 40;
			settingScene.addChild(settingImage);

			var backInit = new Sprite(150,50);
			backInit.image = core.assets["./img/back_icon.png"];
			backInit.x = 165;
			backInit.y = 160;
			settingScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				core.popScene(settingScene);
				core.pushScene(startScene);
			});

			core.pushScene(settingScene);
		}

//////////////////////////////////////////////////
//さくっとシーン
//////////////////////////////////////////////////
		function changeSakutto(){
			core.popScene(startScene);
			var sakuttoScene = new Scene();
			var sakuttoImage = new Sprite(240,100);
			sakuttoImage.image = core.assets["./img/sakutto_main.png"];
			sakuttoImage.x = 120;
			sakuttoImage.y = 40;
			sakuttoScene.addChild(sakuttoImage);

			var backInit = new Sprite(150,50);
			backInit.image = core.assets["./img/back_icon.png"];
			backInit.x = 165;
			backInit.y = 160;
			sakuttoScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				core.popScene(sakuttoScene);
				core.pushScene(startScene);
			});

			core.pushScene(sakuttoScene);
		}

//////////////////////////////////////////////////
//おはなしシーン
//////////////////////////////////////////////////
		function changeOhanashi(){
			core.popScene(startScene);
			var ohanashiScene = new Scene();
			var ohanashiImage = new Sprite(240,100);
			ohanashiImage.image = core.assets["./img/ohanashi_main.png"];
			ohanashiImage.x = 120;
			ohanashiImage.y = 40;
			ohanashiScene.addChild(ohanashiImage);

			var goHajimekara = new Sprite(149,50);
			goHajimekara.image = core.assets["./img/hajimekara_icon.png"];
			goHajimekara.x = 45;
			goHajimekara.y = 160;
			ohanashiScene.addChild(goHajimekara);
			goHajimekara.addEventListener("touchstart", function(){
				core.popScene(ohanashiScene);
				changeMainFirst();
			});

			var goTsudukikara = new Sprite(145,50);
			goTsudukikara.image = core.assets["./img/tsudukikara_icon.png"];
			goTsudukikara.x = 285;
			goTsudukikara.y = 160;
			ohanashiScene.addChild(goTsudukikara);

			var backInit = new Sprite(150,50);
			backInit.image = core.assets["./img/back_icon.png"];
			backInit.x = 165;
			backInit.y = 225;
			ohanashiScene.addChild(backInit);
			backInit.addEventListener("touchstart", function (){ 
				core.popScene(ohanashiScene);
				core.pushScene(startScene);
			});
			core.pushScene(ohanashiScene);
		}



//////////////////////////////////////////////////
//メインシーン（はじめから）
//////////////////////////////////////////////////
		function changeMainFirst(){
			var mainSceneFirst = new Scene();
			var hajimekaraImage = new Sprite(240,100);
			hajimekaraImage.image = core.assets["./img/hajimekara_main.png"];
			mainSceneFirst.addChild(hajimekaraImage);
//ゲージの土台--------------------------------------------------
		//味方
		var friendgenerater = new friendGenerater(70,130,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,180,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,230,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,280,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,330,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)

//アイコン精製（←生成？）味方---------------------------------------------------
		var icon1 =new Icon(10,130,50,40,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(70,130,10,40);//ゲージ減る
				var bear = new Bear(10,130,64,64,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
					if(bear.x == 320){
						friendScore++;
						console.log("friendScore");
					}
					mainSceneFirst.addChild(enemygenerater);
					mainSceneFirst.addChild(bear);
				});
		mainSceneFirst.addChild(icon1);
		var icon2 =new Icon(10,180,50,40,"chara1.png");
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,180,10,40);
					mainSceneFirst.addChild(enemygenerater);
				});
		mainSceneFirst.addChild(icon2);
		var icon3 =new Icon(10,230,50,40,"chara1.png");
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,230,10,40);
					mainSceneFirst.addChild(enemygenerater);
				});
		mainSceneFirst.addChild(icon3);
		var icon4 =new Icon(10,280,50,40,"chara1.png");
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,280,10,40);
					mainSceneFirst.addChild(enemygenerater);
				});
		mainSceneFirst.addChild(icon4);
		var icon5 =new Icon(10,330,50,40,"chara1.png");
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,330,10,40);
					mainSceneFirst.addChild(enemygenerater);
				});
		mainSceneFirst.addChild(icon5);

		var Skill1 =new Icon(10,400,80,70,"skill1.png");
				Skill1.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(10,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
					mainSceneFirst.addChild(enemygenerater_skill);
				});
		mainSceneFirst.addChild(Skill1);
		var Skill2=new Icon(100,400,80,70,"skill1.png");
				Skill2.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(100,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
					mainSceneFirst.addChild(enemygenerater_skill);
				});
		mainSceneFirst.addChild(Skill2);

		var icon_throw =new Icon(210,400,90,70,"chara1.png");
			icon_throw.on("touchstart",function(){
				alert("投");
			});
		mainSceneFirst.addChild(icon_throw);

		var SP_Skill =new Icon(170,10,80,50,"chara1.png");
			SP_Skill.on("touchstart",function(){
				alert("coco壱番屋!!!");
			});
		mainSceneFirst.addChild(SP_Skill);

		var icon_tame =new Icon(10,10,140,50,"chara1.png");
			icon_tame.on("touchstart",function(){
				alert("ここはチームです。");
			});
		mainSceneFirst.addChild(icon_tame);

//アイコン精製敵（←生成？）---------------------------------------------------------
		//ゲージ土台-----------------------------------------------------
		var friendgenerater = new friendGenerater(630,130,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,180,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,230,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,280,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,330,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		//アイコン精製（←生成？）---------------------------------------------------
		var icon1 =new Icon(570,130,50,40,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(630,130,10,40);//ゲージ減る
				var enemy = new Enemy(570,130,64,64,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				mainSceneFirst.addChild(enemygenerater);
				mainSceneFirst.addChild(enemy);

				});
				mainSceneFirst.addChild(icon1);

		var icon2 =new Icon(570,180,50,40,"chara1.png");
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,180,10,40);
				});
				mainSceneFirst.addChild(icon2);
		var icon3 =new Icon(570,230,50,40,"chara1.png");
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,230,10,40);
				});
				mainSceneFirst.addChild(icon3);
		var icon4 =new Icon(570,280,50,40,"chara1.png");
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,280,10,40);
				});
				mainSceneFirst.addChild(icon4);
		var icon5 =new Icon(570,330,50,40,"chara1.png");
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,330,10,40);
				});
				mainSceneFirst.addChild(icon5);

		var Skill1 =new Icon(460,400,80,70,"skill1.png");
				Skill1.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(460,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
					mainSceneFirst.addChild(enemygenerater_skill);
				});
		mainSceneFirst.addChild(Skill1);
		var Skill2 =new Icon(550,400,80,70,"skill1.png");
				Skill2.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(550,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
					mainSceneFirst.addChild(enemygenerater_skill);
				});
		mainSceneFirst.addChild(Skill2);

		var icon_fly =new Icon(340,400,90,70,"chara1.png");
			icon_fly.on("touchstart",function(){
				alert("投");
			});
		mainSceneFirst.addChild(icon_fly);
		var SP_Skill =new Icon(390,10,80,50,"chara1.png");
			SP_Skill.on("touchstart",function(){
				alert("1");
			});
		mainSceneFirst.addChild(SP_Skill);

		var icon_team =new Icon(490,10,140,50,"chara1.png");
			icon_team.on("touchstart",function(){
				alert("ここはチームです。");
			});
		mainSceneFirst.addChild(icon_team);

//時間ラベル
		var timelabel       = new Label();
		var frame_count = 0;
			timelabel.x     = 290; 
			timelabel.y     = 10;
			timelabel.font  = "40px 'Arial'";
			timelabel.addEventListener("enterframe",function(){
				time = LIMIT_TIME - parseInt(frame_count/core.fps)+"";
				this.text =time;
				if(LIMIT_TIME - parseInt(frame_count/core.fps) == 30){
						core.popScene(mainSceneFirst);
						changeEnding();
				}
				frame_count ++;
			});
			mainSceneFirst.addChild(timelabel);

//--------------------------------------------------------------
			core.pushScene(mainSceneFirst);
		}

//////////////////////////////////////////////////
//終了シーン
//////////////////////////////////////////////////
		function changeEnding(){
			var endingScene = new Scene();
			var endingImage = new Sprite(240,100);
			endingImage.image = core.assets["./img/ending_main.png"];
			endingImage.x = 120;
			endingImage.y = 40;
			endingScene.addChild(endingImage);

			var goInit = new Sprite(150,51);
			goInit.image = core.assets["./img/init_icon.png"];
			goInit.x = 165;
			goInit.y = 165;
			endingScene.addChild(goInit);
			goInit.addEventListener("touchstart", function(){
				core.popScene(endingScene);
				core.pushScene(startScene);
			});

			core.pushScene(endingScene);
		}

	};
	core.debug();
}
