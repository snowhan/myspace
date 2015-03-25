var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartContainer = (function (_super) {
    __extends(StartContainer, _super);
    // public startBtn:egret.Bitmap;
    function StartContainer(w, h) {
        _super.call(this);
        this.width = w;
        this.height = h;
        this.createView();
    }
    StartContainer.prototype.createView = function () {
        var startBg = GameUtil.createBitmapByName("start_bg");
        startBg.width = this.width;
        startBg.height = this.height;
        this.addChild(startBg);
        if (window['haveIntro']) {
            var intro = GameUtil.createBitmapByName("intro");
            intro.x = (this.width - intro.width) / 2;
            intro.y = (this.height - intro.height - 45 * Main.isFpsTrueNumber);
            this.addChild(intro);
        }
        this.touchEnabled = true;
    };
    return StartContainer;
})(egret.DisplayObjectContainer);
StartContainer.prototype.__class__ = "StartContainer";
