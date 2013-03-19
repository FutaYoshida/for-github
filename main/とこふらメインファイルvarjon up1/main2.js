enchant();


window.onload = function(){
	var core = new Core(640,480);
core.preload('chara1.png');
core.preload('layout.jpg');
core.preload('skill1.png','skill2.png');
core.preload('flag.jpg','round.jpg');
core.preload('bearteam.jpg','blik.jpg')
core.fps =15;
var LIMIT_TIME = 60;
	core.onload = function(){ 
//とりあえずの背景
		var Background=new Sprite(640,640);
				Background.x  = 0;
				Background.y  = 0;
				Background.image = core.assets['layout.jpg'];
				core.rootScene.addChild(Background);
		var friendSet=0;
		//味方のセット数の管理
		var friendCount=0;
		//味方のキャラ数を管理
		var friendCharaNumber=0;
		//キャラの出撃状態を管理
		var friendCharaStatus =[];
		//味方キャラの状態を管理する配列
		var friendCharaBox=[[],[]];
		//味方キャラを入れるためのボックス
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
		var enemyCharaBox=[[],[]];
		var enemyScore=0;
		//敵キャラの獲得した旗の数
		var a=32;
		var b=32;
  		//アイコンサイズ変える用
		var photo="";
		//イメージ変える用
		var flag = 0;
		//0=待機 1=出撃準備 2=戦闘中
		var team = 0;
		//敵or味方判別
		var defaultframe=[0,1,0,2];
		//味方の歩き
		var enemydefaultframe=[5,6,5,7];
		//敵の歩き
		var spot =[130,220,310];
		//敵出現位置固定
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
//				this.image = core.assets[photo];
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
//				this.backgroundColor = "red";
				this.image=core.assets["round.jpg"];
				core.rootScene.addChild(this);
			}
		});

//旗関係ラベル---------------------------------------------------
		var Hata = Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,20,20);
				this.x = x;
				this.y = y;
				this.image=core.assets["flag.jpg"];
				core.rootScene.addChild(this);
			}
		});


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
				//テスト用
				this.life = 100
				this.power=10
				this.sp   =10
				this.on("enterframe",function(){
					if(this.flag == 0){
						this.sp = 10;			//これがないとthis.yが-の時後ろに行ってしまう
						this.x +=this.sp;
						//スナップ処理
						if(this.y >=120 && this.y <=210 && this.x >= 90){this.y = 130;
						}else if (this.y >=210 && this.y <=300 && this.x >= 90){this.y = 220;
						}else if (this.y >=300 && this.y <=390 && this.x >= 90){this.y = 310;
						}else{
							core.rootScene.removeChild(friendCharaBox[0][friendCharaNumber]);
							friendCount--;
							delete friendCharaBox[0][friendCharaNumber];
						}
					}
					if(this.flag ==1){
						this.y +=this.sp;
						if(this.y<120){this.sp = 10}
						if(this.y>326){this.sp *=-1}
					}
						this.frame=defaultframe;

					//旗フラグ、衝突判定
					if(this.intersect(enemywall)){
						friendScore++;
						if(friendScore == 1){var hata = new Hata(120,70);}
						else if(friendScore == 2){var hata = new Hata(150,70);}
						else if(friendScore == 3){var hata = new Hata(180,70);}
						else if(friendScore == 4){var hata = new Hata(210,70);}
						else if(friendScore == 5){var hata = new Hata(240,70);}
						else if(friendScore == 6){var hata = new Hata(120,90);}
						else if(friendScore == 7){var hata = new Hata(150,90);}
						else if(friendScore == 8){var hata = new Hata(180,90);}
						else if(friendScore == 9){var hata = new Hata(210,90);}
						else{var hata = new Hata(240,90);alert("a");
							var round = new Round(20,70);
							//後リセット処理
						}
//						console.log(friendScore);
						console.log(friendCharaNumber);
						core.rootScene.removeChild(friendCharaBox[0][friendCharaNumber]);
						friendCount--;
						delete friendCharaBox[0][friendCharaNumber];
					}
					//敵衝突判定
					for(i in enemyCharaBox[1]){
					if(this.within(enemyCharaBox[1][i],10)){
						this.life -=enemyCharaBox[1][i].power;
						for(j in friendCharaBox[0]){
							if(friendCharaBox[0][j].life<=0){
								core.rootScene.removeChild(friendCharaBox[0][j]);
								friendCount--;
								delete friendCharaBox[0][j]
						}	}
					this.frame =3;
					this.tl.moveBy(-100,0,5).then(function(){this.frame=defaultframe});
					}}
				});

				this.on("touchstart",function(e){
						if(this.flag==0){
							this.flag=1;
						}else{
							this.flag=0;
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
				//テストステータス
				this.life = 100
				this.power=10
				this.sp   =-10
				this.on("enterframe",function(){
					//横移動の時
					if(this.flag == 0){
						this.sp =10;			//これがないとthis.yが-の時後ろに行ってしまう
						this.x -=this.sp;
						//スナップ処理
						if(this.y >=120 && this.y <=210 && this.x >= 90){this.y = 130;
						}else if (this.y >=210 && this.y <=300 && this.x >= 90){this.y = 220;
						}else if (this.y >=300 && this.y <=390 && this.x >= 90){this.y = 310;
						}else{
							core.rootScene.removeChild(enemyCharaBox[0][enemyCharaNumber]);
							enemyCount--;
							delete enemyCharaBox[0][enemyCharaNumber];
						}
					}
					//縦移動の時
					if(this.flag ==1){
						this.y +=this.sp;
						if(this.y<120){this.sp = 10}
						if(this.y>326){this.sp *=-1}
					}
						this.frame=enemydefaultframe;

					//旗フラグ、衝突判定
					if(this.intersect(friendwall)){
						enemyScore++;
						if(enemyScore == 1){var hata = new Hata(380,70);}
						else if(enemyScore == 2){var hata = new Hata(410,70);}
						else if(enemyScore == 3){var hata = new Hata(440,70);}
						else if(enemyScore == 4){var hata = new Hata(470,70);}
						else if(enemyScore == 5){var hata = new Hata(500,70);}
						else if(enemyScore == 6){var hata = new Hata(380,90);}
						else if(enemyScore == 7){var hata = new Hata(410,90);}
						else if(enemyScore == 8){var hata = new Hata(440,90);}
						else if(enemyScore == 9){var hata = new Hata(470,90);}
						else{var hata = new Hata(500,90);alert("a");
							var round = new Round(590,70);
							//後リセット処理
						}
						console.log(enemyScore);
						core.rootScene.removeChild(enemyCharaBox[1][enemyCharaNumber]);
						enemyCount--;
						this.remove();
					}
					//敵衝突判定
					for(i in friendCharaBox[0]){
					if(this.within(friendCharaBox[0][i],10)){
						this.life -=friendCharaBox[0][i].power;
						for(j in enemyCharaBox[1]){
							if(enemyCharaBox[1][j].life<=0){
								core.rootScene.removeChild(enemyCharaBox[1][j]);
								enemyCount--;
								delete enemyCharaBox[1][j]
						}	}
						this.frame =8;
						this.tl.moveBy(100,0,5).then(function(){this.frame=enemydefaultframe});
					}}
				});
				this.on("touchstart",function(){
					if(this.flag==0){
						this.flag=1;
					}else{
						this.flag=0;
					}
					});

				core.rootScene.addChild(this);
			 }
		});


//iconクラス---------------------------------------------
		var Icon =Class.create(Sprite,{
	 		initialize:function(x,y,a,b,photo,team){
		 		Sprite.call(this,a,b);
		 		this.x     = x;
		 		this.y     = y;
		 		this.image = core.assets[photo];
				this.backgroundColor="red";
				this.team = team;
				core.rootScene.addChild(this)
			}
		});

		var Chara_Icon =Class.create(Sprite,{
	 		initialize:function(x,y,a,b,photo,team){
		 		Sprite.call(this,a,b);
		 		this.x     = x;
		 		this.y     = y;
		 		this.image = core.assets[photo];
				this.backgroundColor="red";
				this.team = team;
				this.on("touchstart",function(){
					if(this.team==0){						//0で味方１で敵
					//現在テストのため１０にしている
					if(friendCount<10) {						//最大MOB数が10＞以下
					for(var i=0;i<10;i++){					//flagが空いてるのを探すためのfor
					if(friendCharaBox[this.team][i]==undefined){		//iの値が何も入ってないとき真
						friendCharaNumber=i;						
						friendCharaBox[this.team][i]=new Bear(90,220,64,64,"chara1.png");//flagの空いてる場所にクマ召喚
						friendCount++;
						console.log(friendCount);
						console.log(friendCharaBox[this.team][i]);
						break;
					}}}}
/*					if(this.team==1){  //チーム１＝敵
					if(enemyCount<10) {//テストのため１０
					for(var i=0;i<=10;i++){
					if(enemyCharaBox[this.team][i]==undefined){
						enemyCharaNumber=i;
						enemyCharaBox[this.team][i]=new Enemy(496,220,64,64,"chara1.png");
						enemyCount++;
						break;
					}}}}
*/				});
				core.rootScene.addChild(this);
			 }
		});
		//ランダム生成用アイコン
		var Chara_Icon2 =Class.create(Sprite,{
	 		initialize:function(x,y,a,b,photo,team){
		 		Sprite.call(this,a,b);
		 		this.x     = x;
		 		this.y     = y;
				this.team  = team;
		 		this.image = core.assets[photo];
				this.backgroundColor="red";
				this.on("enterframe",function(){
					if(this.age%50==rand(50)){
						if(this.team==1){
        				if(enemyCount<1000) {
        				for(var i=0;i<=1000;i++){
      					if(enemyCharaBox[this.team][i]==undefined){
							
         					enemyNumber=i;
         					enemyCharaBox[this.team][i]=new Enemy(this.x,spot[rand(2)],64,64,"chara1.png");
          					enemyCount++;
							console.log(enemyCount);
							console.log(enemyCharaBox[this.team][i]);
         					break;
							
        				}}}}
					}
				});
			core.rootScene.addChild(this);
			}});
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
		var icon1 =new Chara_Icon(10,130,50,40,"chara1.png",0);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(70,130,10,40);//ゲージ減る
		//		var bear = new Bear(10,130,64,64,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				});
		var icon2 =new Chara_Icon(10,180,50,40,"chara1.png",0);
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,180,10,40);
				});
		var icon3 =new Chara_Icon(10,230,50,40,"chara1.png",0);
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,230,10,40);
				});
		var icon4 =new Chara_Icon(10,280,50,40,"chara1.png",0);
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,280,10,40);
				});
		var icon5 =new Chara_Icon(10,330,50,40,"chara1.png",0);
				icon5.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(70,330,10,40);
				});

		var Skill1 =new Icon(10,400,80,70,"skill1.png",0);
				Skill1.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(10,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
				});
		var Skill2=new Icon(100,400,80,70,"skill1.png",0);
				Skill2.on("touchstart",function(){
				var enemygenerater_skill= new enemyGenerater(100,400,80,70);
					enemygenerater_skill.image=core.assets["skill2.png"];
				});

		var icon_throw =new Icon(210,400,90,70,"chara1.png",0);
			icon_throw.on("touchstart",function(){
				alert("投");
			});

		var SP_Skill =new Icon(170,10,80,50,"chara1.png",0);
			SP_Skill.on("touchstart",function(){
				alert("coco壱番屋!!!");
			});

		var icon_tame =new Icon(10,10,140,50,"bearteam.jpg",0);
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
		var icon1 =new Chara_Icon2(570,130,50,40,"chara1.png",1);//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)
				icon1.on("touchstart",function(){
				var enemygenerater = new enemyGenerater(630,130,10,40);//ゲージ減る
			//	var enemy = new Enemy(570,130,64,64,"chara1.png");//(x,y,ｱｲｺﾝｻｲｽﾞx,ｱｲｺﾝｻｲｽﾞy,image)

				});
		var icon2 =new Chara_Icon2(570,180,50,40,"chara1.png",1);
				icon2.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,180,10,40);
				});
		var icon3 =new Chara_Icon2(570,230,50,40,"chara1.png",1);
				icon3.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,230,10,40);
				});
		var icon4 =new Chara_Icon2(570,280,50,40,"chara1.png",1);
				icon4.on("touchstart",function(){
					var enemygenerater = new enemyGenerater(630,280,10,40);
				});
		var icon5 =new Chara_Icon2(570,330,50,40,"chara1.png",1);
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

		var icon_team =new Icon(490,10,140,50,"blik.jpg");
			icon_team.on("touchstart",function(){
				alert("ここはチームです。");
			});
//--------------------------------------------------------------









	};
	core.debug();
}
	function rand(n) {
	return Math.floor(Math.random() * (n+1));
	}
