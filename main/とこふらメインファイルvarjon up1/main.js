﻿enchant();


window.onload = function(){
	var core = new Core(640,480);
core.preload('chara1.png');
core.preload('bear.gif','robo.gif');
core.preload('layout.jpg');
core.preload('skill1.png','skill2.png');
core.preload('flag.jpg','round.jpg');
core.preload('bearteam.jpg','blik.jpg');
core.preload('kgen.png');

core.fps =5;
var LIMIT_TIME = 60;
core.onload = function(){ 
//--------------------------------------------------------------------------
//初期宣言～敵味方共通～
//Score			取得したポイント(旗)の数
//Set			セット数管理
//Count			キャラ数管理
//CharaNumber	キャラ中身管理　(true:1~最大数　false:null)
//CharaStatus	キャラの状態管理する配列
//CharaBox		キャラを入れるためのボックス
//Charaflag		フラグ管理、3月22日予定では０でx移動、１でy移動
//team			敵味方判別
//defaultframe	移動フレーム管理
//charaHp		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaAtk		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaDef		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaSpd		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaRet		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//～敵限定～
//spot			ランダム精製時の1､2､3レーン固定
//--------------------------------------------------------------------------
//味方
var friendScore			=0; 
var friendSet			=0;
var friendCount			=0;
var friendCharaNumber	=0;
var friendStatus		=[];
var friendCharaBox		=[];
var frienddefaultframe  =[0,1,0,2];
//敵
var enemyScore			=0;
var enemySet			=0;
var enemyCount			=0;
var enemyCharaNumber	=0;
var enemyStatus			=[];
var enemyCharaBox		=[];
var enemydefaultframe	=[4,5,4,6];
var spot				=[130,220,310,];
//共通
var Charaflag			=0;
var charaHp=[30,20,60,40,10,20];
var charaAtk=[20,20,20,30,30,20];
var charaDef=[10,20,20,30,30,20];
var charaSpd=[10,20,5,10,10,5];
var charaRet=[10,15,15,20,15,10];
//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
	//キャラ生成ボタン--------------------------------------------------------
	//味方
	var friendCharaButton = Class.create(Sprite,{
		initialize:function(x,y){
			ClassimgCreate(this,50,40,"kgen.png",core);
			this.x=x;
			this.y=y;
			this.gauge = new Images(x+60,y,10,40,"",core);
			 this.gauge.backgroundColor="#f00";
			this.gauge2 = new Images(x+60,y,10,40,"",core);
			 this.gauge2.backgroundColor="#00F";
			 	this.on("touchstart",function(){		//ﾀｯﾁでキャラ生成&ゲージ動作
					if(friendCount < 5){				
					for(var i=0;i< 5;i++){
					if(friendCharaBox[i]==undefined){
					friendCount++;
					friendCharaBox[i]= new friendChara(90,220,"bear.gif");
					break;	
					}}}
					this.gauge2.on("enterframe",function(){ 
			 			(this.height>0)?this.height-=1:this.height=40;
				});	});
	}	});
	//敵
	var enemyCharaButton = Class.create(Sprite,{
		initialize:function(x,y){
			ClassimgCreate(this,50,40,"kgen.png",core);
			this.x=x;
			this.y=y;
			this.gauge = new Images(x+60,y,10,40,"",core);
			 this.gauge.backgroundColor="#f00";
			this.gauge2 = new Images(x+60,y,10,40,"",core);
			 this.gauge2.backgroundColor="#00F";
			 	this.on("touchstart",function(){
					//キャラクター精製
					this.gauge2.on("enterframe",function(){ 
			 			(this.height>0)?this.height-=1:this.height=40;
			});});
	}	});
	//キャラクター------------------------------------------------------
	//味方
	var friendChara = Class.create(Sprite,{
		initialize:function(x,y,img){
			CharaimgCreate(this,x,y,64,64,img,core);
			this.flag  = 0;
			this.frame = 0;
			this.sclaeX= 1;
			//この辺にHPなど書く予定
			this.on("enterframe",function(){
			this.x +=10;	
			});
		}});








		//一般イメージ用クラス(引数全部入り)
		var Images = Class.create(Sprite,{
			initialize:function(x,y,w,h,imgname){
				ClassimgCreate(this,w,h,imgname,core);
				this.x=x;
				this.y=y;
		} });
		










		//スプライトは下の層から順に書くこと
		var background = new Images(0,0,640,480,"layout.jpg");
		var friendteam = new Images(10,10,140,50,"bearteam.jpg");
		var enemyteam  = new Images(490,10,140,50,"blik.jpg");
		var friendgoal = new Images(80,120,10,270,"");
		var enemygoal  = new Images(560,120,10,270,"layout1.jpg");		
		//仮の色付け
		friendgoal.backgroundColor="ee00ee";
		enemygoal.backgroundColor ="ee00ee";
		//タイムラベル

		//friend、enemyCharabuttonの略,,,配列を宣言
		var fcb= [];
		var ecb = [];
		//forを利用してキャラボタンの出力
		for(var i=0; i<5; i++){
			fcb[i]= new friendCharaButton (10,130+(50*i));
			ecb[i]= new enemyCharaButton (570,130+(50*i));
		}

	}
	core.debug();
}
//クラス生成を一括関数化(this,幅,高さ,画像ファイル名,core)として使用(core)は後、シーンでも使えるように、
function ClassimgCreate(e,w,h,img,Corename){
	Sprite.call(e,w,h);
	e.image=Corename.assets[img];
	Corename.rootScene.addChild(e);
}

function CharaimgCreate(e,x,y,w,h,img,Corename){
	Sprite.call(e,w,h);
	e.x=x;
	e.y=y;
	e.image=Corename.assets[img];
	Corename.rootScene.addChild(e);
}

	function rand(n) {
	return Math.floor(Math.random() * (n+1));
	}
