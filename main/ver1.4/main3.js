enchant();
window.onload= function(){
	var core = new Core(640,480);
	core.fps=10;
	core.preload('char.gif','char2.gif','kgen.png');
	core.preload('layout.jpg','bearteam.jpg','blik.jpg','flag.jpg');

	core.onload=function(){
		
	var friendcount=0;
	var enemycount=0;
	var friendset=0;
	var enemyset=0;
	var Charas=[[],[]]
var friendCharaNo=0;
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
			
				   this.on('touchstart',function(){
					   if(friendcount<5){
						   for(var i=0; i<=5; i++){
							   if(Charas[0][i]==undefined){
								   friendCharaNo=i;
								   Charas[0][i]=new FriendChara(90,220);
								   friendcount++;
								   break;
							   }
						   }
					   }
				   });
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
		//登場キャラクラス
		var FriendChara =Class.create(Sprite,{
			initialize:function(x,y){
				CharaimgCreate(this,64,64,"char.gif",core);
			this.x=x;
			this.y=y;
				this.frame=[0,1,0,2];
				CharaParam(this,0);
				this.on('enterframe',function(){
					Charamove(this,core);
				});
				core.rootScene.addChild(this);
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
		var friendflag = [];
		var enemyflag =[];
		for(var i=0;i<friendcount;i++){
			if(i<5){
			  friendflag[i]=new Images(120+(i*30),70,20,20,"flag.jpg");}
		
		else if(i<10){friendflag[i]=new Images((i*30)-30,90,20,20,"flag.jpg");}
		}

		for(var i=0;i<enemycount;i++){
			if(i<5){
			  enemyflag[i]=new Images(380+(i*30),70,20,20,"flag.jpg");}
		
		else if(i<10){enemyflag[i]=new Images((i*30)+230,90,20,20,"flag.jpg");}
		}

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
function CharaimgCreate(e,w,h,img,Corename){
Sprite.call(e,w,h);
e.image=Corename.assets[img];
//Corename.rootScene.addChild(e);
//バグ対策用に一時解除版
}
function CharaParam(e,Charano){
 var Spd=[10,20,5,10,10,5,-10,-20,-5,-10,-10];
 e.spd=Spd[Charano];
}
function Charamove(e,Corename){
	e.x+=e.spd/Corename.fps;
}
