class PausePanel extends egret.DisplayObjectContainer{

	public homeBtn:egret.Bitmap;
	public resumeBtn:egret.Bitmap;
	public replayBtn:egret.Bitmap; 

	public constructor(){
		super();
		var bg:egret.Bitmap = GameUtil.createBitmapByName("pauseBg");
		this.width = bg.width;
		this.height = bg.height;
		this.addChild(bg);

		this.homeBtn = GameUtil.createBitmapByName("homeBtn");
		this.resumeBtn = GameUtil.createBitmapByName("resumeBtn");
		this.replayBtn = GameUtil.createBitmapByName("replayBtn");

		this.resumeBtn.x = (this.width - this.resumeBtn.width)/2;
		this.resumeBtn.y = (this.height - this.resumeBtn.height)/2;

		this.addChild(this.resumeBtn);

		this.homeBtn.x = 50;
		this.homeBtn.y = (this.height - this.homeBtn.height)/2;

		this.addChild(this.homeBtn);

		this.replayBtn.x = this.width - this.replayBtn.width - 50;
		this.replayBtn.y = (this.height - this.replayBtn.height)/2;

		this.addChild(this.replayBtn);

		this.homeBtn.touchEnabled = this.resumeBtn.touchEnabled = this.replayBtn.touchEnabled = true;
	}
}
