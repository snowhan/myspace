class GameUtil{
    public static GAME_EVENT_CREATE_BULLET = "create_bullet";
    public static GAME_EVENT_PLAYER_DIE = "player_die";
    public static GAME_EVENT_ENEMY_DIE = "enemy_die";
    public static GAME_EVENT_JAPAN_CREATE_BULLET = "japan_create_bullet";
    /**基于矩形的碰撞检测*/
    public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean{
        var rect1:egret.Rectangle = obj1.getBounds();
        var rect2:egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
