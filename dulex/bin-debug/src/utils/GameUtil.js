var GameUtil = (function () {
    function GameUtil() {
    }
    /**基于矩形的碰撞检测*/
    GameUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    GameUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    GameUtil.GAME_EVENT_CREATE_BULLET = "create_bullet";
    GameUtil.GAME_EVENT_PLAYER_DIE = "player_die";
    GameUtil.GAME_EVENT_ENEMY_DIE = "enemy_die";
    GameUtil.GAME_EVENT_JAPAN_CREATE_BULLET = "japan_create_bullet";
    return GameUtil;
})();
GameUtil.prototype.__class__ = "GameUtil";
