enchant();
window.onload=function(){
	var core = new Core(640,480);
	core.preload=('chara1.png');
	core.fps=15;
	core.onload=function(){
		var friendSet=0;
		var enemySet=0;
		var friendPoint=0;
		var enemyPoint=0;
		// セット数　獲得旗の数の管理
		var friendCharaNumber=0;
		var enemyCharaNumber=0;
		var friendCharas=[];
		var enemyCharas=[];
		//敵、味方キャラクターの出撃番号　キャラクターオブジェクトを管理する配列
		var charaHp=[30,20,60,40,10,20];
		var charaAtk=[20,20,20,30,30,20];
		var charaDef=[10,20,20,30,30,20];
		var charaSpd=[10,20,5,10,10,5];
		var charaRet=[10,15,15,20,15,10];
		//キャラクターのパラメータ[通常、軽量、重量、高コスト、攻撃、特攻];

		var FriendGenerater=Class.create(Sprite,{
			initialize:function(x,y,charno){
				Sprite.call(this,32,32);
				this.x=x;
				this.y=y;
				this.backgroundColor="red";
				core.rootScene.addChild(this);
			}
		});
		var EnemyGenerater=Class.create(Sprite,{
			initialize:function(x,y,charno){
				Sprite.call(this,32,32);
				this.x=x;
				this.y=y;
				this.backgroundColor="blue";
				core.rootScene.addChild(this);
			}
		});
		//キャラ生成オブジェクト用のクラス
		var FriendCharacter=Class.create(Sprite,{
			initialize:function(x,y,charno){
				Sprite.call(this,32,32);
				this.x=x;
				this.y=y;
				this.backgroundColor="yellow";
			/*	this.Hp=charaHP[charno];
				this.Atk=charaAtk[charno];
				this.Def=charaDef[charno];
				this.Spd=charaSpd[charno];
				this.Ret=charaRet[charno];*/
				core.rootScene.addChild(this);
			}
		});
		var EnemyCharacter=Class.create(Sprite,{
			initialize:function(x,y,charno){
				Sprite.call(this,32,32);
				this.x=x;
				this.y=y;
				this.backgroundColor="green";
				/*this.Hp=charaHP[charno];
				this.Atk=charaAtk[charno];
				this.Def=charaDef[charno];
				this.Spd=charaSpd[charno];
				this.Ret=charaRet[charno];*/
				core.rootScene.addChild(this);
			}
		});
				//敵、味方のキャラクターの元になるクラス
		var Icon =Class.create(Sprite,{
			initialize:function(x,y){
				Sprite.call(this,32,32);
				this.x=x;
				this.y=y;
				core.rootScene.addCHild(this);
			}
		});
		//以下、レイアウト用サンプル
		var fg1 =new FriendGenerater(60,140);
		var fg2 =new FriendGenerater(60,200);
		var fg3 =new FriendGenerater(60,260);
		var eg1 =new EnemyGenerater(580,140);
		var eg2 =new EnemyGenerater(580,200);
		var eg3 =new EnemyGenerater(580,260);
	var fc1 =new FriendCharacter(120,140);
	var fc2 =new FriendCharacter(120,200);
	var fc3 =new FriendCharacter(120,260);
	var ec1 =new EnemyCharacter(520,140);
	var ec2 =new EnemyCharacter(520,200);
	var ec3 =new EnemyCharacter(520,260);

		//スキル　投擲ターゲット、ゴールライン、チームアイコンの親クラスとして使用
		var Background = new Sprite(640,480);
		//背景画像用のフルサイズのスプライト
	}
	core.start();
}
