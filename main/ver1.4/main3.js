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
		var flag=[[],[]]
var friendCharaNo=0;
	var EnemyCharaNo=0;
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
								 //  console.log(friendcount);
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
this.on('touchstart',function(){
					   if(enemycount<5){
						   for(var i=0; i<=5; i++){
							   if(Charas[1][i]==undefined){
								   EnemyCharaNo=i;
								   Charas[1][i]=new EnemyChara(496,220);
								   enemycount++;
								   break;
							   }
						   }
					   }
				   });



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
					Crush(this,Charas,0,1,core,friendcount);
for(j in Charas[0]){
				if(Charas[0][j].hp<=0){
					friendcount--;
				//	console.log("f"+friendcount);
					core.rootScene.removeChild(Charas[0][j]);
					delete Charas[0][j];
				}
			}
		
				});
				core.rootScene.addChild(this);
			}
 
		});
		var EnemyChara =Class.create(Sprite,{
			initialize:function(x,y){
				CharaimgCreate(this,64,64,"char2.gif",core);
				this.x=x;
				this.y=y;
				this.scaleX=1;
				this.frame=[0,1,0,2];
				CharaParam(this,6);
				this.on('enterframe',function(){
					Charamove(this,core);
					Crush(this,Charas,1,0,core,enemycount);
for(j in Charas[1]){
				if(Charas[1][j].hp<=0){
					enemycount--;
			//		console.log("e"+enemycount);
					core.rootScene.removeChild(Charas[1][j]);
					delete Charas[1][j];
				}
			}
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
		friendteam.on('touchstart',function(){
			//全リセット処理
			for(var i in Charas[0]){
				core.rootScene.removeChild(Charas[0][i]);
				delete Charas[0][i];}
			for(var i in Charas[1]){
				core.rootScene.removeChild(Charas[1][i]);
				delete Charas[1][i];}
			for(var i in friendflag){
				remove(friendflag[i],core);
			}
			for(var i in enemyflag){
				remove(enemyflag[i],core);}
				enemycount=0;
			friendcount=0;
			enemyset=0;
			friendset=0;
		
		});

		var enemyteam = new Images(490,10,140,50,"blik.jpg");
		var enemygoal = new Images(80,120,10,270,"");
		var friendgoal = new Images(560,120,10,270,"");
		var friendflag = [];
		var enemyflag =[];
				for(var i=0;i<enemyset;i++){
			if(i<5){
			  enemyflag[i]=new Images(380+(i*30),70,20,20,"flag.jpg");}
		
		else if(i<10){enemyflag[i]=new Images((i*30)+230,90,20,20,"flag.jpg");}
		}

		//仮の色付け
		enemygoal.backgroundColor="ee00ee";
		friendgoal.backgroundColor="ee00ee";
		friendgoal.on('enterframe',function(){
			for(var i in Charas[0]){
				if(this.intersect(Charas[0][i])){
					core.rootScene.removeChild(Charas[0][i]);
					delete Charas[0][i];
					friendcount--;
					friendset++;
						if(friendset<6)	{friendflag[friendset-1]=new Images(120+((friendset-1)*30),70,20,20,"flag.jpg");}
						else if(friendset<10){friendflag[friendset-1]=new Images(((friendset-1)*30)-30,90,20,20,"flag.jpg");}
					}
				}
					
				
			
			if(friendset==10){
				for(j=0;j<10;j++){
					core.rootScene.removeChild(friendflag[j]);
					delete friendflag[j];
					console.log(j);
				}
	for(var i in Charas[0]){
				core.rootScene.removeChild(Charas[0][i]);
				delete Charas[0][i];}
			for(var i in Charas[1]){
				core.rootScene.removeChild(Charas[1][i]);
				delete Charas[1][i];}
			for(var i in friendflag){
				remove(friendflag[i],core);
			}
			for(var i in enemyflag){
				remove(enemyflag[i],core);}
				enemycount=0;
			friendcount=0;
			enemyset=0;
			friendset=0;
				}
		});
		enemygoal.on('enterframe',function(){
			for(var i in Charas[1]){
				if(this.intersect(Charas[1][i])){
					core.rootScene.removeChild(Charas[1][i]);
					delete Charas[1][i];
					enemycount--;
					enemyset++;
					if(enemyset<6)	{enemyflag[enemyset-1]=new Images(380+((enemyset-1)*30),70,20,20,"flag.jpg");}
					else if(enemyset<10){enemyflag[enemyset-1]=new Images(((enemyset-1)*30)+230,90,20,20,"flag.jpg");}
				}
			}



			if(enemyset==10){
				for(j=0;j<10;j++){
					core.rootScene.removeChild(enemyflag[j]);
					delete enemyflag[j];
					console.log(j);
				}
					enemyset=0; 
			}
		});

		


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
//addChildを後回し（座標決定後）にすることで#1のバグを回避
}
function CharaParam(e,Charano){
 var Spd=[10,20,5,10,10,5,-10,-20,-5,-10,-10];
 var Atk=[20,20,20,30,30,20,20,20,20,30,30,20];
 var Hp=[30,20,60,40,10,20,30,20,60,40,10,20];
 var Def=[5,5,10,7.5,5,5,5,5,10,7.5,5,5];
 e.spd=Spd[Charano];
 e.atk=Atk[Charano];
 e.def=Def[Charano];
 e.hp=Hp[Charano];
}
function Charamove(e,Corename){
	e.x+=5*e.spd/Corename.fps;
}
function Crush(e,array,you,target,Corename,countname){
	for(var i in array[target]){
		if(e.within(array[target][i],10)){
			e.hp-=array[target][i].atk-(e.def);
			/*for(j in array[you]){
				if(array[you][j].hp<=0){
					countname--;
					console.log(countname);
					Corename.rootScene.removeChild(array[you][j]);
					delete array[you][j];
					return countname;
				}
			}*/
			//カウントの外部値のリターンが出来ないので外部化をしない。
			e.frame=3;
			e.tl.moveBy(-10*e.spd,0,4).then(function(){e.frame=[0,1,0,2];});
		}
	}
}
function remove(e,Corename){
	Corename.rootScene.removeChild(e);
	delete e;
}
