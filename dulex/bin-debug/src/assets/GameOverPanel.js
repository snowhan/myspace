var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel(w, h) {
        _super.call(this);
        this.width = w;
        this.height = h;
        this.createView();
    }
    GameOverPanel.prototype.createView = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("gameOverBg");
        this.bg.anchorX = this.bg.anchorY = 0.5;
        this.bg.x = Main.stage.stageWidth / 2;
        this.bg.y = Main.stage.stageHeight / 2;
        this.addChild(this.bg);
        this.scoreText = new egret.BitmapText();
        this.scoreText.font = RES.getRes("font1");
        this.scoreText.anchorX = this.scoreText.anchorY = 0.5;
        this.scoreText.scaleX = this.scoreText.scaleY = 1 * Main.isFpsTrueNumber;
        this.scoreText.x = Main.stage.stageWidth / 2;
        this.scoreText.y = this.bg.y - this.bg.height / 2;
        //this.scoreText.text = this.thisGameScore + "";
        this.addChild(this.scoreText);
        this.addChild(this.scoreText);
        this.restartBtn = GameUtil.createBitmapByName("gameOverReplay");
        this.restartBtn.anchorY = 0.5;
        this.restartBtn.x = this.bg.x - this.bg.width / 2 + (this.bg.width - this.restartBtn.width * 2) / 3;
        this.restartBtn.y = this.bg.y + this.bg.height / 2;
        this.addChild(this.restartBtn);
        this.restartBtn.touchEnabled = true;
        if (window['haveShare'] || window['haveGamelist']) {
            if (window['haveShare']) {
                this.otherBtn = GameUtil.createBitmapByName("gameOverShare");
            }
            else {
                this.otherBtn = GameUtil.createBitmapByName("moreBtn");
            }
            this.otherBtn.anchorY = 0.5;
            this.otherBtn.x = this.restartBtn.x + this.restartBtn.width + (this.bg.width - this.restartBtn.width * 2) / 3;
            this.otherBtn.y = this.bg.y + this.bg.height / 2;
            //this.otherBtn.x = (this.width - this.otherBtn.width)/2;
            //this.otherBtn.y = this.restartBtn.y + this.restartBtn.height + 15;
            this.addChild(this.otherBtn);
            this.otherBtn.touchEnabled = true;
        }
    };
    GameOverPanel.prototype.setScore = function (score) {
        //	if(score>=GameConfig.WIN_MIN_SCORE){
        //		this.bg.texture = RES.getRes("winBg");
        //	}else{
        //		this.bg.texture = RES.getRes("loseBg");
        //	}
        this.scoreText.text = "" + score;
        if (score < 40) {
            var _designation = GameUtil.createBitmapByName('level1');
        }
        else if (score < 80) {
            var _designation = GameUtil.createBitmapByName('level2');
        }
        else {
            var _designation = GameUtil.createBitmapByName('level3');
        }
        this.designation = _designation;
        this.designation.anchorX = this.designation.anchorY = 0.5;
        this.designation.x = Main.stage.stageWidth / 2;
        this.designation.y = Main.stage.stageHeight / 2 + 30 * Main.isFpsTrueNumber;
        this.addChild(this.designation);
    };
    GameOverPanel.prototype.setBestScore = function (bestScore) {
        if (!this.bestScoreText) {
            this.bestScoreText = new egret.TextField();
        }
        //bestScoreText.size = 18;
        //bestScoreText.textColor = 0x555555;
        //bestScoreText.text = '最高 '+bestScore;
        //bestScoreText.anchorX = 0.5;
        //bestScoreText.x = this.width/2;
        //bestScoreText.y = 84;
        //bestScoreText.fontFamily = 'Microsoft Yahei';
        this.bestScoreText.width = Main.stage.stageWidth;
        this.bestScoreText.height = 40 * Main.isFpsTrueNumber;
        //this.againLabel.x = this.stage.stageWidth/2 - (this.gameOver.width*this.gameOver.scaleX-40*Main.isFpsTrueNumber)/2;
        this.bestScoreText.y = this.scoreText.y + this.scoreText.height * this.scoreText.scaleX / 2 - 40 * Main.isFpsTrueNumber;
        this.bestScoreText.textAlign = egret.HorizontalAlign.CENTER;
        this.bestScoreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.bestScoreText.fontFamily = 'Microsoft Yahei';
        this.bestScoreText.size = 40 * Main.isFpsTrueNumber;
        this.bestScoreText.textColor = 0x777777;
        this.bestScoreText.text = "最高  " + bestScore;
        this.addChild(this.bestScoreText);
    };
    return GameOverPanel;
})(egret.DisplayObjectContainer);
GameOverPanel.prototype.__class__ = "GameOverPanel";
