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
core.preload('test.png');

core.fps =5;
var LIMIT_TIME = 60;
core.onload = function(){ 


var defaultframe=[0,1,0,2];
var bear =Class.create(Sprite,{
	initialize:function(x,y){
	ClassimgCreate(this,64,64,"bear.gif",core);
	this.x=x;
	this.y=y;
	this.frame =[0,1,0,2];
	this.on("enterframe",function(){
	this.x+=10
	if(this.within(enemybear,10)){
	var efe = new efect(this.x,this.y);	

		this.frame=3;
		this.tl.moveBy(-150,0,5).then(function(){this.frame=defaultframe});
		enemybear.frame=3;
		enemybear.tl.moveBy(150,0,5).then(function(){this.frame=defaultframe});
	}	
});
}});

var enemy =Class.create(Sprite,{
	initialize:function(x,y){
	ClassimgCreate(this,64,64,"bear.gif",core);
	this.x=x;
	this.y=y;
	this.frame =[0,1,0,2];
	this.scaleX=-1
	this.on("enterframe",function(){
	this.x-=10
//	if(this.within(testbear,10)){
//		this.frame=3;
//		this.tl.moveBy(100,0,10).then(function(){this.frame=defaultframe});
//	}	
});
}});


var efect = Class.create(Sprite,{
	initialize:function(x,y){
	ClassimgCreate(this,240,240,"test.png",core);
	this.x=x;
	this.y=y;
	this.frame=[0,1,2,3,4];
	this.on("enterframe",function(){
	if(this.frame==4){
	this.remove();
 }});
}});


var enemybear= new enemy(300,50);
var testbear = new bear(10,50);
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
