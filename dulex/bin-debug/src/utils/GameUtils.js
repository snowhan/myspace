var utils;
(function (utils) {
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    utils.createBitmapByName = createBitmapByName;
    function storeBestScore(score) {
        var bestScoreStr = egret.localStorage.getItem("best_war2");
        if (bestScoreStr) {
            var best = parseInt(bestScoreStr);
            if (score < best) {
                score = best;
            }
        }
        egret.localStorage.setItem("best_war2", "" + score);
    }
    utils.storeBestScore = storeBestScore;
    function getBestScore() {
        var bestScoreStr = egret.localStorage.getItem("best_war2");
        if (bestScoreStr) {
            return parseInt(bestScoreStr);
        }
        return 0;
    }
    utils.getBestScore = getBestScore;
})(utils || (utils = {}));
