enchant();
window.onload= function(){
var core = new Core(640,480);
 core.fps = 15;
 core.preload('char.gif');
 core.onload=function(){
var ar =[];
 var sample = new Sprite(64,64);
 sample.backgroundColor="#ff0000";
 sample.a=-9;
 sample.b=-9;
 sample.image=core.assets['char.gif'];
 sample.frame=[0,0,1,1,0,0,2,2];
 sample.on('enterframe',function(){
  walk(this);
 });
sample.on('touchstart',function(){
	statusDef(this,10,10);
	this.scaleX*=-1;
/*	Sample.collection.forEach(function(e){
		core.rootScene.removeChild(e)});
});*/
//現時点ではcollectionの挙動はわからなかった。
var Sample = Class.create(Sprite,{
 initialize: function(x,y){
	 Sprite.call(this,32,32);
	 this.x=x;
	 this.y=y;
	 this.backgroundColor="#0000ff";
         this.on('enterframe',function(){
		 this.x+=1;
	 });
	 core.rootScene.addChild(this);
 }
});
for(var i=0; i<=5;i++){
	ar[i]=new Sample(i*30,i*30);}
//付属スプライトの設定
sample.param=new Sprite(16,32);
sample.param.backgroundColor="#00ff00";
sample.param.x=sample.x+64;
/*sample.param.on('enterframe',function(){
	this.x=sample.x;
	this.y=sample.y;});
sample.param2=new Sprite(16,32);
sample.param2.backgroundColor="#fff000";
sample.param2.x=sample.x+64;
sample.param2.on('enterframe',function(){
	this.x=sample.x;
	this.y=sample.y;
if(this.height>=0)this.height-=1;
});*/

 core.rootScene.addChild(sample);
 core.rootScene.addChild(sample.param);
 //core.rootScene.addChild(sample.param2);
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
