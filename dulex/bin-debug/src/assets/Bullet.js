var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(textureName) {
        _super.call(this, RES.getRes(textureName));
    }
    /**生产*/
    Bullet.produce = function (textureName) {
        if (Bullet.cacheDict[textureName] == null) {
            Bullet.cacheDict[textureName] = [];
        }
        var dict = Bullet.cacheDict[textureName];
        var bullet;
        if (dict.length > 0) {
            bullet = dict.pop();
        }
        else {
            bullet = new Bullet(textureName);
        }
        bullet.textureName = textureName;
        bullet.scaleY = 1;
        return bullet;
    };
    /**回收*/
    Bullet.reclaim = function (bullet, textureName) {
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict = Bullet.cacheDict[textureName];
        if (dict.indexOf(bullet) == -1) {
            dict.push(bullet);
        }
    };
    Bullet.cacheDict = {};
    return Bullet;
})(egret.Bitmap);
Bullet.prototype.__class__ = "Bullet";
