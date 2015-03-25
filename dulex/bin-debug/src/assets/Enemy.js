var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type) {
        _super.call(this);
        /**敌人生命值*/
        this.blood = 1;
        this.type = type;
        this.speed = Enemy.speedDict[this.type];
        this.texture = RES.getRes(this.type + "1");
        this.fireTimer = new egret.Timer(GameConfig.ENEMY_FIRE_DELAY);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }
    /**生产*/
    Enemy.produce = function (type) {
        if (Enemy.cacheDict[type] == null)
            Enemy.cacheDict[type] = [];
        var dict = Enemy.cacheDict[type];
        var enemy;
        if (dict.length > 0) {
            enemy = dict.pop();
        }
        else {
            enemy = new Enemy(type);
        }
        enemy.reset();
        return enemy;
    };
    /**回收*/
    Enemy.reclaim = function (enemy, type) {
        if (Enemy.cacheDict[type] == null)
            Enemy.cacheDict[type] = [];
        var dict = Enemy.cacheDict[type];
        if (dict.indexOf(enemy) == -1) {
            dict.push(enemy);
        }
    };
    Enemy.prototype.reset = function (type) {
        this.type = type ? type : Enemy.typeArr[0];
        this.speed = Enemy.speedDict[this.type];
        this.blood = 1;
        this.texture = RES.getRes('b1');
        //this.fireTimer = new egret.Timer(GameConfig.FIRE_DELAY);
        //this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
    };
    /**开火*/
    Enemy.prototype.fire = function () {
        this.fireTimer.start();
    };
    /**停火*/
    Enemy.prototype.stopFire = function () {
        this.fireTimer.stop();
    };
    /**创建子弹*/
    Enemy.prototype.createBullet = function (evt) {
        this.dispatchEventWith(GameUtil.GAME_EVENT_JAPAN_CREATE_BULLET);
    };
    Enemy.prototype.onAttacked = function () {
        //if(bulletType==1){
        this.blood--;
        //}else{
        //    this.blood = 0;
        //}
        //if(this.blood>=0){
        //    this.texture = RES.getRes(this.type+this.blood+"");
        //}
    };
    Enemy.prototype.die = function () {
        egret.setTimeout(function () {
            this.texture = RES.getRes("blast");
            egret.setTimeout(function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                Enemy.reclaim(this, this.type);
            }, this, 200);
        }, this, 150);
    };
    Enemy.cacheDict = {};
    Enemy.typeArr = ["b"];
    Enemy.speedDict = { "b": 0 };
    return Enemy;
})(egret.Bitmap);
Enemy.prototype.__class__ = "Enemy";
