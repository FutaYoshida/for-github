enchant();
window.onload= function(){
	var core = new Core(640,480);
	core.preload('title.jpg','layout02.jpg','bearteam.jpg','blik.jpg','waiticon.gif','char.gif','char2.gif','flag.jpg','round.jpg');
    core.preload('crush_01.wav','tengoku_to_jigoku_full.mp3','dodon.mp3','rakka.mp3','bear_fadeout_01.mp3','pu.mp3','po.mp3','flag_gong.mp3','re_charge_01.mp3','mode_cancell_01.mp3','rakka.wav');
	core.fps=5;
	core.onload=function(){
		/*シーン設定*/
		var Title= new Scene();
		var game =new Scene();
		var result=new Scene();
		var enemies= new Array();
		var friends= new Array();
	var friendflag= new Array();
	var enemyflag= new Array();
	var friendstar= new Array();
	var enemystar= new Array();
	var time =60;
	var friendcount=0;
	var enemycount=0;
	var friendround=0;
	var enemyround=0;
	var pra=0;
		/*クラス設定*/ 
		var Generater=Class.create(Sprite,{
			initialize:function(x,y){
				ClassImg(this,50,40,"waiticon.gif",core);
				this.x=x;
				this.y=y;
				this.gauge=new Images(x+60,y,10,40,"");
				this.gauge.backgroundColor="#f00";
				this.gauge2=new Images(x+60,y,10,40,"");
				this.gauge2.backgroundColor="#0f0";
				this.counter=40;
				this.marker=new Images(x,y,60,50,"");
				this.marker.backgroundColor="00F";
				addC(this.gauge,game);
				addC(this.gauge2,game);
				addC(this.marker,game);
				this.gauge2.on('enterframe',function(){
					if(this.height<40){this.height++;}
//					else if(this.height!=40){core.assets['pu.mp3'].play();}
				});
				this.on('enterframe',function(){
					if(this.counter<40)this.counter++;
				});
						}
		});
		var FriGen=Class.create(Generater,{
			initialize:function(x,y,pra){
				Generater.call(this,x,y);
				this.pra=pra;
				this.on('touchmove',function(e){
					if(e.y<220){this.marker.y=130;}
					else if(e.y<310){this.marker.y=220;}
					else{this.marker.y=310;}
					if(e.x<200&&e.x>100)this.marker.x=e.x;
					else{this.marker.x=101;}
				});

				this.on('touchend',function(){
console.log(pra);
					if(this.counter>=40){
						for(i=0;i<5;i++){
							if(friends[i]==undefined){
								//core.assets['po.mp3'].play();
								core.assets['pu.mp3'].play();
								friends[i]=new Funit(this.marker.x,this.marker.y,i);
								this.counter=0;	this.gauge2.height=0;
								break;}
						}
					}
					//ここでelseのビープ音を出す予定。
					this.marker.x=this.x;this.marker.y=this.y;
				});
			}
		});
		var EneGen=Class.create(Generater,{
			initialize:function(x,y,pra){
				Generater.call(this,x,y);
				this.frame=1;
				this.on('enterframe',function(){
					if(this.counter>=40&&this.age%(50-rand(10))==0){
						for(i=0;i<4;i++){
							if(enemies[i]==undefined){
								enemies[i]=new Eunit(496,130+(90*rand(2)),i);
								this.counter=0;this.gauge2.height=0;
								break;}
						}
					}
				});
			}
		});
		var Unit=Class.create(Sprite,{
			initialize:function(x,y,team){
				ClassImg(this,64,64,{0:"char.gif",1:"char2.gif"}[team],core);
				this.x=x;
				this.y=y;
				this.frame=[0,1,0,2];
				addC(this,game);

			}
		});
		var Funit=Class.create(Unit,{
			initialize:function(x,y,no){
				Unit.call(this,x,y,0);
				this.no=no;
				this.pra=fri[i].pra;
				CharaParam(this,this.pra);
				console.log(this.pra);
				this.on('enterframe',function(){
					this.x+=this.spd;
					for(var i in enemies){
						if(enemies[i].within(this,10)){
						enemies[i].crush();	
						this.crush();	
						}
					}
				});
				this.on('touchstart',function(){
					this.remove();
				});

			},
		    remove:function(){
			    game.removeChild(this);
			    delete friends[this.no];
		    },
		    crush:function(){
			core.assets['dodon.mp3'].play();
			    this.frame=3;
			    this.hp-=enemies[i].atk-this.def;
			    this.tl.moveBy(-200,0,4).then(function(){if(this.hp<=0){this.fdout();}
				    else{this.frame=[0,1,0,2]}
			    });
			    
		    },
		    fdout:function(){
			core.assets['bear_fadeout_01.mp3'].play();
			core.assets['rakka.wav'].play();
		    this.tl.fadeOut(5).then(function(){this.remove();});
		    }
		
		});
		var Eunit=Class.create(Unit,{
			initialize:function(x,y,no){
				Unit.call(this,x,y,1);
				this.no=no;
				CharaParam(this,pra);
			this.on('touchstart',function(){
				this.remove();
			});
this.on('enterframe',function(){
this.x-=this.spd;});
			},
		    remove:function(){
			    game.removeChild(this);
			    delete enemies[this.no];
		    },
		    crush:function(){
			    this.frame=3;
			    this.hp-=friends[i].atk-this.def;
			    this.tl.moveBy(200,0,4).then(function(){if(this.hp<=0){this.fdout();}
				    else{this.frame=[0,1,0,2];}
			    }
				    );
		    },
		    fdout:function(){
			    this.tl.fadeOut(5).then(function(){this.remove();});
		    }

		});



		var Images= Class.create(Sprite,{
			initialize:function(x,y,w,h,imgname){
				ClassImg(this,w,h,imgname,core);
				this.x=x;
				this.y=y;
			}
		});
		var Flag= Class.create(Images,{
			initialize:function(x,y,no){
				Images.call(this,x,y,20,20,"flag.jpg");
				this.no=no;
			}
		});
		var Round= Class.create(Images,{
			initialize:function(x,y,no){
				Images.call(this,x,y,30,30,"round.jpg");
				this.no=no;
			}
		});	
		/*タイトル画面の構成物*/
		var titleG=new Images(0,0,640,480,"title.jpg");
		titleG.on('touchstart',function(){
			core.assets['mode_cancell_01.mp3'].play();
			core.pushScene(game);
		});
		addC(titleG,Title);
		var titlelabel=new Label();
		titlelabel.text="tap to start!";
		titlelabel.x=320;
		titlelabel.y=450;
		addC(titlelabel,Title);
		/*ポーズ画面の構成物*/
		var Pose=new Images(160,120,320,240,"");
		Pose.backgroundColor="cccccc";
		Pose.on('touchstart',function(){
			core.popScene(result);
		});
		addC(Pose,result);
		/*ゲーム画面の構成物*/
		var Bg=new Images(0,0,640,480,"layout02.jpg");
		addC(Bg,game);
		var team=[new Images(10,10,140,50,"bearteam.jpg"),new Images(490,10,140,50,"blik.jpg")];
		for(i in team){	addC(team[i],game);}
		team[0].on('enterframe',function(){
			for(i=0;i<friendcount;i++){
				if(friendflag[i]==undefined){
				core.assets['re_charge_01.mp3'].play();
					if(i<5){
						friendflag[i]=new Flag(120+(i*30),70,i);addC(friendflag[i],game);}
					else if(i<10){
						friendflag[i]=new Flag((i*30)-30,90,i);addC(friendflag[i],game);}
					else{core.pushScene(result);
						//timer.counter=0;
						for(i in friends){
							friends[i].remove();
						}
						for(i in enemies){
							enemies[i].remove();}
						friendcount=0;
						enemycount=0;
						for(i in friendflag){
							game.removeChild(friendflag[i]);
							delete friendflag[i];
						}
						for(i in enemyflag){
							game.removeChild(enemyflag[i]);
							delete enemyflag[i];
					
						}
						friendround++;
					}

				}
			}
			for(i=0;i<friendround;i++){
				if(friendstar[i]==undefined){
					friendstar[i]=new Images(20+(40*i),70,30,30,"round.jpg");
					addC(friendstar[i],game);
				}
				if(friendround==2){core.end();}
			}

		});

		team[1].on('enterframe',function(){
			for(i=0;i<enemycount;i++){
				if(enemyflag[i]==undefined){
				core.assets['flag_gong.mp3'].play();
					if(i<5){
						enemyflag[i]=new Flag(380+(i*30),70,i);addC(enemyflag[i],game);}
					else if(i<10){
						enemyflag[i]=new Flag((i*30)+230,90,i);addC(enemyflag[i],game);}
					else{core.pushScene(result);
				//		timer.counter=0;
						for(i in friends){
							friends[i].remove();
						}
						for(i in enemies){
							enemies[i].remove();}
						friendcount=0;
						enemycount=0;
						for(i in friendflag){
							game.removeChild(friendflag[i]);
							delete friendflag[i];
						}
						for(i in enemyflag){
							game.removeChild(enemyflag[i]);
							delete enemyflag[i];
						}
						for(i in ene){
							ene[i].counter=40;
							ene[i].gauge2.height=40;
						}
						enemyround++;
					}	
				}
			}
			for(i=0;i<enemyround;i++){
				if(enemystar[i]==undefined){
					enemystar[i]=new Images(550+(40*i),70,30,30,"round.jpg");
					addC(enemystar[i],game);
				}
				if(enemyround==2){core.end();}
			}

		});
		

		var fri=[];
		var ene=[];
		for(i=0;i<5;i++){
			fri[i]=new FriGen(10,130+(50*i),i); addC(fri[i],game);
			ene[i]=new EneGen(570,130+(50*i),i);addC(ene[i],game);
		console.log(i);
		}
		var friendgoal=new Images(560,120,10,270,"");addC(friendgoal,game);
		friendgoal.backgroundColor="ee00ee";
		friendgoal.on('enterframe',function(){
			for(var i in friends){
				if(this.intersect(friends[i])){
					friends[i].remove();
					friendcount++;
				}
			}
		});
var enemygoal=new Images(80,120,10,270,"");addC(enemygoal,game);
		enemygoal.backgroundColor="ee00ee";
		enemygoal.on('enterframe',function(){
			for(var i in enemies){
				if(this.intersect(enemies[i])){
					enemies[i].remove();
					enemycount++;
				}
			}
		});

/*var timer= new Label();
timer.text="Time";
timer.x=300;
timer.y=20;
timer.counter=0;
timer.on('enterframe',function(){
	this.tl.delay(core.fps).then(function(){this.counter+=1});
	this.text=time-this.counter;
});
addC(timer,game);*/
		//ゲーム開始時はタイトル画面を出す
		core.pushScene(Title);
		core.rootScene.on('enterframe',function(){
			core.assets['tengoku_to_jigoku_full.mp3'].play();});
	};
	core.debug();
};
//外部化関数一覧
function ClassImg(e,w,h,img,Coren){
	Sprite.call(e,w,h);
	e.image=Coren.assets[img];
}
function addC(e,Scenename){
	Scenename.addChild(e);
}
function  rand(n){
	return Math.floor(Math.random()*(n+1));}
//キャラステータス
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