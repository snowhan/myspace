var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.BULLET_SPEED = 12 * Main.isFpsTrueNumber;
    GameConfig.FIRE_DELAY = 300;
    GameConfig.ENEMY_FIRE_DELAY = 600;
    GameConfig.WIN_MIN_SCORE = 100; //游戏胜利所需最少分数
    return GameConfig;
})();
GameConfig.prototype.__class__ = "GameConfig";
