/**
 * Created by danny on 2018/3/8.
 */


function preload() {

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor ='#778899';
    // game.load.image('ball','img/ball.png');
    game.load.image('paddle','img/paddle.png');
    game.load.image('brick','img/bricks.png');
    game.load.spritesheet('ball','img/wobble.png',20,20);
    game.load.spritesheet('startButton','img/button.png',120,40);

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

//ball:
    ball  = game.add.sprite(400, 300, 'ball');
    ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 9); // 18fps /9 =2 所以一秒會循環2次
    ball.anchor.set(0.5);
    game.physics.enable(ball,Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(ballLeaveScreen);

//paddle:
    paddle = game.add.sprite(game.world.width*0.5,game.world.height-10, 'paddle');
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle,Phaser.Physics.ARCADE);
    paddle.body.immovable = true;


// bricks:
    initBricks();

    var textStyle ={font:'25px ariel',fill:'#0095DD'};
//score:
    scoreText = game.add.text(15,5,'points:0',textStyle);
// life
    liveText = game.add.text(game.world.width-15,5,'lives:'+lives, textStyle);
    liveText.anchor.set(1,0);
    liveLostText = game.add.text(game.world.width*0.5,game.world.height*0.5,'Live is hard, click again ');
    liveLostText.anchor.set(0.5);
    liveLostText.visible = false;


// startButton:
    startButton = game.add.button(game.world.width*0.5,game.world.height*0.5,'startButton',startGame,this,1,0,2); //0,1,2 : over,out,down
    startButton.anchor.set(0.5);


}

function update() {

    game.physics.arcade.collide(ball,paddle,ballHitPaddle);
    game.physics.arcade.collide(ball,bricks,ballHitBrick);  // callback function 不用寫參數，他會依照前面放的ball,bricks自行放入

    if (playing){
        paddle.x = game.input.x || game.world.width*0.5;
    }



}



