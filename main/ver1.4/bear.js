enchant();

window.onload =function(){

	var core = new Core(640,640);
	core.preload('chara1.png');
	core.fps =10;
	core.onload =function() {
    teLabel=new Label();
		bear = new Sprite(32,32);
		bear.image = core.assets["chara1.png"];
		bear.backgroundColor="#FF0";
		core.rootScene.addChild(bear);
    bear.on('enterframe',function(){
		 bear.x+=10;
     if(bear.intersect(wall)){
			teLabel.text="hit";
      core.rootScene.removeChild(bear);
			delete bear;

			}
		});
        var BearG = Class.create(Sprite, {
            initialize: function(x, y) {
                Sprite.call(this, 32, 32);
                this.x = x;
                this.y = y;
                this.image = core.assets['chara1.png'];
               
                core.rootScene.addChild(this);
            }        
        });
      var bearg7 = new BearG(0, 100);
         
    wall = new Sprite(32,320);
		wall.x=288;
		wall.backgroundColor="#00F";
		core.rootScene.addChild(wall);
		core.rootScene.addChild(teLabel);
	};
	core.debug();
};
