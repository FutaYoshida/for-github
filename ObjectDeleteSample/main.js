enchant();

window.onload = function(){

	var game = new Game(480,320);
	game.preload("map0.png");
	game.preload("icon1.png");

	var greenField = [];
	var ball = [];
	var ballNum = 0;

	game.onload = function(){
		map = new Map(16,16);
		map.image = game.assets["map0.png"];
		for(i=0; i<20; i++){
				greenField[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
						0,0,0,0,0,0,0,0,0,0];
		}
		map.loadData(greenField);
		game.rootScene.addChild(map);

		var Ball = Class.create(Sprite,{
			initialize:function(x,y,a,b){
				Sprite.call(this,a,b);
				this.x = x;
				this.y = y;
				this.life = 100;
				this.image = game.assets["icon1.png"];
				this.ax = Math.random() * 5 + 1;
				this.ay = Math.random() * 5 + 1;
				this.frame = 2;
				game.rootScene.addChild(this);
				this.addEventListener("enterframe",function(){
					if(this.x + 16 > 480){
						this.ax = (Math.random() * 5 + 1) * (-1);
					}
					if(this.x  < 0){
						this.ax = Math.random() * 5 + 1;
					}
					if(this.y  < 0){
						this.ay = Math.random() * 5 + 1;
					}
					if(this.y + 16 > 320){
						this.ay = (Math.random() * 5 + 1) * (-1);
					}
						this.x += this.ax;
						this.y += this.ay;
				});
			}
		});

		for(var i = 0; i < 10; i++){
			ball[i] = new Ball(i*10,i*10,16,16);
			ballNum++;
		}

		this.addEventListener("enterframe", function(){
			for(var i = 0; i <9; i++){
				/*if(ball[i] = undefined){
						continue;
				}*/
				for(var j = i+1; j <=9; j++){
					if(ball[j] == undefined){
						continue;
					}
					if(ball[j].intersect(ball[i])){
						ball[i].life -= Math.floor(Math.random() * 30);
						ball[j].life -= Math.floor(Math.random() * 30);
						console.log("ball["+i+"]:"+ball[i].life);
						console.log("ball["+j+"]:"+ball[j].life);
					}
				}
			}
			for(var i = 0; i < 10; i++){
				if(ball[i] == undefined){
					continue;
				}
				if(ball[i].life <= 0){
					console.log("ball["+i+"]:OUT");
					game.rootScene.removeChild(ball[i]);
					delete ball[i];
					ballNum--;
					console.log("ballNum:"+ballNum);
				}
			}
		});


	};
	game.start();
};
