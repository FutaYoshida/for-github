enchant();
window.onload = function() {
 var core = new Core(384, 320);

 core.preload('chara1.png');
 core.fps = 15;
 core.makeScene =function(){
	 var scene = new Scene();
	 var bg = new Sprite(32,32);
	 bg.backgroundColor="yellow";
	 bg.on('touchstart',function(){
		 core.popScene(scene);
	 });
	 scene.addChild(bg);
return scene;
 }
 core.onload = function() {

 var bearcount=0;
 var bearflag=0;
 var bears = [[],[]];
 var score1=0; 
 var bears2=[];
 var bearflag2=0;
 var bearcount2=0;
 var score2=0;
 var ba=[10,20,30];
 var timeleft=3*core.fps;
 var Bearg = Class.create(Sprite, {
 initialize: function(x, y,bearno,team) {
     Sprite.call(this, 32, 32);
     this.x = x;
     this.y = y;
     this.team=team;
     this.image = core.assets['chara1.png'];
     this.frame=10;
     this.bearno=ba[bearno];
     core.rootScene.addChild(this);
     this.on('touchstart',function(){
       if(this.team==0){
      if(bearcount<5) {
       for(var i=0;i<=5;i++){
        if(bears[this.team][i]==undefined){
         bearflag=i;
         bears[this.team][i]=new Bear(this.x,this.y+32);
          bearcount++;
         bears[this.team][i].power=this.bearno;    
         break;
        }
       }
      }
     }
      if(this.team==1){
         if(bearcount2<5) {
       for(var i=0;i<=5;i++){
        if(bears[this.team][i]==undefined){
         bearflag2=i;
         bears[this.team][i]=new Bear2(this.x,this.y+32);
          bearcount2++;
         bears[this.team][i].power=this.bearno;    
         break;
        }
       }
      }
}

     });
 }
});
      var bearg1 = new Bearg(32, 0,0,0);
      var bearg2 =new Bearg(32,64,1,0);
			var bearg3 =new Bearg(32,128,2,0);




   var Bearg2 = Class.create(Bearg,{
initialize: function(x,y,bearno,team){
Bearg.call(this,x,y,bearno,team); 			
this.frame=10;
this.scaleX=-1;  
}
});

    var bearg4 = new Bearg2(320,0,0,1);
    var bearg5 = new Bearg2(320,64,0,1);
    var bearg6 = new Bearg2(320,128,0,1);


       var Bear = Class.create(Sprite, {
        initialize: function(x, y) {
         Sprite.call(this, 32, 32);
         this.x = x;
         this.y = y; 
         var defaultframe=[0,1,0,2];
         this.frame = defaultframe;
         this.life =100;
         this.power=10;
				 this.speed=3;
         var posscale =this.scaleX;
         var negscale =(this.scaleX)*(-1);
         this.image = core.assets['chara1.png'];
         this.label1 = new Label();
         this.label1.text=this.life+"<br>"+this.power;
         this.label1.x=32*bearflag;
         this.label1.y=200;
         core.rootScene.addChild(this.label1);
         this.addEventListener('enterframe', function() {
          this.x += this.speed;
          this.scaleX=posscale;
   

      
      
      
      
  
          for(var i in bears[1]){
            if (this.within(bears[1][i], 10)) {
             this.life -=bears[1][i].power;
                  
                  this.label1.text=this.life+"<br>"+this.power;
             for(j in bears[0]){
             if(bears[0][j].life<=0){
             core.rootScene.removeChild(bears[0][j].label1);
             bearcount--;
             core.rootScene.removeChild(bears[0][j]);
             delete bears[0][j];             
             }}
             
              
             this.frame=3;
             this.tl.moveBy(-100,0,10).then(function(){this.frame=defaultframe;});
           }
         }
      });
    
   
    core.rootScene.addChild(this);
   }
  });

    var Bear2 = Class.create(Sprite, {
     initialize: function(x, y) {
     Sprite.call(this, 32, 32);
     this.x = x;
     this.y = y;
     this.life=100;
     this.power =20;
     this.frame =  [5,6,5,7];
     var defaultframe=[5,6,5,7];
     this.image = core.assets['chara1.png'];
			this.label2 = new Label();
         this.label2.text=this.life+"<br>"+this.power;
         this.label2.x=32*bearflag2;
         this.label2.y=230;
         core.rootScene.addChild(this.label2);
     this.scaleX *=-1;
     this.on('enterframe', function() {
          this.x -=3;
           for(var i in bears[0]){
            if (this.within(bears[0][i], 10)) {
                this.life -=bears[0][i].power
                this.label2.text=this.life+"<br>"+this.power;
							for(j in bears[1]){
 							if(bears[1][j].life<=0){
							core.rootScene.removeChild(bears[1][j].label2);
							bearcount2--;
							core.rootScene.removeChild(bears[1][j]);
							delete bears[1][j];
							}}
this.frame=8;
             this.tl.moveBy(100,0,10).then(function(){this.frame=defaultframe;


});
             
           }
         }

    });
    core.rootScene.addChild(this);
   }
  });

   /* var timeLabel = new Label('TIME:?');
    timeLabel.x =190;
    timeLabel.y =300;
    core.rootScene.addChild(timeLabel);
    core.on('enterframe',function(){
			if(core.started===true){timeleft--;}
      timeLabel.text='TIME:'+timeleft;
      if(timeleft<=0){
       if(score1>score2){core.end();score1l.text="win!";}
       else{core.end();score2l.text="win!";}
        
         }
    });*/
		var score1l=new Label();
		score1l.text="a";
		score1l.x=80;
		var score2l=new Label();
		score2l.text="b";
		score2l.x=280;
		core.rootScene.addChild(score1l);
		core.rootScene.addChild(score2l);
     
    wall1 = new Sprite(32,320);
		wall1.x=352;
		wall1.backgroundColor="#00F";
    wall1.on('enterframe',function(){
		for(i in bears[0]){
 		if(wall1.intersect(bears[0][i])){
		core.rootScene.removeChild(bears[0][i].label1);
		bearcount--;
		score1++;
		score1l.text=score1;
		core.rootScene.removeChild(bears[0][i]);
		delete bears[0][i];
		}}});
		core.rootScene.addChild(wall1);
		wall2 = new Sprite(32,320);
		wall2.x=0;
		wall2.backgroundColor="#F00";
		core.rootScene.addChild(wall2);
     
              
    wall2.on('enterframe',function(){
		for(i in bears[1]){
 		if(wall2.intersect(bears[1][i])){
		core.rootScene.removeChild(bears[1][i].label2);
		bearcount2--;
		score2++;
		score2l.text=score2;
		core.rootScene.removeChild(bears[1][i]);
		delete bears[1][i];
		core.pushScene(core.makeScene());
		}}});
    }
   core.debug(); 
  };
     
    function rand(n) {
    return Math.floor(Math.random() * (n+1));
    }