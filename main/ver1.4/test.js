enchant();
window.onload= function(){
var core = new Core(640,480);
 core.fps = 15;
 core.onload=function(){
 var sample = new Sprite(32,32);
 sample.backgroundColor="#ff0000";
 sample.a=-9;
 sample.b=-9;
 sample.on('enterframe',function(){
  walk(this);
  });

 core.rootScene.addChild(sample);
 };
 core.start();
};

//外部関数
function walk(e){
 e.x+=(10+e.a);
 e.y+=(10+e.b);}
 function statusDef(e,a,b){
	 e.a=a;
	 e.b=b;}
