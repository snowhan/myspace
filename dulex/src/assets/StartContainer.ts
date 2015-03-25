class StartContainer extends egret.DisplayObjectContainer{

	// public startBtn:egret.Bitmap;

	public constructor(w:number,h:number){
		super();
		this.width = w;
		this.height = h;
		this.createView();
	}
	private createView(){
		var startBg:egret.Bitmap = GameUtil.createBitmapByName("start_bg");
		startBg.width = this.width;
		startBg.height = this.height;
		this.addChild(startBg);
		
		if(window['haveIntro']){
			var intro:egret.Bitmap = GameUtil.createBitmapByName("intro");
			intro.x = (this.width - intro.width)/2;
			intro.y = (this.height - intro.height - 45 * Main.isFpsTrueNumber);
			this.addChild(intro);
		}
		this.touchEnabled = true;
	}

}
