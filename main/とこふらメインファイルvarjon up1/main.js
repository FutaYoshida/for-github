enchant();


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

	var CharaButton = Class.create(Sprite,{
		initialize:function(x,y){
			ClassimgCreate(this,50,40,"kgen.png",core);
			this.x=x;
			this.y=y;
			this.gauge = new Images(x+60,y,10,10,"",core);
			 this.gauge.backgroundColor="#f00";
			this.gauge2 = new Images(x+60,y,10,40,"",core);
			 this.gauge2.backgroundColor="#00F";
			 this.on("enterframe",function(){ 
			 	this.on("touchstart",function(){
					this.gauge2.on("enterframe",function(){ 
			 			(this.height>0)?this.height-=1:this.height=40;});
				});
			});
	}	});

	
		
		var Images = Class.create(Sprite,{
			initialize:function(x,y,w,h,imgname){
				ClassimgCreate(this,x,y,imgname,core);
				this.x=x;
				this.y=y;
		} });
	var Charabutton= new CharaButton(10,10);
	}
	core.start();
}

function ClassimgCreate(e,w,h,img,Corename){
	Sprite.call(e,w,h);
	e.image=Corename.assets[img];
	Corename.rootScene.addChild(e);
}

	function rand(n) {
	return Math.floor(Math.random() * (n+1));
	}
