module utils{
	
	export function createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    export function storeBestScore(score:number){
        var bestScoreStr = egret.localStorage.getItem("best_war2");
        if(bestScoreStr){
            var best = parseInt(bestScoreStr);
            if(score<best){
                score = best;
            }
        }
        egret.localStorage.setItem("best_war2", ""+score);
    }
    export function getBestScore():number{
        var bestScoreStr = egret.localStorage.getItem("best_war2");
        if(bestScoreStr){
            return parseInt(bestScoreStr);
        }
        return 0;
    }

}