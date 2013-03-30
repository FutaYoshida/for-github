enchant();
window.onload= function(){
	var core = new Core(640,480);
	core.preload('title.jpg','layout.jpg','bearteam.jpg','blik.jpg','waiticon.gif','char.gif');
	core.fps=5;
	core.onload=function(){
		/*シーン設定*/
		var Title= new Scene();
		var game =new Scene();
		enemies= new Array();
		friends= new Array();
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
					if(this.height<40)this.height++;
				});
				this.on('enterframe',function(){
					if(this.counter<40)this.counter++;
				});
						}
		});
		var FriGen=Class.create(Generater,{
			initialize:function(x,y){
				Generater.call(this,x,y);
	this.on('touchmove',function(e){
					this.marker.y=e.y;
				if(e.x<300)this.marker.x=e.x;
				});

				this.on('touchend',function(){
					if(this.counter>=40){this.counter=0;	this.gauge2.height=0;
						for(i=0;i<5;i++){
							if(friends[i]==undefined){
								friends[i]=new Funit(this.marker.x,this.marker.y,i);
								break;}
						}
					}
					//ここでelseのビープ音を出す予定。
					this.marker.x=this.x;this.marker.y=this.y;
				});
			}
		});
		var EneGen=Class.create(Generater,{
			initialize:function(x,y){
				Generater.call(this,x,y);
				this.frame=1;
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
				console.log(this.image);
				this.no=no;
				this.on('enterframe',function(){
					this.x+=1;
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
			    this.frame=3;
			    this.tl.moveBy(-200,0,4).then(function(){if(this.frame==3){this.frame=[0,1,0,2];}
				    else{this.fdout();}
			    });
			    
		    },
		    fdout:function(){
		    this.tl.fadeOut(5).then(function(){this.remove();});
		    }
		
		});
		var Eunit=Class.create(Unit,{
			initialize:function(x,y,no){
				Unit.call(this,x,y,0);
				this.scaleX=-1;
				this.no=no
			this.on('touchstart',function(){
				this.remove();
			});

			},
		    remove:function(){
			    game.removeChild(this);
			    delete enemies[this.no];
		    },
		    crush:function(){
			    this.frame=3;
			    this.tl.moveBy(200,0,4).then(function(){this.fdout();});
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
		/*タイトル画面の構成物*/
		var titleG=new Images(0,0,640,480,"title.jpg");
		titleG.on('touchstart',function(){
			core.pushScene(game);
		});
		addC(titleG,Title);
		var titlelabel=new Label();
		titlelabel.text="tap to start!";
		titlelabel.x=320;
		titlelabel.y=450;
		addC(titlelabel,Title);
		/*ゲーム画面の構成物*/
		var Bg=new Images(0,0,640,480,"layout.jpg");
		addC(Bg,game);
		var team=[new Images(10,10,140,50,"bearteam.jpg"),new Images(490,10,140,50,"blik.jpg")];
		for(i in team){	addC(team[i],game);}
		var fri=[];
		var ene=[];
		for(i=0;i<5;i++){
			fri[i]=new FriGen(10,130+(50*i)); addC(fri[i],game);
			ene[i]=new EneGen(570,130+(50*i));addC(ene[i],game);

		}
		//var c1=new Funit(100,100);
		//var enemy= new Eunit(200,100,0);
		//var enemy2= new Eunit(300,100,1);
		//enemies[0]=enemy;
		//enemies[1]=enemy2;
		for(i=0;i<5;i++){
		  var enemy=new Eunit(100*(1+i),130+(50),i);
		  enemies[i]=enemy;
		  }




		//ゲーム開始時はタイトル画面を出す
		core.pushScene(Title);
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
