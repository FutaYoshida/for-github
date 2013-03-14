enchant();


window.onload = function(){
	var core = new Core(640,480);
core.preload('chara1.png');
core.preload('layout.png');
core.preload('skill1.png','skill2.png');
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


//時間ラベル------------------------------------------------------
		var timelabel       = new Label();
			timelabel.x     = 290; 
			timelabel.y     = 10;
			timelabel.font  = "40px 'Arial'";
			timelabel.addEventListener("enterframe",function(){
				time = LIMIT_TIME - parseInt(core.frame/core.fps)+"";
				this.text =time;
				});
		core.rootScene.addChild(timelabel);


//ラウンドクラス-------------------------------------------------
		var Round = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,30,30);
				this.x = x;
				this.y = y;
				this.backgroundColor = "red";
				core.rootScene.addChild(this);
			}
		});

//旗関係ラベル---------------------------------------------------
		var Hata = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,20,20);
				this.x = 120;
				this.y = 70;
				this.image=core.assets["chara1.png"];
				core.rootScene.addChild(this);
			}
		});
				var round = new Round(20,70);

//試作クマ味方ー------------------------------------------------------

			var Bear =Class.create(Sprite,{
			initialize:function(x,y,a,b,photo){
				Sprite.call(this,a,b);
				this.x     = x;
				this.y     = y;
				this.flag  = 0;//0で存在しない。１で準備、２で戦闘
				this.frame =1;
				this.image = core.assets[photo];
				this.scaleX=1
				this.on("enterframe",function(){
					if (this.flag == 2){
						this.x +=10;
						this.frame=this.age % 3;
					}
					//衝突判定
					if(this.intersect(enemywall)){
						friendScore++
						switch(friendScore){
							case 1 :
							var hata = new Hata(120,70);
							console.log("friendScore");
							break;
							case 2 :
							var hata = new Hata(130,70);console.log("friendScore");
							break;
							case 3 :
							var hata = new Hata(120,70);
							break;
							case 4 :
							var hata = new Hata(120,70);
							break;
							case 5 :
							var hata = new Hata(120,70);
							break;
							case 6 :
							var hata = new Hata(120,70);
							break;
							case 7 :
							var hata = new Hata(120,70);
							break;
							case 8 :
							var hata = new Hata(120,70);
							break;
							case 9 :
							var hata = new Hata(120,70);
							break;
							case 10 :
							var hata = new Hata(120,70);
							break
						}
						console.log("friendScore");
						this.remove();
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
				core.rootScene.addChild(this);
			 }
		});
	//試作クマ敵ー------------------------------------------------------
		var Enemy =Class.create(Sprite,{
			initialize:function(x,y,a,b,photo){
				Sprite.call(this,a,b);
				this.x     = x;
				this.y     = y;
				this.flag  = 0;
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


				core.rootScene.addChild(this);
			 }
		});


//iconクラス---------------------------------------------
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
					if(this.height>0)this.height -=1;
				});
			}
		});
//コース
		var coursu = new Coursu(90,120,470,90,"red")
		var coursu = new Coursu(90,210,470,90,"yellow")
		var coursu = new Coursu(90,300,470,90,"blue")

//ゲージの土台--------------------------------------------------
		//味方
		var friendgenerater = new friendGenerater(70,130,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,180,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,230,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,280,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(70,330,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)

//アイコン精製味方---------------------------------------------------
		var icon1 =new Icon(10,130,50,40,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(70,130,10,40);//ゲージ減る
				var bear = new Bear(10,130,64,64,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
					if(bear.x == 320){
						friendScore++;
						console.log("friendScore");}
				});
		var icon2 =new Icon(10,180,50,40,"chara1.png");
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,180,10,40);
				});
		var icon3 =new Icon(10,230,50,40,"chara1.png");
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,230,10,40);
				});
		var icon4 =new Icon(10,280,50,40,"chara1.png");
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,280,10,40);
				});
		var icon5 =new Icon(10,330,50,40,"chara1.png");
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,330,10,40);
				});

		var Skill1 =new Icon(10,400,80,70,"skill1.png");
				Skill1.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(10,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
				});
		var Skill2=new Icon(100,400,80,70,"skill1.png");
				Skill2.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(100,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
				});

		var icon_throw =new Icon(210,400,90,70,"chara1.png");
			icon_throw.on("touchstart",function(){
				alert("投");
			});

		var SP_Skill =new Icon(170,10,80,50,"chara1.png");
			SP_Skill.on("touchstart",function(){
				alert("coco壱番屋!!!");
			});

		var icon_tame =new Icon(10,10,140,50,"chara1.png");
			icon_tame.on("touchstart",function(){
				alert("ここはチームです。");
			});

//アイコン精製敵---------------------------------------------------------
		//ゲージ土台-----------------------------------------------------
		var friendgenerater = new friendGenerater(630,130,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,180,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,230,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,280,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		var friendgenerater = new friendGenerater(630,330,10,40);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
		//アイコン精製---------------------------------------------------
		var icon1 =new Icon(570,130,50,40,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(630,130,10,40);//ゲージ減る
				var enemy = new Enemy(570,130,64,64,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)

				});
		var icon2 =new Icon(570,180,50,40,"chara1.png");
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,180,10,40);
				});
		var icon3 =new Icon(570,230,50,40,"chara1.png");
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,230,10,40);
				});
		var icon4 =new Icon(570,280,50,40,"chara1.png");
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,280,10,40);
				});
		var icon5 =new Icon(570,330,50,40,"chara1.png");
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,330,10,40);
				});

		var Skill1 =new Icon(460,400,80,70,"skill1.png");
				Skill1.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(460,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];

				});
		var Skill2 =new Icon(550,400,80,70,"skill1.png");
				Skill2.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(550,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
				});

		var icon_fly =new Icon(340,400,90,70,"chara1.png");
			icon_fly.on("touchstart",function(){
				alert("投");
			});
		var SP_Skill =new Icon(390,10,80,50,"chara1.png");
			SP_Skill.on("touchstart",function(){
				alert("1");
			});

		var icon_team =new Icon(490,10,140,50,"chara1.png");
			icon_team.on("touchstart",function(){
				alert("ここはチームです。");
			});
//--------------------------------------------------------------









	};
	core.debug();
}
