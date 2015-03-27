var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        _super.call(this);
        this.a = 0.5;
        this.v = 1;
        //private missiles:Missile[] = [];
        /*皇军*/
        this.enemys = [];
        this.enemyTimer = new egret.Timer(1500);
        this.enemyRunTimer = new egret.Timer(100);
        //private lastX:number;
        //private lastY:number;
        /*计时器*/
        this.timer = null;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        window['outerStart'] = this.outerStart;
        window['gameObj'] = this;
    }
    GameContainer.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    };
    /*创建游戏场景*/
    GameContainer.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        egret.MainContext.instance.touchContext.maxTouches = 1;
        this.initBeforeStart();
    };
    /*初始界面准备*/
    GameContainer.prototype.initBeforeStart = function () {
        if (!this.startContainer) {
            this.startContainer = new StartContainer(this.stageW, this.stageH);
        }
        this.addChild(this.startContainer);
        this.startContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
    };
    /*从初始界面开始游戏*/
    GameContainer.prototype.onGameStart = function (event) {
        this.startContainer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
        this.removeChild(this.startContainer);
        this.startGame();
        window['cb_start']();
    };
    /*开始游戏*/
    GameContainer.prototype.startGame = function () {
        this.deleteDatas();
        this.initStartComponents();
        this.score = 0;
        this.lastTime = egret.getTimer();
        this.player.fireTimer.delay = 100;
        this.enemyTimer.delay = 2000;
        this.enemyRunTimer.delay = 100;
        //if(!this.missiles)
        //	this.missileTimer = new egret.Timer(10000);
        //this.missileTimer.delay = 500;
        //this.superBulletTimer.delay = 20000;
        //this.a1BulletTimer.delay = 20000;
        this.player.fire();
        this.enemyTimer.start();
        this.enemyRunTimer.start();
        //this.missileTimer.start();
        //this.missileTimer();
        //this.superBulletTimer.start();
        //this.a1BulletTimer.start();
    };
    /*准备游戏开始界面*/
    GameContainer.prototype.initStartComponents = function () {
        var shan = GameUtil.createBitmapByName("shan");
        this.addChild(shan);
        var data = RES.getRes("paodaojson"); //获取动画文件的信息配置文件
        var texture = RES.getRes("paodao"); //获取动画文件的图片
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("paodao"));
        mc.scaleX = 1 * Main.isFpsTrueNumber;
        mc.scaleY = 1 * Main.isFpsTrueNumber;
        //this.addChild(mc);//添加到显示列表，显示影片剪辑
        mc.frameRate = 5; //设置动画的帧频
        mc.x = this.stageW / 2;
        //mc.y = 400;
        mc.y = this.stageH - 663 / 2;
        //mc.scaleX = mc.scaleY = 0.2;
        //this.boomMovie = mc;
        this.addChild(mc);
        //mc.gotoAndPlay('paodao');
        mc.play(-1);
        this.bg = mc;
        var _leftShape = new egret.Shape();
        this.leftShape = _leftShape;
        this.leftShape.x = 0;
        this.leftShape.y = 0;
        this.leftShape.width = this.stageW / 2;
        this.leftShape.height = this.stageH;
        this.addChild(this.leftShape);
        this.leftShape.touchEnabled = true;
        var _rightShape = new egret.Shape();
        this.rightShape = _rightShape;
        this.rightShape.x = this.stageW / 2;
        this.rightShape.y = 0;
        this.rightShape.width = this.stageW / 2;
        this.rightShape.height = this.stageH;
        this.addChild(this.rightShape);
        this.rightShape.touchEnabled = true;
        this.player = new Player();
        this.player.x = 370;
        this.player.y = this.stageH - 300;
        this.player.touchEnabled = true;
        this.addChild(this.player);
        this.touchEnabled = true;
        //this.superBullet = GameUtil.createBitmapByName("bullet");
        //this.a1Bullet = GameUtil.createBitmapByName('bullet');
        //this.pauseBtn = GameUtil.createBitmapByName("pauseBtn");
        //this.pauseBtn.x = (this.stageW - this.pauseBtn.width - 20);
        //this.pauseBtn.y = 20;
        //this.pauseBtn.touchEnabled = true;
        //this.addChild(this.pauseBtn);
        //this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePause, this);
        //this.scoreText = new egret.BitmapText();
        //this.scoreText.spriteSheet = RES.getRes("number");
        //this.scoreText.scaleX = this.scoreText.scaleY = 1 * Main.isFpsTrueNumber;
        //this.scoreText.x = 30 * Main.isFpsTrueNumber;
        //this.scoreText.y = -110 * Main.isFpsTrueNumber;
        //this.addChild(this.scoreText);
        //this.scoreText.text = "0";
        //this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        this.leftShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftTouch, this);
        this.rightShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightTouch, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
        //this.player.addEventListener(GameUtil.GAME_EVENT_CREATE_BULLET, this.createBullets, this);
        this.player.addEventListener(GameUtil.GAME_EVENT_PLAYER_DIE, this.gameOver, this);
        this.enemyTimer.addEventListener(egret.TimerEvent.TIMER, this.generateEnemys, this);
        this.enemyRunTimer.addEventListener(egret.TimerEvent.TIMER, this.gameViewUpdate, this);
        //this.missileTimer.addEventListener(egret.TimerEvent.TIMER, this.createMissile, this);
        //this.superBulletTimer.addEventListener(egret.TimerEvent.TIMER, this.createSuperBullet, this);
    };
    GameContainer.prototype.rightTouch = function () {
        if (this.player.state == 'left') {
            this.player.state = 'middle';
            console.log('mid');
            this.middleTouchEvent();
            return;
        }
        if (this.player.state == 'middle') {
            this.player.state = 'right';
            console.log('ri');
            this.rightTouchEvent();
            return;
        }
        console.log(this.player.state);
    };
    GameContainer.prototype.leftTouch = function () {
        if (this.player.state == 'right') {
            this.player.state = 'middle';
            this.middleTouchEvent();
            return;
        }
        if (this.player.state == 'middle') {
            this.player.state = 'left';
            this.leftTouchEvent();
            return;
        }
        console.log(this.player.state);
    };
    //private onTouchEvent(){
    //	this.setChildIndex(this.player, this.numChildren - 1);
    //	if(this.player.state == 'left'){
    //		this.rightTouchEvent();
    //	}else if(this.player.state == 'middle'){
    //		this.middleTouchEvent();
    //	}else{
    //		this.leftTouchEvent();
    //	}
    //}
    GameContainer.prototype.rightTouchEvent = function () {
        //this.player.rightMove();
        var tw = egret.Tween.get(this.player, { loop: false });
        tw.to({ x: 650 * Main.isFpsTrueNumber }, 300);
        //tw.call(this.player.normalMove);
    };
    GameContainer.prototype.middleTouchEvent = function () {
        //this.player.rightMove();
        var tw = egret.Tween.get(this.player, { loop: false });
        tw.to({ x: 370 * Main.isFpsTrueNumber }, 300);
        //tw.call(this.player.normalMove);
    };
    GameContainer.prototype.leftTouchEvent = function () {
        //this.player.leftMove();
        var tw = egret.Tween.get(this.player, { loop: false });
        tw.to({ x: 80 * Main.isFpsTrueNumber }, 370);
        //tw.call(this.player.normalMove);
    };
    //
    //private createMissile(){
    //	var _missile = new Missile();
    //	_missile.x = this.stage.stageWidth * Math.random();
    //	_missile.y = this.stage.stageHeight * Math.random();
    //	this.addChild(_missile);
    //	//this.allMissile.push(_missile);
    //	_missile.missilsBoom();
    //	this.missileTimer();
    //}
    //private touchHandler(event:egret.TouchEvent):void{
    //	if(event.type==egret.TouchEvent.TOUCH_MOVE){
    //       var tx:number = this.player.x + event.localX - this.lastX;
    //       var ty:number = this.player.y + event.localY - this.lastY;
    //       if(tx>0&&tx<this.stageW - this.player.width){
    //       	this.player.x = tx;
    //       }
    //       if(ty>0&&ty<this.stageH - this.player.height){
    //       	this.player.y = ty;
    //       }
    //       this.lastX = event.localX;
    //       this.lastY = event.localY;
    //   }else if(event.type==egret.TouchEvent.TOUCH_BEGIN){
    //   	// if(this.lastX==undefined||this.lastY==undefined){
    //   		this.lastX = event.localX;
    //   		this.lastY = event.localY;
    //   	// }
    //   }
    //}
    ///*生成导弹*/
    //private createMissile():void{
    //	var missile:Missile;
    //	missile = Missile.produce();
    //	missile.x = this.stage.stageWidth * Math.random();
    //	missile.y = this.stage.stageHeight * Math.random();
    //
    //	//missile.x = 200;
    //	//missile.y = 200;
    //
    //   this.addChildAt(missile,this.numChildren-1-this.enemys.length);
    //	missile.missilsBoom();
    //   //this.addChild(missile)
    //   this.missiles.push(missile);
    //	//this.missileTimer();
    //}
    //private missileTimer(){
    //	var _timer = new egret.Timer(500, 1);
    //	this.timer = _timer;
    //	this.timer.addEventListener(egret.TimerEvent.TIMER, this.createMissile, this);
    //	this.timer.start();
    //}
    /*发射子弹*/
    //private createBullets():void{
    //	var bullet:Bullet;
    //	bullet = Bullet.produce('bullet');
    //	bullet.scaleY *= -1;
    //	bullet.x = this.player.x + (this.player.width - bullet.width)/2 + 10 * Main.isFpsTrueNumber;
    //	bullet.y = this.player.y;
    //	this.addChildAt(bullet,this.numChildren-1-this.enemys.length);
    //	this.bullets.push(bullet);
    //}
    /*皇军1发射子弹*/
    //private createA1Bullets():void{
    //	var a1bullet:Bullet;
    //	a1bullet = Bullet.produce('bullet');
    //	a1bullet.x = 30;
    //	a1bullet.y = 0;
    //	this.addChildAt(a1bullet,this.numChildren-1-this.enemys.length);
    //	this.a1Bullets.push(a1bullet);
    //}
    ///*皇军2发射子弹*/
    //private create1Bullets():void{
    //	var bullet:Bullet;
    //	bullet = Bullet.produce('bullet');
    //	bullet.x = this.player.x + (this.player.width - bullet.width)/2;
    //	bullet.y = this.player.y+30;
    //	this.addChildAt(bullet,this.numChildren-1-this.enemys.length);
    //	this.bullets.push(bullet);
    //
    //	this.missileTimer();
    //}
    /*生成三姑六婆*/
    GameContainer.prototype.generateEnemys = function () {
        var enemy = Enemy.produce(Enemy.typeArr[Enemy.typeArr[Math.floor(Math.random() * 3)]]);
        if (enemy.enemyPosition == "left") {
            enemy.x = 360;
        }
        else if (enemy.enemyPosition == "middle") {
            enemy.x = 380;
        }
        else {
            enemy.x = 385;
        }
        //enemy.x = 100;
        //enemy.y = -enemy.height-Math.random()*300;
        enemy.y = 680;
        this.addChildAt(enemy, this.numChildren - 1);
        this.enemys.push(enemy);
        //enemy.addEventListener(GameUtil.GAME_EVENT_JAPAN_CREATE_BULLET,this.createBulletHandler, this);
        //enemy.fireTimer.delay = 1000;
        //enemy.fire();
    };
    //private enemyRunEvent(){
    //	this.gameViewUpdate(event:egret.Event);
    //}
    /**创建子弹(皇军的子弹)*/
    //private createBulletHandler(evt:egret.Event):void{
    //	var a1bullet:Bullet;
    //	var theFighter:Enemy = evt.target;
    //	a1bullet = Bullet.produce('bullet');
    //	a1bullet.x = theFighter.x + 7 * Main.isFpsTrueNumber;
    //	a1bullet.y = theFighter.y+55 * Main.isFpsTrueNumber;
    //	this.addChildAt(a1bullet,this.numChildren-1-this.enemys.length);
    //	this.a1Bullets.push(a1bullet);
    //}
    ///*生成超级子弹*/
    //private createSuperBullet(){
    //	this.superBullet.x = Math.random()*(this.stageW-this.superBullet.width);
    //	this.superBullet.y = -this.superBullet.height - Math.random()*250;
    //	this.addChildAt(this.superBullet,this.numChildren-1);
    //}
    GameContainer.prototype.gameViewUpdate = function (event) {
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this.lastTime);
        this.lastTime = nowTime;
        var speedOffset = 60 / fps;
        var len;
        var i;
        //len = this.bullets.length;
        var delArr = [];
        ////子弹的移动
        //var bullet:Bullet;
        //var a1bullet:Bullet;
        ////var missile:Missile;
        //for(i=0;i<len;i++){
        //    bullet = this.bullets[i];
        //    bullet.y -= 15*speedOffset * Main.isFpsTrueNumber;
        //    if(bullet.y<-bullet.height){
        //        delArr.push(bullet);
        //    }
        //}
        //for(i=0;i<delArr.length;i++){
        //    bullet = delArr[i];
        //    this.removeChild(bullet);
        //    Bullet.reclaim(bullet,bullet.textureName);
        //    this.bullets.splice(this.bullets.indexOf(bullet),1);
        //}
        //delArr = [];
        //for(i=0;i<this.a1Bullets.length;i++){
        //	a1bullet = this.a1Bullets[i];
        //	a1bullet.y += 7*speedOffset * Main.isFpsTrueNumber;
        //	if(a1bullet.y>this.stageH + a1bullet.height){
        //		delArr.push(a1bullet);
        //	}
        //}
        //for(i=0;i<delArr.length;i++){
        //	a1bullet = delArr[i];
        //	this.removeChild(a1bullet);
        //	Bullet.reclaim(a1bullet,a1bullet.textureName);
        //	this.a1Bullets.splice(this.a1Bullets.indexOf(a1bullet),1);
        //}
        //delArr = [];
        //for(i=0;i<this.missiles.length;i++){
        //	missile = this.missiles[i];
        //	//bullet.y -= 12*speedOffset;
        //	if(missile.isOver == true){
        //		delArr.push(bullet);
        //	}
        //}
        //for(i=0;i<delArr.length;i++){
        //	missile = delArr[i];
        //	//this.removeChild(missile);
        //	//missile.removeChildElement();
        //	//missile.parent.removeChild(missile);
        //	missile = Missile.produce();
        //	Missile.reclaim(missile);
        //	this.missiles.splice(this.missiles.indexOf(missile),1);
        //}
        //delArr = [];
        //if(this.superBullet.parent){
        //	this.superBullet.y += 5*speedOffset;
        //}
        //三姑六婆的移动
        var enemy;
        len = this.enemys.length;
        for (i = 0; i < len; i++) {
            enemy = this.enemys[i];
            if (enemy.enemyPosition == "left") {
                this.enemyLeftRun(enemy);
            }
            else if (enemy.enemyPosition == "middle") {
                this.enemyMiddleRun(enemy);
            }
            else {
                this.enemyRightRun(enemy);
            }
            if (enemy.y > this.stageH) {
                delArr.push(enemy);
            }
        }
        for (i = 0; i < delArr.length; i++) {
            enemy = delArr[i];
            //enemy.stopFire();
            this.removeChild(enemy);
            Enemy.reclaim(enemy, enemy.type);
            this.enemys.splice(this.enemys.indexOf(enemy), 1);
        }
        delArr = [];
        for (var i = 0; i < this.enemys.length; i++) {
            this.enemys[i].y += 6 * Main.isFpsTrueNumber;
        }
        this.gameHitTest();
    };
    /*碰撞检测*/
    GameContainer.prototype.gameHitTest = function () {
        var i, j;
        //var bullet:Bullet;
        var enemy;
        //var missile:Missile;
        //var a1bullet:Bullet;
        //var bulletsCount:number = this.bullets.length;
        var enemysCount = this.enemys.length;
        //var missileCount:number = this.missiles.length;
        //var a1bulletCount:number = this.a1Bullets.length;
        //将需消失的子弹和皇军记录
        //var delBullets:Bullet[] = [];
        var delEnemys = [];
        //var delmissiles:Missile[] = [];
        //var dela1Bullet:Bullet[] = [];
        //我的子弹可以消灭皇军
        //for(i=0;i<bulletsCount;i++) {
        //    bullet = this.bullets[i];
        //    for(j=0;j<enemysCount;j++) {
        //        enemy = this.enemys[j];
        //        if(enemy.y>-enemy.height){
        //           if(GameUtil.hitTest(enemy,bullet)) {
        //               enemy.onAttacked();
        //               //if(delBullets.indexOf(bullet)==-1){
        //               //    delBullets.push(bullet);
        //               //}
        //               if(enemy.blood<=0 && delEnemys.indexOf(enemy)==-1){
        //                   delEnemys.push(enemy);
        //               }
        //           }
        //       }
        //    }
        //}
        this.addScore(delEnemys.length);
        for (i = 0; i < enemysCount; i++) {
            enemy = this.enemys[i];
        }
        while (delEnemys.length > 0) {
            enemy = delEnemys.pop();
            this.enemys.splice(this.enemys.indexOf(enemy), 1);
            //enemy.stopFire();
            enemy.die();
            this.player.onEnemyDie();
        }
        //if(this.superBullet.parent){
        //	if(GameUtil.hitTest(this.superBullet,this.player)){
        //        this.removeChild(this.superBullet);
        //        this.player.equipSuperBullet();
        //    }
        //}
    };
    GameContainer.prototype.enemyLeftRun = function (enemyObj) {
        //this.v += this.a;
        enemyObj.y += 3;
        enemyObj.x -= 7;
        if (enemyObj.scaleX < 1) {
            enemyObj.scaleY += 0.015;
            enemyObj.scaleX += 0.015;
        }
    };
    GameContainer.prototype.enemyMiddleRun = function (enemyObj) {
        //this.v += this.a;
        enemyObj.y += 3;
        enemyObj.x -= 0.08;
        if (enemyObj.scaleX < 1) {
            enemyObj.scaleY += 0.015;
            enemyObj.scaleX += 0.015;
        }
    };
    GameContainer.prototype.enemyRightRun = function (enemyObj) {
        //this.v += this.a;
        enemyObj.y += 3;
        enemyObj.x += 8;
        if (enemyObj.scaleX < 1) {
            enemyObj.scaleY += 0.015;
            enemyObj.scaleX += 0.015;
        }
    };
    /*添加分数*/
    GameContainer.prototype.addScore = function (value) {
        this.score += value;
        //this.scoreText.text = ''+this.score;
        //if(this.score>100){
        //	this.enemyTimer.delay = 300;
        //	//this.missileTimer.delay = 100;
        //	//this.player.fireTimer.delay = 150;
        //	//this.superBulletTimer.delay = 12000;
        //}else if(this.score>50){
        //	this.enemyTimer.delay = 300;
        //	//this.missileTimer.delay = 300;
        //	//this.player.fireTimer.delay = 200;
        //	//this.superBulletTimer.delay = 15000;
        //}else if(this.score>30){
        //	this.enemyTimer.delay = 400;
        //	//this.missileTimer.delay = 400;
        //	//this.player.fireTimer.delay = 250;
        //}else if(this.score>20){
        //	this.enemyTimer.delay = 500;
        //	//this.missileTimer.delay = 500;
        //}else{
        //	this.enemyTimer.delay = 600;
        //	//this.missileTimer.delay = 600;
        //}
    };
    GameContainer.prototype.deleteDatas = function () {
        while (this.enemys.length > 0) {
            this.enemys.pop();
        }
    };
    /*回到初始界面*/
    GameContainer.prototype.goBackHome = function (event) {
        this.removeChildren();
        this.initBeforeStart();
    };
    //private gamePause(){
    //	this.pauseBtn.touchEnabled = false;
    //	this.removeAllListeners();
    //   if(!this.pausePanel){
    //   	this.pausePanel = new PausePanel();
    //   	this.pausePanel.x = (this.stageW - this.pausePanel.width)/2;
    //   	this.pausePanel.y = (this.stageH - this.pausePanel.height)/2;
    //   	this.pausePanel.resumeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameResume, this);
    //   	this.pausePanel.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRestart, this);
    //   	this.pausePanel.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRestart, this);
    //   }
    //   this.addShadow();
    //   this.addChild(this.pausePanel);
    //}
    //private gameResume(){
    //	if(this.shadow.parent){
    //		this.removeChild(this.shadow);
    //	}
    //	this.lastTime = egret.getTimer();
    //	this.pauseBtn.touchEnabled = true;
    //	this.removeChild(this.pausePanel);
    //	this.addAllListeners();
    //}
    /*重新开始游戏*/
    GameContainer.prototype.gameRestart = function () {
        this.removeAllListeners();
        //this.bullets = [];
        //this.missiles = [];
        /*皇军*/
        this.enemys = [];
        /*皇军1发射的子弹*/
        //this.a1Bullets = [];
        this.removeChildren();
        this.startGame();
        window['cb_restart']();
    };
    /*游戏结束*/
    GameContainer.prototype.gameOver = function () {
        utils.storeBestScore(this.score);
        this.removeAllListeners();
        for (var i = 0; i < this.enemys.length; i++) {
        }
        if (!this.gameOverPanel) {
            this.gameOverPanel = new GameOverPanel(this.stageW, this.stageH);
            this.gameOverPanel.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRestart, this);
            if (window['haveShare'] || window['haveGamelist']) {
                this.gameOverPanel.otherBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOtherBtnTap, this);
            }
        }
        this.gameOverPanel.setScore(this.score);
        this.gameOverPanel.setBestScore(utils.getBestScore());
        egret.setTimeout(function () {
            this.addChild(this.gameOverPanel);
        }, this, 1000);
        window['cb_gameover'](this.score);
    };
    GameContainer.prototype.onOtherBtnTap = function (event) {
        event.stopImmediatePropagation();
        if (window['haveShare']) {
            this.shareGame();
        }
        else {
            this.getMoreGame();
        }
    };
    GameContainer.prototype.addAllListeners = function () {
        //this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
        //this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
        //this.player.addEventListener(GameUtil.GAME_EVENT_CREATE_BULLET, this.createBullets, this);
        this.player.addEventListener(GameUtil.GAME_EVENT_PLAYER_DIE, this.gameOver, this);
        this.enemyTimer.addEventListener(egret.TimerEvent.TIMER, this.generateEnemys, this);
        this.enemyRunTimer.addEventListener(egret.TimerEvent.TIMER, this.gameViewUpdate, this);
        //this.missileTimer.addEventListener(egret.TimerEvent.TIMER, this.createMissile, this);
    };
    GameContainer.prototype.removeAllListeners = function () {
        //this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        //this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
        //this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
        //this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
        //this.player.removeEventListener(GameUtil.GAME_EVENT_CREATE_BULLET, this.createBullets, this);
        this.player.removeEventListener(GameUtil.GAME_EVENT_PLAYER_DIE, this.gameOver, this);
        this.enemyTimer.removeEventListener(egret.TimerEvent.TIMER, this.generateEnemys, this);
        this.enemyRunTimer.removeEventListener(egret.TimerEvent.TIMER, this.gameViewUpdate, this);
        //this.missileTimer.removeEventListener(egret.TimerEvent.TIMER, this.createMissile, this);
        //this.timer.removeEventListener(egret.TimerEvent.TIMER, this.createMissile, this);
    };
    /*添加阴影*/
    GameContainer.prototype.addShadow = function () {
        if (!this.shadow) {
            this.shadow = new egret.Shape();
            this.shadow.width = this.stageW;
            this.shadow.height = this.stageH;
            this.shadow.graphics.beginFill(0x000000, 0.6);
            this.shadow.graphics.drawRect(0, 0, this.stageW, this.stageH);
            this.shadow.graphics.endFill();
            this.shadow.touchEnabled = true;
        }
        this.addChild(this.shadow);
    };
    GameContainer.prototype.shareGame = function () {
        // if(this.gameOverPanel){
        // 	this.gameOverPanel.touchChildren = false;
        // }
        // this.addShadow();
        // if(!this.shareTip){
        // 	this.shareTip = GameUtil.createBitmapByName("shareTip");
        // 	this.shareTip.height *= (this.stageW/this.shareTip.width);
        // 	this.shareTip.width = this.stageW;
        // }
        // this.addChild(this.shareTip);
        // this.shareTip.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareCancel, this);
        window['cb_share']();
    };
    // private shareCancel():void{
    // 	if(this.shareTip.parent){
    // 		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shareCancel, this);
    // 		if(this.contains(this.shadow)){
    // 			this.removeChild(this.shadow);
    // 		}
    // 		this.removeChild(this.shareTip);
    // 		if(this.contains(this.gameOverPanel)){
    // 			this.gameOverPanel.touchChildren = true;
    // 		}
    // 	}
    // }
    GameContainer.prototype.getMoreGame = function () {
        window['cb_more']();
    };
    GameContainer.prototype.outerStart = function () {
        this.removeAllListeners();
        //this.bullets = [];
        //this.missiles = [];
        /*皇军*/
        this.enemys = [];
        /*皇军1发射的子弹*/
        //this.a1Bullets = [];
        this.removeChildren();
        this.initBeforeStart();
    };
    return GameContainer;
})(egret.DisplayObjectContainer);
GameContainer.prototype.__class__ = "GameContainer";
