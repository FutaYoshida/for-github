enchant();


window.onload = function(){
	var core = new Core(640,480);
core.preload('chara1.png');
core.preload('field.png');
core.preload('skill1.png','skill2.png');
core.fps =15;
var LIMIT_TIME = 60;
	core.onload = function(){ 
//とりあえずの背景
		var Background=new Sprite(640,480);
				Background.x  = 0;
				Background.y  = 0;
				Background.image = core.assets['field.png'];
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

		var coursu = new Coursu(61,140,520,70,"red")
		var coursu = new Coursu(61,210,520,70,"yellow")
		var coursu = new Coursu(61,280,520,70,"blue")

//試作クマー------------------------------------------------------
			var Bear =Class.create(Sprite,{
			initialize:function(x,y,a,b,photo){
				Sprite.call(this,a,b);
				this.x     = x;
				this.y     = y;
				this.flag    = 0;
				this.frame =0;
				this.image = core.assets[photo];
				//this.scaleX
				this.on("enterframe",function(){
					if (this.flag == 2){
						this.x +=10;
						this.frame=[0,1,0,2];//走らん！
					}
				});
				this.on("touchmove",function(e){
					this.x = e.x;
					this.y = e.y;
				});
				this.on("touchend",function(e){
					this.flag = 2;
				});


				core.rootScene.addChild(this);
			 }
		});
	
//ゲージ用クラス----------------------------------------------------


//label--------------------------------------------
//ラウンドラベル
		var roundlabel = new Label();
			roundlabel.x     = 240; 
			roundlabel.y     = 30;
			roundlabel.color = "Black";
			roundlabel.font  = "40px 'Arial'";
			roundlabel.text  = "ラウンドｫｵｵｵｵｵ";
			core.rootScene.addChild(roundlabel);
//時間ラベル
		var timelabel       = new Label();
			timelabel.x      = 290; 
			timelabel.y       = 70;
		//	timelabel.color = "Black";
			timelabel.font  = "40px 'Arial'";
			timelabel.addEventListener("enterframe",function(){
			//	var progress = parseInt(core.frame/core.fps);
				time = LIMIT_TIME - parseInt(core.frame/core.fps)+"";
				this.text =time;
				});
				core.rootScene.addChild(timelabel);

//icon関係主に味方---------------------------------------------
		var Icon =Class.create(Sprite,{
	 		initialize:function(x,y,a,b,photo){
		 		Sprite.call(this,a,b);
		 		this.x     = x;
		 		this.y     = y;
		 		this.image = core.assets[photo];
				this.backgroundColor="red";
				core.rootScene.addChild(this);
			 }
		});
//ゲージ用クラス----------------------------------------------------
		var friendGenerater=Class.create(Sprite,{
			initialize: function(x,y,a,b){
				Sprite.call(this,a,b);
				this.x=x;
				this.y=y;
				this.backgroundColor="#FF0";
				core.rootScene.addChild(this);
				this.on('touchstart',function(){
           console.log("go");
				});
			}
		});

		var enemyGenerater=Class.create(Sprite,{
			initialize: function(x,y,a,b){
				Sprite.call(this,a,b);
				this.x=x;
				this.y=y;
				this.backgroundColor="#F0F";
				core.rootScene.addChild(this);
				this.on('enterframe',function(){
					if(this.width>0)this.width -=1;
				});
			}
		});
//ゲージの土台--------------------------------------------------
		//味方
		var friendgenerater = new friendGenerater(40,402,36,10);
		var friendgenerater = new friendGenerater(85,402,36,10);
		var friendgenerater = new friendGenerater(125,402,36,10);
		var friendgenerater = new friendGenerater(164,402,36,10);
		var friendgenerater = new friendGenerater(205,402,36,10);

//アイコン精製---------------------------------------------------
		var icon1 =new Icon(42,364,36,36,"chara1.png");
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(40,402,36,10);//ゲージ減る
				var bear = new Bear(61,140,64,64,"chara1.png");
				});
		var icon2 =new Icon(86,364,36,36,"chara1.png");
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(85,402,36,10);
				});
		var icon3 =new Icon(126,364,36,36,"chara1.png");
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(125,402,36,10);
				});
		var icon4 =new Icon(165,364,36,36,"chara1.png");
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(164,402,36,10);
				});
		var icon5 =new Icon(205,364,36,36,"chara1.png");
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(205,402,36,10);
				});

		var icon_skill =new Icon(70,415,41,40,"skill1.png");
				icon_skill.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(70,415,41,40);
					enemygenerater_skill.image=core.assets["skill2.png"]	//縦ゲージにする時どうしよう？
					enemygenerater.on('enterframe',function(){
						if(enemygenerater.height>0){this.height -=1;}//ていうか縦ゲージにできん！
					});
				});

		var icon_fly =new Icon(142,414,50,56,"chara1.png");
			icon_fly.on("touchstart",function(){
				alert("投");
			});
		var icon_null =new Icon(209,410,50,56,"chara1.png");
			icon_null.on("touchstart",function(){
				alert("null");
			});

		var icon_coco1 =new Icon(155,35,50,56,"chara1.png");
			icon_coco1.on("touchstart",function(){
				alert("coco壱番屋!!!");
			});

		var icon_tame =new Icon(21,21,98,78,"chara1.png");
			icon_tame.on("touchstart",function(){
				alert("ここはチームです。");
			});

//icon関係主に敵---------------------------------------------------------
		//ゲージ土台-----------------------------------------------------
		var friendgenerater = new friendGenerater(414,402,36,10);
		var friendgenerater = new friendGenerater(457,402,36,10);
		var friendgenerater = new friendGenerater(497,402,36,10);
		var friendgenerater = new friendGenerater(539,402,36,10);
		var friendgenerater = new friendGenerater(580,402,36,10);
		//アイコン精製---------------------------------------------------
		var icon1 =new Icon(414,364,36,36,"chara1.png");
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(414,402,36,10);//ゲージ減る
				var bear = new Bear(61,200,64,64,"chara1.png");
				});
		var icon2 =new Icon(457,364,36,36,"chara1.png");
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(457,402,36,10);
				});
		var icon3 =new Icon(497,364,36,36,"chara1.png");
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(497,402,36,10);
				});
		var icon4 =new Icon(539,364,36,36,"chara1.png");
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(539,402,36,10);
				});
		var icon5 =new Icon(580,364,36,36,"chara1.png");
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(580,402,36,10);
				});

		var icon_skill =new Icon(440,415,41,40,"skill1.png");
				icon_skill.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(440,415,41,40);
					enemygenerater_skill.image=core.assets["skill2.png"];
					enemygenerater.on('enterframe',function(){
						if(enemygenerater.height>0){this.height -=1;}
					});
				});

		var icon_fly =new Icon(527,414,50,56,"chara1.png");
			icon_fly.on("touchstart",function(){
				alert("投");
			});
		var icon_null =new Icon(209,410,50,56,"chara1.png");
			icon_null.on("touchstart",function(){
				alert("null");
			});

		var icon_coco1 =new Icon(435,35,50,56,"chara1.png");
			icon_coco1.on("touchstart",function(){
				alert("ヤーマザキ～イチバーン！！や～まざきい～ちば～ん↑↑");
			});

		var icon_tame =new Icon(523,21,98,78,"chara1.png");
			icon_tame.on("touchstart",function(){
				alert("ここはチームです。");
			});
//--------------------------------------------------------------









	};
	core.debug();
}
