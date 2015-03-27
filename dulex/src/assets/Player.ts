class Player extends egret.DisplayObjectContainer{
	private blood;
	 /**定时射*/
    public fireTimer:egret.Timer;
    public movable:boolean;
    public bulletType:number;
    public bitmap:egret.MovieClip;
    private timeoutKey:number;
    public state:string = 'middle';
    public stateNumber:number = 2;
	constructor(){
		super();
        this.blood = 2;
        this.bulletType = 1;
        //this.width = 14;
        //this.height = 37;
        //this.bitmap = new egret.Bitmap();
        //this.bitmap.x = -10;
        //this.bitmap.y = -20;
        //this.addChild(this.bitmap);
		//this.bitmap.texture = RES.getRes("z"+this.blood);




        var data = RES.getRes("playerjson");//获取动画文件的信息配置文件
        var texture = RES.getRes("player");//获取动画文件的图片
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        var mc= new egret.MovieClip(mcDataFactory.generateMovieClipData("player"));
        mc.scaleX = 0.3 * Main.isFpsTrueNumber;
        mc.scaleY = 0.3 * Main.isFpsTrueNumber;
        mc.x = 0;
        mc.y = 0;
        //this.addChild(mc);//添加到显示列表，显示影片剪辑
        mc.frameRate = 5;//设置动画的帧频
        //mc.scaleX = mc.scaleY = 0.2;
        //this.boomMovie = mc;
        this.addChild(mc);
        //mc.gotoAndPlay('player');
        mc.play(-1);
        this.bitmap = mc;


        this.fireTimer = new egret.Timer(GameConfig.FIRE_DELAY);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
	}
   
    /**开火*/
    public fire():void {
        this.fireTimer.start();
    }
    /**停火*/
    public stopFire():void {
        this.fireTimer.stop();
    }
    /**创建子弹*/
    private createBullet(evt:egret.TimerEvent):void {
        this.dispatchEventWith(GameUtil.GAME_EVENT_CREATE_BULLET);
    }

    public onAttacked(){
        this.anchorX = this.anchorY = 0.5;
        this.fireTimer.stop();
        var tw = egret.Tween.get(this, { loop: false });
        if(this.x >  Main.isFpsTrueNumber * Main.stage.stageWidth/2){
            tw.to({ x: this.width + Main.stage.stageWidth + 50 * Main.isFpsTrueNumber, y:this.y - 200 * Main.isFpsTrueNumber}, 1000);
        }else{
            tw.to({ x: -this.width, y:this.y - 200}, 1000);
        }



        var tw1 = egret.Tween.get(this, { loop: true });
        tw1.to({ rotation: 360}, 300);
        tw.call(this.die,this)


        //this.blood--;
        //this.bitmap.texture = RES.getRes("z"+this.blood);
        //if(this.blood<=0){
        //    this.die();
        //}
    }

    public die(){
        this.dispatchEventWith(GameUtil.GAME_EVENT_PLAYER_DIE);
    }
    public onEnemyDie(){
        //this.bitmap.texture = RES.getRes('z_laugh');
        //egret.setTimeout(function(){
        //    this.bitmap.texture = RES.getRes('z'+this.blood);
        //},this,250);
    }

    public equipSuperBullet(){
        this.bulletType = 2;
        if(this.timeoutKey){
            egret.clearTimeout(this.timeoutKey);
        }
        this.timeoutKey = egret.setTimeout(function(){
            this.bulletType = 1;
        },this,10000);
    }
}