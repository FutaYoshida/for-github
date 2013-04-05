enchant();
window.onload= function(){
	var core = new Core(640,480);
	core.fps=10;
	core.preload('char.gif','char2.gif','kgen.png');
	core.preload('layout.jpg','bearteam.jpg','blik.jpg','flag.jpg','round.jpg');

	core.onload=function(){
		core.makescene=function(){
	var pose=new Scene();
var windowscene=new Sprite(320,240);
windowscene.backgroundColor="#eeeeee";
windowscene.x=160;
windowscene.y=120;
windowscene.on('touchstart',function(){
	core.popScene();}
	);
pose.addChild(windowscene);
	return pose;
}	
	var friendcount=0;
	var enemycount=0;
	var friendset=0;
	var enemyset=0;
        var friendround=0;
	var enemyround=0;
	var Charas=[[],[]]
        var friendCharaNo=0;
	var EnemyCharaNo=0;
		//生成キャラクラス
		var FriGen= Class.create(Sprite,{
			initialize:function(x,y){
				ClassimgCreate(this,50,40,"kgen.png",core);
				this.x=x;
				this.y=y;
				this.toggle=true;
				//出撃ゲージ
				this.gauge=new Images(x+60,y,10,40,"",core);
				this.gauge.backgroundColor="#f00";	
				this.gauge2=new Images(x+60,y,10,40,"",core);
				this.gauge2.backgroundColor="#00F";
				this.gauge2.toggle=true;
				this.gauge2.on('enterframe',function(){
					if(!this.toggle){
					(this.height>0)?this.height-=1:this.toggle=true;}
					else{this.height=0;}
				});
			
				this.on('touchstart',function(){
					console.log(this.gauge2.toggle);
					if(this.gauge2.toggle){this.gauge2.toggle=false;
						this.gauge2.height=40;
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
				this.gauge2.toggle=true;
				this.gauge2.on('enterframe',function(){
					if(!this.toggle){
					(this.height>0)?this.height-=1:this.toggle=true;}
					else{this.height=0;}
				}	);
				this.on('enterframe',function(){
					if(this.gauge2.toggle&&this.age%(100-rand(30))==0){
						console.log("go");
						this.gauge2.toggle=false;
						this.gauge2.height=40;
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
			this.toggle=0;
			this.rem=true;
			this.backgroundColor="#ff0000";
			this.frame=[0,1,0,2];
			CharaParam(this,0);
			this.on('enterframe',function(){
				//	this.y={0:220,2:310}[this.toggle];
				//	if(this.toggle==1){this.tl.moveBy(130,130,15)};
				Charamove(this,core);
				Crush(this,Charas,0,1,core,friendcount);
				//	console.log(this.y+""+this.x);
				for(j in Charas[0]){
					if(Charas[0][j].hp<=0){
						friendcount--;
						//	console.log("f"+friendcount);
						Charas[0][j].tl.fadeOut(3).moveTo(9999,9999,1).then(function(){this.rem=false;});
					}
if(!Charas[0][j].rem&&Charas[0][j].hp<=0){
	Charas[0][j].rem=true;
	core.rootScene.removeChild(Charas[0][j]);
							//孤児ノード参照を止めるために、表示を消して移動処理後にremoveされるよう調整
							delete Charas[0][j];
						}
				}
			});
			/*	this.on('touchstart',function(){
				//	console.log(this.toggle);
		                this.backgroundColor="#ff0000";
			//	this.tl.moveBy(10,10,3);
			vmove(this,this.toggle);

					this.toggle={0:1,1:2,2:3,3:0}[this.toggle];
					});*/
				this.on('touchmove',function(e){
					this.y=e.y-this.height/2;
				});
				this.on('touchend',function(e){
if(e.y<220){this.y=130;}else if(e.y<310){this.y=220;}
else{this.y=310;}
				});
				core.rootScene.addChild(this);
			}
 
		});
		var EnemyChara =Class.create(Sprite,{
			initialize:function(x,y){
				CharaimgCreate(this,64,64,"char2.gif",core);
				this.x=x;
				this.y=y;
				this.toggle=0;
				this.rem=true;
				this.scaleX=1;
				this.frame=[0,1,0,2];
				CharaParam(this,6);
				this.on('enterframe',function(){
if(this.age%(50-rand(10))==0&&this.age>=30)
				{this.toggle={0:1,1:2,2:3,3:0}[this.toggle];
					vmove(this,this.toggle);}
					Charamove(this,core);
				//	console.log("hit");
					Crush(this,Charas,1,0,core,enemycount);
for(j in Charas[1]){
				if(Charas[1][j].hp<=0){
					enemycount--;
			//		console.log("e"+enemycount);
					Charas[1][j].tl.fadeOut(3).moveTo(-9999,-9999,1).then(function(){this.rem=false;});
							}
		if(!Charas[1][j].rem){
			Charas[1][j].rem=true;
			core.rootScene.removeChild(Charas[1][j]);
					//座標を予め動かしておくことで孤児ノードを参照させない！
					//そうすると復帰出来ない別バグが
				//	core.rootScene.removeChild(Charas[1][j]);
					delete Charas[1][j];}

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
			//全リセット処理テスト
		/*	for(var i in Charas[0]){
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
		*/
			core.pushScene(core.makescene());
		});
		var enemyteam = new Images(490,10,140,50,"blik.jpg");
		var enemygoal = new Images(80,120,10,270,"");
		var friendgoal = new Images(560,120,10,270,"");
		var friendflag = [];
		var enemyflag =[];
		var friendstar=[];
		var enemystar=[];
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
friendstar[friendround]=new Images(20+(40*friendround),70,30,30,"round.jpg",core);
				friendround++;
				if(friendround==2){alert('you win!');core.end();}

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

enemystar[enemyround]=new Images(+(40*enemyround),70,30,30,"round.jpg",core);
enemyround++;
if(enemyround==2){alert('you lose..');core.end();}
			}
			
		});

	//	var round = new Images(590,70,30,30,"round.jpg",core);


		//キャラクタ生成クラスは一番上の層に
		var fri=[];
		var ene=[];
		
		for(i=0;i<5;i++){
			fri[i]=new FriGen(10,130+(50*i));
			ene[i]=new EneGen(570,130+(50*i));
		}

	};
	core.debug();
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
			console.log(array[target][i]);
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
function rand(n){
	return Math.floor(Math.random()*(n+1));}
function vmove(e,a){
	e.tl.moveBy(0,{0:-90,1:-90,2:90,3:90}[a],10);}
