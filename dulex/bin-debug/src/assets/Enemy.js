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
        this.anchorX = this.anchorY = 0.5;
        this.speed = Enemy.speedDict[this.type];
        this.texture = RES.getRes(this.type + "1");
        this.enemyPosition = Enemy.allPosition[Math.floor(Math.random() * 3)];
        this.scaleX = this.scaleY = 0.1;
    }
    /**生产*/
    Enemy.produce = function (type) {
        if (Enemy.cacheDict[type] == null)
            Enemy.cacheDict[type] = [];
        var dict = Enemy.cacheDict[type];
        var enemy;
        if (dict.length > 0) {
            enemy = dict.shift();
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
        this.type = type ? type : Enemy.typeArr[Math.floor(Math.random() * 3)];
        this.speed = Enemy.speedDict[this.type];
        this.blood = 1;
        this.texture = RES.getRes(this.type + this.blood + "");
        this.enemyPosition = Enemy.allPosition[Math.floor(Math.random() * 3)];
        this.scaleX = this.scaleY = 0.1;
    };
    Enemy.prototype.onAttacked = function (bulletType) {
        if (bulletType == 1) {
            this.blood--;
        }
        else {
            this.blood = 0;
        }
        if (this.blood >= 0) {
            this.texture = RES.getRes(this.type + this.blood + "");
        }
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
    Enemy.typeArr = ["a", "b", "c"];
    Enemy.speedDict = { "a": 4.5, "b": 5, "c": 4 };
    Enemy.allPosition = ["left", "left", "left"];
    return Enemy;
})(egret.Bitmap);
Enemy.prototype.__class__ = "Enemy";
