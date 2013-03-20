enchant();
window.onload= function(){
	var core = new Core(640,480);
	core.fps=15;
	core.preload('char.gif','char2.gif','kgen.png');
	core.preload('layout.jpg','bearteam.jpg','blik.jpg');

	core.onload=function(){
		//生成キャラクラス
		var FriGen= Class.create(Sprite,{
			initialize:function(x,y){
				ClassimgCreate(this,50,40,"kgen.png",core);
				this.x=x;
				this.y=y;
				//出撃ゲージ
				this.gauge=new Images(x+60,y,10,40,"",core);
				this.gauge.backgroundColor="#f00";	
				this.gauge2=new Images(x+60,y,10,40,"",core);
				this.gauge2.backgroundColor="#00F";
				this.gauge2.on('enterframe',function(){
					(this.height>0)?this.height-=1:this.height=40;});
			}
		});
		var EneGen= Class.create(Sprite,{
			initialize:function(x,y){
				ClassimgCreate(this,50,40,"kgen.png",core);
				this.x=x;
				this.y=y;
				//出撃ゲージ
				this.gauge=new Images(x+60,y,10,40,"",core);
				this.gauge.backgroundColor="#f00";	
				this.gauge2=new Images(x+60,y,10,40,"",core);
				this.gauge2.backgroundColor="#00F";
				this.gauge2.on('enterframe',function(){
					(this.height>0)?this.height-=1:this.height=40;});

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
		//スプライトは下の層から順に書くこと
		var bg = new Images(0,0,640,480,"layout.jpg");	
		var friendteam = new Images(10,10,140,50,"bearteam.jpg");
		var enemyteam = new Images(490,10,140,50,"blik.jpg");
		var enemygoal = new Images(80,120,10,270,"");
		var friendgoal = new Images(560,120,10,270,"");
		//仮の色付け
		enemygoal.backgroundColor="ee00ee";
		friendgoal.backgroundColor="ee00ee";
		//キャラクタ生成クラスは一番上の層に
		var fri=[];
		var ene=[];
		
		for(i=0;i<5;i++){
			fri[i]=new FriGen(10,130+(50*i));
			ene[i]=new EneGen(570,130+(50*i));
		}

	};
	core.start();
};
//クラス生成を一括の関数化(this,幅、高さ、画像ファイル名、core)として使用
function ClassimgCreate(e,w,h,img,Corename){
	Sprite.call(e,w,h);
	e.image=Corename.assets[img];
	Corename.rootScene.addChild(e);
}
