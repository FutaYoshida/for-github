enchant();
window.onload= function(){
	var core = new Core(640,480);
	core.fps=15;
	core.preload('char.gif','char2.gif','kgen.png');
	core.preload('layout.jpg');

	core.onload=function(){
		var fri=[];
		var ene=[];
		var FriGen= Class.create(Sprite,{
			initialize:function(x,y){
				ClassimgCreate(this,50,40,"kgen.png",core);
				this.x=x;
				this.y=y;
			}
		});
		var EneGen= Class.create(Sprite,{
			initialize:function(x,y){
				ClassimgCreate(this,50,40,"kgen.png",core);
				this.x=x;
				this.y=y;
			}
		});
		//一般イメージ用クラス（引数全部入り）
		var Images= Class.create(Sprite,{
			initialize:function(x,y,w,h,imgname){
				ClassimgCreate(this,w,h,imgname,core);
				this.x=x;
				this.y=y;
			}
		});

		var bg = new Images(0,0,640,480,"layout.jpg");	
		for(i=0;i<5;i++){
			fri[i]=new FriGen(10,130+(50*i));
			ene[i]=new EneGen(570,130+(50*i));
		}
			
	};
	core.start();
};
function ClassimgCreate(e,w,h,img,Corename){
	Sprite.call(e,w,h);
	e.image=Corename.assets[img];
	Corename.rootScene.addChild(e);
}
