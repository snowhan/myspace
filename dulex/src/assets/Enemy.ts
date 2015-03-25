class Enemy extends egret.Bitmap{
    private static cacheDict:Object = {};
    public static typeArr:string[] = ["b"];
    public static speedDict:any = {"b":0};

    /**定时射*/
    public fireTimer:egret.Timer;
    /**生产*/
    public static produce(type:string):Enemy{
        if(Enemy.cacheDict[type]==null)
            Enemy.cacheDict[type] = [];
        var dict:Enemy[] = Enemy.cacheDict[type];
        var enemy:Enemy;
        if(dict.length>0){
            enemy = dict.pop();
        }else{
            enemy = new Enemy(type);
        }
        enemy.reset();
        return enemy;
    }
    /**回收*/
    public static reclaim(enemy:Enemy,type:string):void{
        if(Enemy.cacheDict[type]==null)
            Enemy.cacheDict[type] = [];
        var dict:Enemy[] = Enemy.cacheDict[type];
        if(dict.indexOf(enemy)==-1){
            dict.push(enemy);
        }
    }

    public type:string;
    /**敌人生命值*/
    public blood:number = 1;
    public speed:number;

    public constructor(type:string) {
        super();
        this.type = type;
        this.speed = Enemy.speedDict[this.type];
        this.texture = RES.getRes(this.type+"1");

        this.fireTimer = new egret.Timer(GameConfig.ENEMY_FIRE_DELAY);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
    }

    public reset(type?:string){
        this.type = type?type:Enemy.typeArr[0];
        this.speed = Enemy.speedDict[this.type];
        this.blood = 1;
        this.texture = RES.getRes('b1');

        //this.fireTimer = new egret.Timer(GameConfig.FIRE_DELAY);
        //this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
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
        this.dispatchEventWith(GameUtil.GAME_EVENT_JAPAN_CREATE_BULLET);
    }

    public onAttacked(){
        //if(bulletType==1){
            this.blood--;
        //}else{
        //    this.blood = 0;
        //}
        //if(this.blood>=0){
        //    this.texture = RES.getRes(this.type+this.blood+"");
        //}
    }

    public die(){
        egret.setTimeout(function(){
            this.texture = RES.getRes("blast");
            egret.setTimeout(function(){
                if(this.parent){
                    this.parent.removeChild(this);
                }
                Enemy.reclaim(this,this.type);
            },this,200);

        },this,150);
    }
}