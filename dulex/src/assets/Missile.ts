class Missile extends egret.DisplayObjectContainer{
    private static cacheDict = [];
    private missile:any;
    private boomMovie:any;
    public isOver:boolean = false;
    public isExploded:boolean = false;
    ///**生产*/
    public static produce():Missile{
        if(Missile.cacheDict==null){
            Missile.cacheDict = [];
        }
        var dict:Missile[] = Missile.cacheDict;
        var missile:Missile;
        if(dict.length>0) {
            missile = dict.pop();
        } else {
            missile = new Missile();
        }
        //missile.textureName = ;
        missile.reset();
        return missile;
    }
    /**回收*/
    public static reclaim(missile:Missile):void{
        if(Missile.cacheDict==null)
            Missile.cacheDict = [];
        var dict:Missile[] = Missile.cacheDict;
        if(dict.indexOf(missile)==-1){
            dict.push(missile);
        }
    }



    public textureName:string;

    public constructor() {
        super();
        this.width = 63 * Main.isFpsTrueNumber;
        this.height = 66 * Main.isFpsTrueNumber;
        this.anchorX = this.anchorY = 0;
        this.createMissile();
    }
    private reset(){
        this.width = 63 * Main.isFpsTrueNumber;
        this.height = 66 * Main.isFpsTrueNumber;
        this.anchorX = this.anchorY = 0;
        this.missile.scaleX = this.missile.scaleY = 1;
        this.missile.isExploded = false;
        this.addChild(this.missile);
    }
    private createMissile(){
        var _missile:egret.Bitmap = this.createBitmapByName('missile');
        this.missile = _missile;
        this.missile.x = 30 * Main.isFpsTrueNumber;
        this.missile.y = 30 * Main.isFpsTrueNumber;
        this.missile.anchorX = this.missile.anchorY = 0.5;
        this.missile.scaleX = this.missile.scaleY = 1;

        this.addChild(this.missile);
    }

    public missilsBoom(){
        var tw = egret.Tween.get(this.missile, { loop: false });
        tw.to({ scaleX: 0.2,scaleY:0.2}, 600);
        tw.call(this.boom,this);
    }

    public boom(){
        if(this.missile && this.missile.parent){
            this.missile.parent.removeChild(this.missile);
        }


        var data = RES.getRes("bzjson");//获取动画文件的信息配置文件
        var texture = RES.getRes("bz");//获取动画文件的图片
        var mc = new egret.MovieClip(data,texture);//创建MovieClip
        mc.anchorX = 0;
        mc.anchorY = 0;
        mc.x = -10 * Main.isFpsTrueNumber;
        mc.y = -5 * Main.isFpsTrueNumber;
        //this.addChild(mc);//添加到显示列表，显示影片剪辑
        mc.frameRate = 7;//设置动画的帧频
        mc.scaleX = mc.scaleY = 0.4 * Main.isFpsTrueNumber;
        //this.boomMovie = mc;
        this.addChild(mc);
        mc.gotoAndPlay('bz');
        this.boomMovie = mc;
        mc.addEventListener('stop',this.stop,this);
        this.isExploded = true;
    }

    private stop(){
        if(this.boomMovie){
            this.boomMovie.stop();
            if(this.parent)
                this.parent.removeChild(this);
            this.boomMovie =null;
        }
        this.isOver = true;
    }

    //public removeChildElement(){
    //    if(this.missile && this.missile.parent){
    //        this.missile.parent.removeChild(this.missile)
    //    }
    //
    //    if(this.boomMovie && this.boomMovie.parent){
    //        this.boomMovie.parent.removeChild(this.boomMovie)
    //    }
    //}


    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}