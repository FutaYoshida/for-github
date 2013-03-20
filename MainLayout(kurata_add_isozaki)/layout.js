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
}
});
var EnemyGenerater=Class.create(Sprite,{
initialize:function(x,y,charno){
Sprite.call(this,32,32);
this.x=x;
this.y=y;
}
});
//キャラ生成オブジェクト用のクラス
var FriendCharacter=Class.create(Sprite,{
	initialize:function(x,y,charno){
		Sprite.call(this,32,32);
		this.x=x;
		this.y=y;
		this.Hp=charaHP[charno];
this.Atk=charaAtk[charno];
this.Def=charaDefcharno];
this.Spd=charaSpd[charno];
this.Ret=charaRet[charno];

	}
});
var EnemyCharacter=Class.create(Sprite,{
	initialize:function(x,y,charno){
		Sprite.call(this,32,32);
		this.x=x;
		this.y=y;
		this.Hp=charaHP[charno];
this.Atk=charaAtk[charno];
this.Def=charaDefcharno];
this.Spd=charaSpd[charno];
this.Ret=charaRet[charno];
//敵、味方のキャラクターの元になるクラス
	}
});
var Icon =Class.create(Sprite,{
	 initialize:function(x,y){
		 Sprite.call(this,32,32);
		 this.x=x;
		 this.y=y;
	 }
});
//スキル　投擲ターゲット、ゴールライン、チームアイコンの親クラスとして使用
var Background = new Sprite(640,480);
//背景画像用のフルサイズのスプライト
