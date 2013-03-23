enchant();


window.onload = function(){
	var core = new Core(640,480);
core.preload('chara1.png');
core.preload('bear.gif','robo.gif');
core.preload('layout.jpg');
core.preload('skill1.png','skill2.png');
core.preload('flag.jpg','round.jpg');
core.preload('bearteam.jpg','blik.jpg');
core.preload('waiticon.gif');

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
//team			敵味方判別
//defaultframe	移動フレーム管理
//charaHp		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaAtk		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaDef		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaSpd		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//charaRet		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
//type          //キャラのタイプを格納する
//～敵限定～
//spot			ランダム精製時の1､2､3レーン固定
//flag          ｷｬﾗの移動管理、０＝ｘ移動　１＝ｙ移動
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
var charaHp=[30,20,60,40,10,20];
var charaAtk=[20,20,20,30,30,20];
var charaDef=[10,20,20,30,30,20];
var charaSpd=[10,20,5,10,10,5];
var charaRet=[10,15,15,20,15,10];
var type    =0;
var flag    =0;
var hata    =[];
//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];
	//キャラ生成ボタン--------------------------------------------------------
	//味方
	var friendCharaButton = Class.create(Sprite,{
		initialize:function(x,y){
			ClassimgCreate(this,50,40,"waiticon.gif",core);
			this.x=x;
			this.y=y;
			this.type = type;
			this.gauge = new Images(x+60,y,10,40,"",core);
			this.gauge2 = new Images(x+60,y,10,40,"",core);

			ButtonCreate(this,0);


	}	});
	//敵
	var enemyCharaButton = Class.create(Sprite,{
		initialize:function(x,y){
			ClassimgCreate(this,50,40,"waiticon.gif",core);
			this.x=x;
			this.y=y;
			this.frame=1;
			this.gauge = new Images(x+60,y,10,40,"",core);
			this.gauge2 = new Images(x+60,y,10,40,"",core);
			ButtonCreate(this,1);
	}	});
	//キャラクター------------------------------------------------------
	//味方
	var friendChara = Class.create(Sprite,{
		initialize:function(x,y,img){
			CharaimgCreate(this,x,y,64,64,img,core,0);
			this.Hp =100;
			this.Atk=10;
			this.Def=10;
			this.Spd=10;
			this.Ret=10;
			this.flag  = 0;
			this.frame = 0;
			this.sclaeX= 1;
			this.on("enterframe",function(){
				this.frame=frienddefaultframe;
				//壁に当たった時の処理
				if(friendCharaBox[friendCharaNumber].within(enemygoal,10)){
					core.rootScene.removeChild(friendCharaBox[friendCharaNumber]);
					friendCount--;
					delete friendCharaBox[friendCharaNumber];			
						friendScore++;
					for(var i=0;i<=10;i++){
						if(hata[i] == undefined){
							if(friendScore <= 5){		
								 hata[i]= new Images(120+(30*i),70,20,20,"flag.jpg");break;
							}else if(friendScore<10){ 	
								 hata[i] =new Images(120+(30*(i-5)),90,20,20,"flag.jpg");break;
							}else{   hata[i] =new Images(240,90,20,20,"flag.jpg");
									var round = new Images(20,70,30,30,"round.jpg");break;
						}	}
				}	}
				
				console.log(friendScore)
						
	});	}	});
	//敵
	var enemyChara = Class.create(Sprite,{
		initialize:function(x,y,img){
			CharaimgCreate(this,x,y,64,64,img,core,1);
			this.Hp =100;
			this.Atk=10;
			this.Def=10;
			this.Spd=-10;
			this.Ret=10;
			this.flag  = 0;
			this.frame = 0;
			this.sclaeX= 1;
			this.on("enterframe",function(){
				this.frame=enemydefaultframe;

	});	}});



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

//ボタンでくま作成。(this,チーム０=味方１=敵)
//機能リスト----------------------------------------------------------------------------------------
//キャラタッチでのキャラ精製及び、ゲージ動作開始
//フレーム管理(画像関係)
//ゲージ動作
//--------------------------------------------------------------------------------------------------
function ButtonCreate(e,team){
	e.frame = team
	e.gauge.backgroundColor="#f00";
	e.gauge2.backgroundColor="#00F";
	e.on("touchstart",function(){		//ﾀｯﾁでキャラ生成&ゲージ動作
		if(team== 0){					//チーム判定
			if(friendCount < 5){				
			for(var i=0;i< 5;i++){
			if(friendCharaBox[i]==undefined){
			friendCount++;
			friendCharaNumber=i
			friendCharaBox[friendCharaNumber]= new friendChara(90,220,"bear.gif");
			break;					
		}}}}
		if(team== 1){					//チーム判定
			if(enemyCount < 5){				
			for(var i=0;i< 5;i++){
			if(enemyCharaBox[i]==undefined){
			enemyCount++;
			enemyCharaBox[i]= new enemyChara(496,220,"robo.gif");
			break;					
		}}}}
		this.gauge2.on("enterframe",function(){ (this.height>0)?this.height-=1:this.height=40;});
	});
}
//-------------------------------------------------------------------------------------------------
	}
	core.debug();
}
//クラス生成を一括関数化(this,幅,高さ,画像ファイル名,core)として使用(core)は後、シーンでも使えるように、
function ClassimgCreate(e,w,h,img,Corename){
	Sprite.call(e,w,h);
	e.image=Corename.assets[img];
	Corename.rootScene.addChild(e);
}

//キャラクター用クラス(this,x座標,y座標,幅,高さ,画像ファイル名,core,味方or敵）
//機能リスト--------------------------------------------------------------------------
//移動フラグの管理
//移動変更時のスナップ、及びエリア指定
//衝突判定(予定)
//スコア判定(予定）
//
//-------------------------------------------------------------------------------------
function CharaimgCreate(e,x,y,w,h,img,Corename,team){
	Sprite.call(e,w,h);
	e.x=x;
	e.y=y;
	e.image=Corename.assets[img];
	e.on("touchstart",function(a){
	//x,y移動のフラグ管理
		if(e.flag==0){e.flag=1;}
			else{e.flag=0;}
	});
	e.on("enterframe",function(){
		if(this.flag == 0){				//flag==0ならばx移動　１ならばy移動
		if(team == 0)this.Spd =10;		//これがなければyが‐移動している時、x座標移動すると後ろに行く
		if(team == 1)this.Spd =-10;
		this.x   +=this.Spd;
		if(this.y >=120 && this.y <=210 && this.x >= 90){this.y = 130;}
		if (this.y >=210 && this.y <=300 && this.x >= 90){this.y = 220;}
		if (this.y >=300 && this.y <=390 && this.x >= 90){this.y = 310;}
	}
		if(this.flag == 1){
			this.y +=this.Spd;
			if(this.y<120){this.Spd = 10}
			if(this.y>326){this.Spd*=-1}
	}
	});
	Corename.rootScene.addChild(e);
}
//乱数設定用関数
	function rand(n) {
	return Math.floor(Math.random() * (n+1));
	}
